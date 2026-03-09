import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { BookingProvider } from './contexts/BookingContext'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Search from './pages/Search'
import FlightDetails from './pages/FlightDetails'
import SeatSelection from './pages/SeatSelection'
import PassengerForm from './pages/PassengerForm'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import MyBookings from './pages/MyBookings'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/flight/:flightId" element={<FlightDetails />} />
              <Route path="/seat-selection" element={<SeatSelection />} />
              <Route path="/passenger-form" element={<PassengerForm />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
            <Toaster />
          </div>
        </BookingProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
