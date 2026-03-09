import { Seat } from '@/services/apiClient'
import { SelectedSeat } from '@/contexts/BookingContext'
import { useState, useEffect } from 'react'

interface SeatGridProps {
  seats: Seat[]
  selectedSeats: SelectedSeat[]
  onSeatSelect: (seat: Seat, passengerIndex: number) => void
  passengerIndex: number
  seatCountdownTime?: number
}

export default function SeatGrid({
  seats,
  selectedSeats,
  onSeatSelect,
  passengerIndex,
  seatCountdownTime = 300,
}: SeatGridProps) {
  const [countdown, setCountdown] = useState(seatCountdownTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isSelected = (seatId: string) => {
    return selectedSeats.some(
      s => s.seatId === seatId && s.passengerIndex === passengerIndex,
    )
  }

  const isAnyPassengerSelected = (seatId: string) => {
    return selectedSeats.some(s => s.seatId === seatId)
  }

  const groupedSeats = seats.reduce(
    (acc, seat) => {
      const row = seat.seatNumber.match(/\d+/)?.[0] || ''
      if (!acc[row]) acc[row] = []
      acc[row].push(seat)
      return acc
    },
    {} as Record<string, Seat[]>,
  )

  const rows = Object.keys(groupedSeats).sort(
    (a, b) => parseInt(a) - parseInt(b),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Seat for Passenger {passengerIndex + 1}</h3>
        <div className="text-sm">
          <span className="font-semibold">Time remaining:</span>
          <span className="ml-2 text-red-500 font-bold">{formatTime(countdown)}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 border-2 border-green-500 rounded" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-100 border-2 border-yellow-500 rounded" />
          <span className="text-sm">Your Selection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 border-2 border-red-500 rounded" />
          <span className="text-sm">Booked</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="space-y-2 inline-block">
          {rows.map(row => (
            <div key={row} className="flex gap-3 items-center">
              <span className="w-8 text-right text-sm font-semibold text-muted-foreground">
                {row}
              </span>
              <div className="flex gap-1">
                {groupedSeats[row].map(seat => {
                  const selected = isSelected(seat.id)
                  const booked = !seat.isAvailable || isAnyPassengerSelected(seat.id)

                  return (
                    <button
                      key={seat.id}
                      onClick={() => {
                        if (seat.isAvailable && !isAnyPassengerSelected(seat.id)) {
                          onSeatSelect(seat, passengerIndex)
                        }
                      }}
                      disabled={!seat.isAvailable || (booked && !selected)}
                      className={`
                        w-8 h-8 text-xs font-semibold rounded border-2 transition
                        ${
                          selected
                            ? 'bg-yellow-100 border-yellow-500 text-yellow-900'
                            : booked
                              ? 'bg-red-100 border-red-500 text-red-900 cursor-not-allowed'
                              : 'bg-green-100 border-green-500 text-green-900 cursor-pointer hover:bg-green-200'
                        }
                      `}
                      title={`${seat.seatNumber} - ${seat.class} - ₹${seat.price}`}
                    >
                      {seat.seatNumber.match(/[A-Z]+/)?.[0]}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-sm text-muted-foreground">Economy</p>
          <p className="font-semibold">₹5,000</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Business</p>
          <p className="font-semibold">₹8,000</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">First Class</p>
          <p className="font-semibold">₹15,000</p>
        </div>
      </div>
    </div>
  )
}
