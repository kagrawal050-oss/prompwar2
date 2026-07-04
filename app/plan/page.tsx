import { TravelPlanParams, generateTravelPlan } from "@/lib/services/ai-service";
import { TravelChecklist } from "@/components/plan/checklist";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlanEmptyState } from "@/components/plan/empty-state";
import { PlanErrorState } from "@/components/plan/error-state";
import { PdfButton } from "@/components/plan/pdf-button";
import { StorySection } from "@/components/plan/story-section";
import { ItinerarySection } from "@/components/plan/itinerary-section";
import { SidebarSection } from "@/components/plan/sidebar-section";

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  if (!params.destination) {
    return <PlanEmptyState />;
  }

  try {
    const planParams: TravelPlanParams = {
      destination: Array.isArray(params.destination)
        ? params.destination[0]
        : params.destination || "Unknown Destination",
      budget: Array.isArray(params.budget) ? params.budget[0] : params.budget || "medium",
      duration: parseInt(
        Array.isArray(params.duration) ? params.duration[0] : params.duration || "3",
        10
      ),
      travelStyle: Array.isArray(params.travelStyle)
        ? params.travelStyle[0]
        : params.travelStyle || "solo",
      interests: Array.isArray(params.interests)
        ? params.interests
        : params.interests
          ? [params.interests]
          : ["Sightseeing"],
    };

    const plan = await generateTravelPlan(planParams);

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 text-primary">
              {plan.destination}
            </h1>
            <p className="text-muted-foreground text-lg">
              Your personalized {planParams.duration}-day {planParams.budget} budget itinerary.
            </p>
          </div>
          <div className="flex space-x-2 no-print">
            <Button
              variant="outline"
              className="print-button bg-background"
              onClick={() => window.print()}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Plan
            </Button>
            <PdfButton targetId="pdf-content" filename={plan.destination} />
          </div>
        </div>

        <div id="pdf-content" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Story & Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            <StorySection destination={plan.destination} story={plan.story} />
            <ItinerarySection itinerary={plan.itinerary} />
          </div>

          {/* Sidebar: Attractions, Food, Tips, Checklist */}
          <div className="space-y-8">
            <SidebarSection plan={plan} />

            <div className="no-print sticky top-24">
              <TravelChecklist />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error generating plan:", error);
    return <PlanErrorState />;
  }
}
