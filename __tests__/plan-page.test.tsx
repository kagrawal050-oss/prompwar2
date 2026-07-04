import { render, screen } from '@testing-library/react'
import PlanPage from '@/app/plan/page'

describe('PlanPage', () => {
  it('renders the generated travel plan correctly', async () => {
    // searchParams is a Promise in Next.js 15
    const mockSearchParams = Promise.resolve({
      destination: 'Paris',
      budget: 'low',
      duration: '3',
      travelStyle: 'solo',
      interests: 'Food'
    })

    // For Server Components, we await the component itself
    const ResolvedPage = await PlanPage({ searchParams: mockSearchParams })
    
    render(ResolvedPage)
    
    // Check destination
    expect(screen.getByText('Paris')).toBeInTheDocument()
    
    // Check itinerary details
    expect(screen.getByText(/Your personalized 3-day low budget itinerary/i)).toBeInTheDocument()
    expect(screen.getByText('Your Itinerary')).toBeInTheDocument()
    expect(screen.getByText('Top Attractions')).toBeInTheDocument()
  })
})
