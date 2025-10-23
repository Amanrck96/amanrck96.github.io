import { ContactForm } from './contact-form';
import { contactDetails } from '@/lib/data';

export const metadata = {
  title: 'Contact | Aman Sah',
  description: 'Get in touch with Aman Sah for professional inquiries and opportunities',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-20 md:py-32">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>
      <p className="text-xl text-muted-foreground mb-12 text-center">
        Have a question or want to work together? Feel free to reach out.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <p><strong>Email:</strong> <a href={`mailto:${contactDetails.email}`} className="text-accent hover:underline">{contactDetails.email}</a></p>
            <p><strong>Phone:</strong> <a href={`tel:${contactDetails.phone}`} className="hover:underline">{contactDetails.phone}</a></p>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
