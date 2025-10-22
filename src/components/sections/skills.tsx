'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { skills } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';

const skillCategories = [skills.technical, skills.business, skills.management];

export function SkillsSection() {
  return (
    <section id="skills" className="w-full">
      <div className="container mx-auto">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          Core competencies in technical, business, and management domains.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Card key={category.title} className="fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.items.map((skill) => (
                    <li key={skill.name} className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <h4 className="font-semibold">{skill.name}</h4>
                        <p className="text-muted-foreground text-sm">{skill.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          {/* Empty card for alignment on a 3-category layout with 2 columns */}
          {skillCategories.length % 2 !== 0 && <div/>}
        </div>
      </div>
    </section>
  );
}
