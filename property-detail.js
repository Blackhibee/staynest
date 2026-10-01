const propertyData = {
  'lagos-1': { name: 'Ocean View Residence', location: 'Lekki Phase 1, Lagos', type: 'Entire apartment', price: 180, rating: 4.9, reviews: 124, guests: 6, bedrooms: 3, bathrooms: 2, beds: 3, host: 'Amaka Okafor', hostInitials: 'AO', description: 'A bright, calm residence close to the best of Lekki. Enjoy generous living spaces, coastal breezes and thoughtful touches for a relaxed city stay.', amenities: ['Wi-Fi', 'Swimming pool', 'Workspace', 'Beach access', 'Kitchen', 'Free parking'], images: ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80'] },
  'lagos-2': { name: 'Bungalow by the Coast', location: 'Victoria Island, Lagos', type: 'Beachfront villa', price: 210, rating: 4.8, reviews: 98, guests: 6, bedrooms: 3, bathrooms: 2, beds: 3, host: 'Tunde Adebayo', hostInitials: 'TA', description: 'A warm coastal bungalow made for slow mornings, evening swims and easy access to Victoria Island dining.', amenities: ['Wi-Fi', 'Swimming pool', 'Beach access', 'Kitchen', 'Air conditioning'], images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80'] },
  'lagos-3': { name: 'Palm Crest Residence', location: 'Ikoyi, Lagos', type: 'Penthouse apartment', price: 240, rating: 4.9, reviews: 76, guests: 4, bedrooms: 2, bathrooms: 2, beds: 2, host: 'Kemi Williams', hostInitials: 'KW', description: 'A polished penthouse with leafy views, quiet corners for work and a refined lounge for evenings in.', amenities: ['Wi-Fi', 'Swimming pool', 'Workspace', 'Gym', 'Kitchen'], images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80'] },
  'abuja-1': { name: 'Garden Loft', location: 'Wuse, Abuja', type: 'Private apartment', price: 150, rating: 4.8, reviews: 63, guests: 2, bedrooms: 1, bathrooms: 1, beds: 1, host: 'Musa Bello', hostInitials: 'MB', description: 'A quiet, garden-facing loft in the heart of Wuse, with everything needed for a comfortable city break.', amenities: ['Wi-Fi', 'Workspace', 'Swimming pool', 'Kitchen', 'Free parking'], images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80'] }
};

const fallbackImages = ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85'];
const queryId = new URLSearchParams(window.location.search).get('id');
const returnUrl = sessionStorage.getItem('staynest-return-url') || 'explore.html';
const routeMatch = window.location.pathname.match(/\/properties\/([^/]+)/);
const propertyId = queryId || (routeMatch && routeMatch[1]) || 'lagos-1';
const storedProperty = sessionStorage.getItem(`staynest-property-${propertyId}`);
const selectedProperty = propertyData[propertyId] || (storedProperty ? JSON.parse(storedProperty) : propertyData['lagos-1']);
const property = {
  ...selectedProperty,
  type: selectedProperty.type || selectedProperty.propertyType || selectedProperty.tag || 'Apartment',
  reviews: selectedProperty.reviews || 48,
  guests: selectedProperty.guests || 2,
  bedrooms: selectedProperty.bedrooms || 1,
  bathrooms: selectedProperty.bathrooms || 1,
  beds: selectedProperty.beds || selectedProperty.bedrooms || 1,
  host: selectedProperty.host || 'A StayNest host',
  hostInitials: selectedProperty.hostInitials || 'SN',
  description: selectedProperty.description || `Enjoy a comfortable ${selectedProperty.propertyType || 'home'} in ${selectedProperty.location}. It is thoughtfully prepared for an easy, memorable stay.`,
  amenities: selectedProperty.amenities || ['Wi-Fi', 'Kitchen', 'Workspace'],
  security: selectedProperty.security || 'Gated access, exterior lighting, secure parking and an on-site support contact.',
  electricity: selectedProperty.electricity || 'Reliable public power with backup inverter and generator support for essential appliances.',
  facilities: selectedProperty.facilities || 'Air conditioning, fast Wi-Fi, smart TV, fitted kitchen, hot water and dedicated workspace.',
  images: selectedProperty.images || [selectedProperty.image]
};
const page = document.getElementById('propertyPage');
const setText = (id, text) => { document.getElementById(id).textContent = text; };
const images = property.images || fallbackImages;

if (page) page.hidden = false;
if (!routeMatch) window.history.replaceState({}, '', `/properties/${propertyId}`);
document.title = `StayNest | ${property.name}`;
document.querySelectorAll('.back-link, .related-section .section-heading > a, .status-message a').forEach((link) => { link.href = returnUrl; });
setText('propertyName', property.name); setText('propertyType', property.type); setText('propertyLocation', property.location);
setText('propertyRating', `★ ${property.rating} · ${property.reviews} reviews`); setText('propertyDescription', property.description);
setText('propertyBedrooms', `${property.bedrooms} bedrooms · ${property.beds} beds`); setText('propertySecurity', property.security); setText('propertyElectricity', property.electricity); setText('propertyFacilities', property.facilities);
setText('bookingPrice', `$${property.price}`); setText('hostName', `Hosted by ${property.host}`); setText('mapLabel', property.location);
const mapPlaceholder = document.querySelector('.map-placeholder');
if (mapPlaceholder) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`;
  mapPlaceholder.innerHTML = `<span>◎</span><strong>Map preview</strong><small>${property.location}</small><a class="map-action" href="${mapUrl}" target="_blank" rel="noopener">Open in Google Maps →</a>`;
}
document.getElementById('hostAvatar').textContent = property.hostInitials || 'SN';
document.getElementById('propertySpecs').innerHTML = [['Guests', property.guests || 2], ['Bedrooms', property.bedrooms || 1], ['Bathrooms', property.bathrooms || 1], ['Beds', property.beds || property.bedrooms || 1]].map(([label, value]) => `<div class="spec-item"><strong>${value}</strong><span>${label}</span></div>`).join('');
document.getElementById('amenityList').innerHTML = (property.amenities || ['Wi-Fi', 'Kitchen']).map((amenity) => `<div class="amenity-item"><span aria-hidden="true">✦</span><span>${amenity}</span></div>`).join('');

const mainPhoto = document.getElementById('mainPhoto');
const additionalPhotos = document.getElementById('additionalPhotos');
const renderGallery = () => { mainPhoto.src = images[0]; mainPhoto.alt = `${property.name} main view`; additionalPhotos.innerHTML = images.slice(1).map((image, index) => `<button type="button" class="photo-thumb" data-image="${image}"><img src="${image}" alt="${property.name} photo ${index + 2}" /></button>`).join(''); additionalPhotos.querySelectorAll('.photo-thumb').forEach((button) => button.addEventListener('click', () => { mainPhoto.src = button.dataset.image; })); };
renderGallery();

const lightbox = document.getElementById('photoLightbox');
const lightboxPhoto = document.getElementById('lightboxPhoto');
const openLightbox = (image = mainPhoto.src) => { lightboxPhoto.src = image; lightboxPhoto.alt = `${property.name} full-size photo`; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); };
document.getElementById('viewPhotos').addEventListener('click', () => openLightbox());
mainPhoto.addEventListener('click', () => openLightbox());
document.querySelectorAll('.photo-thumb').forEach((button) => button.addEventListener('dblclick', () => openLightbox(button.dataset.image)));
const closeLightbox = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); };
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

const detailCheckIn = document.getElementById('detailCheckIn');
const detailCheckOut = document.getElementById('detailCheckOut');
const detailGuestCount = document.getElementById('guestCount');
const detailBookingError = document.getElementById('detailBookingError');
const detailToday = new Date().toISOString().split('T')[0];
detailCheckIn.min = detailToday;
detailCheckOut.min = detailToday;
detailCheckIn.addEventListener('change', () => { detailCheckOut.min = detailCheckIn.value || detailToday; });

document.getElementById('bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  detailBookingError.textContent = '';
  const guests = Number(detailGuestCount.value);
  if (!detailCheckIn.value || detailCheckIn.value < detailToday) {
    detailBookingError.textContent = 'Choose a check-in date today or later.';
    return;
  }
  if (!detailCheckOut.value || detailCheckOut.value <= detailCheckIn.value) {
    detailBookingError.textContent = 'Choose a check-out date after check-in.';
    return;
  }
  if (guests > (property.guests || 6)) {
    detailBookingError.textContent = `This stay accommodates up to ${property.guests || 6} guests.`;
    return;
  }
  const reserveButton = document.querySelector('.reserve-button');
  reserveButton.disabled = true;
  reserveButton.textContent = 'Opening payment...';
  reserveButton.style.opacity = '0.72';
  reserveButton.style.cursor = 'wait';
  sessionStorage.setItem(`staynest-property-${propertyId}`, JSON.stringify(property));
  sessionStorage.setItem('staynest-return-url', window.location.href);
  const bookingParams = new URLSearchParams({ id: propertyId, checkIn: detailCheckIn.value, checkOut: detailCheckOut.value, adults: String(guests) });
  window.location.href = `/payment.html?${bookingParams.toString()}`;
});

const hostMessage = document.createElement('p');
hostMessage.className = 'host-action-message';
hostMessage.setAttribute('role', 'status');
document.querySelector('.host-section')?.appendChild(hostMessage);
document.querySelector('.outline-button')?.addEventListener('click', () => {
  hostMessage.textContent = `Message request sent to ${property.host}. They will respond within an hour.`;
});
document.querySelector('.host-link')?.addEventListener('click', () => {
  hostMessage.textContent = `${property.host} is a verified StayNest host with a ${property.rating} average guest rating.`;
});

const currentCity = property.location.split(',').pop().trim();
const recommendations = Object.entries(propertyData).filter(([id]) => id !== propertyId).sort(([, first], [, second]) => Number(second.location.includes(currentCity)) - Number(first.location.includes(currentCity))).slice(0, 3);
document.getElementById('relatedProperties').innerHTML = recommendations.map(([id, item]) => `<a class="related-card" href="property.html?id=${id}" aria-label="View ${item.name}"><img src="${(item.images || [item.image])[0]}" alt="${item.name}" /><span>${item.type}</span><strong>${item.name}</strong><small>${item.location} · $${item.price}/night</small><b>View stay →</b></a>`).join('');

const navMenu = document.querySelector('.nav-menu');
navMenu.addEventListener('click', () => { const expanded = navMenu.getAttribute('aria-expanded') === 'true'; navMenu.setAttribute('aria-expanded', String(!expanded)); document.querySelector('.detail-nav nav').classList.toggle('open', !expanded); });
