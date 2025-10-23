import { HeroSection } from '@/components/sections/hero';
import { ExperienceSection } from '@/components/sections/experience';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { CertificationsSection } from '@/components/sections/certifications';
import { EducationSection } from '@/components/sections/education';
import { AchievementsSection } from '@/components/sections/achievements';

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <HeroSection />
      <AchievementsSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <EducationSection />
    </div>
  );
}
