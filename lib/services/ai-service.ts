export interface TravelPlanParams {
  destination: string;
  budget: string;
  duration: number;
  travelStyle: string;
  interests: string[];
}

export interface TravelPlanResponse {
  destination: string;
  topAttractions: { name: string; description: string }[];
  hiddenGems: { name: string; description: string }[];
  localFoods: { name: string; description: string }[];
  culturalExperiences: { name: string; description: string }[];
  festivals: { name: string; description: string }[];
  itinerary: { day: number; activities: { time: string; description: string }[] }[];
  travelTips: string[];
  estimatedBudget: string;
  story: string;
}

export async function generateTravelPlan(params: TravelPlanParams): Promise<TravelPlanResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable. Please add it to your .env.local file.");
  }

  const prompt = `
You are an expert travel planner and cultural guide. Generate a comprehensive travel itinerary and cultural guide for ${params.destination}.
The traveler is going for ${params.duration} days on a ${params.budget} budget.
Travel style: ${params.travelStyle}.
Their interests include: ${params.interests.join(", ")}.

Return the response STRICTLY as a JSON object matching this TypeScript interface exactly:
{
  "destination": "${params.destination}",
  "topAttractions": [{ "name": "string", "description": "string" }],
  "hiddenGems": [{ "name": "string", "description": "string" }],
  "localFoods": [{ "name": "string", "description": "string" }],
  "culturalExperiences": [{ "name": "string", "description": "string" }],
  "festivals": [{ "name": "string", "description": "string" }],
  "story": "string (150-200 words of immersive storytelling about the destination's heritage and culture)",
  "itinerary": [
    { "day": number, "activities": [{ "time": "Morning/Afternoon/Evening", "description": "string" }] }
  ],
  "travelTips": ["string"],
  "estimatedBudget": "string"
}

Provide exactly ${params.duration} days in the itinerary. Provide at least 3 items for topAttractions, hiddenGems, localFoods, culturalExperiences, and festivals. Do not wrap the JSON in markdown code blocks, just return the raw JSON string.
`;

  try {
    const response = await fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${apiKey}\`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(\`Gemini API error: \${response.status} \${errorText}\`);
    }

    const data = await response.json();
    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResult) {
      throw new Error("No text returned from Gemini API");
    }

    const plan = JSON.parse(textResult) as TravelPlanResponse;
    return plan;
  } catch (error) {
    console.error("Failed to generate travel plan:", error);
    throw error;
  }
}
