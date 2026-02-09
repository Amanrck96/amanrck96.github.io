import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

// Enhanced validation schema with security measures
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email format')
    .max(254, 'Email must be less than 254 characters')
    .toLowerCase(),
  mobile: z.string()
    .optional()
    .refine((val) => !val || /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(val), 'Invalid mobile number format'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .refine((val) => !/<script|javascript:|on\w+=/i.test(val), 'Message contains potentially harmful content'),
});

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;
  
  const current = rateLimitStore.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.ip || 
      request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown';

    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Sanitize inputs
    const sanitizedBody = {
      name: sanitizeInput(body.name || ''),
      email: sanitizeInput(body.email || ''),
      mobile: body.mobile ? sanitizeInput(body.mobile) : undefined,
      message: sanitizeInput(body.message || ''),
    };

    // Validate with Zod schema
    const validationResult = contactSchema.safeParse(sanitizedBody);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const { name, email, mobile, message } = validationResult.data;

    // Additional security checks
    if (message.toLowerCase().includes('spam') && message.length < 20) {
      return NextResponse.json(
        { error: 'Message appears to be spam' },
        { status: 400 }
      );
    }

    // Create email HTML with enhanced security
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #F8F9FB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #111827; margin-top: 0;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${mobile ? `<p><strong>Mobile:</strong> ${mobile}</p>` : ''}
          <p><strong>IP Address:</strong> ${clientIP}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
        
        <div style="background-color: #FFFFFF; padding: 20px; border: 1px solid #E5E7EB; border-radius: 8px;">
          <h3 style="color: #111827; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #374151; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #EFF6FF; border-radius: 8px;">
          <p style="margin: 0; color: #1E40AF; font-size: 14px;">
            <strong>Reply to:</strong> ${email}
          </p>
        </div>
      </div>
    `;

    // Send email using our enhanced email service
    const emailResult = await sendEmail({
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${name}`,
      html: html
    });

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      return NextResponse.json(
        { error: emailResult.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}