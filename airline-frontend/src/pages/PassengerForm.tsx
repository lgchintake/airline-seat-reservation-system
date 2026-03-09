import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useBooking, Passenger } from '@/contexts/BookingContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const passengerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  dateOfBirth: z.string().refine(date => {
    const age = new Date().getFullYear() - new Date(date).getFullYear()
    return age >= 18
  }, 'Must be at least 18 years old'),
  passport: z.string().optional(),
})

type PassengerFormData = z.infer<typeof passengerSchema>

export default function PassengerForm() {
  const navigate = useNavigate()
  const { bookingState, updatePassenger, addPassenger } = useBooking()
  const [currentPassenger, setCurrentPassenger] = useState(0)

  const numPassengers = bookingState.searchParams?.passengers || 1

  const { control, handleSubmit, formState: { errors }, reset } = useForm<PassengerFormData>(
    {
      resolver: zodResolver(passengerSchema),
      defaultValues: {
        firstName: bookingState.passengers[currentPassenger]?.firstName || '',
        lastName: bookingState.passengers[currentPassenger]?.lastName || '',
        email: bookingState.passengers[currentPassenger]?.email || '',
        phone: bookingState.passengers[currentPassenger]?.phone || '',
        dateOfBirth: bookingState.passengers[currentPassenger]?.dateOfBirth || '',
        passport: bookingState.passengers[currentPassenger]?.passport || '',
      },
    },
  )

  useEffect(() => {
    if (bookingState.passengers[currentPassenger]) {
      reset(bookingState.passengers[currentPassenger])
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        passport: '',
      })
    }
  }, [currentPassenger, bookingState.passengers, reset])

  const onSubmit = (data: PassengerFormData) => {
    const passenger: Passenger = {
      id: `passenger-${currentPassenger}`,
      ...data,
    }

    if (bookingState.passengers[currentPassenger]) {
      updatePassenger(currentPassenger, passenger)
    } else {
      addPassenger(passenger)
    }

    if (currentPassenger < numPassengers - 1) {
      setCurrentPassenger(currentPassenger + 1)
      toast.success(`Passenger ${currentPassenger + 1} details saved`)
    } else {
      toast.success('All passenger details saved')
      navigate('/payment')
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Passenger Details</h1>
        <p className="text-muted-foreground">
          Passenger {currentPassenger + 1} of {numPassengers}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Passenger Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      className="mt-1"
                      aria-invalid={!!errors.firstName}
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      className="mt-1"
                      aria-invalid={!!errors.lastName}
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1"
                    aria-invalid={!!errors.email}
                  />
                )}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (10 digits) *</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="phone"
                    placeholder="9876543210"
                    className="mt-1"
                    aria-invalid={!!errors.phone}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="dateOfBirth"
                    type="date"
                    className="mt-1"
                    aria-invalid={!!errors.dateOfBirth}
                  />
                )}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="passport">Passport Number (Optional)</Label>
              <Controller
                name="passport"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="passport"
                    placeholder="A12345678"
                    className="mt-1"
                  />
                )}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  if (currentPassenger > 0) {
                    setCurrentPassenger(currentPassenger - 1)
                  } else {
                    navigate('/seat-selection')
                  }
                }}
              >
                Previous
              </Button>
              <Button type="submit" className="flex-1">
                {currentPassenger < numPassengers - 1
                  ? `Next Passenger (${currentPassenger + 2}/${numPassengers})`
                  : 'Continue to Payment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
