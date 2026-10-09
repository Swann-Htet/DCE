import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, ShieldCheck } from 'lucide-react';
import Field from '../../components/forms/Field';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) { setError('Enter your email and password.'); return; }
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    // Deliberately generic: do not reveal whether the email exists.
    if (err) setError('Invalid email or password.');
  };

  return (
    <div className="admin-center">
      <form className="card admin-card" onSubmit={onSubmit} noValidate aria-labelledby="login-title">
        <span className="brand-mark brand-mark-lg"><ShieldCheck size={26} aria-hidden="true" /></span>
        <h1 id="login-title" className="form-title">Admin sign in</h1>
        <Field id="admin-email" label="Email" required type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field id="admin-password" label="Password" required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="notice notice-error" role="alert"><p>{error}</p></div>}
        <button type="submit" className="btn btn-primary btn-lg" disabled={busy}>
          <LogIn size={18} aria-hidden="true" /> {busy ? 'Signing in...' : 'Sign in'}
        </button>
        <Link to="/" className="admin-link">Back to site</Link>
      </form>
    </div>
  );
}
