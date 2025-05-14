// This is only a simulation - server actions can't be directly called from scripts
// But we can use the same SMTP logic to test

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

// ⚠️ IMPORTANT: This script is disabled by default to prevent account suspensions
// To run it, change DISABLE_TESTING to false, but only when absolutely necessary
const DISABLE_TESTING = true;

const formData = {
  name: "Test User",
  email: "test@example.com",
  subject: "Action Test Email",
  message: "This is a test message to verify email delivery.",
};

// Similar to the server action's sendViaSmtp function
async function sendViaSmtp(formData) {
  if (DISABLE_TESTING) {
    console.log('⚠️ Testing is disabled. To enable testing, set DISABLE_TESTING to false in this script.');
    console.log('⚠️ Only do this when absolutely necessary to avoid account suspensions.');
    return;
  }

  try {
    // Create a more detailed console message for debugging
    console.log('\n======================================');
    console.log('📨 TESTING CONTACT FORM SUBMISSION');
    console.log('======================================');
    console.log(`📝 Date: ${new Date().toLocaleString()}`);
    console.log(`👤 Name: ${formData.name}`);
    console.log(`📧 Email: ${formData.email}`);
    console.log(`📋 Subject: ${formData.subject}`);
    console.log('📄 Message:');
    console.log('----------------------------------------');
    console.log(formData.message);
    console.log('----------------------------------------');
    console.log(`📬 Will be sent to: ${process.env.RECIPIENT_EMAIL || 'pratik@aipl.org.in'}`);
    console.log('======================================\n');

    // GoDaddy Premium Email SMTP configuration
    console.log('Creating SMTP transporter...');
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
      debug: true,
      logger: true
    });

    // Verify SMTP connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Format email content
    const mailOptions = {
      from: '"Contact Form Test" <pratik@aipl.org.in>',
      to: 'pratik@aipl.org.in', // Send to the same address
      replyTo: formData.email,
      subject: `Contact Form Test: ${formData.subject}`,
      html: `
        <h3>Contact Form Test Submission</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <p><em>Sent from test script at ${new Date().toLocaleString()}</em></p>
        <p><strong>Note:</strong> This is a test email to diagnose delivery issues</p>
      `,
      text: `
Contact Form Test Submission
---------------------------
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message:
${formData.message}

Sent from test script at ${new Date().toLocaleString()}
Note: This is a test email to diagnose delivery issues
      `
    };

    // Send the email
    console.log('Sending test email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log(`Message ID: ${info.messageId}`);
    
    if (info.accepted && info.accepted.length > 0) {
      console.log(`Accepted recipients: ${info.accepted.join(', ')}`);
    }
    if (info.rejected && info.rejected.length > 0) {
      console.log(`Rejected recipients: ${info.rejected.join(', ')}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email via SMTP:', error);
    if (error.code === 'EAUTH') {
      console.error('Authentication error - check username and password');
    } else if (error.code === 'ESOCKET') {
      console.error('Socket error - check server name, port, and network connectivity');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('Connection timed out - check network and firewall settings');
    }
    
    return { success: false, error };
  }
}

// Try alternate SMTP configurations
async function tryAlternateConfigurations() {
  const configs = [
    // Original configuration
    {
      host: 'smtpout.secureserver.net',
      port: 587,
      secure: false,
      name: 'Primary GoDaddy SMTP'
    },
    // Alternate configurations
    {
      host: 'smtpout.secureserver.net',
      port: 465,
      secure: true,
      name: 'GoDaddy SMTP (SSL)'
    },
    {
      host: 'relay-hosting.secureserver.net',
      port: 25,
      secure: false,
      name: 'GoDaddy Relay SMTP'
    }
  ];

  for (const config of configs) {
    console.log(`\n\nTrying ${config.name} (${config.host}:${config.port})...`);
    try {
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: 'pratik@aipl.org.in',
          pass: process.env.SMTP_PASSWORD || '',
        },
        tls: {
          rejectUnauthorized: false
        },
        debug: true
      });

      console.log(`Verifying connection to ${config.host}:${config.port}...`);
      await transporter.verify();
      console.log(`✅ Connection to ${config.host}:${config.port} verified!`);

      const mailOptions = {
        from: `"Test ${config.name}" <pratik@aipl.org.in>`,
        to: 'pratik@aipl.org.in',
        subject: `Test email via ${config.name}`,
        text: `This is a test email sent via ${config.name} (${config.host}:${config.port}) at ${new Date().toLocaleString()}`
      };

      console.log(`Sending test email via ${config.name}...`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully via ${config.name}!`);
      console.log(`Message ID: ${info.messageId}`);
      
      if (info.accepted && info.accepted.length > 0) {
        console.log(`Accepted recipients: ${info.accepted.join(', ')}`);
      }
      
      if (info.rejected && info.rejected.length > 0) {
        console.log(`Rejected recipients: ${info.rejected.join(', ')}`);
      }
    } catch (error) {
      console.error(`❌ Failed with ${config.name}:`, error);
    }
  }
}

// Test the primary SMTP setup first
async function runTests() {
  console.log('Testing primary SMTP configuration...');
  const result = await sendViaSmtp(formData);
  
  if (!result.success) {
    console.log('\nPrimary configuration failed, trying alternatives...');
    await tryAlternateConfigurations();
  }
}

// Run the test only if explicitly enabled
if (!DISABLE_TESTING) {
  runTests();
} else {
  console.log(`
⚠️  ACTION TESTING IS DISABLED  ⚠️
-----------------------------------
To prevent account suspensions, this script is disabled by default.

If you must run a test:
1. Open this file (scripts/test-action.js)
2. Change DISABLE_TESTING to false
3. Run the test
4. IMPORTANT: Change DISABLE_TESTING back to true after testing

WARNING: This script sends multiple test emails which increases 
the risk of triggering security measures on your account.

For normal usage, please use the contact form in the browser
instead of running test scripts.
  `);
} 