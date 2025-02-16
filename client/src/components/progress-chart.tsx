import { Progress } from "@/components/ui/progress";

export default function ProgressChart({ percentage }: { percentage: number }) {
  return (
    <div className="w-full max-w-[200px]">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">Progress</span>
        <span className="text-sm font-medium">{Math.round(percentage)}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
