'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { skills } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const skillCategories = [skills.technical, skills.business, skills.management];

const chartConfig = {
  proficiency: {
    label: "Proficiency",
    color: "hsl(var(--primary))",
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="w-full">
      <div className="container mx-auto">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          A showcase of my core competencies, from technical skills to management expertise.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className="fade-in-up transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={category.items}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={120} tickLine={false} axisLine={false} />
                      <Tooltip
                        cursor={{ fill: 'hsla(var(--accent) / 0.2)' }}
                        content={<ChartTooltipContent 
                          formatter={(value) => `${value}%`} 
                          indicator='line'
                          hideLabel
                        />}
                      />
                      <Bar dataKey="proficiency" fill="var(--color-proficiency)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          ))}
           {skillCategories.length % 2 !== 0 && <div/>}
        </div>
      </div>
    </section>
  );
}
