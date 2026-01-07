import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from '../App'

vi.mock('../components/StationMap', () => ({
  default: () => <div data-testid="map" />,
}))

const mockStations = [
  { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.5, lng: 13.3 },
  { id: 2, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.5, lng: 10.0 },
]

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStations),
    } as Response)
  })

  it('filters stations by city', async () => {
    render(<App />)

    await waitFor(() =>
      expect(screen.getByText('Berlin Hbf')).toBeInTheDocument(),
    )

    const input = screen.getByLabelText(/filter by city/i)
    const user = userEvent.setup()
    await user.type(input, 'Hamburg')

    expect(screen.queryByText('Berlin Hbf')).not.toBeInTheDocument()
    expect(screen.getByText('Hamburg Hbf')).toBeInTheDocument()
  })
})
