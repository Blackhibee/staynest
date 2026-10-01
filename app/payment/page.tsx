'use client';

import Link from 'next/link';
import { FormEvent, Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { homeListings } from '@/lib/listings';

export default function PaymentPage() {
  return <Suspense fallback={<main className="staynest-home" style={{ minHeight: '100vh', padding: 48 }}><p>Loading secure payment…</p></main>}><PaymentContent /></Suspense>;
}

function PaymentContent() {
  const params = useSearchParams();
  const propertyId = params.get('id');
  const property = homeListings.find((listing) => listing.id === propertyId);
  const checkIn = params.get('checkIn') || '';
  const checkOut = params.get('checkOut') || '';
  const guests = Number(params.get('adults') || 2);
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((new Date(`${checkOut}T00:00:00`).getTime() - new Date(`${checkIn}T00:00:00`).getTime()) / 86400000));
  }, [checkIn, checkOut]);
  const [method, setMethod] = useState('card');
  const [error, setError] = useState('');
  const nightly = (property?.price || 0) * 1500;
  const total = nightly * nights + 43000;

  if (!property) return <main style={{ padding: 48 }}><h1>Payment details unavailable</h1><p>Return to the property and select your dates again.</p><Link href="/">Back to home</Link></main>;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nights || guests > 8) { setError('Please return to the property and choose valid dates and guests.'); return; }
    setError('Demo payment ready. No real charge was made.');
  };

  return <main className="staynest-home" style={{ minHeight: '100vh', paddingBottom: 64 }}><header className="home-nav"><div className="home-container nav-inner"><Link className="home-brand" href="/"><img src="/assets/logo.svg" alt="" /><span>StayNest</span></Link><Link href={`/properties/${property.id}`} className="login-link">Back to property</Link></div></header><section className="home-container" style={{ paddingTop: 48 }}><span className="home-eyebrow">Secure your reservation</span><h1>Complete payment</h1><div className="booking-layout" style={{ marginTop: 28 }}><section className="booking-panel"><div className="summary-property"><img src={property.image} alt={property.name} /><div><h2>{property.name}</h2><p>{property.location}</p><span>{checkIn} to {checkOut} · {guests} guests</span></div></div><form onSubmit={submit}><h2>Payment method</h2><p>No real payment will be processed.</p><div className="payment-options"><label className="payment-option"><input type="radio" checked={method === 'card'} onChange={() => setMethod('card')} /> Card</label><label className="payment-option"><input type="radio" checked={method === 'transfer'} onChange={() => setMethod('transfer')} /> Bank transfer</label></div>{method === 'card' && <div className="card-fields"><label>Cardholder name<input required placeholder="Name on card" /></label><label>Card number<input required placeholder="4242 4242 4242 4242" /></label><div className="card-row"><label>Expiry<input required placeholder="12/30" /></label><label>CVV<input required placeholder="123" /></label></div></div>}{method === 'transfer' && <div className="transfer-details"><strong>StayNest Trust Bank</strong><p>Account: StayNest Reservations<br />Account number: 1020456789</p></div>}<p className="form-error" role="alert">{error}</p><button className="confirm-button" type="submit">{method === 'card' ? 'Confirm & reserve' : 'Reserve with bank transfer'}</button></form></section><aside className="price-panel"><h2>Price summary</h2><div className="price-breakdown"><div><span>Price per night</span><strong>₦{nightly.toLocaleString()}</strong></div><div><span>Nights</span><strong>{nights}</strong></div><div><span>Cleaning and service</span><strong>₦43,000</strong></div><div className="total-line"><span>Total</span><strong>₦{total.toLocaleString()}</strong></div></div></aside></div></section></main>;
}
