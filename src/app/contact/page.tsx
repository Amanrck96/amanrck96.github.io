import { ContactForm } from './contact-form'
import { contactDetails, contactLinks, profile } from '@/lib/data'
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'Contact | Aman Sah',
  description: 'Get in touch with Aman Sah for professional inquiries and opportunities',
}

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <a href={`mailto:${contactDetails.email}`} className="hover:underline">{contactDetails.email}</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <div>
                {Array.isArray(contactDetails.phone) ? (
                  contactDetails.phone.map((p, idx) => (
                    <a key={p} href={`tel:${p}`} className="hover:underline">
                      {p}{idx < contactDetails.phone.length - 1 ? ' / ' : ''}
                    </a>
                  ))
                ) : (
                  <a href={`tel:${contactDetails.phone}`} className="hover:underline">{contactDetails.phone}</a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5" />
              <a
                href={`https://wa.me/${contactLinks.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp: {contactLinks.whatsapp}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5" />
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn: linkedin.com/in/amanrck69/
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <a href={contactLinks.gmail} className="hover:underline">Gmail: {contactDetails.email}</a>
            </div>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
