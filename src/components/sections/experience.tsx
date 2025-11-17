import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { experiences } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';

interface ExperienceSectionProps {
  showTitle?: boolean;
}

export function ExperienceSection({ showTitle = true }: ExperienceSectionProps) {
  return (
    <section id="experience" className="w-full bg-card">
      <div className="container mx-auto">
        {showTitle && (
          <>
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-subtitle">A comprehensive overview of my career journey and significant achievements.</p>
          </>
        )}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
            {experiences.map((exp, index) => (
                <div key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                    <Card className="h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{exp.role}</CardTitle>
                                    <CardDescription className="mt-1">{exp.company} &bull; {exp.location}</CardDescription>
                                </div>
                                <Badge variant="secondary" className="whitespace-nowrap">{exp.period}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                            {exp.tasks.map((task, i) => (
                                <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                                <span>{task}</span>
                                </li>
                            ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
