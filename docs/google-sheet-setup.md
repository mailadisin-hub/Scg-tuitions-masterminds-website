# Collect all results in one Google Sheet

By default, SCG Masterminds saves each quiz result in the visitor's own browser.
Follow these steps once to also send every result into a single Google Sheet
that **you** own. From then on, every quiz anyone completes (on any phone,
tablet or computer) drops a new row into your sheet automatically.

This is free and takes about 5 minutes.

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

1. Open the website file `public/scg-masterminds.html`.
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

1. Open the SCG Masterminds page and complete any quiz, entering a test
   parent email.
2. Switch to your Google Sheet — a new row should appear within a few seconds
   with the child's name, parent's email, the quiz, and the score.

That's it. Your Google Sheet is now your live results spreadsheet — you can
sort it, filter it, download it as Excel (**File ▸ Download ▸ Microsoft Excel**),
or connect it to your OpenClaw automation later.

---

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
