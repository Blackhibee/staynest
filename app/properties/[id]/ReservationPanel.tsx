'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import type { HomeListing } from '@/lib/listings';

export default function ReservationPanel({ property }: { property: HomeListing }) {
  const today = new Date().toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [error, setError] = useState('');
  const [isOpening, setIsOpening] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!checkIn || checkIn < today) {
      setError('Choose a check-in date today or later.');
      return;
    }
    if (!checkOut || checkOut <= checkIn) {
      setError('Choose a check-out date after check-in.');
      return;
    }
    if (Number(guests) > 6) {
      setError('This property accommodates up to 6 guests.');
      return;
    }
    setIsOpening(true);
    window.location.href = `/payment.html?id=${encodeURIComponent(property.id)}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}`;
  };

  return <div className="reservation-panel"><p className="home-eyebrow">Plan your stay</p><form onSubmit={submit} noValidate><div className="reservation-dates"><label>Check-in<input type="date" min={today} value={checkIn} onChange={(event) => setCheckIn(event.target.value)} /></label><label>Check-out<input type="date" min={checkIn || today} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label></div><label>Guests<select value={guests} onChange={(event) => setGuests(event.target.value)}><option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option><option value="5">5 guests</option><option value="6">6 guests</option></select></label><p className="reservation-prompt">Choose your dates to see the final price and continue securely to payment.</p><p className="form-error" role="alert">{error}</p><button className="nav-host-button reservation-button" type="submit" disabled={isOpening}>{isOpening ? 'Opening payment...' : 'Reserve'}</button></form><Link className="reservation-back" href="/">Continue browsing</Link></div>;
}
