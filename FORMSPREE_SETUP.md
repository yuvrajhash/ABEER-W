# Formspree Contact Form Setup

## Overview

This website now uses [Formspree](https://formspree.io/) to handle contact form submissions. Formspree is a form backend service that allows you to receive form submissions directly to your email without requiring any backend code or SMTP server configuration.

## Setup Instructions

### 1. Create a Formspree Account

1. Go to [Formspree.io](https://formspree.io/) and create an account.
2. Log in to your Formspree dashboard.

### 2. Create a New Form

1. Click on "New Form" in your Formspree dashboard.
2. Give your form a name (like "AIPL Contact Form").
3. Select which email you want to receive the form submissions at (e.g., pratik@aipl.org.in).
4. Click "Create Form".

### 3. Get Your Form ID

After creating the form, Formspree will provide you with a unique form ID. It will look something like this:
```
mjkwjgzr
```

### 4. Update Your Contact Form Code

1. Open `app/contact/page.tsx`.
2. Find the following line in the `handleSubmit` function:
```javascript
const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
```

3. Replace `YOUR_FORMSPREE_ID` with the actual form ID from step 3:
```javascript
const response = await fetch("https://formspree.io/f/mjkwjgzr", {
```

### 5. Test Your Form

1. Deploy your website or test it locally.
2. Fill out the contact form and submit it.
3. Check your email to verify you received the submission.
4. You can also check your Formspree dashboard to see all submissions.

## Features

- **No Server Code Required**: Formspree handles all the backend work.
- **Free Tier Available**: The free tier allows up to 50 submissions per month.
- **Spam Protection**: Built-in spam filtering.
- **File Uploads**: Supporting file attachments (on paid plans).
- **Webhook Integration**: For advanced use cases.

## Customization Options

### Email Notifications

You can customize the format and content of email notifications in your Formspree account settings.

### Form Security

Formspree provides several security features:
- reCAPTCHA integration
- Form validation
- Email confirmation

### Advanced Features (Premium)

- Custom redirect URLs after submission
- Custom success/error messages
- Submission storage and export

## Troubleshooting

If your form isn't working:

1. Verify your form ID is correct.
2. Check that you're making a POST request to the correct Formspree endpoint.
3. Ensure all required fields are properly named.
4. Check the Formspree dashboard for any error messages.
5. Verify you haven't exceeded the submission limits for your plan.

## Why Formspree Instead of SMTP?

- **Simplified Deployment**: No need to configure SMTP servers, secure credentials, or worry about email delivery.
- **Reliable Delivery**: Professional email delivery system with high deliverability rates.
- **No Exposed Credentials**: No risk of exposing SMTP credentials in your codebase.
- **Works with Static Sites**: Perfect for Netlify static deployments.

## Additional Resources

- [Formspree Documentation](https://help.formspree.io/)
- [API Reference](https://help.formspree.io/hc/en-us/articles/360055613373-The-Formspree-API)
- [Integrations](https://help.formspree.io/hc/en-us/categories/360004227394-Integrations) 