import Link from 'next/link';

const benefits = [
  ['Earn on your terms', 'Set your schedule, nightly price and house rules.'],
  ['Reach more guests', 'Showcase your space to travelers searching across Nigeria.'],
  ['Stay in control', 'Manage listings, availability and bookings from one place.'],
];

export default function BecomeAHostPage() {
  return <main className="host-page">
    <header className="host-nav"><Link className="host-brand" href="/">StayNest</Link><nav><Link href="/home.html">Explore</Link><Link href="/login">Log in</Link></nav></header>
    <section className="hero"><div><p className="eyebrow">Open your doors</p><h1>Turn your space into someone’s next great stay.</h1><p>Hosting means sharing a welcoming place with guests while building an income stream on your terms. StayNest helps you manage the details.</p><Link className="cta" href="/host/onboarding">Become a Host</Link></div><img className="hero-image" src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85" alt="Bright, welcoming home interior" /></section>
    <section className="host-content"><p className="eyebrow">Why host with StayNest</p><h2>Hosting, made human</h2><div className="benefits">{benefits.map(([title, text]) => <article className="host-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><p className="eyebrow">A simple rhythm</p><h2>How hosting works</h2><div className="steps"><article className="host-card"><h3>1. Create your listing</h3><p>Add your home details, photos, amenities and pricing.</p></article><article className="host-card"><h3>2. Welcome the right guests</h3><p>Review requests and keep your availability up to date.</p></article><article className="host-card"><h3>3. Grow with confidence</h3><p>Track bookings and earnings from your host dashboard.</p></article></div><p className="eyebrow">Questions, answered</p><div className="faqs"><details className="faq"><summary>Do I need to host full time?</summary><p>No. You choose when your property is available.</p></details><details className="faq"><summary>Can I finish my listing later?</summary><p>Yes. Onboarding saves your progress so you can return later.</p></details><details className="faq"><summary>Does joining make me a host immediately?</summary><p>No. Your profile stays a guest profile until onboarding is complete and your listing is approved.</p></details></div><Link className="cta" href="/host/onboarding">Start host onboarding</Link><p className="footer-note">Your property stays pending until reviewed by an administrator.</p></section>
  </main>;
}
