# Results sheet + parent email reports

By default, SCG Masterminds saves each quiz result in the visitor's own browser.
Follow these steps once and every result will also:

1. drop a new row into a single Google Sheet that **you** own, and
2. **email the parent a full question-by-question report** — score, percentage,
   the section breakdown, timed-mock details, and for every question what their
   child chose, the right answer, and why.

This is free and takes about 5 minutes.

> **If reports stop arriving, check this first.** The email is sent by the Apps
> Script, not by the website. If you ever replace `Code.gs` with an older copy
> that has no `MailApp.sendEmail(...)` call, rows will keep appearing in the
> Sheet but no parent will receive anything.

---

## Step 1 — Create the Google Sheet

1. Go to <https://sheets.google.com> and create a **Blank spreadsheet**.
2. Name it something like **SCG Masterminds Results**.
   (You don't need to add any headings — the script does that for you.)

## Step 2 — Add the script

1. In that sheet, click **Extensions ▸ Apps Script**.
2. Delete any code already in the editor.
3. Open the file `docs/Code.gs` from this project, copy **all** of it, and paste
   it into the Apps Script editor.
4. Click the **Save** icon (💾).

## Step 3 — Deploy it as a Web App

1. Click **Deploy ▸ New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** `SCG Masterminds collector` (anything is fine)
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**   ← important, so the website can post to it
4. Click **Deploy**.
5. Google will ask you to **Authorize access** the first time. Click through,
   choose your account, click **Advanced ▸ Go to (your project)**, then **Allow**.
   (This is Google warning you about your *own* script — it's safe.)
6. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfy....../exec`

## Step 4 — Paste the URL into the website

1. Open the website file `public/scg-masterminds-v3.1.html`.
2. Near the top of the `<script>` block, find this line:

   ```js
   var ENDPOINT = "";  /* Google Apps Script Web App URL ... */
   ```

3. Paste your Web app URL between the quotes:

   ```js
   var ENDPOINT = "https://script.google.com/macros/s/AKfy....../exec";
   ```

4. Save and re-upload / re-publish the page.

## Step 5 — Test it

**Quickest check (no website needed):** in the Apps Script editor choose
`testEmail` from the function dropdown and press **Run**. It writes a sample row
and sends a realistic report to the address in `TEST_TO` at the top of the file.
Change that constant to your own address first.

Then test the real thing:

1. Open the SCG Masterminds page and complete any quiz, entering a test
   parent email.
2. Within a few seconds you should get **both**:
   - a new row in your Google Sheet, and
   - the report email in that inbox (**check spam the first time**).

If the row appears but the email does not, open the **Errors** tab the script
creates in the same Sheet — the reason is logged there.

That's it. Your Google Sheet is now your live results spreadsheet — you can
sort it, filter it, download it as Excel (**File ▸ Download ▸ Microsoft Excel**),
or connect it to your OpenClaw automation later.

---

### Settings you can change

At the top of `Code.gs`:

| Setting | What it does |
|---|---|
| `REPLY_TO` | Address parents reply to. Default `info@scgtuitions.co.uk`. |
| `COPY_TO`  | Set an address to BCC yourself on every report. Empty by default. |
| `TEST_TO`  | Only used by the `testEmail()` function. |
| `FROM_NAME`| Sender name parents see. Default `SCG Masterminds`. |

### Sending limits

A free `@gmail.com` account can send roughly **100 emails a day**; Google
Workspace roughly **1,500**. If the quota is exceeded the result is still saved
to the Sheet and the failure is recorded on the **Errors** tab, so nothing is
lost — the parent simply does not get that email.

### Notes & FAQ

- **The browser download still works too.** Even with the sheet connected, the
  `#scg-admin` / `Ctrl+Shift+E` "Download Excel (.csv)" button still works for a
  quick local export.
- **Nothing breaks if the sheet is offline.** If Google is unreachable, the
  result is still saved in the visitor's browser; the page never errors out for
  the child.
- **Changing the script later?** If you edit `Code.gs`, you must
  **Deploy ▸ Manage deployments ▸ Edit ▸ Version: New version** for the change
  to go live (or the URL keeps running the old code).
- **Privacy:** you're collecting parents' names and email addresses. Make sure
  your website's privacy policy mentions that results and contact details are
  stored, and keep the consent tick-box that's already on the form.
