const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function renderSiteInfo(siteInfo, slug) {
  const page = siteInfo.pages[slug];
  if (!page) return '<main class="info-main"><h1>Page not found</h1><a href="/home.html">Return to StayNest</a></main>';

  const sections = (page.sections || []).map((section, index) => `<section class="info-section" id="section-${index + 1}"><span class="info-section-number">${String(index + 1).padStart(2, '0')}</span><div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></div></section>`).join('');
  const principles = page.principles?.length ? `<section class="info-principles" aria-label="StayNest principles">${page.principles.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.body)}</p></article>`).join('')}</section>` : '';
  const faqs = page.faqs?.length ? `<section class="info-faqs"><div class="info-section-heading"><span class="info-kicker">A few quick answers</span><h2>Frequently asked questions</h2></div>${page.faqs.map((faq) => `<details><summary>${escapeHtml(faq.question)}<span aria-hidden="true">+</span></summary><p>${escapeHtml(faq.answer)}</p></details>`).join('')}</section>` : '';
  const notice = page.notice ? `<aside class="info-notice"><strong>Before you rely on this policy</strong><p>${escapeHtml(page.notice)}</p></aside>` : '';
  const contact = slug === 'help' ? `<section class="info-contact"><div><span class="info-kicker">PERSONAL SUPPORT</span><h2>We’re ready to help.</h2><p>Choose the channel that works best for you. Our team can help with stays, hosting, and account questions.</p></div><div class="info-contact-actions"><a href="mailto:${escapeHtml(siteInfo.contact.email)}"><span>Email</span><strong>${escapeHtml(siteInfo.contact.email)}</strong></a><a href="${escapeHtml(siteInfo.contact.whatsapp)}" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>${escapeHtml(siteInfo.contact.phone)}</strong></a></div></section>` : '';

  return `<div class="site-info"><header class="info-header"><div class="info-header-inner"><a class="info-brand" href="/home.html"><img src="/assets/logo.svg" alt=""><span>StayNest</span></a><nav aria-label="Main navigation"><a href="/home.html">Home</a><a href="/explore.html">Explore</a><a href="/host/dashboard">Become a Host</a><a href="/help/"${slug === 'help' ? ' aria-current="page"' : ''}>Help</a></nav><a class="info-header-cta" href="mailto:${escapeHtml(siteInfo.contact.email)}">Contact us</a></div></header><main class="info-main"><div class="info-hero"><p class="info-kicker">${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.title)}</h1><p class="info-intro">${escapeHtml(page.intro)}</p>${page.updated ? `<p class="info-updated">Last updated ${escapeHtml(page.updated)}</p>` : ''}</div>${notice}${principles}${sections ? `<article class="info-article">${sections}</article>` : ''}${faqs}${contact}</main><footer class="info-footer"><div class="info-footer-inner"><div><a class="info-brand" href="/home.html"><img src="/assets/logo.svg" alt=""><span>StayNest</span></a><p>Thoughtful stays and considered hospitality across Nigeria.</p></div><nav aria-label="Company and policies"><a href="/about/">About</a><a href="/help/">Help</a><a href="/terms/">Terms of Service</a><a href="/privacy/">Privacy Policy</a></nav><div class="info-footer-contact"><a href="mailto:${escapeHtml(siteInfo.contact.email)}">${escapeHtml(siteInfo.contact.email)}</a><a href="${escapeHtml(siteInfo.contact.whatsapp)}" target="_blank" rel="noreferrer">WhatsApp ${escapeHtml(siteInfo.contact.phone)}</a></div></div><div class="info-footer-bottom">© 2026 StayNest. All rights reserved.</div></footer></div>`;
}

const infoRoot = document.getElementById('siteInfoRoot');
const infoSlug = window.location.pathname.split('/').filter(Boolean).pop() || 'about';

fetch('/site-info.json')
  .then((response) => {
    if (!response.ok) throw new Error('StayNest information could not be loaded.');
    return response.json();
  })
  .then((siteInfo) => {
    infoRoot.innerHTML = renderSiteInfo(siteInfo, infoSlug);
    document.title = `${siteInfo.pages[infoSlug]?.title || 'StayNest'} | StayNest`;
    infoRoot.setAttribute('aria-busy', 'false');
  })
  .catch(() => {
    infoRoot.innerHTML = '<main class="info-main"><h1>We could not load this page.</h1><p>Please refresh or contact StayNest customer care.</p><a href="/home.html">Return to StayNest</a></main>';
    infoRoot.setAttribute('aria-busy', 'false');
  });