import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Utensils, Landmark, Theater, Music } from "lucide-react";

type Place = { name: string; description: string };

export function SidebarSection({
  plan,
}: {
  plan: {
    topAttractions: Place[];
    hiddenGems: Place[];
    localFoods: Place[];
    culturalExperiences: Place[];
    festivals: Place[];
    travelTips: string[];
    estimatedBudget: string;
  };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Landmark className="w-4 h-4 mr-2" />
            Top Attractions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {plan.topAttractions.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.name}:</span> {item.description}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Theater className="w-4 h-4 mr-2" />
            Cultural Experiences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {plan.culturalExperiences.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.name}:</span> {item.description}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-pink-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Music className="w-4 h-4 mr-2" />
            Local Festivals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {plan.festivals.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.name}:</span> {item.description}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Hidden Gems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {plan.hiddenGems.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.name}:</span> {item.description}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Utensils className="w-4 h-4 mr-2" />
            Local Foods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {plan.localFoods.map((item, idx) => (
              <li key={idx}>
                <span className="font-semibold">{item.name}:</span> {item.description}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Travel Tips & Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold mb-2">Estimated: {plan.estimatedBudget}</p>
          <ul className="list-disc pl-4 space-y-1 text-sm opacity-90">
            {plan.travelTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
