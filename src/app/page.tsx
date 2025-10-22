import { AchievementsSection } from '@/components/sections/achievements';
import { EducationSection } from '@/components/sections/education';
import { HeroSection } from '@/components/sections/hero';

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <HeroSection />
      <AchievementsSection />
      <EducationSection />
    </div>
  );
}
