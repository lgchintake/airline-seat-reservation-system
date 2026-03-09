import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient, Seat } from '@/services/apiClient'
import { useBooking, SelectedSeat } from '@/contexts/BookingContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SeatGrid from '@/components/SeatGrid'
import { SeatGridSkeleton } from '@/components/LoadingSkeleton'
import { toast } from 'sonner'

export default function SeatSelection() {
  const navigate = useNavigate()
  const { bookingState, selectSeats } = useBooking()
  const [seats, setSeats] = useState<Seat[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>(
    bookingState.selectedSeats,
  )

  const numPassengers = bookingState.searchParams?.passengers || 1

  useEffect(() => {
    if (!bookingState.selectedFlight) {
      navigate('/seat-selection')
      return
    }

    const fetchSeats = async () => {
      try {
        const data = await apiClient.getFlightSeats(
          bookingState.selectedFlight?.id || '',
        )
        setSeats(data)
      } catch (error) {
        toast.error('Failed to load seats')
      } finally {
        setLoading(false)
      }
    }

    fetchSeats()
  }, [bookingState.selectedFlight, navigate])

  const handleSeatSelect = (seat: Seat, passengerIndex: number) => {
    setSelectedSeats(prev => {
      const filtered = prev.filter(s => s.passengerIndex !== passengerIndex)
      return [
        ...filtered,
        {
          seatId: seat.id,
          seatNumber: seat.seatNumber,
          passengerIndex,
        },
      ]
    })
  }

  const handleContinue = () => {
    if (selectedSeats.length !== numPassengers) {
      toast.error(
        `Please select ${numPassengers} seat${numPassengers > 1 ? 's' : ''}`,
      )
      return
    }

    selectSeats(selectedSeats)
    navigate('/passenger-form')
  }

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Select Seats</h1>
        <Card>
          <CardContent className="py-8">
            <SeatGridSkeleton />
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Select Seats</h1>
        <p className="text-muted-foreground">
          {selectedSeats.length} of {numPassengers} seat{numPassengers > 1 ? 's' : ''} selected
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Seats</CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(numPassengers)].map((_, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <SeatGrid
                seats={seats}
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
                passengerIndex={index}
              />
              {index < numPassengers - 1 && (
                <div className="border-b border-border my-8" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-8 flex gap-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate('/')}
        >
          Back to Search
        </Button>
        <Button className="flex-1" onClick={handleContinue}>
          Continue to Passenger Details
        </Button>
      </div>
    </main>
  )
}
