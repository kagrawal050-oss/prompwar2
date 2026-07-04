import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlanErrorState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-destructive">
        Oops! Something went wrong.
      </h2>
      <p className="text-muted-foreground max-w-md">
        We couldn't generate your travel plan at this time. Please check your network connection and
        try again.
      </p>
      <Button asChild size="lg" className="rounded-full shadow-lg">
        <Link href="/planner">Try Again</Link>
      </Button>
    </div>
  );
}
