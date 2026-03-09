// Mock API client for airline booking system
// In production, this would make actual HTTP requests

export interface Flight {
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
  totalSeats: number
}

export interface Seat {
  id: string
  seatNumber: string
  isAvailable: boolean
  class: 'economy' | 'business' | 'first'
  price: number
}

export interface Booking {
  id: string
  bookingId: string
  ticketNumber: string
  flightId: string
  flightNumber: string
  passengers: string[]
  seats: string[]
  totalPrice: number
  status: 'confirmed' | 'cancelled'
  bookingDate: string
}

// Mock flight data
const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'AirIndia',
    flightNumber: 'AI-101',
    departure: 'Delhi',
    arrival: 'Mumbai',
    departTime: '06:00 AM',
    arriveTime: '08:30 AM',
    duration: '2h 30m',
    price: 5000,
    availableSeats: 45,
    totalSeats: 180,
  },
  {
    id: '2',
    airline: 'IndiGo',
    flightNumber: 'IG-202',
    departure: 'Delhi',
    arrival: 'Mumbai',
    departTime: '09:15 AM',
    arriveTime: '11:45 AM',
    duration: '2h 30m',
    price: 4500,
    availableSeats: 32,
    totalSeats: 180,
  },
  {
    id: '3',
    airline: 'SpiceJet',
    flightNumber: 'SJ-303',
    departure: 'Delhi',
    arrival: 'Mumbai',
    departTime: '12:30 PM',
    arriveTime: '03:00 PM',
    duration: '2h 30m',
    price: 4800,
    availableSeats: 56,
    totalSeats: 180,
  },
  {
    id: '4',
    airline: 'Vistara',
    flightNumber: 'UK-404',
    departure: 'Delhi',
    arrival: 'Mumbai',
    departTime: '04:00 PM',
    arriveTime: '06:30 PM',
    duration: '2h 30m',
    price: 6500,
    availableSeats: 28,
    totalSeats: 180,
  },
  {
    id: '5',
    airline: 'AirIndia',
    flightNumber: 'AI-505',
    departure: 'Delhi',
    arrival: 'Mumbai',
    departTime: '08:00 PM',
    arriveTime: '10:30 PM',
    duration: '2h 30m',
    price: 5200,
    availableSeats: 67,
    totalSeats: 180,
  },
]

// Mock seat data generation
const generateMockSeats = (flightId: string): Seat[] => {
  const seats: Seat[] = []
  const rows = 30
  const columns = ['A', 'B', 'C', 'D', 'E', 'F']

  for (let row = 1; row <= rows; row++) {
    for (const col of columns) {
      const seatNumber = `${row}${col}`
      const isAvailable = Math.random() > 0.3
      const seatClass = row <= 5 ? 'first' : row <= 15 ? 'business' : 'economy'
      const basePrice =
        seatClass === 'first' ? 15000 : seatClass === 'business' ? 8000 : 5000

      seats.push({
        id: `${flightId}-${seatNumber}`,
        seatNumber,
        isAvailable,
        class: seatClass,
        price: basePrice,
      })
    }
  }

  return seats
}

// Mock bookings storage
const mockBookings: Record<string, Booking> = {}

export const apiClient = {
  async searchFlights(
    from: string,
    to: string,
    departDate: string,
  ): Promise<Flight[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFlights)
      }, 800)
    })
  },

  async getFlightDetails(flightId: string): Promise<Flight | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const flight = mockFlights.find(f => f.id === flightId)
        resolve(flight || null)
      }, 300)
    })
  },

  async getFlightSeats(flightId: string): Promise<Seat[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(generateMockSeats(flightId))
      }, 500)
    })
  },

  async createBooking(bookingData: {
    flightId: string
    passengers: string[]
    seats: string[]
    totalPrice: number
  }): Promise<{ bookingId: string; ticketNumber: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        const bookingId = `BK${Date.now()}`
        const ticketNumber = `TKT${Math.random().toString(36).substring(7).toUpperCase()}`

        mockBookings[bookingId] = {
          id: bookingId,
          bookingId,
          ticketNumber,
          flightId: bookingData.flightId,
          flightNumber: mockFlights.find(f => f.id === bookingData.flightId)
            ?.flightNumber || 'N/A',
          passengers: bookingData.passengers,
          seats: bookingData.seats,
          totalPrice: bookingData.totalPrice,
          status: 'confirmed',
          bookingDate: new Date().toISOString(),
        }

        resolve({ bookingId, ticketNumber })
      }, 1000)
    })
  },

  async getUserBookings(userId: string): Promise<Booking[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Return all mock bookings for demo purposes
        resolve(Object.values(mockBookings))
      }, 500)
    })
  },

  async cancelBooking(bookingId: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (mockBookings[bookingId]) {
          mockBookings[bookingId].status = 'cancelled'
          resolve(true)
        }
        resolve(false)
      }, 500)
    })
  },
}
