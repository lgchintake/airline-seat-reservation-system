import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Passenger {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  passport?: string
}

export interface SelectedSeat {
  seatId: string
  seatNumber: string
  passengerIndex: number
}

export interface BookingState {
  searchParams?: {
    from: string
    to: string
    departDate: string
    returnDate?: string
    passengers: number
    tripType: 'one-way' | 'round-trip'
  }
  selectedFlight?: {
    id: string
    airline: string
    flightNumber: string
    departure: string
    arrival: string
    departTime: string
    arriveTime: string
    duration: string
    price: number
    availableSeats: number
  }
  selectedSeats: SelectedSeat[]
  passengers: Passenger[]
  paymentMethod?: 'credit-card' | 'upi' | 'netbanking'
  bookingId?: string
  ticketNumber?: string
}

interface BookingContextType {
  bookingState: BookingState
  updateSearchParams: (params: BookingState['searchParams']) => void
  selectFlight: (flight: BookingState['selectedFlight']) => void
  selectSeats: (seats: SelectedSeat[]) => void
  addPassenger: (passenger: Passenger) => void
  updatePassenger: (index: number, passenger: Passenger) => void
  setPaymentMethod: (method: BookingContextType['bookingState']['paymentMethod']) => void
  confirmBooking: (bookingId: string, ticketNumber: string) => void
  resetBooking: () => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>({
    selectedSeats: [],
    passengers: [],
  })

  const updateSearchParams = (params: BookingState['searchParams']) => {
    setBookingState(prev => ({ ...prev, searchParams: params }))
  }

  const selectFlight = (flight: BookingState['selectedFlight']) => {
    setBookingState(prev => ({ ...prev, selectedFlight: flight }))
  }

  const selectSeats = (seats: SelectedSeat[]) => {
    setBookingState(prev => ({ ...prev, selectedSeats: seats }))
  }

  const addPassenger = (passenger: Passenger) => {
    setBookingState(prev => ({
      ...prev,
      passengers: [...prev.passengers, passenger],
    }))
  }

  const updatePassenger = (index: number, passenger: Passenger) => {
    setBookingState(prev => ({
      ...prev,
      passengers: prev.passengers.map((p, i) => (i === index ? passenger : p)),
    }))
  }

  const setPaymentMethod = (method: BookingContextType['bookingState']['paymentMethod']) => {
    setBookingState(prev => ({ ...prev, paymentMethod: method }))
  }

  const confirmBooking = (bookingId: string, ticketNumber: string) => {
    setBookingState(prev => ({
      ...prev,
      bookingId,
      ticketNumber,
    }))
  }

  const resetBooking = () => {
    setBookingState({
      selectedSeats: [],
      passengers: [],
    })
  }

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        updateSearchParams,
        selectFlight,
        selectSeats,
        addPassenger,
        updatePassenger,
        setPaymentMethod,
        confirmBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider')
  }
  return context
}
