# Contact Form Setup Instructions

## Overview

The contact form on this website uses SMTP to send email notifications when visitors submit the form. For security, the email credentials are stored in environment variables rather than in the code.

## Setting Up Environment Variables

### Option 1: Using the Setup Script (Recommended)

Run the setup script to create your `.env.local` file:

```bash
node setup-env.js
```

This interactive script will prompt you for the necessary information and create a `.env.local` file with your email settings.

### Option 2: Manual Setup

1. Create a file named `.env.local` in the root directory of the project
2. Add the following content to the file:

```
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=pratik@aipl.org.in
SMTP_PASSWORD=your_actual_password_here
RECIPIENT_EMAIL=pratik@aipl.org.in
```

3. Replace `your_actual_password_here` with your actual email password

## Important Security Notes

- The `.env.local` file is automatically excluded from Git by the `.gitignore` file
- Never commit your email password to the repository
- For production deployment, set these environment variables on your hosting platform (Vercel, Netlify, etc.)

## GoDaddy Email Configuration

If using GoDaddy Premium Email, ensure:

1. Your email account is active and verified
2. Your password is correct
3. SMTP is enabled for your account
4. You're aware of any sending limits on your plan

## Troubleshooting

If emails aren't being sent:

1. Check server logs for SMTP connection errors
2. Verify your environment variables are correctly set
3. Test your email/password combination with another email client
4. Try different SMTP server configurations (the code will attempt several)
5. Check your spam/junk folder for delivered messages

For detailed logs, check your server console output when a form is submitted. 