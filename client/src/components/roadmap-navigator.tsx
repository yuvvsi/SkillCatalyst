import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import ResourceCard from "./resource-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { queryClient, apiRequest } from "@/lib/queryClient";

type Step = {
  id: string;
  title: string;
  description: string;
  resources: {
    type: 'article' | 'video' | 'course';
    title: string;
    url: string;
    duration?: string;
  }[];
};

export default function RoadmapNavigator({
  steps,
  completedSteps,
  roadmapId,
}: {
  steps: Step[];
  completedSteps: string[];
  roadmapId: number;
}) {
  const [openStepId, setOpenStepId] = useState<string | null>(null);

  const updateProgressMutation = useMutation({
    mutationFn: async (stepId: string) => {
      const newCompletedSteps = completedSteps.includes(stepId)
        ? completedSteps.filter((id) => id !== stepId)
        : [...completedSteps, stepId];

      await apiRequest("POST", `/api/progress/${roadmapId}`, {
        completedSteps: newCompletedSteps,
      });
      return newCompletedSteps;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/progress/${roadmapId}`] });
    },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isOpen = openStepId === step.id;

        return (
          <div key={step.id} className="bg-card rounded-lg border">
            <Collapsible
              open={isOpen}
              onOpenChange={(open) =>
                setOpenStepId(open ? step.id : null)
              }
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border">
                      {isCompleted ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <span className="text-sm font-medium">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                      onClick={() => updateProgressMutation.mutate(step.id)}
                      disabled={updateProgressMutation.isPending}
                    >
                      {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </div>
              <CollapsibleContent>
                <Separator />
                <div className="p-6 space-y-4">
                  {step.resources.map((resource, i) => (
                    <ResourceCard key={i} resource={resource} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        );
      })}
    </div>
  );
}
