import { ContactForm } from './contact-form';
import { contactDetails } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-20 md:py-32">
        <div className="text-center">
            <h1 className="section-title">Contact Me</h1>
            <p className="section-subtitle">
            Have a question or want to work together? Feel free to reach out.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 fade-in-up">
                <h3 className="text-2xl font-semibold">Get in Touch</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <contactDetails.icons.email className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold">Email</h4>
                            <a href={`mailto:${contactDetails.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                {contactDetails.email}
                            </a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <contactDetails.icons.phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold">Phone</h4>
                            {contactDetails.phone.map(p => (
                                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-muted-foreground hover:text-primary transition-colors">
                                    +91 {p}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <contactDetails.icons.address className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold">Address</h4>
                            <p className="text-muted-foreground">{contactDetails.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                <ContactForm />
            </div>
        </div>
    </div>
  );
}
