import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { achievements } from '@/lib/data';

export function AchievementsSection() {
  return (
    <section id="achievements" className="w-full">
      <div className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center fade-in-up" style={{animationDelay: `${index * 0.15}s`}}>
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <achievement.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold text-primary">
                  {achievement.metric}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
