'use client';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { auth, isFirebaseConfigured } from '../../lib/firebase';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageKind, setMessageKind] = useState<'error' | 'success'>('error');

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (user) => {
      if (user) router.replace('/host/dashboard');
    });
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setMessageKind('error');

    if (!auth || !isFirebaseConfigured) {
      setMessage('Sign-in is not available yet. StayNest needs to finish connecting its account service.');
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setMessage('Enter your full name to create an account.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/host/dashboard');
    } catch (firebaseError: unknown) {
      const code = typeof firebaseError === 'object' && firebaseError && 'code' in firebaseError
        ? String(firebaseError.code)
        : '';
      const messages: Record<string, string> = {
        'auth/invalid-credential': 'That email and password combination was not recognized.',
        'auth/user-not-found': 'No account was found for that email address.',
        'auth/wrong-password': 'That password was not recognized. Try again or reset it.',
        'auth/email-already-in-use': 'An account already exists with that email address.',
        'auth/weak-password': 'Choose a password with at least six characters.',
        'auth/invalid-email': 'Enter a valid email address.',
        'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
      };
      setMessage(messages[code] || 'We could not complete that request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setMessage('');
    setMessageKind('error');
    if (!email.trim()) {
      setMessage('Enter your email address first, then choose “Forgot password?” again.');
      return;
    }
    if (!auth || !isFirebaseConfigured) {
      setMessage('Password recovery is not available until StayNest account setup is complete.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessageKind('success');
      setMessage('If an account exists for this email, password reset instructions are on the way.');
    } catch {
      setMessage('We could not send a reset email right now. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (nextMode: 'login' | 'signup') => {
    setMode(nextMode);
    setMessage('');
  };

  return (
    <main className={styles.page}>
      <section className={styles.experience} aria-label="StayNest account">
        <div className={styles.visual}>
          <img
            className={styles.visualImage}
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88"
            alt="A light-filled, thoughtfully furnished living room"
          />
          <div className={styles.visualShade} />
          <Link className={styles.visualBrand} href="/" aria-label="StayNest home">
            <img src="/assets/logo.svg" alt="" />
            <span>StayNest</span>
          </Link>
          <div className={styles.visualCopy}>
            <span className={styles.visualEyebrow}>THOUGHTFUL STAYS ACROSS NIGERIA</span>
            <h2>Make yourself<br />at home.</h2>
            <p>Find a space that feels right for the journey you’re on.</p>
            <div className={styles.locationNote}><span aria-hidden="true">⌖</span> Lagos, Nigeria</div>
          </div>
          <span className={styles.imageCredit}>A little room for what matters.</span>
        </div>

        <div className={styles.formPanel}>
          <header className={styles.panelHeader}>
            <Link className={styles.mobileBrand} href="/" aria-label="StayNest home">
              <img src="/assets/logo.svg" alt="" />
              <span>StayNest</span>
            </Link>
            <Link className={styles.backLink} href="/">Back to exploring <span aria-hidden="true">↗</span></Link>
          </header>

          <div className={styles.formContent}>
            <p className={styles.eyebrow}>{mode === 'login' ? 'WELCOME BACK' : 'YOUR NEXT CHAPTER'}</p>
            <h1>{mode === 'login' ? 'Good to have you back.' : 'Join StayNest.'}</h1>
            <p className={styles.intro}>
              {mode === 'login'
                ? 'Sign in to pick up where your next stay begins.'
                : 'Create an account to find stays and make yourself at home.'}
            </p>

            <div className={styles.modeSwitch} role="group" aria-label="Choose account action">
              <button className={mode === 'login' ? styles.modeActive : ''} type="button" aria-pressed={mode === 'login'} onClick={() => changeMode('login')}>Log in</button>
              <button className={mode === 'signup' ? styles.modeActive : ''} type="button" aria-pressed={mode === 'signup'} onClick={() => changeMode('signup')}>Create account</button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <label className={styles.field}>
                  <span>Full name</span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>
              )}

              <label className={styles.field}>
                <span>Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Password</span>
                <span className={styles.passwordWrap}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    minLength={6}
                    required
                  />
                  <button type="button" className={styles.revealButton} onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </span>
              </label>

              {mode === 'login' && (
                <button className={styles.forgotButton} type="button" onClick={handlePasswordReset} disabled={loading}>
                  Forgot password?
                </button>
              )}

              {message && <p className={`${styles.message} ${messageKind === 'success' ? styles.successMessage : ''}`} role={messageKind === 'error' ? 'alert' : 'status'}>{message}</p>}

              <button className={styles.submitButton} type="submit" disabled={loading}>
                {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <p className={styles.supportNote}>Need a hand? <Link href="/help">Visit StayNest support</Link></p>
          </div>

          <footer className={styles.panelFooter}>
            <span>© 2026 StayNest</span>
            <div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link></div>
          </footer>
        </div>
      </section>
    </main>
  );
}
