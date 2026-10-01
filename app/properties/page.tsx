import Link from 'next/link';
import { homeListings } from '@/lib/listings';

export default function PropertiesPage() {
  return <main className="staynest-home" style={{ minHeight: '100vh', paddingBottom: 64 }}><header className="home-nav"><div className="home-container nav-inner"><Link className="home-brand" href="/"><img src="/assets/logo.svg" alt="" /><span>StayNest</span></Link><Link href="/" className="login-link">Home</Link></div></header><section className="home-container home-section"><span className="home-eyebrow">StayNest collection</span><h1>Explore properties</h1><div className="home-property-grid">{homeListings.map((property) => <Link className="home-property-card" href={`/properties/${property.id}`} key={property.id}><div className="home-property-image"><img src={property.image} alt={property.name} /></div><div className="home-property-body"><h2>{property.name}</h2><p>{property.location}</p><strong>${property.price}<small> / night</small></strong></div></Link>)}</div></section></main>;
}
