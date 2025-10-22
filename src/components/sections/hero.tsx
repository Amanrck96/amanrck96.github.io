import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/data';
import { Download, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const SocialIcon1 = profile.social[0].icon;
  const SocialIcon2 = profile.social[1].icon;

  return (
    <section id="home" className="w-full bg-card">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 py-12 md:grid-cols-2 lg:gap-20 md:py-20">
        <div className="flex flex-col items-center text-center md:items-start md:text-left fade-in-up">
          <div className="relative h-32 w-32 md:h-40 md:w-40 mb-6">
            <Image
              src={profile.profilePic}
              alt={profile.name}
              width={160}
              height={160}
              className="rounded-full object-cover shadow-lg"
              priority
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          <h2 className="mt-2 text-lg font-medium text-primary sm:text-xl">
            {profile.title}
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            {profile.summary}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
            <Button asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button variant="secondary" asChild>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <span>{profile.location}</span>
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">{profile.email}</a>
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    {profile.phone.map((p, i) => (
                        <a key={i} href={`tel:${p.replace(/\\s/g, '')}`} className="block hover:text-primary transition-colors">{p}</a>
                    ))}
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                    <SocialIcon1 className="h-5 w-5 text-muted-foreground" />
                </div>
                <a href={profile.social[0].url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{profile.social[0].url.replace('https://','')}</a>
            </div>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                    <SocialIcon2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <a href={profile.social[1].url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{profile.social[1].url.replace('https://','')}</a>
            </div>
        </div>
      </div>
    </section>
  );
}
