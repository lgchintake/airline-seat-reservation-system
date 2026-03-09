import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiClient, Flight } from '@/services/apiClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Clock, MapPin, Users, Zap } from 'lucide-react'
import { toast } from 'sonner'

export default function FlightDetails() {
  const { flightId } = useParams<{ flightId: string }>()
  const [flight, setFlight] = useState<Flight | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await apiClient.getFlightDetails(flightId || '')
        if (data) {
          setFlight(data)
        } else {
          toast.error('Flight not found')
        }
      } catch (error) {
        toast.error('Failed to load flight details')
      } finally {
        setLoading(false)
      }
    }

    fetchFlight()
  }, [flightId])

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </main>
    )
  }

  if (!flight) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Flight not found</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Flight Details</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{flight.airline}</CardTitle>
            <Plane className="w-6 h-6 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Flight Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Flight Number</p>
              <p className="text-xl font-semibold">{flight.flightNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Aircraft</p>
              <p className="text-xl font-semibold">Boeing 737-800</p>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            {/* Route */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Departure</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{flight.departTime}</p>
                    <p className="text-muted-foreground">{flight.departure}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{flight.duration}</span>
                </div>
                <div className="w-24 h-px bg-border" />
                <Plane className="w-4 h-4 text-primary rotate-90" />
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-2">Arrival</p>
                <div className="flex items-center gap-2 justify-end">
                  <div>
                    <p className="text-2xl font-bold">{flight.arriveTime}</p>
                    <p className="text-muted-foreground">{flight.arrival}</p>
                  </div>
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-4">In-flight Amenities</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-muted rounded">
                <Zap className="w-4 h-4 text-primary" />
                <span>Free Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted rounded">
                <Zap className="w-4 h-4 text-primary" />
                <span>Power Outlets</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted rounded">
                <Zap className="w-4 h-4 text-primary" />
                <span>Meal Service</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted rounded">
                <Zap className="w-4 h-4 text-primary" />
                <span>Entertainment System</span>
              </div>
            </div>
          </div>

          {/* Seat Info */}
          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Seats</p>
                <p className="text-2xl font-bold">{flight.totalSeats}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Seats</p>
                <p className="text-2xl font-bold text-green-600">{flight.availableSeats}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Price per Person</p>
                <p className="text-3xl font-bold text-primary">₹{flight.price}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button className="w-full py-6 text-lg" asChild>
          <a href="/seat-selection">Continue to Seat Selection</a>
        </Button>
      </div>
    </main>
  )
}
