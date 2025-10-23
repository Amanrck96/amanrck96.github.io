import { ExperienceSection } from '@/components/sections/experience';

export const metadata = {
  title: 'Experience | Aman Sah',
  description: 'Professional experience and work history of Aman Sah',
};

export default function ExperiencePage() {
  return (
    <div className="container mx-auto py-20 md:py-32">
      <h1 className="text-4xl font-bold mb-6 text-center">Professional Experience</h1>
      <p className="text-xl text-muted-foreground mb-12 text-center">
        My work history and professional journey.
      </p>
      <ExperienceSection />
    </div>
  );
}
