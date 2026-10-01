'use client';

import Link from 'next/link';
import { useMemo, useState, type FormEvent } from 'react';
import { destinationCards, homeListings } from '@/lib/listings';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');

  const visibleListings = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return homeListings;
    return homeListings.filter((listing) => `${listing.name} ${listing.location} ${listing.type}`.toLowerCase().includes(term));
  }, [search]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(query);
    document.getElementById('featured-stays')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="staynest-home">
      <header className="home-nav"><div className="home-container nav-inner">
        <Link className="home-brand" href="/" aria-label="StayNest home"><img src="/assets/logo.svg" alt="" /><span>StayNest</span></Link>
        <nav className="home-links" aria-label="Main navigation"><Link className="active" href="#featured-stays">Explore</Link><Link href="/become-a-host">Become a Host</Link><Link href="#destinations">Destinations</Link></nav>
        <div className="home-actions"><Link className="login-link" href="/login">Log in</Link><Link className="nav-host-button" href="/host/dashboard">Host dashboard</Link></div>
      </div></header>

      <section className="home-hero"><div className="home-container hero-grid">
        <div className="hero-copy-home"><span className="home-pill">Hibee Property Management</span><h1>Find a stay that feels like yours.</h1><p>Discover comfortable, memorable homes in vibrant neighborhoods and beautiful destinations across Nigeria.</p><form className="home-search" onSubmit={handleSearch} aria-label="Search properties"><label><span>Where</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="City, neighborhood or property" /></label><label><span>When</span><input type="date" aria-label="Check-in date" /></label><label><span>Guests</span><select aria-label="Number of guests" defaultValue="2"><option value="1">1 guest</option><option value="2">2 guests</option><option value="4">4 guests</option><option value="6">6 guests</option></select></label><button type="submit">Search stays</button></form></div>
        <div className="hero-image-home"><img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1100&q=85" alt="Bright luxury living room in a StayNest home" /><div className="hero-badge"><strong>★ 4.9</strong><span>Beachfront stay · Lagos</span></div></div>
      </div></section>

      <section className="home-container trust-strip" aria-label="StayNest benefits"><span>✓ Verified stays</span><span>⌂ Homes across Nigeria</span><span>♡ Guest-ready support</span></section>
      <section className="home-container home-section" id="featured-stays" aria-labelledby="featured-heading"><div className="section-top"><div><span className="home-eyebrow">Curated for you</span><h2 id="featured-heading">Places people love</h2></div><Link href="/home.html">View all stays →</Link></div><div className="home-property-grid">{visibleListings.map((listing) => <Link className="home-property-card" href={`/properties/${listing.id}`} key={listing.id}><div className="home-property-image"><img src={listing.image} alt={listing.name} /><span className="heart" aria-hidden="true">♡</span></div><div className="home-property-body"><div className="property-title-row"><h3>{listing.name}</h3><span>★ {listing.rating}</span></div><p>{listing.location}</p><div className="property-meta"><span>{listing.type}</span><span>{listing.tag}</span></div><strong>${listing.price}<small> / night</small></strong></div></Link>)}</div>{visibleListings.length === 0 && <p className="empty-home">No stays matched that search. Try another city or neighborhood.</p>}</section>
      <section className="home-container home-section" id="destinations" aria-labelledby="destination-heading"><div className="section-top"><div><span className="home-eyebrow">Popular right now</span><h2 id="destination-heading">Explore destinations</h2></div></div><div className="destination-row">{destinationCards.map((destination) => <Link className="home-destination" href={`/home.html?state=${encodeURIComponent(destination.state)}`} key={destination.state} style={{ backgroundImage: `url(${destination.image})` }}><span><strong>{destination.name}</strong><small>{destination.count}</small></span></Link>)}</div></section>
      <section className="brand-story"><div className="brand-story-inner"><div><span className="home-eyebrow">The StayNest story</span><h2>Feel at home, wherever Nigeria takes you.</h2></div><div className="brand-story-copy"><p>StayNest brings travelers and thoughtful hosts together around stays that feel welcoming, comfortable, and easy to choose. From a weekend away to a longer visit, we believe the right space can make every journey feel more like your own.</p><p>Rooted in the warmth of Nigerian hospitality, we are building a more considered way to discover local places, care for guests, and share the homes that make a destination memorable.</p><Link href="/about">Get to know StayNest →</Link></div></div></section>
      <footer className="home-footer"><div className="home-container"><span>© 2026 StayNest</span><span>Thoughtful stays across Nigeria.</span><nav aria-label="Company and policies"><Link href="/about">About</Link><Link href="/help">Help</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><a href="mailto:staynestcustomerservice@gmail.com">Contact</a></nav></div></footer>
    </main>
  );
}
