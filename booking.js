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
  const backToListings = document.querySelector('.booking-nav a[href="home.html"]:last-child');
  if (backToListings) backToListings.href = sessionStorage.getItem('staynest-return-url') || 'explore.html';
  if (!window.location.pathname.includes('/booking/')) window.history.replaceState({}, '', `/booking/${property.id}`);
  document.title = `StayNest | Booking ${property.name}`;
  const set = (id, text) => { document.getElementById(id).textContent = text; };
  document.getElementById('propertyImage').src = property.image;
  document.getElementById('propertyImage').alt = property.name;
  set('propertyName', property.name); set('propertyLocation', property.location); set('propertyType', property.propertyType || property.type || 'Apartment'); set('propertyRating', `★ ${property.rating}`); set('summaryName', property.name); set('nightlyPrice', money(property.price * 1500));
  const maxGuests = property.guests || 6;
  const guestLimit = document.getElementById('totalGuests');
  if (guestLimit) guestLimit.max = String(maxGuests);
  set('cleaningFee', money(25000)); set('serviceFee', money(18000)); set('capacityNote', `Maximum ${maxGuests} guests`);
  const checkIn = document.getElementById('checkIn'); const checkOut = document.getElementById('checkOut'); const adults = document.getElementById('adults'); const children = document.getElementById('children'); const totalGuests = document.getElementById('totalGuests'); const formError = document.getElementById('formError');
  checkIn.min = today; checkOut.min = today;
  if (params.get('checkIn')) checkIn.value = params.get('checkIn');
  if (params.get('checkOut')) checkOut.value = params.get('checkOut');
  if (params.get('adults')) adults.value = params.get('adults');
  const calculate = () => {
    const start = checkIn.value ? new Date(`${checkIn.value}T00:00:00`) : null; const end = checkOut.value ? new Date(`${checkOut.value}T00:00:00`) : null;
    const nights = start && end && end > start ? Math.round((end - start) / 86400000) : 0; const guestTotal = Number(adults.value || 0) + Number(children.value || 0); totalGuests.value = guestTotal;
    set('nightCount', nights); set('summaryDates', nights ? `${checkIn.value} to ${checkOut.value}` : 'Choose your dates'); set('summaryGuests', `${guestTotal} guest${guestTotal === 1 ? '' : 's'}`); set('totalPrice', money(nights ? property.price * 1500 * nights + 25000 + 18000 : 0));
    return { nights, guestTotal };
  };
  [checkIn, checkOut, adults, children].forEach((control) => control.addEventListener('input', calculate));
  checkIn.addEventListener('change', () => { checkOut.min = checkIn.value || today; });
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault(); formError.textContent = ''; document.querySelectorAll('[data-error]').forEach((item) => { item.textContent = ''; }); const { nights, guestTotal } = calculate(); let valid = true;
    if (!checkIn.value || checkIn.value < today) { document.querySelector('[data-error="checkIn"]').textContent = 'Choose today or a future date.'; valid = false; }
    if (!checkOut.value || checkOut.value <= checkIn.value) { document.querySelector('[data-error="checkOut"]').textContent = 'Check-out must be after check-in.'; valid = false; }
    if (guestTotal > maxGuests) { formError.textContent = `This property accommodates up to ${maxGuests} guests. Reduce the adult or child count to continue.`; valid = false; }
    if (guestTotal < 1 || Number(adults.value) < 1) { formError.textContent = 'At least one adult is required.'; valid = false; }
    if (!valid || !nights) return;
    const paymentMethod = bookingForm.querySelector('input[name="paymentMethod"]:checked')?.value || 'card';
    const paymentError = document.getElementById('paymentError');
    if (paymentError) paymentError.textContent = '';
    if (paymentMethod === 'card') {
      const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
      const expiry = document.getElementById('cardExpiry').value;
      const cardName = document.getElementById('cardName').value.trim();
      const cardCvv = document.getElementById('cardCvv').value;
      const digits = cardNumber.split('').reverse().map(Number);
      const checksum = digits.reduce((sum, digit, index) => sum + (index % 2 ? (digit * 2 > 9 ? digit * 2 - 9 : digit * 2) : digit), 0);
      const [month, year] = expiry.split('/').map(Number);
      const expiryDate = new Date(2000 + year, month - 1, 1);
      const validExpiry = /^\d{2}\/\d{2}$/.test(expiry) && month >= 1 && month <= 12 && expiryDate >= new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      if (!cardName || cardNumber.length < 12 || checksum % 10 !== 0 || !validExpiry || !/^\d{3,4}$/.test(cardCvv)) {
        if (paymentError) paymentError.textContent = 'Please check the cardholder name, 16-digit card number, future expiry date and 3-digit CVV.';
        return;
      }
    }
    /** @type {Booking} */
    const cardBrand = bookingForm.querySelector('input[name="cardBrand"]:checked')?.value || null;
    const booking = { bookingId: `SN-${Date.now().toString(36).toUpperCase()}`, propertyId: property.id, property, checkIn: checkIn.value, checkOut: checkOut.value, adults: Number(adults.value), children: Number(children.value), guests: guestTotal, nights, cleaningFee: 25000, serviceFee: 18000, total: property.price * 1500 * nights + 43000, paymentMethod, cardBrand, paymentStatus: paymentMethod === 'transfer' ? 'Awaiting transfer confirmation' : `${cardBrand} card authorization simulated`, transferAccount: paymentMethod === 'transfer' ? document.getElementById('accountNumber')?.textContent : null, createdAt: new Date().toISOString() };
    localStorage.setItem(`staynest-booking-${booking.bookingId}`, JSON.stringify(booking)); localStorage.setItem('staynest-latest-booking', JSON.stringify(booking)); window.location.href = `confirmation.html?id=${booking.bookingId}`;
  });
  calculate();
  const injectPaymentInterface = () => {
    const form = document.getElementById('bookingForm');
    const submitButton = form?.querySelector('.confirm-button');
    if (!form || !submitButton) return null;

    const styles = document.createElement('style');
    styles.textContent = `.payment-section{margin-top:26px;padding-top:22px;border-top:1px solid #d9e5dd}.payment-section h2{margin:0 0 6px;font:700 1.25rem Georgia,serif}.payment-prompt{margin:0 0 14px;color:#687970;font-size:.86rem}.payment-security{display:flex;gap:10px;align-items:flex-start;margin:0 0 14px;padding:11px;border-radius:9px;background:#f2f8f3;color:#1f7658}.payment-security span:first-child{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#1f7658;color:#fff;font-weight:700}.payment-security strong,.payment-security small{display:block}.payment-security small{margin-top:3px;color:#687970;font-size:.78rem}.payment-options{display:grid;grid-template-columns:1fr 1fr;gap:10px}.payment-option{display:flex!important;align-items:flex-start;gap:9px;margin:0!important;padding:12px;border:1px solid #d9e5dd;border-radius:10px;background:#fff;cursor:pointer}.payment-option:has(input:checked){border-color:#1f7658;background:#eef6f0}.payment-option input{width:auto!important;margin-top:3px}.payment-option strong,.payment-option small{display:block}.payment-option strong{color:#14251f;font-size:.86rem}.payment-option small{margin-top:3px;color:#687970;font-weight:400}.card-fields{display:grid;grid-template-columns:1fr 1fr;gap:0 12px;margin-top:12px}.payment-hint{grid-column:1/-1;margin:0 0 8px;color:#687970;font-size:.78rem;line-height:1.4}.card-fields>label:first-of-type,.card-fields>label:nth-of-type(2){grid-column:1/-1}.card-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;grid-column:1/-1}.transfer-details{margin-top:12px;padding:15px;border-radius:10px;background:#eef6f0;color:#14251f}.transfer-details p{margin:0 0 12px;color:#687970;font-size:.82rem}.transfer-details div{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid #d9e5dd;font-size:.82rem}.transfer-details span{color:#687970}.transfer-details small{display:block;margin-top:12px;color:#687970;line-height:1.4}.copy-button{border:0;background:transparent;color:#1f7658;font-weight:700;cursor:pointer}.payment-section [hidden]{display:none!important}@media(max-width:560px){.payment-options{grid-template-columns:1fr}.card-fields{grid-template-columns:1fr}.card-row{grid-column:auto}}`;
    document.head.appendChild(styles);
    const section = document.createElement('section');
    section.className = 'payment-section';
    section.innerHTML = `<h2>Payment method</h2><p class="payment-prompt">Choose how you would like to secure this reservation. This is a demo checkout; no real payment is taken.</p><div class="payment-security"><span aria-hidden="true">✓</span><span><strong>Safe and transparent</strong><small>Your details stay in this demo and no money leaves your account.</small></span></div><div class="payment-options"><label class="payment-option"><input type="radio" name="paymentMethod" value="card" checked><span><strong>Pay with card</strong><small>Visa, Mastercard or Verve</small></span></label><label class="payment-option"><input type="radio" name="paymentMethod" value="transfer"><span><strong>Bank transfer</strong><small>Reserve now, confirm transfer later</small></span></label></div><div class="card-fields" id="cardFields"><p class="payment-hint">Try the demo card: 4242 4242 4242 4242 · expiry 12/30 · CVV 123</p><label>Cardholder name<input id="cardName" autocomplete="cc-name" placeholder="Enter the name on the card"></label><label>Card number<input id="cardNumber" inputmode="numeric" autocomplete="cc-number" placeholder="0000 0000 0000 0000" maxlength="19"></label><div class="card-row"><label>Expiry<input id="cardExpiry" inputmode="numeric" placeholder="MM/YY" maxlength="5"></label><label>CVV<input id="cardCvv" inputmode="numeric" placeholder="123" maxlength="3"></label></div></div><div class="transfer-details" id="transferDetails" hidden><p>Use your booking reference as the transfer narration. Your reservation stays pending until it is confirmed.</p><div><span>Bank</span><strong>StayNest Trust Bank</strong></div><div><span>Account name</span><strong>StayNest Reservations</strong></div><div><span>Account number</span><strong id="accountNumber"></strong><button type="button" class="copy-button" id="copyAccount">Copy</button></div><small>No payment is processed by this demo.</small></div><div class="form-error" id="paymentError" role="alert"></div>`;
    form.insertBefore(section, submitButton);
    const cardFields = section.querySelector('#cardFields');
    const brandField = document.createElement('div');
    brandField.className = 'card-brand-field';
    brandField.innerHTML = '<span class="payment-prompt">Card type</span><div class="card-brands"><label class="card-brand"><input type="radio" name="cardBrand" value="Visa" checked><span>Visa</span></label><label class="card-brand"><input type="radio" name="cardBrand" value="Mastercard"><span>Mastercard</span></label><label class="card-brand"><input type="radio" name="cardBrand" value="Verve"><span>Verve</span></label></div>';
    cardFields.prepend(brandField);
    const brandStyles = document.createElement('style');
    brandStyles.textContent = '.card-brand-field{grid-column:1/-1}.card-brands{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.card-brand{display:flex!important;align-items:center;gap:6px;margin:0!important;padding:9px!important;border:1px solid #d9e5dd;border-radius:8px;background:#fff;cursor:pointer}.card-brand:has(input:checked){border-color:#1f7658;background:#eef6f0}.card-brand input{width:auto!important}@media(max-width:560px){.card-brands{grid-template-columns:1fr}}';
    document.head.appendChild(brandStyles);
    const accountNumber = `102${String(Date.now()).slice(-8)}`;
    section.querySelector('#accountNumber').textContent = accountNumber;
    section.querySelector('#copyAccount').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(accountNumber); } catch (_) { /* Clipboard may be unavailable on file URLs. */ }
      section.querySelector('#copyAccount').textContent = 'Copied';
    });
    section.querySelectorAll('input[name="paymentMethod"]').forEach((input) => input.addEventListener('change', () => {
      const transfer = input.value === 'transfer' && input.checked;
      section.querySelector('#cardFields').hidden = transfer;
      section.querySelector('#transferDetails').hidden = !transfer;
      submitButton.textContent = transfer ? 'Reserve & get transfer details' : 'Confirm & reserve with card';
    }));
    section.querySelector('#cardNumber').addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    });
    section.querySelector('#cardExpiry').addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');
    });
    return { section, accountNumber };
  };
  const payment = injectPaymentInterface();
}
