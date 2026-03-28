import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import PasswordStrength from '../components/ui/PasswordStrength';

/* ── Icons ─────────────────────────────────────────────── */
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
/* ───────────────────────────────────────────────────────── */

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (!form.confirm) e.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match';
    if (!terms) e.terms = 'You must accept the terms';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    navigate('/profile');
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <AuthLayout>
      <Card variant="glass" className="w-full max-w-md animate-fade-up" padding={false}>
        <div className="p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-bold text-indigo-900 mb-1">
              Create your account ✨
            </h1>
            <p className="text-sm text-indigo-400">
              Start practising smarter, get hired faster
            </p>
          </div>

          {/* Google Social */}
          <Button variant="social" fullWidth size="md" icon={<GoogleIcon />} iconPosition="left" className="mb-5">
            Sign up with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-indigo-100" />
            <span className="text-xs text-indigo-300 font-medium">or fill in the form</span>
            <div className="flex-1 h-px bg-indigo-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Full name"
              type="text"
              placeholder="Jane Doe"
              value={form.name}
              onChange={set('name')}
              error={errors.name}
              leftIcon={<UserIcon />}
              autoComplete="name"
            />

            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              leftIcon={<MailIcon />}
              autoComplete="email"
            />

            <div>
              <Input
                label="Password"
                type={showPwd ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={form.password}
                onChange={set('password')}
                error={errors.password}
                leftIcon={<LockIcon />}
                rightElement={
                  <button type="button" onClick={() => setShowPwd(v => !v)}
                    className="text-indigo-300 hover:text-indigo-600 transition-colors p-1" tabIndex={-1}>
                    {showPwd ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                }
                autoComplete="new-password"
              />
              <PasswordStrength password={form.password} />
            </div>

            <Input
              label="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set('confirm')}
              error={errors.confirm}
              leftIcon={<LockIcon />}
              rightElement={
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                  className="text-indigo-300 hover:text-indigo-600 transition-colors p-1" tabIndex={-1}>
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
              autoComplete="new-password"
            />

            {/* Terms */}
            <div className="space-y-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-indigo-200 accent-brand-indigo shrink-0"
                />
                <span className="text-sm text-indigo-600 leading-snug">
                  I agree to the{' '}
                  <a href="#" className="text-brand-indigo font-semibold hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-brand-indigo font-semibold hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500 pl-6">{errors.terms}</p>
              )}
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} className="mt-1">
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-indigo-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-indigo font-semibold hover:text-indigo-800 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </AuthLayout>
  );
};

export default Signup;
