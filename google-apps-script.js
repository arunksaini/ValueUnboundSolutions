/**
 * Google Apps Script for Contact Form Submission
 *
 * SETUP INSTRUCTIONS:
 * ===================
 *
 * 1. Go to https://script.google.com/
 * 2. Click "New Project"
 * 3. Paste this entire file contents into the Code.gs file
 * 4. Update the configuration variables below with your details
 * 5. Click "Deploy" > "New deployment"
 * 6. Choose type: "Web app"
 * 7. Settings:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy" and authorize the app
 * 9. Copy the Web App URL (looks like: https://script.google.com/macros/s/.../exec)
 * 10. Paste the URL into js/main.js where it says: const FORM_SUBMIT_URL = 'YOUR_SCRIPT_URL_HERE';
 *
 * OPTIONAL: To save submissions to a Google Sheet:
 * - Create a new Google Sheet
 * - Copy the Sheet ID from the URL (https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/...)
 * - Paste it in the SHEET_ID variable below
 * - Make sure the sheet has a tab named "Form Submissions" (or change SHEET_NAME below)
 */

// ============================================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================================

// Your email address to receive form submissions
const NOTIFICATION_EMAIL = 'info@valueunbound.com';

// Optional: Google Sheet ID to log submissions (leave empty to disable)
const SHEET_ID = ''; // Example: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'

// Sheet tab name (create this tab in your sheet)
const SHEET_NAME = 'Form Submissions';

// Email subject line
const EMAIL_SUBJECT = 'New Contact Form Submission - Value Unbound Solutions';

// Allowed origins for CORS (add your domain)
const ALLOWED_ORIGINS = [
  'https://www.valueunbound.com',
  'https://valueunbound.com',
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'http://localhost:5500'
];

// ============================================================
// MAIN FUNCTION - Handles POST requests
// ============================================================

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    const validation = validateSubmission(data);
    if (!validation.valid) {
      return createResponse(400, {
        success: false,
        error: validation.error
      });
    }

    // Check for honeypot spam trap
    if (data._honeypot && data._honeypot !== '') {
      // Silently reject spam
      return createResponse(200, {
        success: true,
        message: 'Form submitted successfully'
      });
    }

    // Save to Google Sheet (if configured)
    if (SHEET_ID) {
      saveToSheet(data);
    }

    // Send email notification
    sendEmailNotification(data);

    // Return success response
    return createResponse(200, {
      success: true,
      message: 'Thank you! We will get back to you shortly.'
    });

  } catch (error) {
    console.error('Form submission error:', error);
    return createResponse(500, {
      success: false,
      error: 'An error occurred while processing your submission. Please try again.'
    });
  }
}

// ============================================================
// VALIDATION
// ============================================================

function validateSubmission(data) {
  // Check required fields
  if (!data.name || data.name.trim() === '') {
    return { valid: false, error: 'Name is required' };
  }

  if (!data.email || data.email.trim() === '') {
    return { valid: false, error: 'Email is required' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  // Check for suspiciously long inputs (potential spam)
  if (data.name.length > 100 || data.email.length > 100) {
    return { valid: false, error: 'Input too long' };
  }

  if (data.company && data.company.length > 200) {
    return { valid: false, error: 'Company name too long' };
  }

  if (data.message && data.message.length > 5000) {
    return { valid: false, error: 'Message too long' };
  }

  return { valid: true };
}

// ============================================================
// SAVE TO GOOGLE SHEET
// ============================================================

function saveToSheet(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      newSheet.appendRow(['Timestamp', 'Name', 'Email', 'Company', 'Message']);
      newSheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    // Append the data
    const targetSheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    targetSheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.company || '',
      data.message || ''
    ]);

  } catch (error) {
    console.error('Error saving to sheet:', error);
    // Don't fail the entire request if sheet save fails
  }
}

// ============================================================
// SEND EMAIL NOTIFICATION
// ============================================================

function sendEmailNotification(data) {
  const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Contact Form Submission</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; background: #f3f4f6; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f3f4f6; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="mailto:${data.email}" style="color: #2563eb;">${data.email || 'N/A'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f3f4f6; font-weight: bold;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.company || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f3f4f6; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; white-space: pre-wrap;">${data.message || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f3f4f6; font-weight: bold;">Submitted:</td>
              <td style="padding: 10px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-left: 4px solid #2563eb;">
            <p style="margin: 0;"><strong>Quick Reply:</strong></p>
            <p style="margin: 5px 0 0 0;">
              <a href="mailto:${data.email}?subject=Re: Your inquiry to Value Unbound Solutions"
                 style="color: #2563eb; text-decoration: none;">
                Click here to reply directly to ${data.name}
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const plainBody = `
New Contact Form Submission
============================

Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Company: ${data.company || 'N/A'}
Message: ${data.message || 'N/A'}
Submitted: ${new Date().toLocaleString()}

---
Reply to: ${data.email}
  `;

  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: EMAIL_SUBJECT,
      body: plainBody,
      htmlBody: htmlBody,
      replyTo: data.email
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw to fail the request if email fails
  }
}

// ============================================================
// HANDLE CORS & CREATE RESPONSE
// ============================================================

function createResponse(statusCode, body) {
  const response = ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);

  return response;
}

// Handle OPTIONS request for CORS preflight
function doOptions(e) {
  return createResponse(200, { status: 'ok' });
}

// ============================================================
// TEST FUNCTION (Run this to test your setup)
// ============================================================

function testFormSubmission() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    message: 'This is a test submission to verify the form is working correctly.'
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log('Test result:');
  Logger.log(result.getContent());
}
