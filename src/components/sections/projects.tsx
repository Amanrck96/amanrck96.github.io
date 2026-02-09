import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full">
      <div className="container mx-auto">
        <h2 className="section-title">Project Portfolio</h2>
        <p className="section-subtitle">
          A selection of projects that demonstrate my skills and expertise.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={project.title} className="flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardHeader>
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <Image
                    src={project.image.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={project.image.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-2">{project.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
