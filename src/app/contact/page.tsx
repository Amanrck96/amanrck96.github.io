import { ContactForm } from './contact-form'
import { contactDetails, contactLinks, profile } from '@/lib/data'
import { Mail, Phone, MapPin, Linkedin, MessageCircle, Github } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Contact | Aman Sah',
  description: 'Get in touch with Aman Sah for professional inquiries and opportunities',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl py-20 md:py-32">
      <div className="space-y-8 mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Contact Me</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out through any of these channels.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="shadow-sm overflow-hidden">
          <CardContent className="p-6 pt-6">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">Contact Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <a href={`mailto:${contactDetails.email}`} className="hover:underline font-medium">{contactDetails.email}</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                  <div>
                    {Array.isArray(contactDetails.phone) ? (
                      contactDetails.phone.map((p, idx) => (
                        <a key={p} href={`tel:${p}`} className="hover:underline font-medium block">
                          {p}
                        </a>
                      ))
                    ) : (
                      <a href={`tel:${contactDetails.phone}`} className="hover:underline font-medium">{contactDetails.phone}</a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                  <span className="font-medium">{contactDetails.address}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">WhatsApp</p>
                  <a
                    href={`https://wa.me/${contactLinks.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium"
                  >
                    {contactLinks.whatsapp}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">LinkedIn</p>
                  <a
                    href={contactLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium"
                  >
                    linkedin.com/in/amanrck69/
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm overflow-hidden">
          <CardContent className="p-6 pt-6">
            <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">Send a Message</h2>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
