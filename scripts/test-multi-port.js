const nodemailer = require('nodemailer');

// ⚠️ IMPORTANT: This script is disabled by default to prevent account suspensions
// To run it, change DISABLE_TESTING to false, but only when absolutely necessary
const DISABLE_TESTING = true;

// Define multiple port configurations to try
const smtpConfigs = [
  // Common port configurations
  {
    port: 587,
    secure: false,
    name: 'Primary (TLS)'
  },
  {
    port: 465,
    secure: true,
    name: 'SSL'
  },
  {
    port: 25,
    secure: false,
    name: 'Standard'
  },
  {
    port: 3535,
    secure: false,
    name: 'Alternative'
  }
];

async function testSmtpPorts() {
  console.log('Testing multiple SMTP configurations...');
  
  const results = [];
  
  for (const config of smtpConfigs) {
    try {
      console.log(`\n---------------------------------------`);
      console.log(`Testing Port ${config.port} (${config.name})`);
      console.log(`---------------------------------------`);
      
      // GoDaddy Premium Email SMTP configuration
      const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net', // GoDaddy SMTP server
        port: config.port,
        secure: config.secure,
        auth: {
          user: 'pratik@aipl.org.in',
          pass: 'February#1108',
        },
        tls: {
          rejectUnauthorized: false // Accept self-signed certificates
        }
      });

      // Verify SMTP connection
      console.log(`Verifying SMTP connection on port ${config.port}...`);
      const connectionVerified = await transporter.verify()
        .then(() => {
          console.log(`✅ SMTP connection verified successfully on port ${config.port}!`);
          return true;
        })
        .catch(error => {
          console.error(`❌ Connection verification failed on port ${config.port}:`, error.message);
          return false;
        });

      if (!connectionVerified) {
        results.push({
          port: config.port,
          name: config.name,
          connectionVerified,
          emailSent: false,
          error: 'Connection verification failed'
        });
        continue;
      }

      // Format email content
      const mailOptions = {
        from: '"SMTP Port Test" <pratik@aipl.org.in>',
        to: 'pratik@aipl.org.in', // Send to the same address
        subject: `Test Email via Port ${config.port} (${config.name})`,
        html: `
          <h3>SMTP Port Test</h3>
          <p>This is a test email sent via port ${config.port} (${config.name}) at ${new Date().toLocaleString()}</p>
          <p>If you receive this email, it means the port is working correctly.</p>
        `,
        text: `
SMTP Port Test
-------------
This is a test email sent via port ${config.port} (${config.name}) at ${new Date().toLocaleString()}
If you receive this email, it means the port is working correctly.
        `
      };

      // Send the email
      console.log(`Sending test email via port ${config.port}...`);
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully via port ${config.port}!`);
        console.log(`Message ID: ${info.messageId}`);
        
        if (info.accepted && info.accepted.length > 0) {
          console.log(`Accepted recipients: ${info.accepted.join(', ')}`);
        }
        if (info.rejected && info.rejected.length > 0) {
          console.log(`Rejected recipients: ${info.rejected.join(', ')}`);
        }
        
        results.push({
          port: config.port,
          name: config.name,
          connectionVerified,
          emailSent: true,
          messageId: info.messageId
        });
      } catch (error) {
        console.error(`❌ Failed to send email via port ${config.port}:`, error.message);
        results.push({
          port: config.port,
          name: config.name,
          connectionVerified,
          emailSent: false,
          error: error.message
        });
      }
    } catch (error) {
      console.error(`❌ Error with port ${config.port}:`, error.message);
      results.push({
        port: config.port,
        name: config.name,
        connectionVerified: false,
        emailSent: false,
        error: error.message
      });
    }
  }
  
  // Print summary of results
  console.log('\n\n===========================================');
  console.log('SMTP PORT TEST RESULTS SUMMARY');
  console.log('===========================================');
  
  let workingPorts = 0;
  
  results.forEach(result => {
    const status = result.emailSent ? '✅ WORKING' : '❌ FAILED';
    console.log(`Port ${result.port} (${result.name}): ${status}`);
    
    if (result.emailSent) {
      workingPorts++;
    } else {
      console.log(`  - Error: ${result.error}`);
    }
  });
  
  console.log('-------------------------------------------');
  console.log(`Working ports: ${workingPorts} / ${results.length}`);
  
  if (workingPorts > 0) {
    console.log('\n✅ At least one port is working. Email delivery should be possible.');
    
    // Recommend the best port
    const workingConfigs = results.filter(r => r.emailSent);
    if (workingConfigs.length > 0) {
      console.log('\nRecommended port configuration:');
      const recommended = workingConfigs[0];
      console.log(`Port: ${recommended.port}`);
      console.log(`Type: ${recommended.name}`);
      console.log(`Secure: ${smtpConfigs.find(c => c.port === recommended.port).secure}`);
    }
  } else {
    console.log('\n❌ No working ports found. Email delivery may not be possible.');
    console.log('Please check your email provider settings and credentials.');
  }
}

// Run the test only if explicitly enabled
if (!DISABLE_TESTING) {
  testSmtpPorts();
} else {
  console.log(`
⚠️  MULTI-PORT SMTP TESTING IS DISABLED  ⚠️
-------------------------------------------
To prevent account suspensions, this script is disabled by default.

If you must run a test:
1. Open this file (scripts/test-multi-port.js)
2. Change DISABLE_TESTING to false
3. Run the test
4. IMPORTANT: Change DISABLE_TESTING back to true after testing

WARNING: This script sends multiple test emails which increases 
the risk of triggering security measures on your account.
  `);
} 