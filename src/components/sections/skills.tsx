'use client';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { skills } from '@/lib/data';

const skillCategories = [skills.technical, skills.business, skills.management];

export function SkillsSection() {
  return (
    <section id="skills" className="w-full">
      <div className="container mx-auto">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          Core competencies visually displayed through interactive proficiency charts.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Card key={category.title} className="fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={category.items}
                      layout="vertical"
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 14 }}
                        width={180}
                      />
                      <Tooltip
                        cursor={{ fill: 'hsl(var(--card))' }}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar dataKey="level" radius={[0, 4, 4, 0]} fill="var(--color-1)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
