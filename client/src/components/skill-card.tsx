import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Skill } from "@shared/schema";
import { Link } from "wouter";

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div
          className="h-48 bg-cover bg-center rounded-t-lg"
          style={{ backgroundImage: `url(${skill.image})` }}
        />
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2">{skill.name}</h3>
        <p className="text-muted-foreground mb-4">{skill.description}</p>
        <Link href={`/roadmap/${skill.id}`}>
          <Button className="w-full group-hover:bg-primary/90">
            Start Learning
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
