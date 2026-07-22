import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, User, ArrowLeft, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import OtpInput from './OtpInput';
import { generateOtp, sendOtpEmail } from '../services/otpService';

type Step = 'form' | 'otp' | 'success';

const AuthModal: React.FC = () => {
  const { authModalOpen, authModalTab, closeAuthModal, login, openAuthModal } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>(authModalTab);

  // form fields
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');

  // OTP state
  const [step, setStep]          = useState<Step>('form');
  const [otp, setOtp]            = useState('');
  const [serverOtp, setServerOtp] = useState('');
  const [otpError, setOtpError]  = useState('');
  const [devOtp, setDevOtp]      = useState<string | null>(null); // shown when EmailJS not configured

  // ui state
  const [loading, setLoading]   = useState(false);
  const [formError, setFormError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync tab when modal prop changes
  useEffect(() => { setTab(authModalTab); }, [authModalTab]);

  // Cleanup on close
  useEffect(() => {
    if (!authModalOpen) {
      setTimeout(() => {
        setStep('form'); setOtp(''); setOtpError('');
        setFormError(''); setName(''); setEmail('');
        setDevOtp(null); setCountdown(0);
      }, 300);
    }
  }, [authModalOpen]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [countdown]);

  if (!authModalOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    // FOR SIGN IN: Directly log in without OTP!
    if (tab === 'signin') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('success');
        setTimeout(() => {
          login({
            id: crypto.randomUUID(),
            email,
            name: name || email.split('@')[0],
          });
        }, 800);
      }, 400);
      return;
    }

    // FOR SIGN UP: Send OTP code via email & require verification
    if (name.trim().length < 2) {
      setFormError('Name must be at least 2 characters.');
      return;
    }

    setLoading(true);
    const code = generateOtp();
    setServerOtp(code);

    try {
      await sendOtpEmail({ toEmail: email, userName: name || 'there', otpCode: code });

      // If EmailJS not configured, the service logs to console and we surface the OTP in UI for dev
      const isConfigured =
        import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        import.meta.env.VITE_EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID';
      if (!isConfigured) setDevOtp(code);
    } catch (err) {
      console.error('[EmailJS] sendOtpEmail error:', err);
      setFormError('Failed to send OTP. Check your EmailJS config.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setStep('otp');
    setCountdown(60);
  };

  const handleVerifyOtp = () => {
    const enteredOtp  = otp.replace(/\s/g, '');   // strip any whitespace/empty slots
    const expectedOtp = serverOtp.trim();
    if (enteredOtp.length < 6) { setOtpError('Enter the 6-digit code.'); return; }
    if (enteredOtp !== expectedOtp) { setOtpError('Incorrect OTP. Try again.'); setOtp(''); return; }

    setOtpError('');
    setStep('success');

    setTimeout(() => {
      login({
        id: crypto.randomUUID(),
        email,
        name: name || email.split('@')[0],
      });
    }, 1200);
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setLoading(true);
    const code = generateOtp();
    setServerOtp(code);
    try {
      await sendOtpEmail({ toEmail: email, userName: name || 'there', otpCode: code });
      const isConfigured = import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        import.meta.env.VITE_EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID';
      if (!isConfigured) setDevOtp(code);
    } catch { /* silent */ }
    setOtp(''); setOtpError('');
    setCountdown(60);
    setLoading(false);
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={closeAuthModal}
    >
      <div
        id="auth-modal-panel"
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800" />

        {/* Close */}
        <button
          id="auth-modal-close"
          aria-label="Close"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-amber-100 text-amber-700 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="px-8 py-7">
          {/* ── STEP: FORM ── */}
          {step === 'form' && (
            <>
              {/* Tab switcher */}
              <div className="flex rounded-xl bg-amber-50 p-1 mb-7 gap-1">
                {(['signin', 'signup'] as const).map((t) => (
                  <button
                    key={t}
                    id={`auth-tab-${t}`}
                    onClick={() => { setTab(t); setFormError(''); }}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                      tab === t
                        ? 'bg-amber-800 text-white shadow'
                        : 'text-amber-700 hover:text-amber-900'
                    }`}
                  >
                    {t === 'signin' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              <h2 className="text-2xl font-extrabold text-amber-950 mb-1">
                {tab === 'signin' ? 'Welcome back 👋' : 'Join SweetDelights 🍬'}
              </h2>
              <p className="text-sm text-amber-700 mb-6">
                {tab === 'signin'
                  ? 'Enter your email address to sign in instantly.'
                  : "We'll send a 6-digit OTP code to verify your email."}
              </p>

              <form id="auth-form" onSubmit={handleSendOtp} className="space-y-4">
                {tab === 'signup' && (
                  <div>
                    <label htmlFor="auth-name" className="block text-sm font-medium text-amber-900 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                      <input
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="auth-email" className="block text-sm font-medium text-amber-900 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                    <input
                      id="auth-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50"
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {formError}
                  </p>
                )}

                <button
                  id="auth-send-otp-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {loading ? (
                    <><Loader size={16} className="animate-spin" /> {tab === 'signin' ? 'Signing in…' : 'Sending OTP…'}</>
                  ) : tab === 'signin' ? (
                    <><User size={16} /> Sign In</>
                  ) : (
                    <><Mail size={16} /> Send OTP to Register</>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-amber-600 mt-5">
                {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  id={tab === 'signin' ? 'switch-to-signup' : 'switch-to-signin'}
                  className="font-semibold underline underline-offset-2 hover:text-amber-800"
                  onClick={() => openAuthModal(tab === 'signin' ? 'signup' : 'signin')}
                >
                  {tab === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </>
          )}

          {/* ── STEP: OTP ── */}
          {step === 'otp' && (
            <>
              <button
                id="auth-otp-back"
                onClick={() => { setStep('form'); setOtp(''); setOtpError(''); }}
                className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 mb-5 -ml-1 transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                  <Mail size={26} className="text-amber-700" />
                </div>
                <h2 className="text-2xl font-extrabold text-amber-950">Check your email</h2>
                <p className="text-sm text-amber-700 mt-1">
                  We sent a 6-digit code to <span className="font-semibold">{email}</span>
                </p>
              </div>

              {/* DEV banner — visible only when EmailJS not configured */}
              {devOtp && (
                <div className="mb-4 bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3 text-center">
                  <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wider mb-0.5">Dev Mode — EmailJS not configured</p>
                  <p className="text-2xl font-mono font-bold text-yellow-800 tracking-widest">{devOtp}</p>
                  <p className="text-xs text-yellow-600 mt-0.5">Configure VITE_EMAILJS_* in .env to send real emails.</p>
                </div>
              )}

              <OtpInput value={otp} onChange={setOtp} disabled={loading} />

              {otpError && (
                <p className="text-center text-xs text-red-500 mt-3">{otpError}</p>
              )}

              <button
                id="auth-verify-otp-btn"
                onClick={handleVerifyOtp}
                disabled={loading || otp.length < 6}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Verify & Continue
              </button>

              <div className="text-center mt-4">
                {countdown > 0 ? (
                  <p className="text-xs text-amber-600">Resend code in {countdown}s</p>
                ) : (
                  <button
                    id="auth-resend-otp-btn"
                    onClick={handleResend}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline underline-offset-2 transition-colors"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}

          {/* ── STEP: SUCCESS ── */}
          {step === 'success' && (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-amber-950 mb-1">You're in!</h2>
              <p className="text-sm text-amber-700">
                Welcome{name ? `, ${name}` : ''}! Taking you to your account…
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
