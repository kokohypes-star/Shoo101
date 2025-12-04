import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Mail, Phone, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { detectCurrencyFromPhone } from '@/utils/countryCodeToCurrency';

export default function StorefrontLogin({ onLogin, onError }: { onLogin: (token: string, customer: any) => void; onError?: () => void }) {
  const { setCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState('signup');
  const [signupForm, setSignupForm] = useState({ email: '', phone: '' });
  const [loginForm, setLoginForm] = useState({ phone: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setMessageType('success');
      setMessage('✓ Account created successfully! Please log in.');
      setSignupForm({ email: '', phone: '' });
      setTimeout(() => setActiveTab('login'), 1500);
    } catch (err) {
      setMessageType('error');
      setMessage('Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.phone) {
      setMessageType('error');
      setMessage('Please enter your phone number');
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setOtpSent(true);
      setMessageType('success');
      setMessage('✓ OTP sent to your email!');
    } catch (err) {
      setMessageType('error');
      setMessage('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (loginForm.otp === '1234567') {
        const mockCustomer = {
          id: 1,
          email: 'customer@example.com',
          phone: loginForm.phone,
        };
        const mockToken = 'mock_jwt_token_' + Date.now();
        await new Promise(resolve => setTimeout(resolve, 500));
        onLogin(mockToken, mockCustomer);
        window.location.href = '/storefront';
      } else {
        setMessageType('error');
        setMessage('Invalid OTP. Try again with 1234567');
        onError?.();
      }
    } catch (err) {
      setMessageType('error');
      setMessage('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>SHOOBU</h1>
          <p className="text-muted-foreground">Create an account or sign in to continue</p>
        </div>

        {/* Auth Card */}
        <Card className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup" className="text-base">Sign Up</TabsTrigger>
              <TabsTrigger value="login" className="text-base">Login</TabsTrigger>
            </TabsList>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="space-y-5 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={signupForm.phone}
                      onChange={(e) => {
                        const newPhone = e.target.value;
                        setSignupForm({ ...signupForm, phone: newPhone });
                        // Detect currency instantly and set it
                        const detectedCurrency = detectCurrencyFromPhone(newPhone);
                        setCurrency(detectedCurrency);
                      }}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
              {message && messageType === 'success' && (
                <div className="flex gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700">{message}</p>
                </div>
              )}
              {message && messageType === 'error' && (
                <div className="flex gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{message}</p>
                </div>
              )}
              <p className="text-xs text-center text-muted-foreground">
                We'll send you a verification email to confirm your account
              </p>
            </TabsContent>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-5 mt-6">
              <form onSubmit={otpSent ? handleVerifyOTP : handleRequestOTP} className="space-y-4">
                {!otpSent ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={loginForm.phone}
                          onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Enter OTP Code</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="000000"
                          value={loginForm.otp}
                          onChange={(e) => setLoginForm({ ...loginForm, otp: e.target.value.replace(/\D/g, '').slice(0, 7) })}
                          maxLength={7}
                          className="pl-10 h-12 text-center text-2xl tracking-widest font-mono"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12"
                      onClick={() => {
                        setOtpSent(false);
                        setLoginForm({ ...loginForm, otp: '' });
                        setMessage('');
                      }}
                    >
                      Send Another Code
                    </Button>
                  </>
                )}
              </form>
              {message && messageType === 'success' && (
                <div className="flex gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700">{message}</p>
                </div>
              )}
              {message && messageType === 'error' && (
                <div className="flex gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{message}</p>
                </div>
              )}
              <p className="text-xs text-center text-muted-foreground">
                {otpSent ? 'Check your email for the OTP code' : 'We\'ll send an OTP to verify your login'}
              </p>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Demo Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials</p>
          <div className="space-y-1 text-xs text-blue-800">
            <p>• Phone: Any number</p>
            <p>• OTP: <span className="font-mono font-bold">1234567</span></p>
          </div>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-sm text-muted-foreground">
          By signing up, you agree to our <a href="#" className="underline hover:text-foreground">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}
