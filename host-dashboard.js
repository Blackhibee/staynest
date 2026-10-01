const sections = [
  { name: 'Overview', icon: '⌂' }, { name: 'My Properties', icon: '▦' },
  { name: 'Bookings', icon: '▤' }, { name: 'Calendar', icon: '▦' },
  { name: 'Messages', icon: '◌' }, { name: 'Earnings', icon: '₦' },
  { name: 'Reviews', icon: '★' }, { name: 'Settings', icon: '⚙' },
  { name: 'Help & Support', icon: '?' },
];

const properties = [
  { id: 'P-101', name: 'Ocean View Residence', location: 'Lekki Phase 1, Lagos', type: 'Apartment', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=760&q=85', status: 'Active', available: true, price: 120000, rating: 4.9, reviews: 18, bookings: 12, occupancy: 82, earnings: 684000 },
  { id: 'P-102', name: 'Garden Loft', location: 'Victoria Island, Lagos', type: 'Loft', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=760&q=85', status: 'Active', available: true, price: 105000, rating: 4.8, reviews: 12, bookings: 9, occupancy: 64, earnings: 512000 },
  { id: 'P-103', name: 'The Palm House', location: 'Ikoyi, Lagos', type: 'Villa', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=760&q=85', status: 'Draft', available: false, price: 185000, rating: 0, reviews: 0, bookings: 0, occupancy: 0, earnings: 0 },
];

let bookings = [
  { id: 'SN-2048', guest: 'David Adeyemi', email: 'david.adeyemi@example.com', phone: '+234 802 111 2048', property: 'Ocean View Residence', checkIn: '24 Oct, 2026', checkOut: '27 Oct, 2026', guests: 2, amount: 240000, state: 'Confirmed', payment: 'Paid', request: 'Late arrival around 9:30 PM, if possible.', created: '18 Oct, 2026' },
  { id: 'SN-2052', guest: 'Sarah Williams', email: 'sarah.williams@example.com', phone: '+234 803 222 2052', property: 'Garden Loft', checkIn: '28 Oct, 2026', checkOut: '31 Oct, 2026', guests: 3, amount: 315000, state: 'Pending', payment: 'Pending', request: 'Could we arrange an early check-in?', created: '20 Oct, 2026' },
  { id: 'SN-2056', guest: 'Chidi Okoro', email: 'chidi.okoro@example.com', phone: '+234 804 333 2056', property: 'Ocean View Residence', checkIn: '04 Nov, 2026', checkOut: '06 Nov, 2026', guests: 2, amount: 180000, state: 'Pending', payment: 'Pending', request: 'Please let me know if parking is available.', created: '21 Oct, 2026' },
  { id: 'SN-2041', guest: 'Nneka Eze', email: 'nneka.eze@example.com', phone: '+234 805 444 2041', property: 'Ocean View Residence', checkIn: '18 Oct, 2026', checkOut: '20 Oct, 2026', guests: 2, amount: 160000, state: 'Completed', payment: 'Paid', request: 'None', created: '10 Oct, 2026' },
  { id: 'SN-2033', guest: 'Michael Reed', email: 'michael.reed@example.com', phone: '+234 806 555 2033', property: 'Garden Loft', checkIn: '12 Oct, 2026', checkOut: '14 Oct, 2026', guests: 2, amount: 175000, state: 'Cancelled', payment: 'Refunded', request: 'None', created: '05 Oct, 2026' },
];

let threads = [
  { guest: 'David Adeyemi', property: 'Ocean View Residence', booking: 'SN-2048', time: '10:42 AM', unread: true, messages: [{ text: 'Hello Amaka, we are looking forward to our stay!', host: false }, { text: 'Thanks! What time is check-in?', host: false }] },
  { guest: 'Sarah Williams', property: 'Garden Loft', booking: 'SN-2052', time: 'Yesterday', unread: true, messages: [{ text: 'Hi! Is parking available nearby?', host: false }] },
  { guest: 'Chidi Okoro', property: 'Ocean View Residence', booking: 'SN-2056', time: 'Mon', unread: false, messages: [{ text: 'That sounds perfect, thank you.', host: false }] },
];

const reviews = [
  { guest: 'Nneka Eze', property: 'Ocean View Residence', date: '20 Oct, 2026', rating: 5, text: 'A beautiful, spotless apartment and such a thoughtful host. Check-in was easy and the neighborhood was wonderful.' },
  { guest: 'Michael Reed', property: 'Garden Loft', date: '14 Oct, 2026', rating: 4, text: 'Lovely place with everything we needed. Amaka was very responsive and helpful throughout our stay.' },
  { guest: 'Fatima Bello', property: 'Ocean View Residence', date: '08 Oct, 2026', rating: 5, text: 'An exceptionally comfortable stay. We would happily book again.' },
];

let notifications = [
  { type: 'Bookings', icon: '▤', title: 'New booking request', text: 'Sarah Williams requested a stay at Garden Loft.', time: '12 min ago', read: false, section: 'Bookings' },
  { type: 'Messages', icon: '◌', title: 'New guest message', text: 'David asked about your check-in time.', time: '42 min ago', read: false, section: 'Messages' },
  { type: 'Payments', icon: '₦', title: 'Payment received', text: '₦240,000 for booking SN-2048 is ready.', time: '2 hours ago', read: false, section: 'Earnings' },
  { type: 'Reviews', icon: '★', title: 'A new 5-star review', text: 'Nneka shared kind words about her stay.', time: 'Yesterday', read: true, section: 'Reviews' },
  { type: 'Properties', icon: '⌂', title: 'Listing review update', text: 'The Palm House draft is ready to complete.', time: 'Yesterday', read: true, section: 'My Properties' },
  { type: 'System', icon: '✓', title: 'Host profile is secure', text: 'Your account security check is up to date.', time: '2 days ago', read: true, section: 'Settings' },
];

const content = document.getElementById('dashboardContent');
const sidebar = document.getElementById('dashboardSidebar');
const toast = document.getElementById('toast');
const modal = document.getElementById('appModal');
const modalContent = document.getElementById('modalContent');
let activeSection = 'Overview';
let selectedThread = 0;
let bookingFilter = 'All';
let bookingSearch = '';
let propertyFilter = 'All';
let propertySearch = '';
let propertyView = 'Grid';
let earningsPeriod = '30 Days';
let calendarDate = new Date(2026, 9, 1);
let selectedCalendarProperty = properties[0].id;
let selectedBooking = null;
let propertyWizardStep = 0;
let reviewFilter = 'All';
let settingsTab = 'Account';
let supportQuery = '';
let wizardData = {};
let toastTimer;
const money = (amount) => `₦${Number(amount).toLocaleString('en-NG')}`;
const safe = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const initials = (name) => String(name).split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
const todayLabel = () => new Intl.DateTimeFormat('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date());
const statusPill = (status) => `<span class="status-pill status-${safe(status.toLowerCase().replaceAll(' ', '-'))}"><i></i>${safe(status)}</span>`;

function showToast(message, kind = 'success') {
  toast.textContent = message;
  toast.dataset.kind = kind;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3600);
}
function setSection(section, updateHash = true) {
  activeSection = sections.some((item) => item.name === section) ? section : 'Overview';
  if (updateHash && window.location.protocol !== 'about:') history.replaceState(null, '', `#${encodeURIComponent(activeSection.toLowerCase().replaceAll(' ', '-').replace('&', 'and'))}`);
  document.getElementById('pageTitle').textContent = activeSection;
  document.getElementById('headerDate').textContent = todayLabel();
  document.querySelectorAll('.dashboard-nav [data-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === activeSection);
    button.setAttribute('aria-current', button.dataset.tab === activeSection ? 'page' : 'false');
  });
  document.getElementById('mobileWorkspaceNav').innerHTML = sections.map((item) => `<button type="button" class="${item.name === activeSection ? 'active' : ''}" data-tab="${safe(item.name)}"><span>${item.icon}</span>${safe(item.name)}</button>`).join('');
  const renderers = { Overview: renderOverview, 'My Properties': renderProperties, Bookings: renderBookings, Calendar: renderCalendar, Messages: renderMessages, Earnings: renderEarnings, Reviews: renderReviews, Settings: renderSettings, 'Help & Support': renderSupport };
  content.innerHTML = renderers[activeSection]().replaceAll('hosts@staynest.example', 'staynestcustomerservice@gmail.com');
  if (activeSection === 'Overview') renderCalendarChart();
  if (activeSection === 'Earnings') { const chart = document.getElementById('earningsChart'); if (chart) chart.innerHTML = chartMarkup(earningsPeriod); }
  closeMenus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function closeMenus() {
  sidebar.classList.remove('open');
  document.getElementById('sidebarScrim').classList.remove('visible');
  document.getElementById('menuButton').setAttribute('aria-expanded', 'false');
  ['notificationPopover', 'profilePopover'].forEach((id) => { document.getElementById(id).hidden = true; });
  document.getElementById('notificationButton').setAttribute('aria-expanded', 'false');
  document.getElementById('profileButton').setAttribute('aria-expanded', 'false');
}
function openModal(html, onReady) {
  modalContent.innerHTML = html.replaceAll('hosts@staynest.example', 'staynestcustomerservice@gmail.com');
  if (!modal.open) modal.showModal();
  onReady?.();
}
function closeModal() { if (modal.open) modal.close(); }

function bookingTable(rows, compact = false) {
  if (!rows.length) return '<div class="empty-state"><span>▤</span><strong>No bookings yet</strong><p>Your upcoming reservations will appear here.</p></div>';
  return `<div class="table-scroll"><table class="data-table"><thead><tr><th>Booking ID</th><th>Guest</th><th>Property</th><th>Check-in / out</th><th>Guests</th><th>Amount</th><th>Status</th>${compact ? '' : '<th>Actions</th>'}</tr></thead><tbody>${rows.map((b) => `<tr class="clickable-row" data-booking-detail="${safe(b.id)}"><td><strong>${safe(b.id)}</strong></td><td><strong>${safe(b.guest)}</strong></td><td>${safe(b.property)}</td><td>${safe(b.checkIn)}<small>to ${safe(b.checkOut)}</small></td><td>${b.guests}</td><td><strong>${money(b.amount)}</strong></td><td>${statusPill(b.state)}</td>${compact ? '' : `<td><button class="table-link" data-booking-detail="${safe(b.id)}">Details →</button></td>`}</tr>`).join('')}</tbody></table></div>`;
}
function activityItem(icon, title, detail, time) { return `<li class="activity-item"><span>${icon}</span><div><strong>${safe(title)}</strong><p>${safe(detail)}</p><small>${safe(time)}</small></div></li>`; }

function renderOverview() {
  const pending = bookings.filter((b) => b.state === 'Pending');
  const activity = [activityItem('▤', 'New booking request', 'Sarah Williams · Garden Loft', '12 minutes ago'), activityItem('◌', 'Guest sent a message', 'David asked about check-in', '42 minutes ago'), activityItem('★', 'New 5-star review', 'Nneka Eze · Ocean View Residence', 'Yesterday'), activityItem('₦', 'Payment received', '₦240,000 · booking SN-2048', 'Yesterday'), activityItem('↺', 'Booking cancelled', 'SN-2033 · Garden Loft', '2 days ago')].join('');
  return `<section class="welcome-panel"><div><span class="eyebrow">THURSDAY · HOST OVERVIEW</span><h2>Good evening, Amaka <span>👋</span></h2><p>Here’s what’s happening with your StayNest properties today.</p></div><div class="welcome-actions"><label class="date-control">Reporting period<select id="overviewPeriod"><option>Today</option><option selected>This month</option><option>Last month</option><option>This year</option></select></label><button class="secondary-button" data-tab="Calendar">View calendar</button></div></section>
  <section class="stat-grid"><article class="stat-card"><div><span>Total properties</span><i>⌂</i></div><strong>${properties.filter((p) => p.status === 'Active').length}</strong><small><b>+1</b> listing in review</small></article><article class="stat-card"><div><span>Active bookings</span><i>▤</i></div><strong>${bookings.filter((b) => ['Confirmed', 'Pending'].includes(b.state)).length}</strong><small><b>${pending.length} pending</b> host response</small></article><article class="stat-card"><div><span>Upcoming check-ins</span><i>⇥</i></div><strong>${bookings.filter((b) => b.state === 'Confirmed').length + pending.length}</strong><small><b>Next arrival</b> 24 October</small></article><article class="stat-card"><div><span>Monthly earnings</span><i>₦</i></div><strong>${money(1240000)}</strong><small><b>↗ 18.5%</b> this month</small></article></section>
  <section class="quick-actions"><span class="eyebrow">QUICK ACTIONS</span><button data-action="property-wizard">＋ Add property</button><button data-tab="Calendar">▦ View calendar</button><button data-tab="Bookings">▤ View bookings</button><button data-tab="Messages">◌ Check messages</button><button data-tab="Earnings">₦ View earnings</button></section>
  <div class="overview-grid"><section class="surface-card"><div class="card-heading"><div><span class="eyebrow">BOOKING ACTIVITY</span><h3>Upcoming stays</h3><p>Recent reservations and guest arrivals.</p></div><button class="text-action" data-tab="Bookings">View all bookings →</button></div>${bookingTable(bookings.filter((b) => ['Confirmed', 'Pending'].includes(b.state)).slice(0, 3), true)}</section><section class="surface-card chart-panel"><div class="card-heading"><div><span class="eyebrow">REVENUE PERFORMANCE</span><h3>Earnings at a glance</h3><p>Your hosting income over time.</p></div><select id="overviewChartPeriod" aria-label="Chart period"><option>7 Days</option><option selected>30 Days</option><option>6 Months</option><option>1 Year</option></select></div><div class="line-chart" id="overviewChart"></div></section></div>
  <section class="surface-card"><div class="card-heading"><div><span class="eyebrow">PROPERTY PERFORMANCE</span><h3>Your best-performing stays</h3><p>Occupancy, ratings and earnings across your portfolio.</p></div><button class="text-action" data-tab="My Properties">Manage properties →</button></div><div class="performance-list">${properties.filter((p) => p.status === 'Active').map((p) => `<article class="performance-card"><img src="${safe(p.image)}" alt="${safe(p.name)}"><div class="performance-body"><strong>${safe(p.name)}</strong><small>${safe(p.location)}</small><span class="stars">★★★★★ <b>${p.rating}</b></span><div class="progress-track"><i style="width:${p.occupancy}%"></i></div><span class="performance-meta">${p.occupancy}% occupancy <b>${p.bookings} bookings · ${money(p.earnings)}</b></span></div></article>`).join('')}</div></section>
  <section class="surface-card activity-card"><div class="card-heading"><div><span class="eyebrow">STAYNEST UPDATES</span><h3>Recent activity</h3><p>A helpful record of what’s happening with your stays.</p></div><button class="text-action" data-action="open-notifications">Notification center →</button></div><ol class="activity-list">${activity}</ol></section>`;
}
function chartMarkup(range = '30 Days') {
  const counts = range === '7 Days' ? 7 : range === '6 Months' ? 6 : range === '1 Year' ? 12 : 12;
  const values = range === '7 Days' ? [24, 55, 38, 70, 46, 88, 66] : [32, 52, 41, 67, 49, 78, 61, 92, 70, 82, 60, 100];
  const labels = range === '7 Days' ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'] : range === '6 Months' ? ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] : ['1', '3', '5', '7', '9', '11'];
  const bars = values.slice(0, counts).map((height, i) => `<div class="chart-column"><i style="height:${height}%"></i><small>${labels[i] || ''}</small></div>`).join('');
  return `<div class="chart-axis"><span>₦600k</span><span>₦400k</span><span>₦200k</span><span>₦0</span></div><div class="chart-bars">${bars}</div>`;
}
function renderProperties() {
  const filtered = properties.filter((p) => (propertyFilter === 'All' || (propertyFilter === 'Active' ? p.status === 'Active' : propertyFilter === 'Draft' ? p.status === 'Draft' : !p.available)) && `${p.name} ${p.location} ${p.type}`.toLowerCase().includes(propertySearch.toLowerCase()));
  return `<section class="page-intro"><div><span class="eyebrow">YOUR STAYS</span><h2>My Properties</h2><p>Manage listing details, availability, and guest-ready status across your portfolio.</p></div><button class="primary-button" data-action="property-wizard">＋ Add new property</button></section><div class="toolbar"><div class="filter-pills" id="propertyFilters">${['All', 'Active', 'Draft', 'Unavailable'].map((f) => `<button class="${propertyFilter === f ? 'active' : ''}" data-property-filter="${f}">${f}<span>${f === 'All' ? properties.length : properties.filter((p) => f === 'Active' ? p.status === 'Active' : f === 'Draft' ? p.status === 'Draft' : !p.available).length}</span></button>`).join('')}</div><div class="toolbar-right"><label class="inline-search">⌕<input id="propertySearch" value="${safe(propertySearch)}" placeholder="Search properties..."></label><div class="view-switch"><button class="${propertyView === 'Grid' ? 'active' : ''}" data-property-view="Grid" aria-label="Grid view">▦</button><button class="${propertyView === 'List' ? 'active' : ''}" data-property-view="List" aria-label="List view">☷</button></div></div></div>${filtered.length ? `<div class="property-grid ${propertyView === 'List' ? 'list-view' : ''}">${filtered.map((p) => `<article class="property-card"><img src="${safe(p.image)}" alt="${safe(p.name)}"><div class="property-card-body"><div class="property-title"><h3>${safe(p.name)}</h3>${statusPill(p.status)}</div><p>${safe(p.location)} · ${safe(p.type)}</p><div class="property-details"><strong>${money(p.price)} <small>/ night</small></strong><span class="stars">${p.rating ? `★★★★★ ${p.rating} · ${p.reviews} reviews` : 'Not yet rated'}</span></div><div class="property-availability"><span>Availability</span><b class="${p.available ? 'available' : 'unavailable'}">${p.available ? 'Available for bookings' : 'Currently unavailable'}</b></div><div class="property-actions"><button data-property-action="View" data-property-id="${p.id}">View</button><button data-property-action="Edit" data-property-id="${p.id}">Edit</button><button data-property-action="Availability" data-property-id="${p.id}">Manage availability</button><button data-property-action="Bookings" data-property-id="${p.id}">Bookings</button><button data-property-action="Duplicate" data-property-id="${p.id}">Duplicate</button><button data-property-action="Delete" data-property-id="${p.id}">Delete</button></div></div></article>`).join('')}</div>` : '<div class="empty-state"><span>⌂</span><strong>No properties found</strong><p>Try another filter, or add your first StayNest property.</p><button class="primary-button" data-action="property-wizard">Add a property</button></div>'}`;
}
function renderBookings() {
  const filtered = bookings.filter((b) => (bookingFilter === 'All' || b.state === bookingFilter) && `${b.id} ${b.guest} ${b.property}`.toLowerCase().includes(bookingSearch.toLowerCase()));
  const tabs = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
  return `<section class="page-intro"><div><span class="eyebrow">GUEST STAYS</span><h2>Bookings</h2><p>Review reservations, manage requests and stay one step ahead of arrivals.</p></div><button class="secondary-button" data-tab="Calendar">▦ Open calendar</button></section><div class="toolbar booking-toolbar"><div class="filter-pills" id="bookingFilters">${tabs.map((f) => `<button class="${bookingFilter === f ? 'active' : ''}" data-booking-filter="${f}">${f}<span>${f === 'All' ? bookings.length : bookings.filter((b) => b.state === f).length}</span></button>`).join('')}</div><label class="inline-search">⌕<input id="bookingSearch" value="${safe(bookingSearch)}" placeholder="Search guest, property, ID..."></label></div><section class="surface-card"><div class="card-heading"><div><span class="eyebrow">RESERVATION MANAGER</span><h3>${bookingFilter === 'All' ? 'All bookings' : `${bookingFilter} bookings`}</h3><p>Select a booking row to view guest and reservation details.</p></div><span class="record-count">${filtered.length} stays</span></div>${bookingTable(filtered)}</section><section class="surface-card booking-calendar-teaser"><div><span class="eyebrow">PLAN AHEAD</span><h3>Keep your availability up to date</h3><p>Review check-ins, check-outs, blocked dates and open nights in your host calendar.</p></div><button class="secondary-button" data-tab="Calendar">Manage calendar →</button></section>`;
}
function renderCalendar() {
  const year = calendarDate.getFullYear(); const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); const days = new Date(year, month + 1, 0).getDate();
  const monthLabel = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(calendarDate);
  const cells = Array.from({ length: 42 }, (_, i) => {
    const n = i - firstDay + 1; if (n < 1 || n > days) return '<span class="calendar-cell blank"></span>';
    const day = new Date(year, month, n); const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`;
    const blocked = getBlockedDates().includes(dateKey);
    const state = day.getDate() === 24 && month === 9 ? 'checkin' : day.getDate() === 27 && month === 9 ? 'checkout' : day.getDate() === 29 && month === 9 ? 'booked' : '';
    return `<button type="button" class="calendar-cell ${state} ${blocked ? 'blocked' : ''}" data-calendar-date="${dateKey}" title="${blocked ? 'Blocked—click to unblock' : 'Click to block this date'}"><span>${n}</span>${state ? `<i>${state === 'checkin' ? 'Check-in' : state === 'checkout' ? 'Check-out' : 'Booked'}</i>` : blocked ? '<i>Blocked</i>' : ''}</button>`;
  }).join('');
  return `<section class="page-intro"><div><span class="eyebrow">AVAILABILITY PLANNER</span><h2>Host Calendar</h2><p>See reservations at a glance and protect the dates you need for yourself.</p></div><label class="date-control">Property<select id="calendarProperty">${properties.map((p) => `<option value="${p.id}" ${selectedCalendarProperty === p.id ? 'selected' : ''}>${safe(p.name)}</option>`).join('')}</select></label></section><section class="calendar-layout"><article class="surface-card calendar-panel"><div class="calendar-heading"><button data-calendar-step="-1" aria-label="Previous month">‹</button><h3>${monthLabel}</h3><button data-calendar-step="1" aria-label="Next month">›</button></div><div class="calendar-grid weekday-row">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => `<span>${d}</span>`).join('')}</div><div class="calendar-grid">${cells}</div><div class="calendar-legend"><span><i class="legend-checkin"></i>Check-in / out</span><span><i class="legend-booked"></i>Booked</span><span><i class="legend-blocked"></i>Blocked</span><span><i class="legend-open"></i>Available</span></div></article><aside class="surface-card calendar-side"><span class="eyebrow">QUICK GUIDE</span><h3>Manage your availability</h3><p>Select any date to block it. Select a blocked day again to open it back up.</p><div class="calendar-note"><strong>Next check-in</strong><span>David Adeyemi · 24 Oct</span><small>Ocean View Residence</small></div><div class="calendar-note"><strong>Next check-out</strong><span>David Adeyemi · 27 Oct</span><small>Ocean View Residence</small></div><label class="toggle-row"><span><strong>Sync calendar</strong><small>Connect an external booking calendar.</small></span><button class="text-action" data-action="sync-calendar" type="button">Connect</button></label></aside></section>`;
}
function getBlockedDates() { try { return JSON.parse(localStorage.getItem('staynest-blocked-dates') || '[]'); } catch { return []; } }
function renderMessages() {
  if (!threads.length) return `<div class="empty-state"><span>◌</span><strong>You’re all caught up</strong><p>Guest conversations will appear here.</p></div>`;
  const thread = threads[selectedThread] || threads[0]; const unread = threads.filter((t) => t.unread).length;
  return `<section class="page-intro"><div><span class="eyebrow">GUEST COMMUNICATION</span><h2>Messages</h2><p>Thoughtful, timely replies make every stay feel personal.</p></div><span class="quiet-tag">${unread} unread</span></section><section class="inbox"><div class="thread-list">${threads.map((t, i) => `<button class="thread-item ${i === selectedThread ? 'selected' : ''}" data-thread="${i}"><span class="guest-avatar">${initials(t.guest)}</span><span class="thread-copy"><strong>${safe(t.guest)}</strong><small>${safe(t.property)}</small><span>${safe(t.messages.at(-1)?.text || '')}</span></span><span class="thread-meta">${safe(t.time)}${t.unread ? '<i></i>' : ''}</span></button>`).join('')}</div><div class="conversation"><header><span class="guest-avatar">${initials(thread.guest)}</span><div><strong>${safe(thread.guest)}</strong><small>${safe(thread.property)} · ${safe(thread.booking)}</small></div><button data-booking-detail="${safe(thread.booking)}">Booking details →</button></header><div class="conversation-messages"><p class="conversation-date">CONVERSATION</p>${thread.messages.map((m) => `<p class="message-bubble ${m.host ? 'host-message' : 'guest-message'}">${safe(m.text)}</p>`).join('')}</div><div class="quick-replies"><span>Quick replies</span><button data-quick-reply="Thanks for booking with us. We look forward to welcoming you!">Thanks for booking</button><button data-quick-reply="Your check-in instructions are ready. Please let me know your arrival time.">Check-in details</button><button data-quick-reply="Could you please confirm your estimated arrival time?">Ask arrival time</button></div><div class="ai-assistant"><div><span>✦</span><strong>StayNest AI assistant</strong><small>Drafts for your approval only—nothing sends automatically.</small></div><button data-action="ai-draft">Draft a reply</button><button data-action="ai-summary">Summarize</button></div><form id="messageForm" class="message-compose"><label class="attach-button" title="Attach a file">＋<input id="messageAttachment" type="file" hidden></label><input name="message" id="messageInput" placeholder="Write a thoughtful reply..." maxlength="500" required><button class="primary-button" type="submit">Send <span>→</span></button></form><span id="attachmentName" class="attachment-name"></span></div></section>`;
}
function renderEarnings() {
  const amount = earningsPeriod === '7 Days' ? '₦310,000' : earningsPeriod === '6 Months' ? '₦6,840,000' : earningsPeriod === '1 Year' ? '₦12,480,000' : '₦1,240,000';
  const transactions = bookings.filter((b) => ['Paid', 'Refunded', 'Pending'].includes(b.payment));
  return `<section class="page-intro"><div><span class="eyebrow">YOUR PAYOUTS</span><h2>Earnings</h2><p>Understand your hosting income, payout schedule and transaction history.</p></div><button class="secondary-button" data-action="download-statement">↓ Download statement</button></section><div class="earnings-stat-grid"><article><span>Total earnings</span><strong>₦8,420,000</strong><small>All time · before fees</small></article><article><span>Available balance</span><strong>₦840,000</strong><small>Ready for your next payout</small></article><article><span>Pending payments</span><strong>₦315,000</strong><small>1 guest payment processing</small></article><article><span>This month</span><strong>₦1,240,000</strong><small><b>+18.5%</b> versus last month</small></article></div><section class="surface-card"><div class="card-heading"><div><span class="eyebrow">REVENUE PERFORMANCE</span><h3>Earnings trend</h3><p>Track your hosting income over time.</p></div><div class="filter-pills compact-pills" id="earningsFilters">${['7 Days', '30 Days', '6 Months', '1 Year'].map((r) => `<button class="${earningsPeriod === r ? 'active' : ''}" data-earnings-period="${r}">${r}</button>`).join('')}</div></div><div class="line-chart large-chart" id="earningsChart"></div></section><div class="earnings-grid"><section class="surface-card breakdown-card"><div class="card-heading"><div><span class="eyebrow">THE DETAILS</span><h3>Earnings breakdown</h3></div></div><p><span>Booking revenue</span><b>₦1,500,000</b></p><p><span>Platform &amp; service fees</span><b>− ₦112,500</b></p><p><span>Taxes</span><b>− ₦97,500</b></p><p><span>Refunds</span><b>− ₦50,000</b></p><p class="net-total"><span>Net earnings</span><b>₦1,240,000</b></p></section><section class="surface-card payout-card"><span class="eyebrow">NEXT PAYOUT</span><strong>₦240,000</strong><p>Estimated 28 October, 2026</p><div><span>Bank account · •••• 4821</span><b>Verified</b></div><button class="text-action" data-tab="Settings">Manage payout details →</button></section></div><section class="surface-card"><div class="card-heading"><div><span class="eyebrow">TRANSACTION HISTORY</span><h3>Recent transactions</h3><p>Includes booking, fees, and payout status.</p></div></div><div class="table-scroll"><table class="data-table"><thead><tr><th>Transaction</th><th>Booking / Guest</th><th>Property</th><th>Date</th><th>Amount</th><th>Fee</th><th>Host earnings</th><th>Status</th></tr></thead><tbody>${transactions.map((b, i) => `<tr><td>TX-${i + 7081}</td><td>${safe(b.id)}<small>${safe(b.guest)}</small></td><td>${safe(b.property)}</td><td>${safe(b.created)}</td><td>${money(b.amount)}</td><td>${money(Math.round(b.amount * .075))}</td><td><strong>${money(Math.round(b.amount * .925))}</strong></td><td>${statusPill(b.payment)}</td></tr>`).join('')}</tbody></table></div></section>`;
}
function renderReviews() {
  const shown = reviews.filter((r) => reviewFilter === 'All' || r.rating === Number(reviewFilter));
  return `<section class="page-intro"><div><span class="eyebrow">GUEST FEEDBACK</span><h2>Reviews</h2><p>Celebrate the details guests loved and respond with care.</p></div><div class="rating-summary"><strong>★ 4.8</strong><span>Overall rating · 30 reviews</span></div></section><section class="rating-overview surface-card"><div class="rating-score"><strong>4.8</strong><span class="stars">★★★★★</span><small>Based on 30 guest reviews</small></div><div class="rating-distribution">${[5, 4, 3, 2, 1].map((n) => `<div><span>${n} stars</span><i><b style="width:${n === 5 ? 76 : n === 4 ? 18 : 4}%"></b></i><small>${n === 5 ? 23 : n === 4 ? 5 : n === 3 ? 1 : 0}</small></div>`).join('')}</div><div class="category-ratings">${[['Cleanliness', 4.9], ['Communication', 4.9], ['Location', 4.8], ['Accuracy', 4.8], ['Check-in', 4.7], ['Value', 4.6]].map(([label, score]) => `<div><span>${label}</span><b>★ ${score}</b></div>`).join('')}</div></section><div class="toolbar"><div class="filter-pills" id="reviewFilters">${['All', '5', '4', '3', '2', '1'].map((f) => `<button class="${reviewFilter === f ? 'active' : ''}" data-review-filter="${f}">${f === 'All' ? 'All reviews' : `${f} stars`}</button>`).join('')}</div></div><div class="review-list">${shown.map((r, i) => `<article class="review-card"><header><span class="guest-avatar">${initials(r.guest)}</span><div><strong>${safe(r.guest)}</strong><small>${safe(r.property)} · ${safe(r.date)}</small></div><span class="star-rating">${'★'.repeat(r.rating)}<i>${'★'.repeat(5-r.rating)}</i></span></header><p class="review-quote">“${safe(r.text)}”</p>${r.reply ? `<div class="posted-reply"><strong>Your response</strong><p>${safe(r.reply)}</p></div>` : `<form class="review-reply-form" data-review-index="${reviews.indexOf(r)}"><label>Write a public response</label><div><input name="reply" maxlength="300" placeholder="Thank your guest for sharing..." required><button type="submit">Post response</button></div></form>`}</article>`).join('') || '<div class="empty-state"><span>★</span><strong>No reviews in this filter</strong><p>Choose another rating to see more feedback.</p></div>'}</div>`;
}
function renderSettings() {
  const tabs = ['Account', 'Security', 'Notifications', 'Payments', 'Privacy', 'Hosting'];
  let saved = {}; try { saved = JSON.parse(localStorage.getItem('staynest-host-settings') || '{}'); } catch {}
  let panel = '';
  if (settingsTab === 'Account') panel = `<div class="form-grid"><label>Full name<input name="name" value="${safe(saved.name || 'Amaka Okafor')}" required></label><label>Email address<input name="email" type="email" value="${safe(saved.email || 'amaka.okafor@example.com')}" required></label><label>Phone number<input name="phone" type="tel" value="${safe(saved.phone || '+234 803 555 0142')}"></label><label>Profile photo<input name="photo" type="file" accept="image/*"></label><label class="full-field">Host bio<textarea name="bio" rows="3" placeholder="Share a little about yourself and your approach to hosting.">${safe(saved.bio || '')}</textarea></label></div>`;
  if (settingsTab === 'Security') panel = `<div class="settings-grid"><label>Current password<input type="password" placeholder="Enter current password"></label><label>New password<input type="password" placeholder="Choose a strong password"></label><label class="toggle-row"><span><strong>Two-factor authentication</strong><small>Add another layer of sign-in security.</small></span><input type="checkbox" checked></label><label class="toggle-row"><span><strong>Security notifications</strong><small>Get alerts about new sign-ins.</small></span><input type="checkbox" checked></label><div class="security-note">Recent login · This device · Today</div></div>`;
  if (settingsTab === 'Notifications') panel = `<div class="notification-settings">${['Booking updates', 'Guest messages', 'New reviews', 'Payments and payouts', 'Product news'].map((name, i) => `<div class="notification-setting"><strong>${name}</strong>${['Email', 'Push', 'SMS'].map((channel, c) => `<label>${channel}<input type="checkbox" ${i < 4 && c < 2 ? 'checked' : ''}></label>`).join('')}</div>`).join('')}</div>`;
  if (settingsTab === 'Payments') panel = `<div class="form-grid"><label>Bank account holder<input value="Amaka Okafor"></label><label>Bank name<select><option>Choose bank</option><option>Access Bank</option><option>GTBank</option><option>Zenith Bank</option></select></label><label>Account number<input inputmode="numeric" placeholder="Enter account number"></label><label>Payout schedule<select><option>After each completed stay</option><option>Weekly</option><option>Monthly</option></select></label><label>Tax ID<input placeholder="Optional tax identification number"></label><p class="security-note full-field">Your payout information is encrypted and visible only to you.</p></div>`;
  if (settingsTab === 'Privacy') panel = `<div class="settings-grid">${[['Profile visibility', 'Allow guests to see your host profile.'], ['Data insights', 'Use anonymized stay trends to improve StayNest.'], ['Guest communications', 'Allow important service emails from StayNest.']].map(([a,b]) => `<label class="toggle-row"><span><strong>${a}</strong><small>${b}</small></span><input type="checkbox" checked></label>`).join('')}<button class="secondary-button" data-action="download-data">Download my data</button><button class="danger-button" data-action="delete-account">Request account deletion</button></div>`;
  if (settingsTab === 'Hosting') panel = `<div class="form-grid"><label class="toggle-row"><span><strong>Instant booking</strong><small>Let guests book without a manual approval.</small></span><input type="checkbox"></label><label>Minimum stay<input type="number" min="1" value="1"></label><label>Maximum stay<input type="number" min="1" value="30"></label><label>Check-in time<input type="time" value="15:00"></label><label>Check-out time<input type="time" value="11:00"></label><label>Cancellation policy<select><option>Moderate</option><option>Flexible</option><option>Firm</option></select></label></div>`;
  return `<section class="page-intro"><div><span class="eyebrow">YOUR ACCOUNT</span><h2>Settings</h2><p>Control your profile, payments, privacy and hosting preferences.</p></div></section><section class="settings-shell"><nav class="settings-tabs">${tabs.map((tab) => `<button class="${tab === settingsTab ? 'active' : ''}" data-settings-tab="${tab}">${tab}</button>`).join('')}</nav><form id="settingsForm" class="surface-card settings-form"><div class="card-heading"><div><span class="eyebrow">STAYNEST ACCOUNT</span><h3>${settingsTab}</h3><p>Changes are saved in this browser in demo mode.</p></div></div>${panel}<div class="settings-submit"><span>Your account information is private.</span><button class="primary-button" type="submit">Save ${settingsTab.toLowerCase()} settings</button></div></form></section>`;
}
function renderSupport() {
  const faqs = [['How do I create a new property listing?', 'Open My Properties and choose Add new property. Follow each step to enter the details, images, pricing and house rules before reviewing your listing.'], ['When do payouts arrive?', 'Payout timing depends on your payout schedule and bank processing. You can review the estimate on your Earnings page.'], ['How do I change availability?', 'Use Host Calendar. Choose your property and select a date to block or unblock it.'], ['How can I contact a guest?', 'Open Messages, select their conversation, and send a reply. StayNest AI can prepare a draft, but it never sends without your approval.']];
  const filtered = faqs.filter((f) => !supportQuery || f.join(' ').toLowerCase().includes(supportQuery.toLowerCase()));
  return `<section class="page-intro"><div><span class="eyebrow">STAYNEST CARE</span><h2>Help &amp; Support</h2><p>Practical guidance for a confident hosting experience.</p></div></section><section class="support-hero"><div><span class="eyebrow">WE’RE HERE TO HELP</span><h3>Let’s find the right answer.</h3><p>Browse host guidance or contact our team for a hand with anything unexpected.</p></div><a class="primary-button" href="mailto:hosts@staynest.example">Contact StayNest support →</a></section><div class="support-grid"><article class="surface-card support-option"><span>⌂</span><h3>Host guidelines</h3><p>Learn about safety, guest communication, and setting expectations.</p><button data-action="guidelines">Explore guidelines →</button></article><article class="surface-card support-option"><span>◌</span><h3>Contact support</h3><p>Tell our host care team what you need help with.</p><a href="mailto:hosts@staynest.example">Email the team →</a></article><article class="surface-card support-option"><span>⚑</span><h3>Report a problem</h3><p>Something not working right? Send a report and we’ll look into it.</p><button data-action="report-problem">Report an issue →</button></article></div><section class="surface-card faq-card"><div class="card-heading"><div><span class="eyebrow">HOST HELP CENTER</span><h3>Frequently asked questions</h3></div><label class="inline-search">⌕<input id="supportSearch" value="${safe(supportQuery)}" placeholder="Search help articles..."></label></div>${filtered.map(([q,a]) => `<details><summary>${safe(q)}<span>＋</span></summary><p>${safe(a)}</p></details>`).join('') || '<p class="empty-state">No articles match that search. Contact host support and we’ll help.</p>'}</section><section class="surface-card support-chat"><div><span class="eyebrow">LIVE SUPPORT</span><h3>Want to speak to someone?</h3><p>Our host care team is available to help with your account and stays.</p></div><button class="secondary-button" data-action="support-chat">Start a support chat</button></section>`;
}
function renderNotifications() {
  const unread = notifications.filter((n) => !n.read).length;
  document.getElementById('notificationPopover').innerHTML = `<div class="popover-heading"><div><strong>Notifications</strong><small>${unread} unread updates</small></div><button data-action="mark-all-read">Mark all as read</button></div><div class="notification-filters"><button class="active" data-notification-filter="All">All</button>${['Bookings', 'Messages', 'Payments', 'Reviews', 'Properties', 'System'].map((type) => `<button data-notification-filter="${type}">${type}</button>`).join('')}</div><div class="notification-list">${notifications.map((n, i) => `<button class="notification-item ${n.read ? '' : 'unread'}" data-notification-index="${i}"><span class="notification-icon">${n.icon}</span><span><strong>${safe(n.title)}</strong><small>${safe(n.text)}</small><i>${safe(n.time)} · ${safe(n.type)}</i></span>${n.read ? '' : '<b></b>'}</button>`).join('')}</div>`; }
function syncNotificationButton() { const dot = document.querySelector('#notificationButton>i'); dot.classList.toggle('hidden', !notifications.some((n) => !n.read)); }

function openBookingDetails(id) {
  const b = bookings.find((item) => item.id === id); if (!b) return;
  selectedBooking = id;
  openModal(`<span class="eyebrow">RESERVATION DETAILS</span><h2 id="modalTitle">Booking ${safe(b.id)}</h2><div class="booking-detail-guest"><span class="guest-avatar">${initials(b.guest)}</span><div><strong>${safe(b.guest)}</strong><small>Guest · ${safe(b.guests)}</small></div>${statusPill(b.state)}</div><div class="detail-grid"><div><small>Property</small><strong>${safe(b.property)}</strong></div><div><small>Check-in</small><strong>${safe(b.checkIn)}</strong></div><div><small>Check-out</small><strong>${safe(b.checkOut)}</strong></div><div><small>Payment</small><strong>${safe(b.payment)}</strong></div><div><small>Email</small><a href="mailto:${safe(b.email)}">${safe(b.email)}</a></div><div><small>Phone</small><a href="tel:${safe(b.phone)}">${safe(b.phone)}</a></div><div><small>Total amount</small><strong>${money(b.amount)}</strong></div><div><small>Cancellation</small><strong>${b.state === 'Cancelled' ? 'Cancelled by guest · refunded' : 'Standard host policy'}</strong></div></div><div class="special-request"><small>GUEST REQUEST</small><p>${safe(b.request)}</p></div><div class="modal-actions"><button class="secondary-button" data-action="contact-guest" data-guest="${safe(b.guest)}">Message guest</button>${b.state === 'Pending' ? `<button class="primary-button" data-detail-status="Confirmed">Confirm booking</button><button class="danger-button" data-detail-status="Cancelled">Decline</button>` : ''}</div>`, () => { modalContent.querySelector('[data-detail-status]')?.focus(); });
}
function logout() {
  openModal(`<span class="eyebrow">STAYNEST HOST STUDIO</span><h2 id="modalTitle">Are you sure you want to log out?</h2><p class="modal-description">You can safely sign back in to manage your properties and guest stays.</p><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="danger-button" data-action="confirm-logout">Log out</button></div>`);
}
function renderWizard() {
  const titles = ['Property Information', 'Location', 'Amenities', 'Photos', 'Pricing', 'Availability', 'House Rules', 'Review & Publish'];
  const step = propertyWizardStep; const progress = (step / titles.length) * 100;
  const forms = [
    `<label>Property name<input name="name" placeholder="e.g. The Palm House" required></label><label>Property type<select name="type"><option>Apartment</option><option>House</option><option>Villa</option><option>Loft</option></select></label><label class="full-field">Description<textarea name="description" rows="3" placeholder="What makes your place special?"></textarea></label><label>Bedrooms<input type="number" min="0" value="2"></label><label>Maximum guests<input type="number" min="1" value="4"></label>`,
    `<label>Street address<input name="address" placeholder="Street and number" required></label><label>Neighborhood<input name="area" placeholder="e.g. Lekki Phase 1"></label><label>City<input name="city" placeholder="Lagos" required></label><label>State<input name="state" placeholder="Lagos State"></label>`,
    `<div class="amenity-options">${['Wi-Fi', 'Kitchen', 'Air conditioning', 'Free parking', 'Workspace', 'Pool', 'Washer', 'TV', 'Security'].map((x) => `<label><input type="checkbox"> ${x}</label>`).join('')}</div>`,
    `<label class="upload-drop">＋<strong>Add property photos</strong><small>Choose clear, well-lit photos to help guests picture their stay.</small><input type="file" accept="image/*" multiple></label>`,
    `<label>Price per night<input name="price" type="number" min="1" placeholder="120000" required></label><label>Cleaning fee<input name="cleaning" type="number" min="0" placeholder="Optional"></label><p class="security-note full-field">You can review your price before publishing.</p>`,
    `<label>First available date<input type="date"></label><label>Minimum nights<input type="number" min="1" value="1"></label><p class="security-note full-field">You can adjust availability at any time in Host Calendar.</p>`,
    `<label class="full-field">House rules<textarea rows="4" placeholder="Share quiet hours, smoking or pet policies, and any other helpful details."></textarea></label>`,
    `<div class="wizard-review"><strong>Almost ready to host.</strong><p>Your listing will remain a draft until you review and publish it. Your details can still be edited later.</p><label><input type="checkbox" required> I confirm I have permission to offer this property for stays.</label></div>`,
  ];
  openModal(`<span class="eyebrow">LIST YOUR SPACE · STEP ${step + 1} OF ${titles.length}</span><h2 id="modalTitle">${titles[step]}</h2><div class="wizard-progress"><i style="width:${progress}%"></i></div><div class="wizard-steps">${titles.map((t, i) => `<span class="${i === step ? 'active' : i < step ? 'done' : ''}" title="${t}">${i + 1}</span>`).join('')}</div><form id="wizardForm" class="wizard-form">${forms[step]}<div class="modal-actions"><button class="secondary-button" type="button" data-action="wizard-back" ${step === 0 ? 'disabled' : ''}>Back</button><button class="primary-button" type="submit">${step === titles.length - 1 ? 'Save as draft' : 'Continue →'}</button></div></form>`);
}

function renderCalendarChart() { const target = document.getElementById('overviewChart'); if (target) target.innerHTML = chartMarkup(document.getElementById('overviewChartPeriod')?.value || '30 Days'); }
function setBookingState(id, state) { const b = bookings.find((item) => item.id === id); if (!b) return; b.state = state; b.payment = state === 'Cancelled' ? 'Refunded' : b.payment; showToast(state === 'Confirmed' ? 'Booking confirmed. The guest can now prepare for their stay.' : `Booking ${state.toLowerCase()}.`); setSection(activeSection, false); }

content.addEventListener('click', (event) => {
  const el = event.target.closest('button, [data-booking-detail]'); if (!el) return;
  if (el.dataset.tab) return setSection(el.dataset.tab);
  if (el.dataset.bookingDetail) return openBookingDetails(el.dataset.bookingDetail);
  if (el.dataset.action === 'property-wizard') return startPropertyWizard();
  if (el.dataset.action === 'open-notifications') { renderNotifications(); document.getElementById('notificationPopover').hidden = false; return; }
  if (el.dataset.action === 'ai-draft') { const t = threads[selectedThread]; document.getElementById('messageInput').value = `Hi ${t.guest.split(' ')[0]}, thanks for reaching out. I’d be happy to help with your stay at ${t.property}. Please let me know if there’s anything else you need.`; showToast('Draft prepared for your review. It has not been sent.'); return; }
  if (el.dataset.action === 'ai-summary') { const t = threads[selectedThread]; return showToast(`Conversation summary: ${t.guest} asked about their upcoming stay at ${t.property}. Review the thread and decide how to reply.`); }
  if (el.dataset.action === 'download-statement') return downloadStatement();
  if (el.dataset.action === 'sync-calendar') return showToast('Calendar sync setup will be available when an external calendar is connected.');
  if (['report-problem', 'guidelines', 'support-chat'].includes(el.dataset.action)) return openModal(`<span class="eyebrow">HOST CARE</span><h2 id="modalTitle">${el.dataset.action === 'report-problem' ? 'Report a problem' : el.dataset.action === 'guidelines' ? 'Host guidelines' : 'Contact host support'}</h2><p class="modal-description">Tell us what you need. Our StayNest host care team can help with listings, payments, guest stays and account questions.</p><label class="modal-field">How can we help?<textarea rows="4" placeholder="Share a few details..." required></textarea></label><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><a class="primary-button" href="mailto:hosts@staynest.example">Email host support →</a></div>`);
  if (el.dataset.action === 'report-problem' || el.dataset.action === 'guidelines' || el.dataset.action === 'support-chat') return openModal(`<span class="eyebrow">HOST CARE</span><h2 id="modalTitle">Contact StayNest support</h2><p class="modal-description">Tell us what you need. Our host care team can help with listings, payments, guest stays and account questions.</p><label class="modal-field">How can we help?<textarea rows="4" placeholder="Share a few details..." required></textarea></label><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><a class="primary-button" href="mailto:hosts@staynest.example">Email host support →</a></div>`);
  if (el.dataset.action === 'logout') return logout();
  if (el.dataset.action === 'mark-all-read') { notifications.forEach((n) => { n.read = true; }); renderNotifications(); syncNotificationButton(); showToast('All notifications marked as read.'); return; }
  if (el.dataset.action === 'view-profile') { closeMenus(); return setSection('Settings'); }
  if (el.dataset.action === 'close-modal') return closeModal();
  if (el.dataset.bookingAction) return setBookingState(el.dataset.bookingId, el.dataset.bookingAction);
  if (el.dataset.detailStatus) { const id = selectedBooking; closeModal(); return setBookingState(id, el.dataset.detailStatus); }
  if (el.dataset.action === 'contact-guest') { const t = threads.findIndex((x) => x.guest === el.dataset.guest); selectedThread = Math.max(0, t); closeModal(); return setSection('Messages'); }
  if (el.dataset.propertyFilter) { propertyFilter = el.dataset.propertyFilter; return setSection('My Properties', false); }
  if (el.dataset.propertyView) { propertyView = el.dataset.propertyView; return setSection('My Properties', false); }
  if (el.dataset.bookingFilter) { bookingFilter = el.dataset.bookingFilter; return setSection('Bookings', false); }
  if (el.dataset.earningsPeriod) { earningsPeriod = el.dataset.earningsPeriod; return setSection('Earnings', false); }
  if (el.dataset.reviewFilter) { reviewFilter = el.dataset.reviewFilter; return setSection('Reviews', false); }
  if (el.dataset.settingsTab) { settingsTab = el.dataset.settingsTab; return setSection('Settings', false); }
  if (el.dataset.thread !== undefined) { selectedThread = Number(el.dataset.thread); threads[selectedThread].unread = false; return setSection('Messages', false); }
  if (el.dataset.quickReply) { const input = document.getElementById('messageInput'); input.value = el.dataset.quickReply; input.focus(); return; }
  if (el.dataset.propertyAction) return propertyAction(el.dataset.propertyAction, el.dataset.propertyId);
  if (el.dataset.calendarStep) { calendarDate.setMonth(calendarDate.getMonth() + Number(el.dataset.calendarStep)); return setSection('Calendar', false); }
  if (el.dataset.calendarDate) return toggleBlockedDate(el.dataset.calendarDate);
});

function propertyAction(action, id) {
  const p = properties.find((item) => item.id === id); if (!p) return;
  if (action === 'Bookings') return setSection('Bookings');
  if (action === 'Availability') { selectedCalendarProperty = p.id; return setSection('Calendar'); }
  if (action === 'Duplicate') return openModal(`<span class="eyebrow">DUPLICATE LISTING</span><h2 id="modalTitle">Create a copy?</h2><p class="modal-description">A draft copy of ${safe(p.name)} will be added to your properties. You can edit it before publishing.</p><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><button class="primary-button" data-action="confirm-duplicate" data-property-id="${p.id}">Create draft copy</button></div>`);
  if (action === 'Delete') return openModal(`<span class="eyebrow">REMOVE LISTING</span><h2 id="modalTitle">Delete ${safe(p.name)}?</h2><p class="modal-description">This removes the demo listing from your workspace. This action cannot be undone.</p><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Keep property</button><button class="danger-button" data-action="confirm-delete" data-property-id="${p.id}">Delete property</button></div>`);
  if (action === 'Edit') return openModal(`<span class="eyebrow">LISTING DETAILS</span><h2 id="modalTitle">Edit property</h2><form id="editPropertyForm" data-property-id="${p.id}" class="wizard-form"><label>Property name<input name="name" value="${safe(p.name)}" required></label><label>Property type<select name="type">${['Apartment', 'House', 'Villa', 'Loft'].map((type) => `<option ${p.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label class="full-field">Location<input name="location" value="${safe(p.location)}" required></label><label>Price per night<input name="price" type="number" value="${p.price}" min="1" required></label><div class="modal-actions"><button class="secondary-button" data-action="close-modal" type="button">Cancel</button><button class="primary-button" type="submit">Save property</button></div></form>`);
  if (action === 'View') return openModal(`<span class="eyebrow">PROPERTY DETAILS</span><h2 id="modalTitle">${safe(p.name)}</h2><p class="modal-description">${safe(p.location)} · ${safe(p.type)} · ${money(p.price)} per night · ${p.rating ? `★ ${p.rating} from ${p.reviews} reviews` : 'New listing'}</p><img class="modal-property-image" src="${safe(p.image)}" alt="${safe(p.name)}"><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Close</button><button class="danger-button" data-property-action="Delete" data-property-id="${p.id}">Delete</button><button class="secondary-button" data-property-action="Duplicate" data-property-id="${p.id}">Duplicate</button><button class="primary-button" data-property-action="Edit" data-property-id="${p.id}">Edit listing</button></div>`);
}
function toggleBlockedDate(dateKey) { let blocked = getBlockedDates(); blocked = blocked.includes(dateKey) ? blocked.filter((d) => d !== dateKey) : [...blocked, dateKey]; localStorage.setItem('staynest-blocked-dates', JSON.stringify(blocked)); setSection('Calendar', false); showToast(blocked.includes(dateKey) ? 'Date blocked for this property.' : 'Date is available again.'); }
function downloadStatement() { const rows = [['Transaction ID', 'Booking ID', 'Guest', 'Property', 'Date', 'Amount', 'Platform Fee', 'Host Earnings', 'Status'], ...bookings.map((b, i) => [`TX-${i + 7081}`, b.id, b.guest, b.property, b.created, b.amount, Math.round(b.amount * .075), Math.round(b.amount * .925), b.payment])]; const csv = rows.map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n'); const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); link.download = 'staynest-earnings-statement.csv'; link.click(); URL.revokeObjectURL(link.href); showToast('Your earnings statement has downloaded.'); }

content.addEventListener('click', (event) => {
  const target = event.target.closest('[data-booking-detail], [data-property-filter], [data-property-view], [data-booking-filter], [data-earnings-period], [data-review-filter], [data-settings-tab], [data-calendar-step], [data-calendar-date], [data-property-action], [data-quick-reply], [data-action], [data-booking-action], [data-tab], [data-thread]');
  if (!target) return;
  if (target.dataset.tab) return setSection(target.dataset.tab);
  if (target.dataset.bookingDetail) return openBookingDetails(target.dataset.bookingDetail);
  if (target.dataset.bookingAction) return setBookingState(target.dataset.bookingId, target.dataset.bookingAction);
  if (target.dataset.propertyFilter) { propertyFilter = target.dataset.propertyFilter; return setSection('My Properties', false); }
  if (target.dataset.propertyView) { propertyView = target.dataset.propertyView; return setSection('My Properties', false); }
  if (target.dataset.bookingFilter) { bookingFilter = target.dataset.bookingFilter; return setSection('Bookings', false); }
  if (target.dataset.earningsPeriod) { earningsPeriod = target.dataset.earningsPeriod; return setSection('Earnings', false); }
  if (target.dataset.reviewFilter) { reviewFilter = target.dataset.reviewFilter; return setSection('Reviews', false); }
  if (target.dataset.settingsTab) { settingsTab = target.dataset.settingsTab; return setSection('Settings', false); }
  if (target.dataset.thread !== undefined) { selectedThread = Number(target.dataset.thread); if (threads[selectedThread]) threads[selectedThread].unread = false; return setSection('Messages', false); }
  if (target.dataset.calendarStep) { calendarDate.setMonth(calendarDate.getMonth() + Number(target.dataset.calendarStep)); return setSection('Calendar', false); }
  if (target.dataset.calendarDate) return toggleBlockedDate(target.dataset.calendarDate);
  if (target.dataset.propertyAction) return propertyAction(target.dataset.propertyAction, target.dataset.propertyId);
  if (target.dataset.quickReply) { const input = document.getElementById('messageInput'); input.value = target.dataset.quickReply; input.focus(); return; }
  if (target.dataset.action === 'property-wizard') return startPropertyWizard();
  if (target.dataset.action === 'logout') return logout();
  if (target.dataset.action === 'open-notifications') { renderNotifications(); document.getElementById('notificationPopover').hidden = false; return; }
  if (target.dataset.action === 'ai-draft') { const t = threads[selectedThread]; document.getElementById('messageInput').value = `Hi ${t.guest.split(' ')[0]}, thanks for reaching out. I’d be happy to help with your stay at ${t.property}. Please let me know if there’s anything else you need.`; return showToast('Draft prepared for your review. It has not been sent.'); }
  if (target.dataset.action === 'ai-summary') { const t = threads[selectedThread]; return showToast(`Conversation summary: ${t.guest} asked about their upcoming stay at ${t.property}. Review the thread and decide how to reply.`); }
  if (target.dataset.action === 'download-statement' || target.dataset.action === 'export') return downloadStatement();
  if (target.dataset.action === 'sync-calendar') return showToast('Calendar sync setup will be available when an external calendar is connected.');
  if (['report-problem', 'guidelines', 'support-chat'].includes(target.dataset.action)) return openModal(`<span class="eyebrow">HOST CARE</span><h2 id="modalTitle">${target.dataset.action === 'report-problem' ? 'Report a problem' : target.dataset.action === 'guidelines' ? 'Host guidelines' : 'Contact host support'}</h2><p class="modal-description">Tell us what you need. Our StayNest host care team can help with listings, payments, guest stays and account questions.</p><label class="modal-field">How can we help?<textarea rows="4" placeholder="Share a few details..." required></textarea></label><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><a class="primary-button" href="mailto:hosts@staynest.example">Email host support →</a></div>`);
  if (target.dataset.action === 'mark-all-read') { notifications.forEach((n) => { n.read = true; }); renderNotifications(); syncNotificationButton(); return showToast('All notifications marked as read.'); }
  if (target.dataset.action === 'delete-account') return openModal(`<span class="eyebrow">ACCOUNT PRIVACY</span><h2 id="modalTitle">Request account deletion</h2><p class="modal-description">Contact StayNest host support to verify your identity and request removal of your profile data.</p><div class="modal-actions"><button class="secondary-button" data-action="close-modal">Cancel</button><a class="primary-button" href="mailto:hosts@staynest.example?subject=Account%20deletion%20request">Contact support</a></div>`);
  if (target.dataset.action === 'download-data') return showToast('Your account data export is being prepared.');
  if (target.dataset.action === 'close-modal') return closeModal();
  if (target.dataset.action === 'view-profile') { closeMenus(); return setSection('Settings'); }
  if (target.dataset.action === 'confirm-logout') { sessionStorage.removeItem('staynest-host-session'); window.location.href = '/login'; return; }
  if (target.dataset.action === 'contact-guest') { const index = threads.findIndex((thread) => thread.guest === target.dataset.guest); selectedThread = Math.max(0, index); closeModal(); return setSection('Messages'); }
  if (target.dataset.notificationIndex !== undefined) { const n = notifications[Number(target.dataset.notificationIndex)]; if (n) { n.read = true; syncNotificationButton(); return setSection(n.section); } }
  if (target.dataset.notificationFilter) { document.querySelectorAll('[data-notification-filter]').forEach((button) => button.classList.toggle('active', button === target)); document.querySelectorAll('.notification-item').forEach((item) => { const n = notifications[Number(item.dataset.notificationIndex)]; item.hidden = target.dataset.notificationFilter !== 'All' && n.type !== target.dataset.notificationFilter; }); }
});

content.addEventListener('input', (event) => {
  const fields = { propertySearch: ['My Properties', 'propertySearch', (value) => { propertySearch = value; }], bookingSearch: ['Bookings', 'bookingSearch', (value) => { bookingSearch = value; }], supportSearch: ['Help & Support', 'supportSearch', (value) => { supportQuery = value; }] };
  const field = fields[event.target.id]; if (!field) return;
  const [section, id, update] = field; const value = event.target.value; const position = event.target.selectionStart; update(value); setSection(section, false);
  const replacement = document.getElementById(id); replacement.focus(); replacement.setSelectionRange(position, position);
});
content.addEventListener('change', (event) => {
  if (event.target.id === 'overviewChartPeriod') renderCalendarChart();
  if (event.target.id === 'calendarProperty') selectedCalendarProperty = event.target.value;
  if (event.target.id === 'messageAttachment') { document.getElementById('attachmentName').textContent = event.target.files[0]?.name || ''; }
});
content.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target.id === 'messageForm') { const value = new FormData(event.target).get('message').trim(); if (!value) return; threads[selectedThread].messages.push({ text: value, host: true }); threads[selectedThread].time = 'Just now'; setSection('Messages', false); showToast('Your message has been sent.'); }
  if (event.target.matches('.review-reply-form')) { const i = Number(event.target.dataset.reviewIndex); reviews[i].reply = new FormData(event.target).get('reply').trim(); setSection('Reviews', false); showToast('Your professional response has been posted.'); }
  if (event.target.id === 'settingsForm') { const data = Object.fromEntries(new FormData(event.target)); localStorage.setItem('staynest-host-settings', JSON.stringify(data)); showToast(`${settingsTab} settings saved successfully.`); }
  if (event.target.id === 'wizardForm') { if (propertyWizardStep < 7) { propertyWizardStep += 1; return renderWizard(); } const form = new FormData(event.target); const name = form.get('name') || 'New StayNest home'; properties.push({ id: `P-${Date.now()}`, name, location: `${form.get('area') || 'New location'}, ${form.get('city') || 'Nigeria'}`, type: form.get('type') || 'Apartment', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=760&q=85', status: 'Draft', available: false, price: Number(form.get('price') || 0), rating: 0, reviews: 0, bookings: 0, occupancy: 0, earnings: 0 }); closeModal(); propertyFilter = 'All'; setSection('My Properties'); showToast('Property saved as a draft. Continue editing before publishing.'); }
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) return closeModal();
  const el = event.target.closest('[data-action], [data-property-action], [data-detail-status]'); if (!el) return;
  if (el.dataset.action === 'close-modal') return closeModal();
  if (el.dataset.action === 'wizard-back') { propertyWizardStep = Math.max(0, propertyWizardStep - 1); return renderWizard(); }
  if (el.dataset.action === 'confirm-delete') { const index = properties.findIndex((p) => p.id === el.dataset.propertyId); if (index >= 0) properties.splice(index, 1); closeModal(); setSection('My Properties'); return showToast('Property removed from your demo workspace.'); }
  if (el.dataset.action === 'confirm-duplicate') { const p = properties.find((x) => x.id === el.dataset.propertyId); if (p) properties.push({ ...p, id: `P-${Date.now()}`, name: `${p.name} (Copy)`, status: 'Draft', available: false, bookings: 0, earnings: 0 }); closeModal(); setSection('My Properties'); return showToast('Draft copy created. Review details before publishing.'); }
  if (el.dataset.detailStatus) { const id = selectedBooking; closeModal(); return setBookingState(id, el.dataset.detailStatus); }
  if (el.dataset.propertyAction) return propertyAction(el.dataset.propertyAction, el.dataset.propertyId);
  if (el.dataset.action === 'contact-guest') { const index = threads.findIndex((thread) => thread.guest === el.dataset.guest); selectedThread = Math.max(0, index); closeModal(); return setSection('Messages'); }
});
modal.addEventListener('submit', (event) => {
  if (event.target.id === 'editPropertyForm') {
    event.preventDefault();
    const property = properties.find((item) => item.id === event.target.dataset.propertyId);
    if (property) Object.assign(property, Object.fromEntries(new FormData(event.target)));
    closeModal(); setSection('My Properties'); return showToast('Property details saved successfully.');
  }
  if (event.target.id !== 'wizardForm') return;
  event.preventDefault();
  wizardData = { ...wizardData, ...Object.fromEntries(new FormData(event.target)) };
  if (propertyWizardStep < 7) { propertyWizardStep += 1; return renderWizard(); }
  const name = wizardData.name || 'New StayNest home';
  properties.push({ id: `P-${Date.now()}`, name, location: `${wizardData.area || 'New location'}, ${wizardData.city || 'Nigeria'}`, type: wizardData.type || 'Apartment', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=760&q=85', status: 'Draft', available: false, price: Number(wizardData.price || 0), rating: 0, reviews: 0, bookings: 0, occupancy: 0, earnings: 0 });
  closeModal(); propertyFilter = 'All'; setSection('My Properties'); showToast('Property saved as a draft. Continue editing before publishing.');
});

function renderNotifications() { const unread = notifications.filter((n) => !n.read).length; document.getElementById('notificationPopover').innerHTML = `<div class="popover-heading"><div><strong>Notifications</strong><small>${unread} unread updates</small></div><button data-action="mark-all-read">Mark all as read</button></div><div class="notification-filters"><button class="active" data-notification-filter="All">All</button>${['Bookings', 'Messages', 'Payments', 'Reviews', 'Properties', 'System'].map((type) => `<button data-notification-filter="${type}">${type}</button>`).join('')}</div><div class="notification-list">${notifications.map((n, i) => `<button class="notification-item ${n.read ? '' : 'unread'}" data-notification-index="${i}"><span class="notification-icon">${n.icon}</span><span><strong>${safe(n.title)}</strong><small>${safe(n.text)}</small><i>${safe(n.time)} · ${safe(n.type)}</i></span>${n.read ? '' : '<b></b>'}</button>`).join('')}</div>`; }
function syncNotificationButton() { const dot = document.querySelector('#notificationButton>i'); dot.classList.toggle('hidden', !notifications.some((n) => !n.read)); }

function startPropertyWizard() { propertyWizardStep = 0; wizardData = {}; renderWizard(); }

// Persistent navigation, header menus and accessible keyboard shortcut.
document.querySelector('.dashboard-nav').addEventListener('click', (event) => { const b = event.target.closest('[data-tab]'); if (b) setSection(b.dataset.tab); });
document.getElementById('mobileWorkspaceNav').addEventListener('click', (event) => { const b = event.target.closest('[data-tab]'); if (b) setSection(b.dataset.tab); });
document.getElementById('menuButton').addEventListener('click', (event) => { const isOpen = sidebar.classList.toggle('open'); document.getElementById('sidebarScrim').classList.toggle('visible', isOpen); event.currentTarget.setAttribute('aria-expanded', String(isOpen)); });
document.getElementById('sidebarScrim').addEventListener('click', closeMenus);
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('settingsLogout')?.addEventListener('click', logout);
document.getElementById('notificationButton').addEventListener('click', () => { const pop = document.getElementById('notificationPopover'); const open = pop.hidden; closeMenus(); pop.hidden = !open; document.getElementById('notificationButton').setAttribute('aria-expanded', String(open)); });
document.getElementById('profileButton').addEventListener('click', () => { const pop = document.getElementById('profilePopover'); const open = pop.hidden; closeMenus(); pop.hidden = !open; document.getElementById('profileButton').setAttribute('aria-expanded', String(open)); });
document.getElementById('globalSearch').addEventListener('keydown', (event) => { if (event.key !== 'Enter') return; const query = event.currentTarget.value.trim(); if (!query) return; bookingSearch = query; setSection('Bookings'); });
document.getElementById('globalSearch').addEventListener('input', (event) => { const query = event.currentTarget.value.trim(); if (query.length > 1) { bookingSearch = query; setSection('Bookings'); } });
document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.getElementById('globalSearch').focus(); } if (event.key === 'Escape') closeMenus(); });
window.addEventListener('hashchange', () => { const value = decodeURIComponent(location.hash.slice(1)).replaceAll('-', ' ').replace('and support', '& Support'); const name = value.replace(/\b\w/g, (c) => c.toUpperCase()); if (name) setSection(name, false); });

renderNotifications(); syncNotificationButton();
const initialHash = decodeURIComponent(location.hash.slice(1)).replaceAll('-', ' ').replace('and support', '& Support');
setSection(initialHash ? initialHash.replace(/\b\w/g, (c) => c.toUpperCase()) : 'Overview', false);
