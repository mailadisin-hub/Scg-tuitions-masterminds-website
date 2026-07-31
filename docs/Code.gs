/**
 * SCG MASTERMINDS — results collector + parent email report
 * =========================================================
 * Receives a quiz result from the SCG Masterminds website, saves it as a row
 * in this Google Sheet, and emails the parent a full question-by-question
 * report.
 *
 * SETUP (about 5 minutes)
 *   1. Create a new Google Sheet (sheets.new).
 *   2. Extensions > Apps Script. Delete anything already in the editor and
 *      paste this whole file in. Save.
 *   3. Run > choose "testEmail" > Run. Google asks you to authorise the script
 *      the first time — allow it. Check the inbox of TEST_TO below.
 *   4. Deploy > New deployment > type "Web app"
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Deploy, then copy the Web app URL.
 *   5. Paste that URL into the website, in the line near the top of the script
 *      block that reads:   var ENDPOINT = "...";
 *
 * IMPORTANT: after any edit here you must redeploy for it to go live —
 * Deploy > Manage deployments > pencil icon > Version: New version.
 *
 * SENDING LIMITS: a free @gmail account can send roughly 100 emails a day, a
 * Google Workspace account roughly 1,500. If the quota is hit the result is
 * still saved to the Sheet and the failure is recorded on the Errors tab.
 */

/* ─────────── SETTINGS ─────────── */
var SHEET_NAME  = 'Results';
var MEMBERS_SHEET = 'Members';
var ERROR_SHEET = 'Errors';
var FROM_NAME   = 'SCG Masterminds';
var REPLY_TO    = 'info@scgtuitions.co.uk';
var COPY_TO     = '';                          // set an address to BCC yourself on every report
var TEST_TO     = 'mail.adisin@gmail.com';     // only used by testEmail()
var BRAND_NAVY  = '#1a2870';
var BRAND_GREEN = '#27ae60';

/* ─────────── ENTRY POINT ─────────── */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (lockErr) {
    return jsonOut({ ok: false, error: 'busy' });
  }

  var data = null;
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST body received');
    }
    data = JSON.parse(e.postData.contents);

    // A sign-up just registers the person; there is no quiz result to save.
    if (data.action === 'register') {
      upsertMember(data);
      return jsonOut({ ok: true, registered: true });
    }


    saveRow(data);

    // Registering the contact must never be able to block the report.
    try {
      upsertMember(data);   // anyone who submits a result is a known contact
    } catch (memberErr) {
      logError('upsertMember', memberErr, data);
    }

    // The report is a bonus — an email failure must never lose the result.
    try {
      if (data.parentEmail && isEmail(data.parentEmail)) {
        sendReport(data);
      }
    } catch (mailErr) {
      logError('sendReport', mailErr, data);
    }

    return jsonOut({ ok: true });

  } catch (err) {
    logError('doPost', err, data);
    return jsonOut({ ok: false, error: String(err) });

  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

/**
 * GET is used for two things:
 *   ?action=tier&email=...&callback=fn  -> the website asking which membership
 *                                          this email has (JSONP, so it works
 *                                          cross-origin without CORS headers)
 *   anything else                       -> a health check you can open in a tab
 */
function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};

  if (p.action === 'tier') {
    var info = lookupMember(p.email);
    var body = JSON.stringify(info);
    if (p.callback) {
      return ContentService
        .createTextOutput(p.callback + '(' + body + ');')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return jsonOut(info);
  }

  return ContentService.createTextOutput(
    'SCG Masterminds collector is running. Deployed: ' + new Date());
}

/* ─────────── MEMBERS ───────────
   One row per person. The website only ever writes the grey columns
   (name, last seen, quiz counts). Tier, Status and Notes are yours to edit by
   hand and are never overwritten once the row exists. */
function membersSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(MEMBERS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(MEMBERS_SHEET);
    sheet.appendRow([
      'Email', 'Parent Name', 'Child Name', 'Tier', 'Status',
      'Signed Up', 'Last Seen', 'Quizzes Taken', 'Last Quiz', 'Notes'
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    // A dropdown keeps the Tier column to valid values.
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['free', 'english', 'maths', 'max'], true).build();
    sheet.getRange(2, 4, 2000, 1).setDataValidation(rule);
    var srule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['active', 'paused', 'cancelled'], true).build();
    sheet.getRange(2, 5, 2000, 1).setDataValidation(srule);
  }
  return sheet;
}

/** Row number for an email, or 0 if not present. */
function findMemberRow(sheet, email) {
  var key = String(email || '').trim().toLowerCase();
  if (!key) return 0;
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var emails = sheet.getRange(2, 1, last - 1, 1).getValues();
  for (var i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).trim().toLowerCase() === key) return i + 2;
  }
  return 0;
}

/** Create the person if new; otherwise only refresh the automatic columns. */
function upsertMember(d) {
  var email = String(d.parentEmail || d.email || '').trim();
  if (!isEmail(email)) return;

  var sheet = membersSheet();
  var row = findMemberRow(sheet, email);
  var now = new Date();
  var name = d.parentName || '';
  var child = d.childName || '';
  var quiz = d.quiz || '';

  if (!row) {
    sheet.appendRow([
      email, name, child,
      'free',      // everyone starts free — change this cell to upgrade someone
      'active',
      now, now,
      quiz ? 1 : 0,
      quiz, ''
    ]);
    return;
  }

  // Existing member: never touch Tier (D), Status (E) or Notes (J).
  if (name)  sheet.getRange(row, 2).setValue(name);
  if (child) sheet.getRange(row, 3).setValue(child);
  sheet.getRange(row, 7).setValue(now);
  if (quiz) {
    var count = Number(sheet.getRange(row, 8).getValue()) || 0;
    sheet.getRange(row, 8).setValue(count + 1);
    sheet.getRange(row, 9).setValue(quiz);
  }
}

/** What the website asks for. A non-active member is treated as free. */
function lookupMember(email) {
  try {
    if (!isEmail(email)) return { found: false, tier: 'free', status: 'unknown' };
    var sheet = membersSheet();
    var row = findMemberRow(sheet, email);
    if (!row) return { found: false, tier: 'free', status: 'unknown' };

    var vals = sheet.getRange(row, 4, 1, 2).getValues()[0];
    var tier = String(vals[0] || 'free').trim().toLowerCase();
    var status = String(vals[1] || 'active').trim().toLowerCase();

    if (['free', 'english', 'maths', 'max'].indexOf(tier) === -1) tier = 'free';
    if (status !== 'active') tier = 'free';   // paused or cancelled loses access

    return { found: true, tier: tier, status: status };
  } catch (err) {
    logError('lookupMember', err, { email: email });
    return { found: false, tier: 'free', status: 'error' };
  }
}

/* ─────────── SHEET ─────────── */
function saveRow(d) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Received', 'Quiz taken at', 'Child Name', 'Parent Name', 'Parent Email',
      'Section', 'Quiz', 'Score', 'Total', 'Percentage', 'Question Breakdown',
      'Section Breakdown', 'Timed', 'Questions Attempted', 'Time Taken', 'Note'
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 16).setFontWeight('bold');
  }

  sheet.appendRow([
    new Date(),
    d.date || '',
    d.childName || '',
    d.parentName || '',
    d.parentEmail || '',
    d.section || '',
    d.quiz || '',
    (d.score != null ? d.score : ''),
    (d.total != null ? d.total : ''),
    (d.percentage != null ? d.percentage + '%' : ''),
    d.breakdown || '',
    d.sectionBreakdown || '',
    d.timed || '',
    d.questionsAttempted || '',
    d.timeTaken || '',
    d.note || ''
  ]);
}

/* ─────────── EMAIL ─────────── */
function sendReport(d) {
  var childName = d.childName || 'your child';
  var score = (d.score != null ? d.score : 0);
  var total = (d.total != null ? d.total : 0);
  var pct = (d.percentage != null) ? d.percentage
          : (total ? Math.round((score / total) * 100) : 0);

  var subject = childName + ' scored ' + score + '/' + total +
                ' (' + pct + '%) — ' + (d.quiz || 'SCG Masterminds');

  var opts = {
    to: d.parentEmail,
    subject: subject,
    replyTo: REPLY_TO,
    name: FROM_NAME,
    htmlBody: buildHtml(d, childName, score, total, pct),
    body: buildPlain(d, childName, score, total, pct)
  };
  if (COPY_TO) opts.bcc = COPY_TO;

  MailApp.sendEmail(opts);
}

function buildHtml(d, childName, score, total, pct) {
  var col = pct >= 80 ? BRAND_GREEN : (pct >= 60 ? '#e8781a' : '#e57373');
  var msg = pct >= 80 ? 'Brilliant work'
          : pct >= 60 ? 'Good effort'
          : 'Keep going — every attempt helps';

  var h = '';
  h += '<div style="font-family:Arial,Helvetica,sans-serif;background:#f4f6fc;padding:24px 0;">';
  h += '<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e4e8f5;">';

  /* header */
  h += '<div style="background:' + BRAND_NAVY + ';padding:22px 26px;">'
     +   '<div style="color:#ffffff;font-size:20px;font-weight:bold;">SCG Masterminds</div>'
     +   '<div style="color:#c7d0f0;font-size:13px;margin-top:3px;">Part of SCG Tuitions</div>'
     + '</div>';

  /* score */
  h += '<div style="padding:26px;text-align:center;border-bottom:1px solid #eef1fb;">'
     +   '<div style="font-size:15px;color:#4b5673;">' + esc(childName) + ' completed</div>'
     +   '<div style="font-size:18px;font-weight:bold;color:' + BRAND_NAVY + ';margin:6px 0 14px;">'
     +      esc(d.quiz || '') + '</div>'
     +   '<div style="display:inline-block;background:' + col + ';color:#ffffff;font-size:26px;font-weight:bold;'
     +     'padding:14px 26px;border-radius:12px;">' + score + ' / ' + total + '</div>'
     +   '<div style="font-size:16px;color:' + col + ';font-weight:bold;margin-top:12px;">'
     +      pct + '% — ' + msg + '</div>'
     + '</div>';

  /* summary facts */
  var facts = [];
  if (d.section)            facts.push(['Section', d.section]);
  if (d.sectionBreakdown)   facts.push(['By section', d.sectionBreakdown]);
  if (d.timed)              facts.push(['Timed mock', d.timed]);
  if (d.timeTaken)          facts.push(['Time taken', d.timeTaken]);
  if (d.questionsAttempted) facts.push(['Questions attempted', d.questionsAttempted]);
  if (d.note)               facts.push(['Note', d.note]);
  if (d.date)               facts.push(['Taken at', d.date]);

  if (facts.length) {
    h += '<div style="padding:20px 26px;border-bottom:1px solid #eef1fb;">'
       + '<table style="width:100%;border-collapse:collapse;font-size:14px;">';
    for (var f = 0; f < facts.length; f++) {
      h += '<tr>'
         +   '<td style="padding:5px 0;color:#8692a6;width:44%;">' + esc(facts[f][0]) + '</td>'
         +   '<td style="padding:5px 0;color:#1c2035;font-weight:bold;">' + esc(facts[f][1]) + '</td>'
         + '</tr>';
    }
    h += '</table></div>';
  }

  /* question by question */
  var det = d.details;
  if (det && det.length) {
    h += '<div style="padding:22px 26px;">'
       + '<div style="font-size:15px;font-weight:bold;color:' + BRAND_NAVY + ';margin-bottom:14px;">'
       + 'Question by question</div>';

    for (var i = 0; i < det.length; i++) {
      var q = det[i];
      var ok = !!q.ok;
      var bar = ok ? BRAND_GREEN : '#e57373';
      h += '<div style="border-left:4px solid ' + bar + ';background:'
         +   (ok ? '#f3fbf6' : '#fdf5f5') + ';padding:12px 14px;margin-bottom:10px;border-radius:0 8px 8px 0;">'
         +   '<div style="font-size:14px;color:#1c2035;font-weight:bold;">'
         +      (ok ? '&#10004; ' : '&#10008; ') + 'Q' + (q.n || (i + 1)) + '. ' + esc(q.q) + '</div>';

      if (!ok) {
        h += '<div style="font-size:13px;color:#8a3a3a;margin-top:6px;">Your child answered: <b>'
           +    esc(q.chosen || '(no answer)') + '</b></div>'
           + '<div style="font-size:13px;color:#1a6b3c;margin-top:3px;">Correct answer: <b>'
           +    esc(q.correct) + '</b></div>';
      }
      if (q.e) {
        h += '<div style="font-size:13px;color:#4b5673;margin-top:7px;line-height:1.5;">'
           +    esc(q.e) + '</div>';
      }
      h += '</div>';
    }
    h += '</div>';

  } else if (d.breakdown) {
    h += '<div style="padding:22px 26px;">'
       +   '<div style="font-size:15px;font-weight:bold;color:' + BRAND_NAVY + ';margin-bottom:8px;">Breakdown</div>'
       +   '<div style="font-size:14px;color:#4b5673;">' + esc(d.breakdown) + '</div>'
       + '</div>';
  }

  /* footer */
  h += '<div style="background:#f8faff;padding:20px 26px;border-top:1px solid #eef1fb;text-align:center;">'
     +   '<div style="font-size:13px;color:#4b5673;line-height:1.6;">'
     +     'Keep practising at <a href="https://scgmasterminds.co.uk" style="color:' + BRAND_NAVY + ';">scgmasterminds.co.uk</a>'
     +   '</div>'
     +   '<div style="font-size:12px;color:#8692a6;margin-top:10px;">'
     +     'You are receiving this because you asked us to email this score. '
     +     'Questions? Reply to this email or write to ' + REPLY_TO + '.'
     +   '</div>'
     + '</div>';

  h += '</div></div>';
  return h;
}

function buildPlain(d, childName, score, total, pct) {
  var t = [];
  t.push('SCG MASTERMINDS — score report');
  t.push('');
  t.push(childName + ' completed: ' + (d.quiz || ''));
  t.push('Score: ' + score + ' / ' + total + '  (' + pct + '%)');
  if (d.section)            t.push('Section: ' + d.section);
  if (d.sectionBreakdown)   t.push('By section: ' + d.sectionBreakdown);
  if (d.timed)              t.push('Timed mock: ' + d.timed);
  if (d.timeTaken)          t.push('Time taken: ' + d.timeTaken);
  if (d.questionsAttempted) t.push('Questions attempted: ' + d.questionsAttempted);
  if (d.note)               t.push('Note: ' + d.note);
  t.push('');

  var det = d.details;
  if (det && det.length) {
    t.push('QUESTION BY QUESTION');
    for (var i = 0; i < det.length; i++) {
      var q = det[i];
      t.push('');
      t.push((q.ok ? '[correct] ' : '[wrong]   ') + 'Q' + (q.n || (i + 1)) + '. ' + q.q);
      if (!q.ok) {
        t.push('   answered: ' + (q.chosen || '(no answer)'));
        t.push('   correct:  ' + q.correct);
      }
      if (q.e) t.push('   why: ' + q.e);
    }
  } else if (d.breakdown) {
    t.push(d.breakdown);
  }

  t.push('');
  t.push('Keep practising at https://scgmasterminds.co.uk');
  t.push('Questions? Reply to this email or write to ' + REPLY_TO + '.');
  return t.join('\n');
}

/* ─────────── HELPERS ─────────── */
function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function logError(where, err, data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(ERROR_SHEET) || ss.insertSheet(ERROR_SHEET);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['When', 'Where', 'Error', 'Payload']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(), where, String(err && err.stack ? err.stack : err),
      data ? JSON.stringify(data).slice(0, 4000) : ''
    ]);
  } catch (ignore) {}
}

/* ─────────── TEST ───────────
   Run this once from the Apps Script editor to authorise the script and check
   a realistic report actually lands in your inbox. */
function testEmail() {
  var sample = {
    date: new Date().toLocaleString('en-GB'),
    childName: 'Test Child',
    parentName: 'Test Parent',
    parentEmail: TEST_TO,
    section: '11+ FSCE',
    quiz: 'FSCE Mock Paper (timed)',
    score: 2,
    total: 3,
    percentage: 67,
    breakdown: 'Q1:OK | Q2:X | Q3:OK',
    sectionBreakdown: 'Comprehension 1/1 · Maths Reasoning 1/2',
    timed: 'Yes (20 min limit)',
    questionsAttempted: '3 of 20',
    timeTaken: '4m 12s',
    note: 'Time expired before the paper was finished',
    details: [
      { n: 1, q: 'Which shows that the dog belongs to Sam?', chosen: "Sam's dog",
        correct: "Sam's dog", ok: true,
        e: 'Add an apostrophe then s to a singular name to show possession.' },
      { n: 2, q: 'Neither of the boys ___ ready.', chosen: 'are', correct: 'is', ok: false,
        e: '"Neither" is singular, so it takes "is".' },
      { n: 3, q: 'What is 3/4 of 20?', chosen: '15', correct: '15', ok: true,
        e: '20 divided by 4 is 5, and 5 times 3 is 15.' }
    ]
  };
  saveRow(sample);
  upsertMember(sample);
  sendReport(sample);
  Logger.log('Sent a test report to ' + TEST_TO + ', added a row to ' + SHEET_NAME +
             ', and registered the contact on ' + MEMBERS_SHEET + '.');
  Logger.log('Tier lookup for ' + TEST_TO + ': ' + JSON.stringify(lookupMember(TEST_TO)));
}
