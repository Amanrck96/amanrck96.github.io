'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skills } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const skillCategories = [skills.technical, skills.business, skills.management];

// Proficiency level indicators
const getProficiencyLevel = (proficiency: number) => {
  if (proficiency >= 90) return { level: 'Expert', color: 'bg-green-500', textColor: 'text-green-700' };
  if (proficiency >= 80) return { level: 'Advanced', color: 'bg-blue-500', textColor: 'text-blue-700' };
  if (proficiency >= 70) return { level: 'Proficient', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
  return { level: 'Intermediate', color: 'bg-orange-500', textColor: 'text-orange-700' };
};

export function SkillsSection() {
  return (
    <section id="skills" className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            A comprehensive showcase of my technical proficiency and professional competencies
          </p>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={category.title} 
              className="fade-in-up transform transition-all duration-300 hover:shadow-xl border-0 shadow-lg" 
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Visual Proficiency Indicators */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Proficiency Levels</h3>
                    {category.items.map((item, index) => {
                      const proficiencyInfo = getProficiencyLevel(item.proficiency);
                      return (
                        <div 
                          key={item.name} 
                          className="space-y-3 fade-in-up"
                          style={{ animationDelay: `${(categoryIndex * 0.2) + (index * 0.1)}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{item.name}</span>
                            <div className="flex items-center gap-2">
                              <span className={cn("text-sm font-medium", proficiencyInfo.textColor)}>
                                {proficiencyInfo.level}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {item.proficiency}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <Progress 
                              value={item.proficiency} 
                              className="h-3 bg-muted"
                            />
                            <div 
                              className={cn(
                                "absolute top-0 left-0 h-3 rounded-full transition-all duration-1000 ease-out",
                                proficiencyInfo.color
                              )}
                              style={{ 
                                width: `${item.proficiency}%`,
                                animationDelay: `${(categoryIndex * 0.2) + (index * 0.1) + 0.5}s`
                              }}
                            />
                          </div>
                          
                          {/* Proficiency indicator badge */}
                          <div className="flex justify-end">
                            <span className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              proficiencyInfo.color.replace('bg-', 'bg-').replace('-500', '-100'),
                              proficiencyInfo.textColor
                            )}>
                              {proficiencyInfo.level}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Detailed Descriptions */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Expertise</h3>
                    {category.items.map((item, index) => (
                      <div 
                        key={item.name}
                        className={cn(
                          "p-4 rounded-lg border transition-all duration-300 hover:shadow-md fade-in-up",
                          item.name === 'Financial Analysis' 
                            ? 'bg-green-50/50 border-green-200/50 hover:bg-green-50' 
                            : 'bg-muted/30 border-border hover:bg-muted/50'
                        )}
                        style={{ animationDelay: `${(categoryIndex * 0.2) + (index * 0.1) + 0.3}s` }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "w-2 h-2 rounded-full",
                                  i < Math.floor(item.proficiency / 20) 
                                    ? "bg-primary" 
                                    : "bg-muted-foreground/20"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
