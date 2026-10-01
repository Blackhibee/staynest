import Link from 'next/link';

export default function HostOnboardingPage() {
  return (
    <main className="host-page">
      <header className="host-nav">
        <Link className="host-brand" href="/">StayNest</Link>
        <Link href="/host/dashboard">Open host dashboard →</Link>
      </header>
      <section className="host-content">
        <p className="eyebrow">Your host journey</p>
        <h1>Welcome to your Host Studio.</h1>
        <p>Set up your host profile when you’re ready, or head straight to your workspace to explore your dashboard.</p>
        <div className="benefits">
          <article className="host-card">
            <h2>Go to your workspace</h2>
            <p>See your overview, properties, bookings, messages, earnings, reviews and account settings.</p>
            <Link className="cta" href="/host/dashboard">Open host dashboard</Link>
          </article>
          <article className="host-card">
            <h2>Start a property listing</h2>
            <p>Add your property details and continue building your hosting profile.</p>
            <Link className="cta" href="/host/properties/new">Add a property</Link>
          </article>
        </div>
        <p className="footer-note">You can return to your dashboard at any time from the host workspace.</p>
      </section>
    </main>
  );
}
