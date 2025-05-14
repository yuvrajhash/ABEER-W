# Email Setup for Contact Form

This document explains the current setup of the contact form email functionality.

## Current Implementation

The contact form is configured to send emails to:

`pratik@aipl.org.in` - Primary contact

The system uses GoDaddy Premium Email SMTP servers to send emails from and to pratik@aipl.org.in. The email credentials are stored in environment variables for security.

## How It Works

When a user submits the contact form:

1. The form data is validated
2. The system retrieves email settings from environment variables
3. The system attempts to send an email using GoDaddy's SMTP configuration:
   - Host: smtpout.secureserver.net (GoDaddy's SMTP server)
   - Port: 587
   - Sender & Recipient: pratik@aipl.org.in
4. If the primary configuration fails, the system tries several alternate configurations:
   - GoDaddy with secure port (465)
   - GoDaddy's alternate SMTP server
   - AWS SES as a fallback option
5. The user receives a success message when the email is sent
6. All form submissions are also logged to the server console as a backup

## SMTP Configuration

The contact form uses the following SMTP settings from environment variables:

### Primary Configuration
- **Host**: smtpout.secureserver.net (GoDaddy's SMTP server)
- **Port**: 587
- **Secure**: false (uses STARTTLS)
- **Username**: pratik@aipl.org.in
- **Password**: Stored in environment variables, not in code
- **TLS Options**: { rejectUnauthorized: false } (to accept self-signed certificates)

### Alternative Configurations (tried if primary fails)
1. **Host**: smtpout.secureserver.net, **Port**: 465, **Secure**: true
2. **Host**: relay-hosting.secureserver.net, **Port**: 25, **Secure**: false
3. **Host**: email-smtp.us-west-2.amazonaws.com, **Port**: 587, **Secure**: false

## Email Format

Each contact form submission sends an email with:

- **From**: "Contact Form" <pratik@aipl.org.in>
- **To**: pratik@aipl.org.in
- **Reply-To**: [Submitter's email address]
- **Subject**: Contact Form: [Subject from form]
- **Body**: Contains the name, email, subject, and message from the form

## GoDaddy Premium Email Settings

To ensure your GoDaddy Premium Email account works correctly with SMTP:

1. **Verify Correct Credentials**:
   - Ensure you're using the correct email password for pratik@aipl.org.in
   - Check that the account is active and not locked

2. **GoDaddy SMTP Settings**:
   - GoDaddy provides two main SMTP servers:
     - smtpout.secureserver.net (primary)
     - relay-hosting.secureserver.net (alternate)
   - SMTP authentication is required

3. **Potential Issues**:
   - Some GoDaddy email plans have sending limits
   - The account may need to be verified if it's new
   - Check GoDaddy's email settings to ensure SMTP is enabled

## Setting Up Environment Variables

To protect your email credentials, you should set up environment variables:

1. Create a `.env.local` file in the root directory with the following content:
```
# SMTP settings
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=pratik@aipl.org.in
SMTP_PASSWORD=your_actual_password_here
RECIPIENT_EMAIL=pratik@aipl.org.in
```

2. Make sure `.env.local` is in your `.gitignore` file so it doesn't get committed to version control

3. For production deployment:
   - Add these environment variables to your hosting platform (Vercel, Netlify, etc.)
   - Never commit your actual password to the code repository

## Troubleshooting

If the contact form is not sending emails:

1. Check the server logs for SMTP connection errors
2. Verify that the GoDaddy account settings allow SMTP access:
   - Log into your GoDaddy account and check email settings
   - Ensure the password is correct and hasn't been reset
   - Check if there are any security blocks on the account
3. Verify that your environment variables are correctly set
4. Try sending a test email through a different client with the same credentials
5. Check your spam folder for delivered messages
6. Contact GoDaddy support if issues persist

All form submissions are logged to the server console, so even if email sending fails, you can still see the form data in the logs. 