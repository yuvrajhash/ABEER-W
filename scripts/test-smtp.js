const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

// ⚠️ IMPORTANT: This script is disabled by default to prevent account suspensions
// To run it, change DISABLE_TESTING to false, but only when absolutely necessary
const DISABLE_TESTING = true;

async function testSmtp() {
  if (DISABLE_TESTING) {
    console.log('⚠️ Testing is disabled. To enable testing, set DISABLE_TESTING to false in this script.');
    console.log('⚠️ Only do this when absolutely necessary to avoid account suspensions.');
    return;
  }

  console.log('Testing SMTP connection...');
  
  try {
    // GoDaddy Premium Email SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtpout.secureserver.net', // GoDaddy SMTP server
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true' ? true : false, // True for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'pratik@aipl.org.in',
        pass: process.env.SMTP_PASSWORD || '',
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      },
      debug: true // Enable debug output
    });

    // Verify SMTP connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Format email content
    const mailOptions = {
      from: '"SMTP Test" <pratik@aipl.org.in>',
      to: 'pratik@aipl.org.in', // Send to the same address
      subject: `SMTP Test Email ${new Date().toISOString()}`,
      html: `
        <h3>SMTP Test Email</h3>
        <p>This is a test email sent at ${new Date().toLocaleString()}</p>
      `,
      text: `
SMTP Test Email
--------------
This is a test email sent at ${new Date().toLocaleString()}
      `
    };

    // Send the email
    console.log('Sending test email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log(`Message ID: ${info.messageId}`);
    
    if (info.accepted && info.accepted.length > 0) {
      console.log(`Accepted recipients: ${info.accepted.join(', ')}`);
    }
    if (info.rejected && info.rejected.length > 0) {
      console.log(`Rejected recipients: ${info.rejected.join(', ')}`);
    }
    
  } catch (error) {
    console.error('❌ Error in SMTP test:', error);
  }
}

// Run the test only if explicitly enabled
if (!DISABLE_TESTING) {
  testSmtp();
} else {
  console.log(`
⚠️  SMTP TESTING IS DISABLED  ⚠️
---------------------------------
To prevent account suspensions, this script is disabled by default.

If you must run a test:
1. Open this file (scripts/test-smtp.js)
2. Change DISABLE_TESTING to false
3. Run the test
4. IMPORTANT: Change DISABLE_TESTING back to true after testing

Remember: Frequent testing may trigger account security measures.
  `);
} 