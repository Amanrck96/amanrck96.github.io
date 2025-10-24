import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { certifications } from '@/lib/data';
import { ExternalLink } from 'lucide-react';

interface CertificationsSectionProps {
  showTitle?: boolean;
}

export function CertificationsSection({ showTitle = true }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="w-full py-8">
      <div className="container mx-auto">
        {/* When showTitle is true, display the section title */}
        {showTitle && (
          <>
            <h2 className="section-title">Professional Certifications</h2>
            <p className="section-subtitle mb-12">
              My credentials and qualifications from recognized institutions.
            </p>
          </>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <Card key={cert.title} className="flex flex-col fade-in-up shadow-sm hover:shadow-md transition-shadow duration-300" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">{cert.title}</CardTitle>
                      <CardDescription className="text-base">{cert.issuer}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-2 font-medium">{cert.period}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pt-2 pb-6">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cert.skills.split(', ').map(skill => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
                {cert.link && (
                   <CardFooter className="pt-0 border-t">
                      <Button asChild variant="link" className="p-0 h-auto font-medium">
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              View Credential <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                      </Button>
                   </CardFooter>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
