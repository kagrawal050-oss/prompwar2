import { render, screen } from "@testing-library/react";
import PlannerPage from "@/app/planner/page";

// Mock useRouter since the inner TravelForm uses it
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("PlannerPage", () => {
  it("renders correctly", () => {
    render(<PlannerPage />);
    expect(screen.getByText("Plan Your Adventure")).toBeInTheDocument();
    expect(screen.getByText(/Tell us about your dream trip/i)).toBeInTheDocument();
  });
});
