import Link from 'next/link';
import siteInfoData from '../site-info.json';

type PageSlug = 'about' | 'help' | 'terms' | 'privacy';
type InfoPage = {
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  notice?: string;
  sections?: { title: string; body: string }[];
  principles?: { title: string; body: string }[];
  faqs?: { question: string; answer: string }[];
};

const siteInfo = siteInfoData as {
  contact: { email: string; phone: string; whatsapp: string };
  pages: Record<PageSlug, InfoPage>;
};

export default function SiteInfoPage({ slug }: { slug: PageSlug }) {
  const page = siteInfo.pages[slug];
  return (
    <div className="site-info">
      <header className="info-header"><div className="info-header-inner">
        <Link className="info-brand" href="/"><img src="/assets/logo.svg" alt="" /><span>StayNest</span></Link>
        <nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/properties">Explore</Link><Link href="/become-a-host">Become a Host</Link><Link href="/help" aria-current={slug === 'help' ? 'page' : undefined}>Help</Link></nav>
        <a className="info-header-cta" href={`mailto:${siteInfo.contact.email}`}>Contact us</a>
      </div></header>
      <main className="info-main">
        <div className="info-hero"><p className="info-kicker">{page.eyebrow}</p><h1>{page.title}</h1><p className="info-intro">{page.intro}</p>{page.updated && <p className="info-updated">Last updated {page.updated}</p>}</div>
        {page.notice && <aside className="info-notice"><strong>Before you rely on this policy</strong><p>{page.notice}</p></aside>}
        {page.principles && <section className="info-principles" aria-label="StayNest principles">{page.principles.map((principle, index) => <article key={principle.title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{principle.title}</h2><p>{principle.body}</p></article>)}</section>}
        {page.sections && <article className="info-article">{page.sections.map((section, index) => <section className="info-section" key={section.title}><span className="info-section-number">{String(index + 1).padStart(2, '0')}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></section>)}</article>}
        {page.faqs && <section className="info-faqs"><div className="info-section-heading"><span className="info-kicker">A few quick answers</span><h2>Frequently asked questions</h2></div>{page.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</section>}
        {slug === 'help' && <section className="info-contact"><div><span className="info-kicker">PERSONAL SUPPORT</span><h2>We’re ready to help.</h2><p>Choose the channel that works best for you. Our team can help with stays, hosting, and account questions.</p></div><div className="info-contact-actions"><a href={`mailto:${siteInfo.contact.email}`}><span>Email</span><strong>{siteInfo.contact.email}</strong></a><a href={siteInfo.contact.whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{siteInfo.contact.phone}</strong></a></div></section>}
      </main>
      <footer className="info-footer"><div className="info-footer-inner">
        <div><Link className="info-brand" href="/"><img src="/assets/logo.svg" alt="" /><span>StayNest</span></Link><p>Thoughtful stays and considered hospitality across Nigeria.</p></div>
        <nav aria-label="Company and policies"><Link href="/about">About</Link><Link href="/help">Help</Link><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link></nav>
        <div className="info-footer-contact"><a href={`mailto:${siteInfo.contact.email}`}>{siteInfo.contact.email}</a><a href={siteInfo.contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp {siteInfo.contact.phone}</a></div>
      </div><div className="info-footer-bottom">© 2026 StayNest. All rights reserved.</div></footer>
    </div>
  );
}