import { Link } from 'react-router-dom'
import { Plane, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Plane className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">FlightBook</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary transition">
            Search Flights
          </Link>
          {user && (
            <Link to="/my-bookings" className="text-foreground hover:text-primary transition">
              My Bookings
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{user.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
