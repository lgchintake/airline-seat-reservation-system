import { useNavigate } from 'react-router-dom'
import { useBooking } from '@/contexts/BookingContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Plane, Calendar, MapPin, Users, Ticket, Download } from 'lucide-react'
import { toast } from 'sonner'

export default function Confirmation() {
  const navigate = useNavigate()
  const { bookingState, resetBooking } = useBooking()

  const handleDownloadTicket = () => {
    const ticketContent = `
AIRLINE BOOKING CONFIRMATION

Booking ID: ${bookingState.bookingId}
Ticket Number: ${bookingState.ticketNumber}

FLIGHT DETAILS
Flight: ${bookingState.selectedFlight?.flightNumber}
Airline: ${bookingState.selectedFlight?.airline}
Departure: ${bookingState.selectedFlight?.departure} - ${bookingState.selectedFlight?.departTime}
Arrival: ${bookingState.selectedFlight?.arrival} - ${bookingState.selectedFlight?.arriveTime}
Duration: ${bookingState.selectedFlight?.duration}

PASSENGERS
${bookingState.passengers.map((p, i) => `${i + 1}. ${p.firstName} ${p.lastName} (${bookingState.selectedSeats[i]?.seatNumber})`).join('\n')}

TOTAL PRICE: ₹${
      bookingState.selectedFlight &&
      bookingState.selectedFlight.price * bookingState.selectedSeats.length +
        Math.round(
          bookingState.selectedFlight.price * bookingState.selectedSeats.length * 0.18,
        )
    }

Terms & Conditions apply. Check-in opens 24 hours before departure.
    `

    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(ticketContent),
    )
    element.setAttribute('download', `${bookingState.ticketNumber}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Ticket downloaded')
  }

  const handleNewBooking = () => {
    resetBooking()
    navigate('/')
  }

  if (!bookingState.bookingId) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No confirmation details found</p>
            <Button className="mt-4" onClick={() => navigate('/')}>
              Start New Booking
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">Your flight has been successfully booked</p>
      </div>

      {/* Booking Confirmation */}
      <Card className="mb-6 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">Booking Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Booking ID</p>
              <p className="font-mono font-bold text-lg">{bookingState.bookingId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ticket Number</p>
              <p className="font-mono font-bold text-lg">{bookingState.ticketNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flight Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Flight Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Flight Number</p>
              <p className="font-bold">{bookingState.selectedFlight?.flightNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Airline</p>
              <p className="font-bold">{bookingState.selectedFlight?.airline}</p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Departure</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <p className="font-bold">{bookingState.selectedFlight?.departTime}</p>
                    <p className="text-sm">{bookingState.selectedFlight?.departure}</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Calendar className="w-5 h-5 text-muted-foreground mx-auto" />
                <p className="text-xs text-muted-foreground mt-1">
                  {bookingState.selectedFlight?.duration}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Arrival</p>
                <div className="flex items-center gap-2 justify-end">
                  <div>
                    <p className="font-bold">{bookingState.selectedFlight?.arriveTime}</p>
                    <p className="text-sm">{bookingState.selectedFlight?.arrival}</p>
                  </div>
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passenger Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Passengers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookingState.passengers.map((passenger, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded"
              >
                <div>
                  <p className="font-semibold">
                    {passenger.firstName} {passenger.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{passenger.email}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-primary" />
                    <span className="font-bold">
                      {bookingState.selectedSeats[index]?.seatNumber}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Price Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Base Fare</span>
            <span className="font-semibold">
              ₹
              {bookingState.selectedFlight &&
                bookingState.selectedFlight.price * bookingState.selectedSeats.length}
            </span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span>Taxes & Fees (18%)</span>
            <span className="font-semibold">
              ₹
              {bookingState.selectedFlight &&
                Math.round(
                  bookingState.selectedFlight.price * bookingState.selectedSeats.length * 0.18,
                )}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold text-primary pt-2">
            <span>Total Paid</span>
            <span>
              ₹
              {bookingState.selectedFlight &&
                bookingState.selectedFlight.price * bookingState.selectedSeats.length +
                  Math.round(
                    bookingState.selectedFlight.price *
                      bookingState.selectedSeats.length *
                      0.18,
                  )}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card className="mb-6 border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6 space-y-2">
          <p className="font-semibold text-yellow-900">Important Information:</p>
          <ul className="space-y-1 text-sm text-yellow-800">
            <li>• Check-in opens 24 hours before departure</li>
            <li>• Online check-in is available at www.airline.com</li>
            <li>• Baggage allowance: 20kg checked + 7kg carry-on</li>
            <li>• A confirmation email has been sent to your email address</li>
            <li>• Keep your booking ID safe for check-in and modifications</li>
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button onClick={handleDownloadTicket} className="w-full flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download Ticket
        </Button>
        <Button onClick={() => navigate('/my-bookings')} variant="outline" className="w-full">
          View My Bookings
        </Button>
        <Button onClick={handleNewBooking} variant="outline" className="w-full">
          Book Another Flight
        </Button>
      </div>
    </main>
  )
}
