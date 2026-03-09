import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient, Flight } from '@/services/apiClient'
import { useBooking } from '@/contexts/BookingContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Radio, RadioGroup } from '@/components/ui/radio-group'
import FlightCard from '@/components/FlightCard'
import { FlightSearchSkeleton } from '@/components/LoadingSkeleton'
import { toast } from 'sonner'
import { MapPin, Calendar, Users } from 'lucide-react'

type TripType = 'one-way' | 'round-trip'

export default function Search() {
  const navigate = useNavigate()
  const { updateSearchParams, selectFlight } = useBooking()

  const [tripType, setTripType] = useState<TripType>('one-way')
  const [from, setFrom] = useState('Delhi')
  const [to, setTo] = useState('Mumbai')
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!departDate) {
      toast.error('Please select a departure date')
      return
    }

    if (tripType === 'round-trip' && !returnDate) {
      toast.error('Please select a return date')
      return
    }

    setLoading(true)
    try {
      const results = await apiClient.searchFlights(from, to, departDate)
      setFlights(results)
      setSearched(true)
      updateSearchParams({
        from,
        to,
        departDate,
        returnDate: tripType === 'round-trip' ? returnDate : undefined,
        passengers,
        tripType,
      })
      toast.success(`Found ${results.length} flights`)
    } catch (error) {
      toast.error('Failed to search flights')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectFlight = (flight: Flight) => {
    selectFlight(flight)
    toast.success(`Selected ${flight.airline} flight`)
    navigate('/seat-selection')
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search Form */}
        <Card className="lg:col-span-1 h-fit sticky top-20">
          <CardHeader>
            <CardTitle>Search Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Trip Type */}
              <div>
                <Label className="text-base font-semibold mb-2 block">Trip Type</Label>
                <RadioGroup
                  value={tripType}
                  onValueChange={value => setTripType(value as TripType)}
                >
                  <div className="flex items-center gap-2">
                    <Radio value="one-way" id="one-way" />
                    <Label htmlFor="one-way" className="font-normal">
                      One Way
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio value="round-trip" id="round-trip" />
                    <Label htmlFor="round-trip" className="font-normal">
                      Round Trip
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* From */}
              <div>
                <Label htmlFor="from" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  From
                </Label>
                <Input
                  id="from"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  placeholder="From"
                  className="mt-1"
                />
              </div>

              {/* To */}
              <div>
                <Label htmlFor="to" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  To
                </Label>
                <Input
                  id="to"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  placeholder="To"
                  className="mt-1"
                />
              </div>

              {/* Depart Date */}
              <div>
                <Label htmlFor="depart" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Depart
                </Label>
                <Input
                  id="depart"
                  type="date"
                  value={departDate}
                  onChange={e => setDepartDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Return Date */}
              {tripType === 'round-trip' && (
                <div>
                  <Label htmlFor="return" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Return
                  </Label>
                  <Input
                    id="return"
                    type="date"
                    value={returnDate}
                    onChange={e => setReturnDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              {/* Passengers */}
              <div>
                <Label htmlFor="passengers" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Passengers
                </Label>
                <Input
                  id="passengers"
                  type="number"
                  min="1"
                  max="9"
                  value={passengers}
                  onChange={e => setPassengers(parseInt(e.target.value) || 1)}
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Searching...' : 'Search Flights'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Flight Results */}
        <div className="lg:col-span-3 space-y-4">
          {loading && <FlightSearchSkeleton />}

          {!loading && searched && flights.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No flights found. Try different search criteria.</p>
              </CardContent>
            </Card>
          )}

          {!loading && !searched && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Search for flights to get started</p>
              </CardContent>
            </Card>
          )}

          {!loading &&
            searched &&
            flights.map(flight => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={handleSelectFlight}
              />
            ))}
        </div>
      </div>
    </main>
  )
}
