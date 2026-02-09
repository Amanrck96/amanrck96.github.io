import { HeroSection } from '@/components/sections/hero';
import { ExperienceSection } from '@/components/sections/experience';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { CertificationsSection } from '@/components/sections/certifications';
import { EducationSection } from '@/components/sections/education';
import { AchievementsSection } from '@/components/sections/achievements';
import { homepageShowcase, contactDetails, contactLinks } from '@/lib/data';
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      {homepageShowcase.showHero && <HeroSection />}
      {homepageShowcase.showAchievements && <AchievementsSection />}
      {homepageShowcase.showExperience && <ExperienceSection />}
      {homepageShowcase.showSkills && <SkillsSection />}
      {homepageShowcase.showProjects && <ProjectsSection />}
      {homepageShowcase.showCertifications && <CertificationsSection showTitle={true} />}
      {homepageShowcase.showEducation && <EducationSection />}

      {homepageShowcase.showContactCard && (
        <section className="w-full py-16">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
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
                <span>Cooch Behar, West Bengal</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5" />
                <a href={`https://wa.me/${contactLinks.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WhatsApp: {contactLinks.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5" />
                <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn: linkedin.com/in/amanrck69/
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <a href={contactLinks.gmail} className="hover:underline">Gmail: {contactDetails.email}</a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
