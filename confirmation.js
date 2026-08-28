const bookingId = new URLSearchParams(window.location.search).get('id');
const booking = JSON.parse(localStorage.getItem(`staynest-booking-${bookingId}`) || localStorage.getItem('staynest-latest-booking') || 'null');
const page = document.getElementById('confirmationPage');
const status = document.getElementById('statusMessage');
const money = (value) => `₦${value.toLocaleString('en-NG')}`;
if (booking) {
  page.hidden = false;
  if (!window.location.pathname.includes('/booking-confirmation/')) window.history.replaceState({}, '', `/booking-confirmation/${booking.bookingId}`);
  const set = (id, text) => { document.getElementById(id).textContent = text; };
  document.title = `StayNest | ${booking.bookingId}`;
  document.getElementById('confirmImage').src = booking.property.image; document.getElementById('confirmImage').alt = booking.property.name;
  set('bookingId', `Booking ID: ${booking.bookingId}`); set('confirmName', booking.property.name); set('confirmLocation', booking.property.location); set('confirmCheckIn', booking.checkIn); set('confirmCheckOut', booking.checkOut); set('confirmGuests', `${booking.guests} guest${booking.guests === 1 ? '' : 's'}`); set('confirmNights', `${booking.nights} night${booking.nights === 1 ? '' : 's'}`); set('confirmTotal', money(booking.total));
  document.getElementById('viewBookings').addEventListener('click', () => { const list = document.getElementById('bookingList'); list.hidden = false; list.textContent = `Your latest booking is ${booking.bookingId} for ${booking.property.name}.`; });
} else status.style.display = 'block';
