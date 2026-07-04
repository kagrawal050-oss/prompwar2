import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlanEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Compass className="w-10 h-10 text-primary animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight">No Destination Selected</h2>
      <p className="text-muted-foreground max-w-md">
        It looks like you haven't filled out your travel preferences yet. Let's find your perfect
        destination!
      </p>
      <Button asChild size="lg" className="rounded-full shadow-lg">
        <Link href="/planner">Start Planning</Link>
      </Button>
    </div>
  );
}
