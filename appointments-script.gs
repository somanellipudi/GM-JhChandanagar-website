// ============================================================
// Jawed Habib Chandanagar — Appointment Logger
// Google Apps Script for recording bookings to Google Sheets
//
// SETUP STEPS:
// 1. Open the Google Sheet where you want to log appointments
// 2. Click Extensions → Apps Script
// 3. Delete all default code and paste this entire file
// 4. Click Save (Ctrl+S), name the project "JH Appointments"
// 5. Click Deploy → New deployment
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Click Deploy → Copy the Web App URL
// 7. Paste that URL into index.html, replacing YOUR_APPS_SCRIPT_URL
//    (look for: const SHEETS_URL='YOUR_APPS_SCRIPT_URL';)
// ============================================================

const SHEET_NAME = 'Appointments';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp (IST)', 'Name', 'Phone', 'Service', 'Date', 'Time', 'Notes']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#0A0A0A').setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name   || '',
      data.phone  || '',
      data.service|| '',
      data.date   || 'Flexible',
      data.time   || '-',
      data.notes  || '-'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test endpoint — open the web app URL in a browser to verify it's running
function doGet(e) {
  return ContentService
    .createTextOutput('JH Chandanagar appointment logger is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}
