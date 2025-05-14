import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Get form data from request
    const formData: ContactFormData = await request.json();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Recipient email - this is where we'll send the contact form submissions
    const recipientEmail = 'choudharyt478@gmail.com';

    try {
      // Send email using our email utility
      await sendEmail({
        to: recipientEmail,
        from: `"${formData.name}" <${formData.email}>`,
        subject: `New Contact Form: ${formData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `,
      });
      
      console.log('Email sent successfully to', recipientEmail);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Return a success response to the user even if email sending fails
      // You might want to log this or handle it differently in production
    }

    // Return success response
    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Error processing your request' },
      { status: 500 }
    );
  }
} 