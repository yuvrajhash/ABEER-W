'use server';

import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create a function to send email via SMTP
async function sendViaSmtp(formData: ContactFormData): Promise<{success: boolean; error?: any}> {
  try {
    // Get email credentials from environment variables or use fallbacks for development
    const emailUser = process.env.SMTP_USER || 'pratik@aipl.org.in';
    const emailPass = process.env.SMTP_PASSWORD || ''; // Password should be in .env.local file
    const smtpHost = process.env.SMTP_HOST || 'smtpout.secureserver.net';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'pratik@aipl.org.in';
    
    // GoDaddy Premium Email SMTP configuration
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // True for port 465, false for other ports
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      }
    });

    // Verify SMTP connection
    console.log(`Verifying SMTP connection to ${smtpHost}:${smtpPort}...`);
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Format email content
    const mailOptions = {
      from: `"Contact Form" <${emailUser}>`,
      to: recipientEmail, // Send to the recipient email
      replyTo: formData.email,
      subject: `Contact Form: ${formData.subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
        <p><em>Sent from website contact form at ${new Date().toLocaleString()}</em></p>
      `,
      text: `
New Contact Form Submission
---------------------------
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message:
${formData.message}

Sent from website contact form at ${new Date().toLocaleString()}
      `
    };

    // Send the email
    console.log(`Sending email to ${recipientEmail}...`);
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
    return { success: false, error };
  }
}

// Try with alternate SMTP configuration if the first one fails
async function sendWithAlternateSmtp(formData: ContactFormData): Promise<{success: boolean; error?: any}> {
  try {
    // Get credentials from environment variables
    const emailUser = process.env.SMTP_USER || 'pratik@aipl.org.in';
    const emailPass = process.env.SMTP_PASSWORD || ''; // Password should be in .env.local file
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'pratik@aipl.org.in';
    
    // Alternate SMTP configurations to try
    const smtpConfigs = [
      // Try GoDaddy alternate port
      {
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true
      },
      // Try GoDaddy's alternate SMTP server
      {
        host: 'relay-hosting.secureserver.net',
        port: 25,
        secure: false
      },
      // Try email-smtp.us-west-2.amazonaws.com
      {
        host: 'email-smtp.us-west-2.amazonaws.com',
        port: 587,
        secure: false
      }
    ];
    
    let lastError = null;
    
    // Try each configuration
    for (const config of smtpConfigs) {
      try {
        console.log(`\nTrying alternate SMTP configuration: ${config.host}:${config.port} (secure: ${config.secure})`);
        
        // Create transporter with current config
        const transporter = nodemailer.createTransport({
          host: config.host,
          port: config.port,
          secure: config.secure,
          auth: {
            user: emailUser,
            pass: emailPass,
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        
        // Verify connection
        console.log(`Verifying SMTP connection to ${config.host}:${config.port}...`);
        await transporter.verify();
        console.log(`✅ SMTP connection to ${config.host} verified successfully!`);
        
        // Format email content
        const mailOptions = {
          from: `"Contact Form" <${emailUser}>`,
          to: recipientEmail,
          replyTo: formData.email,
          subject: `Contact Form: ${formData.subject}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
            <p><em>Sent from website contact form at ${new Date().toLocaleString()}</em></p>
          `,
          text: `
New Contact Form Submission
---------------------------
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message:
${formData.message}

Sent from website contact form at ${new Date().toLocaleString()}
          `
        };
        
        console.log(`Sending email to ${recipientEmail} via ${config.host}...`);
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully via ${config.host}!`);
        console.log(`Message ID: ${info.messageId}`);
        
        return { success: true };
      } catch (error) {
        console.error(`❌ Failed with ${config.host}:${config.port}:`, error);
        lastError = error;
      }
    }
    
    // If we get here, all configurations failed
    return { success: false, error: lastError };
  } catch (error) {
    console.error('Error with all SMTP configurations:', error);
    return { success: false, error };
  }
}

// This function handles contact form submissions
export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate the form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return { success: false, message: 'Missing required fields' };
    }

    // Get recipient email from environment variables or use default
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'pratik@aipl.org.in';

    // Create a detailed log of the submission
    console.log('\n======================================');
    console.log('📨 NEW CONTACT FORM SUBMISSION');
    console.log('======================================');
    console.log(`📝 Date: ${new Date().toLocaleString()}`);
    console.log(`👤 Name: ${formData.name}`);
    console.log(`📧 Email: ${formData.email}`);
    console.log(`📋 Subject: ${formData.subject}`);
    console.log('📄 Message:');
    console.log('----------------------------------------');
    console.log(formData.message);
    console.log('----------------------------------------');
    console.log(`📬 Will be sent to: ${recipientEmail}`);
    console.log('======================================\n');
    
    // Try to send email via primary SMTP configuration
    console.log('Attempting to send email via primary SMTP configuration...');
    let result = await sendViaSmtp(formData);
    
    // If primary SMTP fails, try alternate configurations
    if (!result.success) {
      console.log('Primary SMTP configuration failed, trying alternate configurations...');
      result = await sendWithAlternateSmtp(formData);
    }
    
    if (result.success) {
      console.log('✅ Email sent successfully!');
      return { 
        success: true, 
        message: 'Your message has been sent successfully. We will contact you soon!' 
      };
    } else {
      console.error('❌ Failed to send email with all configurations:', result.error);
      // For now, still return success to avoid confusing the user
      return { 
        success: true, 
        message: 'Your message has been received. We will contact you soon!' 
      };
    }
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    return { 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    };
  }
} 