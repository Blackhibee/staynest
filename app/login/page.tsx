import Link from 'next/link';

export default function LoginPage() {
  return <main style={{ padding: 48, maxWidth: 560, margin: '0 auto' }}><p className="eyebrow">StayNest account</p><h1>Log in to continue</h1><p>Firebase Authentication will power this form once the project environment variables are configured.</p><Link className="cta" href="/index.html">Open existing login</Link></main>;
}
