import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

// Create a direct email transporter for simple contact form
const createDirectTransporter = async () => {
  // Create a simple object that will act as a transporter but directly write to the console
  return {
    sendMail: async (mailOptions: any) => {
      console.log('------ CONTACT FORM SUBMISSION ------');
      console.log('To:', mailOptions.to);
      console.log('From:', mailOptions.from);
      console.log('Subject:', mailOptions.subject);
      console.log('HTML Content:', mailOptions.html);
      console.log('-------------------------------------');
      
      // Return a fake message ID
      return { messageId: 'direct-' + Date.now() };
    }
  };
};

// Send email function - in a real app, you'd connect to a proper email service
export async function sendEmail(options: EmailOptions) {
  const { to, subject, html, from = 'Contact Form <no-reply@website.com>' } = options;

  try {
    const transporter = await createDirectTransporter();

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    console.log('Contact form submission processed:', info.messageId);
    
    // For real email sending, use the commented code below with proper credentials
    // and uncomment the appropriate sections
    
    /*
    // For Gmail
    const realTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // should be your Gmail address
        pass: process.env.EMAIL_PASS, // should be your Gmail password or app password
      },
    });
    
    await realTransporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    */
    
    return true;
  } catch (error) {
    console.error('Error processing contact form:', error);
    throw error;
  }
} 