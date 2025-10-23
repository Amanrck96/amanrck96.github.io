'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Download, Menu, Mountain } from 'lucide-react';
import { navLinks, profile } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 text-lg font-semibold"
        >
          <Mountain className="h-6 w-6 text-primary" />
          <span className="sr-only">Aman Sah</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="hidden sm:inline-flex">
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-4 px-2.5 transition-colors hover:text-foreground',
                      pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
               <Button asChild className="mt-8 w-full">
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
