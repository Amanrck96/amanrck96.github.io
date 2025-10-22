import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { education } from '@/lib/data';
import { GraduationCap } from 'lucide-react';

export function EducationSection() {
  return (
    <section id="education" className="w-full bg-card">
      <div className="container mx-auto">
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">
          My academic background and qualifications.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {education.map((edu, index) => (
            <Card key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>{edu.degree}</CardTitle>
                            <CardDescription>{edu.institution}</CardDescription>
                            <p className="text-xs text-muted-foreground mt-1">{edu.year}</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
