import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient, Booking } from '@/services/apiClient'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Plane, Calendar, MapPin, Ticket, Search, Trash2, Eye } from 'lucide-react'

export default function MyBookings() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view your bookings')
      navigate('/')
      return
    }

    const fetchBookings = async () => {
      try {
        const data = await apiClient.getUserBookings(user.id)
        setBookings(data)
        setFilteredBookings(data)
      } catch (error) {
        toast.error('Failed to load bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [user, navigate])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = bookings.filter(
      booking =>
        booking.bookingId.toLowerCase().includes(term.toLowerCase()) ||
        booking.ticketNumber.toLowerCase().includes(term.toLowerCase()) ||
        booking.flightNumber.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredBookings(filtered)
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const success = await apiClient.cancelBooking(bookingId)
        if (success) {
          toast.success('Booking cancelled successfully')
          setBookings(prev =>
            prev.map(b =>
              b.id === bookingId ? { ...b, status: 'cancelled' } : b,
            ),
          )
          handleSearch(searchTerm)
        }
      } catch (error) {
        toast.error('Failed to cancel booking')
      }
    }
  }

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-muted rounded-lg" />
          ))}
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">Please login to view your bookings</p>
            <Button onClick={() => navigate('/')}>Go to Home</Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by booking ID, ticket number, or flight number..."
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'No bookings found matching your search' : 'You have no bookings yet'}
            </p>
            <Button onClick={() => navigate('/')}>Book a Flight</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredBookings.map(booking => (
            <Card key={booking.id} className="hover:shadow-lg transition">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Plane className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-bold text-lg">{booking.flightNumber}</h3>
                      <p className="text-sm text-muted-foreground">
                        Booking ID: {booking.bookingId}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      booking.status === 'confirmed'
                        ? 'default'
                        : 'destructive'
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Ticket Number</p>
                    <p className="font-mono font-bold">{booking.ticketNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Booking Date</p>
                    <p className="font-semibold">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                    <p className="font-bold text-primary">₹{booking.totalPrice}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="grid gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Passengers</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.passengers.map((passenger, index) => (
                          <Badge key={index} variant="secondary">
                            {passenger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Seats</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.seats.map((seat, index) => (
                          <Badge key={index} variant="outline">
                            <Ticket className="w-3 h-3 mr-1" />
                            {seat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => navigate('/confirmation')}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="destructive"
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    </main>
  )
}
