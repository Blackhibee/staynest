'use client';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { auth, isFirebaseConfigured } from '../../lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (user) => {
      if (user) router.replace('/host/dashboard');
    });
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!auth || !isFirebaseConfigured) {
      setError('Add your Firebase config values to .env.local before using login or signup.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          setError('Please enter your full name.');
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      router.push('/host/dashboard');
    } catch (firebaseError: unknown) {
      const message =
        firebaseError instanceof Error
          ? firebaseError.message
          : 'Authentication failed. Please try again.';

      setError(message.replace('Firebase: ', '').trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 'clamp(32px, 8vw, 72px) 20px',
        background:
          mode === 'signup'
            ? 'radial-gradient(circle at 15% 15%, rgba(121, 224, 214, 0.3), transparent 35%), radial-gradient(circle at 85% 85%, rgba(82, 129, 224, 0.35), transparent 38%), linear-gradient(135deg, #102a43 0%, #155e75 48%, #0f766e 100%)'
            : '#f7faf8',
      }}
    >
      <section
        style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: 'clamp(24px, 5vw, 48px)',
          borderRadius: 18,
          background: 'rgba(255, 255, 255, 0.94)',
          boxShadow: mode === 'signup' ? '0 24px 70px rgba(4, 22, 40, 0.28)' : 'none',
        }}
      >
      <p className="eyebrow">StayNest account</p>
      <h1>{mode === 'login' ? 'Log in to continue' : 'Create your account'}</h1>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => setMode('login')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid #dce5df',
            background: mode === 'login' ? '#1f7658' : '#fff',
            color: mode === 'login' ? '#fff' : '#14251f',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid #dce5df',
            background: mode === 'signup' ? '#1f7658' : '#fff',
            color: mode === 'signup' ? '#fff' : '#14251f',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        {mode === 'signup' && (
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Full name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
              style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #dce5df' }}
            />
          </label>
        )}

        <label style={{ display: 'grid', gap: 8 }}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #dce5df' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 8 }}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            required
            minLength={6}
            style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #dce5df' }}
          />
        </label>

        {error ? (
          <p style={{ margin: 0, color: '#b42318', fontWeight: 600 }} role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 18px',
            border: 'none',
            borderRadius: 8,
            background: '#1f7658',
            color: '#fff',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>

      <p style={{ marginTop: 18, color: '#687970' }}>
        Need to go back? <Link href="/">Home</Link>
      </p>
      </section>
    </main>
  );
}
