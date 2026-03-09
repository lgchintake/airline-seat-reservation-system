import { Flight } from '@/services/apiClient'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Clock, Users } from 'lucide-react'

interface FlightCardProps {
  flight: Flight
  onSelect: (flight: Flight) => void
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  return (
    <Card className="hover:shadow-lg transition cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-lg">{flight.airline}</p>
            <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
          </div>
          <Plane className="w-6 h-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{flight.departTime}</p>
            <p className="text-sm text-muted-foreground">{flight.departure}</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{flight.duration}</span>
            </div>
            <div className="w-20 h-px bg-border" />
            <Plane className="w-4 h-4 text-primary rotate-90" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{flight.arriveTime}</p>
            <p className="text-sm text-muted-foreground">{flight.arrival}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {flight.availableSeats} seats available
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">₹{flight.price}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
        </div>

        <Button className="w-full" onClick={() => onSelect(flight)}>
          Select Flight
        </Button>
      </CardContent>
    </Card>
  )
}
