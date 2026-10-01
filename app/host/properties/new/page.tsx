import Link from 'next/link';

export default function NewPropertyPage() {
  return <main className="host-page"><header className="host-nav"><Link className="host-brand" href="/">StayNest</Link><Link href="/host/dashboard">Back to dashboard</Link></header><section className="host-content"><p className="eyebrow">Host workspace</p><h1>Add a new property</h1><div className="host-card"><h2>Property onboarding</h2><p>Start with your host profile, then add your property details, photos, amenities and pricing.</p><Link className="cta" href="/host/onboarding">Continue onboarding</Link></div></section></main>;
}
