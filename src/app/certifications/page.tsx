import { CertificationsSection } from '@/components/sections/certifications';

export const metadata = {
  title: 'Certifications | Aman Sah',
  description: 'Professional certifications and qualifications of Aman Sah',
};

export default function CertificationsPage() {
  return (
    <div className="container mx-auto max-w-5xl py-20 md:py-32">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Professional Certifications</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My credentials and qualifications from recognized institutions and organizations.
          </p>
        </div>
        <CertificationsSection />
      </div>
    </div>
  );
}
