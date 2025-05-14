'use server';

// This file is kept for compatibility reasons but is no longer used.
// The contact form now uses Formspree instead of SMTP.
// See FORMSPREE_SETUP.md for more information.

export async function submitContactForm(formData: any) {
  console.warn('SMTP contact form submission is deprecated. Using Formspree instead.');
  return { 
    success: false, 
    message: 'This method is deprecated. The contact form now uses Formspree.' 
  };
} 