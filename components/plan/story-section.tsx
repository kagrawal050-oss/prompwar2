import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function StorySection({ destination, story }: { destination: string; story: string }) {
  return (
    <Card className="glass overflow-hidden border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          The Story of {destination}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed text-lg italic text-foreground/80">&quot;{story}&quot;</p>
      </CardContent>
    </Card>
  );
}
