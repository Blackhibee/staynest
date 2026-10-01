const params = new URLSearchParams(window.location.search);
const propertyId = params.get('id');
const property = JSON.parse(sessionStorage.getItem(`staynest-property-${propertyId}`) || 'null');
const checkIn = params.get('checkIn');
const checkOut = params.get('checkOut');
const guests = Number(params.get('adults') || 2);
const page = document.getElementById('paymentPage');
const status = document.getElementById('paymentStatus');
const money = (value) => `₦${value.toLocaleString('en-NG')}`;
const today = new Date().toISOString().split('T')[0];

if (!property || !checkIn || !checkOut) {
  status.style.display = 'block';
} else {
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const nights = Math.round((end - start) / 86400000);
  const maxGuests = property.guests || 6;
  const nightlyPrice = property.price * 1500;
  const cleaningFee = 25000;
  const serviceFee = 18000;
  const total = nightlyPrice * nights + cleaningFee + serviceFee;
  const set = (id, value) => { document.getElementById(id).textContent = value; };

  if (nights < 1 || checkIn < today || guests < 1 || guests > maxGuests) {
    status.textContent = 'The reservation details are no longer valid. Return to the property and try again.';
    status.style.display = 'block';
  } else {
    page.hidden = false;
    document.title = `StayNest | Payment for ${property.name}`;
    document.getElementById('paymentImage').src = property.image;
    document.getElementById('paymentImage').alt = property.name;
    document.getElementById('backToProperty').href = `property.html?id=${encodeURIComponent(propertyId)}`;
    set('paymentName', property.name); set('paymentLocation', property.location); set('paymentDates', `${checkIn} to ${checkOut}`); set('paymentGuests', `${guests} guest${guests === 1 ? '' : 's'}`);
    set('pricePerNight', money(nightlyPrice)); set('nightCount', String(nights)); set('cleaningFee', money(cleaningFee)); set('serviceFee', money(serviceFee)); set('totalPrice', money(total));
    document.getElementById('accountNumber').textContent = `102${String(Date.now()).slice(-8)}`;

    const form = document.getElementById('paymentForm');
    const cardFields = document.getElementById('cardFields');
    const transferFields = document.getElementById('transferFields');
    const payButton = document.getElementById('payButton');
    const paymentError = document.getElementById('paymentError');
    form.querySelectorAll('input[name="paymentMethod"]').forEach((input) => input.addEventListener('change', () => {
      const transfer = input.value === 'transfer' && input.checked;
      cardFields.hidden = transfer;
      transferFields.hidden = !transfer;
      payButton.textContent = transfer ? 'Reserve & get transfer details' : 'Confirm & reserve with card';
      paymentError.textContent = '';
    }));
    document.getElementById('cardNumber').addEventListener('input', (event) => { event.target.value = event.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); });
    document.getElementById('cardExpiry').addEventListener('input', (event) => { event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2'); });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      paymentError.textContent = '';
      const paymentMethod = form.querySelector('input[name="paymentMethod"]:checked').value;
      if (paymentMethod === 'card') {
        const number = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiry = document.getElementById('cardExpiry').value;
        const [month, year] = expiry.split('/').map(Number);
        const digits = number.split('').reverse().map(Number);
        const checksum = digits.reduce((sum, digit, index) => sum + (index % 2 ? (digit * 2 > 9 ? digit * 2 - 9 : digit * 2) : digit), 0);
        const validExpiry = /^\d{2}\/\d{2}$/.test(expiry) && month >= 1 && month <= 12 && new Date(2000 + year, month - 1, 1) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        if (!document.getElementById('cardName').value.trim() || number.length < 12 || checksum % 10 !== 0 || !validExpiry || !/^\d{3,4}$/.test(document.getElementById('cardCvv').value)) {
          paymentError.textContent = 'Please check your name, card number, future expiry date and CVV. Use the demo details shown above.';
          return;
        }
      }
      const bookingId = `SN-${Date.now().toString(36).toUpperCase()}`;
      const booking = { bookingId, propertyId, property, checkIn, checkOut, adults: guests, children: 0, guests, nights, cleaningFee, serviceFee, total, paymentMethod, paymentStatus: paymentMethod === 'transfer' ? 'Awaiting transfer confirmation' : 'Demo card authorization simulated', createdAt: new Date().toISOString() };
      localStorage.setItem(`staynest-booking-${bookingId}`, JSON.stringify(booking));
      localStorage.setItem('staynest-latest-booking', JSON.stringify(booking));
      window.location.href = `confirmation.html?id=${bookingId}`;
    });
  }
}
