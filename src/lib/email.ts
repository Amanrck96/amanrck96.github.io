// Client-side email utilities
import nodemailer from 'nodemailer';

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Validate email configuration
function validateEmailConfig() {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  if (!emailUser || !emailPassword) {
    throw new Error('Email credentials are not properly configured');
  }
}

// Create a transporter for sending emails with enhanced security
function createTransporter() {
  validateEmailConfig();
  
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
}

// Rate limiting function
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW || '900000'); // 15 minutes
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX || '5');
  
  const current = rateLimitStore.get(identifier);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

// Sanitize HTML content to prevent XSS
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate inputs
    if (!to || !subject || !html) {
      return { success: false, error: 'Missing required email parameters' };
    }

    // Check rate limiting
    const clientId = to; // Using email as identifier
    if (!checkRateLimit(clientId)) {
      return { success: false, error: 'Rate limit exceeded. Please try again later.' };
    }

    // Sanitize HTML content
    const sanitizedHtml = sanitizeHtml(html);
    
    // Create transporter
    const transporter = createTransporter();
    
    // Verify transporter configuration
    await transporter.verify();
    
    const emailUser = process.env.EMAIL_USER;
    
    const mailOptions = {
      from: from || emailUser,
      to,
      subject: subject.substring(0, 200), // Limit subject length
      html: sanitizedHtml,
      headers: {
        'X-Mailer': 'Portfolio Contact Form',
        'X-Priority': '3',
      },
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}, messageId: ${result.messageId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return { success: false, error: 'Email service configuration error' };
      }
      if (error.message.includes('Rate limit')) {
        return { success: false, error: 'Too many requests. Please try again later.' };
      }
    }
    
    return { success: false, error: 'Failed to send email. Please try again later.' };
  }
}

export async function formatBookingEmailHtml(bookingDetails: any, isCustomer: boolean): Promise<string> {
  const { bookingId, service, staff, date, time, customer } = bookingDetails;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
      <h2 style="color: #333; text-align: center; margin-bottom: 20px;">
        ${isCustomer ? 'Your Appointment is Confirmed!' : 'New Appointment Booking'}
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
        <p style="margin: 5px 0;"><strong>Service:</strong> ${service?.name || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Staff:</strong> ${staff?.name || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${date || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${time || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Customer:</strong> ${customer?.name || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer?.phone || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${customer?.email || 'N/A'}</p>
        ${customer?.notes ? `<p style="margin: 5px 0;"><strong>Notes:</strong> ${customer.notes}</p>` : ''}
      </div>
      
      ${isCustomer ? `
        <p style="margin-bottom: 15px;">Thank you for booking with us. We look forward to seeing you!</p>
        <p style="margin-bottom: 15px;">If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
      ` : `
        <p style="margin-bottom: 15px;">A new appointment has been booked. Please review the details above.</p>
      `}
      
      <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
        <p>Era Unisex Salon</p>
        <p>123 Main Street, City, Country</p>
        <p>Phone: (123) 456-7890</p>
      </div>
    </div>
  `;
}