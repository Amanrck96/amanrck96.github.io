import { CertificationsSection } from '@/components/sections/certifications';

export const metadata = {
  title: 'Certifications | Aman Sah',
  description: 'Professional certifications and qualifications of Aman Sah',
};

export default function CertificationsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-20 md:py-32">
      <h1 className="text-4xl font-bold mb-6 text-center">Professional Certifications</h1>
      <p className="text-xl text-muted-foreground mb-12 text-center">
        My credentials and qualifications from recognized institutions.
      </p>
      <CertificationsSection />
    </div>
  );
}
