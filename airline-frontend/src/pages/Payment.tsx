import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useBooking } from '@/contexts/BookingContext'
import { apiClient } from '@/services/apiClient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Radio, RadioGroup } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { CreditCard, Smartphone, Building2, ChevronRight } from 'lucide-react'

type PaymentMethod = 'credit-card' | 'upi' | 'netbanking'

const creditCardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  cardholderName: z.string().min(3, 'Cardholder name is required'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
})

const upiSchema = z.object({
  upiId: z.string().email('Invalid UPI ID'),
})

const netbankingSchema = z.object({
  bankName: z.string().min(2, 'Bank name is required'),
  accountNumber: z.string().min(10, 'Account number is required'),
})

type CreditCardFormData = z.infer<typeof creditCardSchema>
type UPIFormData = z.infer<typeof upiSchema>
type NetbankingFormData = z.infer<typeof netbankingSchema>

export default function Payment() {
  const navigate = useNavigate()
  const { bookingState, setPaymentMethod, confirmBooking } = useBooking()
  const [paymentMethod, setPaymentMethodLocal] = useState<PaymentMethod>('credit-card')
  const [loading, setLoading] = useState(false)

  const {
    control: creditCardControl,
    handleSubmit: handleCreditCardSubmit,
    formState: { errors: creditCardErrors },
  } = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardSchema),
  })

  const {
    control: upiControl,
    handleSubmit: handleUPISubmit,
    formState: { errors: upiErrors },
  } = useForm<UPIFormData>({
    resolver: zodResolver(upiSchema),
  })

  const {
    control: netbankingControl,
    handleSubmit: handleNetbankingSubmit,
    formState: { errors: netbankingErrors },
  } = useForm<NetbankingFormData>({
    resolver: zodResolver(netbankingSchema),
  })

  const calculateTotal = () => {
    if (!bookingState.selectedFlight || !bookingState.selectedSeats) return 0
    const basePrice = bookingState.selectedFlight.price * bookingState.selectedSeats.length
    const taxes = Math.round(basePrice * 0.18)
    return basePrice + taxes
  }

  const handlePaymentSubmit = async () => {
    if (!bookingState.selectedFlight || !bookingState.passengers.length) {
      toast.error('Missing booking details')
      return
    }

    setLoading(true)
    try {
      setPaymentMethod(paymentMethod)

      const result = await apiClient.createBooking({
        flightId: bookingState.selectedFlight.id,
        passengers: bookingState.passengers.map(p => p.firstName + ' ' + p.lastName),
        seats: bookingState.selectedSeats.map(s => s.seatNumber),
        totalPrice: calculateTotal(),
      })

      confirmBooking(result.bookingId, result.ticketNumber)
      toast.success('Payment successful!')
      navigate('/confirmation')
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!bookingState.selectedFlight || !bookingState.passengers.length) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Booking details not found</p>
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
      <h1 className="text-3xl font-bold mb-6">Payment</h1>

      <div className="grid gap-6">
        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span>Flight</span>
              <span className="font-semibold">{bookingState.selectedFlight.flightNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span>Passengers</span>
              <span className="font-semibold">{bookingState.passengers.length}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span>Seats</span>
              <span className="font-semibold">
                {bookingState.selectedSeats.map(s => s.seatNumber).join(', ')}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span>Subtotal</span>
              <span className="font-semibold">
                ₹{bookingState.selectedFlight.price * bookingState.selectedSeats.length}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span>Taxes & Fees (18%)</span>
              <span className="font-semibold">
                ₹{Math.round(
                  bookingState.selectedFlight.price * bookingState.selectedSeats.length * 0.18,
                )}
              </span>
            </div>
            <div className="flex justify-between py-3 bg-muted p-3 rounded text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">₹{calculateTotal()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={value => setPaymentMethodLocal(value as PaymentMethod)}>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-border rounded cursor-pointer hover:bg-muted transition">
                  <Radio value="credit-card" id="credit-card" />
                  <div className="flex items-center gap-2 flex-1">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-semibold">Credit/Debit Card</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border rounded cursor-pointer hover:bg-muted transition">
                  <Radio value="upi" id="upi" />
                  <div className="flex items-center gap-2 flex-1">
                    <Smartphone className="w-5 h-5" />
                    <span className="font-semibold">UPI</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border rounded cursor-pointer hover:bg-muted transition">
                  <Radio value="netbanking" id="netbanking" />
                  <div className="flex items-center gap-2 flex-1">
                    <Building2 className="w-5 h-5" />
                    <span className="font-semibold">Net Banking</span>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Form */}
        {paymentMethod === 'credit-card' && (
          <Card>
            <CardHeader>
              <CardTitle>Card Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreditCardSubmit(handlePaymentSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name *</Label>
                  <Controller
                    name="cardholderName"
                    control={creditCardControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="cardholderName"
                        placeholder="John Doe"
                        className="mt-1"
                        aria-invalid={!!creditCardErrors.cardholderName}
                      />
                    )}
                  />
                  {creditCardErrors.cardholderName && (
                    <p className="text-sm text-destructive mt-1">
                      {creditCardErrors.cardholderName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Controller
                    name="cardNumber"
                    control={creditCardControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="cardNumber"
                        placeholder="1234567890123456"
                        maxLength={16}
                        className="mt-1"
                        aria-invalid={!!creditCardErrors.cardNumber}
                      />
                    )}
                  />
                  {creditCardErrors.cardNumber && (
                    <p className="text-sm text-destructive mt-1">
                      {creditCardErrors.cardNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date (MM/YY) *</Label>
                    <Controller
                      name="expiryDate"
                      control={creditCardControl}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="expiryDate"
                          placeholder="12/25"
                          maxLength={5}
                          className="mt-1"
                          aria-invalid={!!creditCardErrors.expiryDate}
                        />
                      )}
                    />
                    {creditCardErrors.expiryDate && (
                      <p className="text-sm text-destructive mt-1">
                        {creditCardErrors.expiryDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Controller
                      name="cvv"
                      control={creditCardControl}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="cvv"
                          placeholder="123"
                          maxLength={3}
                          type="password"
                          className="mt-1"
                          aria-invalid={!!creditCardErrors.cvv}
                        />
                      )}
                    />
                    {creditCardErrors.cvv && (
                      <p className="text-sm text-destructive mt-1">
                        {creditCardErrors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : 'Pay ₹' + calculateTotal()}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {paymentMethod === 'upi' && (
          <Card>
            <CardHeader>
              <CardTitle>UPI Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUPISubmit(handlePaymentSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="upiId">UPI ID *</Label>
                  <Controller
                    name="upiId"
                    control={upiControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="upiId"
                        placeholder="username@upi"
                        className="mt-1"
                        aria-invalid={!!upiErrors.upiId}
                      />
                    )}
                  />
                  {upiErrors.upiId && (
                    <p className="text-sm text-destructive mt-1">{upiErrors.upiId.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : 'Pay ₹' + calculateTotal()}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {paymentMethod === 'netbanking' && (
          <Card>
            <CardHeader>
              <CardTitle>Net Banking</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNetbankingSubmit(handlePaymentSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Controller
                    name="bankName"
                    control={netbankingControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="bankName"
                        placeholder="ICICI Bank"
                        className="mt-1"
                        aria-invalid={!!netbankingErrors.bankName}
                      />
                    )}
                  />
                  {netbankingErrors.bankName && (
                    <p className="text-sm text-destructive mt-1">
                      {netbankingErrors.bankName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Controller
                    name="accountNumber"
                    control={netbankingControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="accountNumber"
                        placeholder="1234567890"
                        className="mt-1"
                        aria-invalid={!!netbankingErrors.accountNumber}
                      />
                    )}
                  />
                  {netbankingErrors.accountNumber && (
                    <p className="text-sm text-destructive mt-1">
                      {netbankingErrors.accountNumber.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : 'Pay ₹' + calculateTotal()}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/passenger-form')}
          disabled={loading}
        >
          Back
        </Button>
      </div>
    </main>
  )
}
