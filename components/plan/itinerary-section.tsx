import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

type Activity = { time: string; description: string };
type Day = { day: number; activities: Activity[] };

export function ItinerarySection({ itinerary }: { itinerary: Day[] }) {
  return (
    <div className="space-y-4 page-break">
      <h2 className="text-2xl font-bold flex items-center mb-6">
        <Calendar className="w-6 h-6 mr-2 text-primary" />
        Your Itinerary
      </h2>
      {itinerary.map((day) => (
        <Card key={day.day} className="mb-4">
          <CardHeader className="py-4 bg-muted/50">
            <CardTitle className="text-lg">Day {day.day}</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <ul className="space-y-4">
              {day.activities.map((activity, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="font-semibold w-24 shrink-0 text-primary">{activity.time}</span>
                  <span>{activity.description}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
