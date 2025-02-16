import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Skill } from "@shared/schema";
import SkillCard from "@/components/skill-card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            SkillPath
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              Welcome, {user?.username}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Develop Your Tech Skills</h2>
          <p className="text-muted-foreground text-lg">
            Choose a learning path and start your journey with curated resources
            and structured guidance.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-[300px] bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills?.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
