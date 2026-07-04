import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PdfButton } from '@/components/plan/pdf-button'

// Mock html2pdf.js dynamically imported
jest.mock('html2pdf.js', () => {
  return jest.fn().mockImplementation(() => ({
    set: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    save: jest.fn().mockResolvedValue(undefined)
  }))
})

describe('PdfButton', () => {
  it('renders and handles click', async () => {
    // Add a mock element to the DOM so it can be found by ID
    const div = document.createElement('div')
    div.id = 'test-id'
    document.body.appendChild(div)

    render(<PdfButton targetId="test-id" filename="Paris" />)
    
    const btn = screen.getByRole('button', { name: /Save as PDF/i })
    expect(btn).toBeInTheDocument()
    
    fireEvent.click(btn)
    
    // Check if state changed to loading
    expect(screen.getByText(/Generating PDF.../i)).toBeInTheDocument()
    
    // Wait for async operation to finish
    await waitFor(() => {
      expect(screen.getByText(/Save as PDF/i)).toBeInTheDocument()
    })
    
    document.body.removeChild(div)
  })
})
