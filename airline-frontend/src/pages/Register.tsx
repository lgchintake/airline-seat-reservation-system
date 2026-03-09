import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plane, Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

const passwordRequirements = [
  { label: 'At least 8 characters', check: (pwd: string) => pwd.length >= 8 },
  { label: 'Contains uppercase letter', check: (pwd: string) => /[A-Z]/.test(pwd) },
  { label: 'Contains lowercase letter', check: (pwd: string) => /[a-z]/.test(pwd) },
  { label: 'Contains number', check: (pwd: string) => /[0-9]/.test(pwd) },
]

export default function Register() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const passwordWatch = watch('password', '')

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await registerUser(data.email, data.password, data.name)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">FlightBook</span>
          </div>
          <p className="text-slate-600">Start booking your flights today</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Join us and book flights easily
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register('name')}
                    className="pl-10 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register('email')}
                    className="pl-10 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    onChange={(e) => {
                      register('password').onChange(e)
                      setPasswordValue(e.target.value)
                    }}
                    className="pl-10 pr-10 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                )}

                {/* Password Requirements */}
                <div className="mt-3 space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  {passwordRequirements.map((req) => {
                    const isMet = req.check(passwordWatch)
                    return (
                      <div
                        key={req.label}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-white transition ${
                            isMet ? 'bg-green-500' : 'bg-slate-300'
                          }`}
                        >
                          {isMet && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`text-xs ${isMet ? 'text-green-700' : 'text-slate-600'}`}>
                          {req.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                    className="pl-10 pr-10 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium transition mt-2"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-500">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Social Register Option */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-10 border-slate-200 hover:bg-slate-50 transition"
              >
                <span className="text-slate-700">Sign up with Google</span>
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <p className="text-xs text-slate-500 text-center mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  )
}
