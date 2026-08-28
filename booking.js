/** @typedef {{id:string,name:string,location:string,price:number,rating:number,image:string,propertyType?:string,type?:string,guests?:number,bedrooms?:number,bathrooms?:number}} Property */
/** @typedef {{bookingId:string,propertyId:string,property:Property,checkIn:string,checkOut:string,adults:number,children:number,guests:number,nights:number,cleaningFee:number,serviceFee:number,total:number,createdAt:string}} Booking */

const params = new URLSearchParams(window.location.search);
const propertyId = params.get('id') || (window.location.pathname.match(/\/booking\/([^/]+)/) || [])[1];
/** @type {Property|null} */
const property = JSON.parse(sessionStorage.getItem(`staynest-property-${propertyId}`) || 'null');
const page = document.getElementById('bookingPage');
const status = document.getElementById('statusMessage');
const money = (value) => `₦${value.toLocaleString('en-NG')}`;
const today = new Date().toISOString().split('T')[0];

if (!property) { status.style.display = 'block'; } else {
  page.hidden = false;
  if (!window.location.pathname.includes('/booking/')) window.history.replaceState({}, '', `/booking/${property.id}`);
  document.title = `StayNest | Booking ${property.name}`;
  const set = (id, text) => { document.getElementById(id).textContent = text; };
  document.getElementById('propertyImage').src = property.image;
  document.getElementById('propertyImage').alt = property.name;
  set('propertyName', property.name); set('propertyLocation', property.location); set('propertyType', property.propertyType || property.type || 'Apartment'); set('propertyRating', `★ ${property.rating}`); set('summaryName', property.name); set('nightlyPrice', money(property.price * 1500));
  const maxGuests = property.guests || 6;
  set('cleaningFee', money(25000)); set('serviceFee', money(18000)); set('capacityNote', `Maximum ${maxGuests} guests`);
  const checkIn = document.getElementById('checkIn'); const checkOut = document.getElementById('checkOut'); const adults = document.getElementById('adults'); const children = document.getElementById('children'); const totalGuests = document.getElementById('totalGuests'); const formError = document.getElementById('formError');
  checkIn.min = today; checkOut.min = today;
  const calculate = () => {
    const start = checkIn.value ? new Date(`${checkIn.value}T00:00:00`) : null; const end = checkOut.value ? new Date(`${checkOut.value}T00:00:00`) : null;
    const nights = start && end && end > start ? Math.round((end - start) / 86400000) : 0; const guestTotal = Number(adults.value || 0) + Number(children.value || 0); totalGuests.value = guestTotal;
    set('nightCount', nights); set('summaryDates', nights ? `${checkIn.value} to ${checkOut.value}` : 'Choose your dates'); set('summaryGuests', `${guestTotal} guest${guestTotal === 1 ? '' : 's'}`); set('totalPrice', money(nights ? property.price * 1500 * nights + 25000 + 18000 : 0));
    return { nights, guestTotal };
  };
  [checkIn, checkOut, adults, children].forEach((control) => control.addEventListener('input', calculate));
  checkIn.addEventListener('change', () => { checkOut.min = checkIn.value || today; });
  document.getElementById('bookingForm').addEventListener('submit', (event) => {
    event.preventDefault(); formError.textContent = ''; document.querySelectorAll('[data-error]').forEach((item) => { item.textContent = ''; }); const { nights, guestTotal } = calculate(); let valid = true;
    if (!checkIn.value || checkIn.value < today) { document.querySelector('[data-error="checkIn"]').textContent = 'Choose today or a future date.'; valid = false; }
    if (!checkOut.value || checkOut.value <= checkIn.value) { document.querySelector('[data-error="checkOut"]').textContent = 'Check-out must be after check-in.'; valid = false; }
    if (guestTotal > maxGuests) { formError.textContent = `This property accommodates up to ${maxGuests} guests.`; valid = false; }
    if (guestTotal < 1 || Number(adults.value) < 1) { formError.textContent = 'At least one adult is required.'; valid = false; }
    if (!valid || !nights) return;
    /** @type {Booking} */
    const booking = { bookingId: `SN-${Date.now().toString(36).toUpperCase()}`, propertyId: property.id, property, checkIn: checkIn.value, checkOut: checkOut.value, adults: Number(adults.value), children: Number(children.value), guests: guestTotal, nights, cleaningFee: 25000, serviceFee: 18000, total: property.price * 1500 * nights + 43000, createdAt: new Date().toISOString() };
    localStorage.setItem(`staynest-booking-${booking.bookingId}`, JSON.stringify(booking)); localStorage.setItem('staynest-latest-booking', JSON.stringify(booking)); window.location.href = `confirmation.html?id=${booking.bookingId}`;
  });
  calculate();
}
