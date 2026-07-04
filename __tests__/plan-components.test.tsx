import { render, screen } from '@testing-library/react'
import { PlanEmptyState } from '@/components/plan/empty-state'
import { PlanErrorState } from '@/components/plan/error-state'
import { StorySection } from '@/components/plan/story-section'
import { ItinerarySection } from '@/components/plan/itinerary-section'
import { SidebarSection } from '@/components/plan/sidebar-section'

describe('Plan Components', () => {
  it('renders PlanEmptyState correctly', () => {
    render(<PlanEmptyState />)
    expect(screen.getByText('No Destination Selected')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Start Planning/i })).toHaveAttribute('href', '/planner')
  })

  it('renders PlanErrorState correctly', () => {
    render(<PlanErrorState />)
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Try Again/i })).toHaveAttribute('href', '/planner')
  })

  it('renders StorySection correctly', () => {
    render(<StorySection destination="Tokyo" story="A vibrant city." />)
    expect(screen.getByText('The Story of Tokyo')).toBeInTheDocument()
    expect(screen.getByText(/"A vibrant city."/i)).toBeInTheDocument()
  })

  it('renders ItinerarySection correctly', () => {
    const itinerary = [{ day: 1, activities: [{ time: 'Morning', description: 'Visit temple' }] }]
    render(<ItinerarySection itinerary={itinerary} />)
    expect(screen.getByText('Your Itinerary')).toBeInTheDocument()
    expect(screen.getByText('Day 1')).toBeInTheDocument()
    expect(screen.getByText('Morning')).toBeInTheDocument()
    expect(screen.getByText('Visit temple')).toBeInTheDocument()
  })

  it('renders SidebarSection correctly', () => {
    const plan = {
      topAttractions: [{ name: 'Tower', description: 'Tall tower' }],
      hiddenGems: [{ name: 'Alley', description: 'Quiet alley' }],
      localFoods: [{ name: 'Sushi', description: 'Raw fish' }],
      culturalExperiences: [{ name: 'Tea Ceremony', description: 'Traditional' }],
      festivals: [{ name: 'Summer Fest', description: 'Fireworks' }],
      travelTips: ['Use trains'],
      estimatedBudget: '$500'
    }
    render(<SidebarSection plan={plan} />)
    
    // Check missing UI elements from original prompt
    expect(screen.getByText('Cultural Experiences')).toBeInTheDocument()
    expect(screen.getByText('Tea Ceremony:')).toBeInTheDocument()
    
    expect(screen.getByText('Local Festivals')).toBeInTheDocument()
    expect(screen.getByText('Summer Fest:')).toBeInTheDocument()
    
    // Original elements
    expect(screen.getByText('Tower:')).toBeInTheDocument()
    expect(screen.getByText('Alley:')).toBeInTheDocument()
    expect(screen.getByText('Sushi:')).toBeInTheDocument()
    expect(screen.getByText('Estimated: $500')).toBeInTheDocument()
  })
})
