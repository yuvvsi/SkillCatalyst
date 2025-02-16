import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Roadmap, Progress } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import RoadmapNavigator from "@/components/roadmap-navigator";
import ProgressChart from "@/components/progress-chart";

export default function RoadmapPage() {
  const [, params] = useRoute("/roadmap/:skillId");
  const skillId = parseInt(params?.skillId || "0");

  const { data: roadmap, isLoading: isLoadingRoadmap } = useQuery<Roadmap>({
    queryKey: [`/api/roadmap/${skillId}`],
  });

  const { data: progress, isLoading: isLoadingProgress } = useQuery<Progress>({
    queryKey: [`/api/progress/${roadmap?.id}`],
    enabled: !!roadmap,
  });

  if (isLoadingRoadmap || isLoadingProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-32 h-32 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Roadmap not found</h2>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const completedSteps = progress?.completedSteps || [];
  const totalSteps = roadmap.steps.length;
  const progress_percentage = 
    (completedSteps.length / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Skills
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
              <p className="text-muted-foreground">{roadmap.description}</p>
            </div>
            <ProgressChart percentage={progress_percentage} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <RoadmapNavigator
          steps={roadmap.steps}
          completedSteps={completedSteps}
          roadmapId={roadmap.id}
        />
      </main>
    </div>
  );
}
