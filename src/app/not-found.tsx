import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, we could not find the page you are looking for. It might have been
        moved or does not exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </a>
    </div>
  );
}