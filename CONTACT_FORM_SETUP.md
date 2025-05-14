# Contact Form Setup Guide

This document explains how the contact form has been set up to receive emails at pratik@aipl.org.in.

## Current Implementation

The contact form is now fully configured to send emails to pratik@aipl.org.in using GoDaddy Premium Email:

1. When a form is submitted, the data is sent to a server action (`app/actions/contact.ts`)
2. The server action validates the data
3. The system reads email configuration from environment variables
4. The system attempts to send an email using GoDaddy's SMTP server with the following configuration:
   - Host: smtpout.secureserver.net
   - Port: 587
   - Username: pratik@aipl.org.in
   - Password: Retrieved from environment variables
5. If the primary configuration fails, the system tries several alternate SMTP configurations
6. A success message is shown to the user
7. All form submissions are also logged to the server console

## How It Works

The contact form uses nodemailer to send emails via GoDaddy's SMTP servers. When a user submits the form:

1. The form data (name, email, subject, message) is collected
2. The server retrieves email settings from environment variables
3. The server creates a formatted email with the form data
4. The email is sent to pratik@aipl.org.in using GoDaddy's SMTP servers
5. The submitter's email is set as the "Reply-To" address so you can easily reply
6. If the email is sent successfully, a success message is shown
7. If any errors occur, the system tries alternate SMTP configurations

## SMTP Configuration

The contact form attempts to use the following SMTP configurations (in order):

1. **Primary**: smtpout.secureserver.net:587 (standard configuration)
2. **Alternate 1**: smtpout.secureserver.net:465 (secure port)
3. **Alternate 2**: relay-hosting.secureserver.net:25 (GoDaddy alternate server)
4. **Alternate 3**: email-smtp.us-west-2.amazonaws.com:587 (AWS SES)

The system will try each configuration until one succeeds. All logging is done to the server console so you can see exactly which configuration worked.

## GoDaddy Email Configuration

To ensure emails can be sent successfully through GoDaddy Premium Email:

1. **Verify Your Password Works**
   - Test logging into webmail using pratik@aipl.org.in and your password
   - Make sure the account is active and not locked or suspended
   
2. **Check GoDaddy Email Settings**
   - Login to your GoDaddy account
   - Go to Email & Office section
   - Check that SMTP is enabled for your account
   - Verify any sending limitations that might exist
   
3. **SMTP Requirements**
   - GoDaddy requires authentication for sending email
   - The email account must be verified and active
   - Some plans have daily sending limits

## Setting Up Environment Variables

For security, the email password is not stored in the code. You need to set up environment variables:

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

2. In production, set these environment variables on your hosting platform (Vercel, Netlify, etc.)

3. Make sure `.env.local` is in your `.gitignore` file to prevent committing passwords to your repository

4. The code is already set up to read from these environment variables

## Troubleshooting

If you're not receiving emails:

1. Check that the GoDaddy credentials are correct
2. Verify that your GoDaddy account settings allow SMTP access
3. Ensure your environment variables are properly set up
4. Check your spam/junk folder
5. Review the server logs for any SMTP connection errors or rejected emails
6. Try sending a test email using a different email client with the same credentials

All form submissions are logged to the server console, so even if email sending fails, you can still see the form data in the logs. 