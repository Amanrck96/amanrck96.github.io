import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { certifications } from '@/lib/data';
import { ExternalLink, FileText } from 'lucide-react';

export function CertificationsSection() {
  return (
    <section id="certifications" className="w-full bg-card">
      <div className="container mx-auto">
        <h2 className="section-title">Professional Certifications</h2>
        <p className="section-subtitle">
          My credentials and qualifications from recognized institutions.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <Card key={cert.title} className="flex flex-col fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>{cert.issuer}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-1">{cert.period}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {cert.skills.split(', ').map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
              {cert.link && (
                 <CardFooter>
                    <Button asChild variant="link" className="p-0 h-auto">
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            View Credential <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                 </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
