import { AchievementsSection } from '@/components/sections/achievements';
import { CertificationsSection } from '@/components/sections/certifications';
import { ExperienceSection } from '@/components/sections/experience';
import { HeroSection } from '@/components/sections/hero';
import { ProjectsSection } from '@/components/sections/projects';
import { SkillsSection } from '@/components/sections/skills';

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <HeroSection />
      <AchievementsSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
    </div>
  );
}
