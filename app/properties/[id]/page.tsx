import Link from 'next/link';
import { notFound } from 'next/navigation';
import { homeListings } from '@/lib/listings';
import ReservationPanel from './ReservationPanel';

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = homeListings.find((listing) => listing.id === id);
  if (!property) notFound();

  return (
    <main className="staynest-home" style={{ minHeight: '100vh', paddingBottom: 64 }}>
      <header className="home-nav"><div className="home-container nav-inner"><Link className="home-brand" href="/"><img src="/assets/logo.svg" alt="" /><span>StayNest</span></Link><Link href="/" className="login-link">Back to home</Link></div></header>
      <section className="home-container" style={{ paddingTop: 48 }}>
        <Link href="/" className="home-eyebrow">← Back to stays</Link>
        <div className="home-property-card" style={{ maxWidth: 760, marginTop: 18 }}>
          <img src={property.image} alt={property.name} style={{ width: '100%', height: 380, objectFit: 'cover' }} />
          <div className="home-property-body"><span className="home-eyebrow">{property.type}</span><h1>{property.name}</h1><p>{property.location}</p><div className="property-meta"><span>★ {property.rating}</span><span>{property.tag}</span></div><strong>${property.price}<small> / night</small></strong><ReservationPanel property={property} /></div>
        </div>
      </section>
    </main>
  );
}
