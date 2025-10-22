import { AchievementsSection } from '@/components/sections/achievements';
import { HeroSection } from '@/components/sections/hero';

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden">
      <HeroSection />
      <AchievementsSection />
    </div>
  );
}
