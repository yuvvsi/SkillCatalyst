import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, BookOpen, Play } from "lucide-react";

type Resource = {
  type: 'article' | 'video' | 'course';
  title: string;
  url: string;
  duration?: string;
};

export default function ResourceCard({ resource }: { resource: Resource }) {
  const icons = {
    article: BookOpen,
    video: Play,
    course: Clock,
  };
  
  const Icon = icons[resource.type];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-start gap-2 text-base">
          <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <span>{resource.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {resource.duration && (
            <span className="text-sm text-muted-foreground">
              Duration: {resource.duration}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="ml-auto"
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Open Resource
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
