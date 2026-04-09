import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
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
  if (Object.keys(e2).length) {
    setErrors(e2);
    return;
  }

  setErrors({});
  setLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name: form.name,
        email: form.email,
        password: form.password,
      }
    );

    console.log("Signup Success:", res.data);

    // ✅ Redirect to login after signup
    navigate("/login");

  } catch (error) {
    console.log("Signup Error:", error.response?.data);

    setErrors({
      email: error.response?.data?.message || "Signup failed",
    });
  }

  setLoading(false);
};
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const styles = {
    title: { fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 800, color: '#0f1117', marginBottom: 6 },
    subtitle: { color: '#666', fontSize: 14, marginBottom: 20 },
    cardWrapper: { width: '100%', maxWidth: 380 },
    section: { display: 'flex', flexDirection: 'column', gap: 16 },
    link: { color: '#1a73e8', textDecoration: 'none', fontWeight: 600 },
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <AuthLayout>
        <div style={styles.cardWrapper}>
          <Card>
            <div style={styles.section}>
              <div style={{ textAlign: 'center' }}>
                <h1 style={styles.title}>Create your account</h1>
                <p style={styles.subtitle}>Start practicing smarter, get hired faster</p>
              </div>

          {/* Social Logins */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Button variant="social" fullWidth size="md" style={{ justifyContent: 'center' }}>
              Sign up with Google
            </Button>
            <Button variant="social" fullWidth size="md" style={{ justifyContent: 'center' }}>
              Sign up with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            <span style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.6 }}>
              or fill in the form
            </span>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }} noValidate>
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
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#4f46e5', padding: 4, display: 'flex', alignItems: 'center' }} tabIndex={-1}>
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
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#4f46e5', padding: 4, display: 'flex', alignItems: 'center' }} tabIndex={-1}>
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
              autoComplete="new-password"
            />

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#1a73e8', borderColor: '#cbd5e1' }}
              />
              <span style={{ fontSize: 14, color: '#475569', lineHeight: 1.4 }}>
                I agree to the{' '}
                <a href="#" style={{ color: '#1a73e8', textDecoration: 'none' }}>Terms of Service</a>{' '}
                and{' '}
                <a href="#" style={{ color: '#1a73e8', textDecoration: 'none' }}>Privacy Policy</a>
              </span>
            </div>
            {errors.terms && (
              <p style={{ color: '#ef4444', fontSize: 12 }}>{errors.terms}</p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} style={{ marginTop: 8 }}>
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <p style={{ textAlign: 'center', color: '#475569', fontSize: 14, marginTop: 18 }}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </Card>
      </div>
      </AuthLayout>
    </div>
  );
};

export default Signup;
