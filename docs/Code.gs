/**
 * SCG MASTERMINDS — results collector (Google Apps Script)
 * ---------------------------------------------------------
 * Receives quiz results from the SCG Masterminds web page and appends
 * each one as a new row in this Google Sheet. This sheet becomes your
 * live, always-up-to-date spreadsheet of parent emails + scores.
 *
 * SETUP: see docs/google-sheet-setup.md for full step-by-step instructions.
 * In short:
 *   1. Make a new Google Sheet.
 *   2. Extensions ▸ Apps Script, paste this whole file in, Save.
 *   3. Deploy ▸ New deployment ▸ Web app
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4. Copy the Web app URL it gives you.
 *   5. Paste that URL into the ENDPOINT line near the top of the
 *      website script (search for: var ENDPOINT = "").
 */

function doPost(e) {
  try {
    // Stop two submissions writing at the same time
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Results') || ss.insertSheet('Results');

    // Write the header row once, the first time only
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Received', 'Quiz taken at', 'Child Name', 'Parent Name', 'Parent Email',
        'Section', 'Quiz', 'Score', 'Total', 'Percentage', 'Question Breakdown'
      ]);
      sheet.setFrozenRows(1);
    }

    var d = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),                                   // server timestamp
      d.date || '',                                 // device timestamp
      d.childName || '',
      d.parentName || '',
      d.parentEmail || '',
      d.section || '',
      d.quiz || '',
      (d.score != null ? d.score : ''),
      (d.total != null ? d.total : ''),
      (d.percentage != null ? d.percentage + '%' : ''),
      d.breakdown || ''
    ]);

    lock.releaseLock();
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the Web app URL in a browser to check it is live.
function doGet() {
  return ContentService.createTextOutput('SCG Masterminds results collector is running.');
}
