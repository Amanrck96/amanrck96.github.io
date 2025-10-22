import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-muted text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row md:px-6">
        <p className="text-sm">
          &copy; {currentYear} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {profile.social.map((social) => (
            <Button key={social.name} variant="ghost" size="icon" asChild>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
