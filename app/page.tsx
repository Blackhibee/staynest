import Link from 'next/link';

export default function HomePage() {
  return <main style={{ padding: 48 }}><h1>StayNest</h1><p>The Next.js foundation is ready.</p><p><a href="/home.html">Open the existing listings</a></p><Link href="/become-a-host">Become a host</Link></main>;
}
