import Link from 'next/link';
import styles from './host-landing.module.css';

const benefits = [
  {
    icon: '₦',
    title: 'Earn on your terms',
    description: 'Choose your nightly rate and decide when your space is available.',
  },
  {
    icon: '⌂',
    title: 'Keep control of your home',
    description: 'Set clear house rules and review each booking request before it is confirmed.',
  },
  {
    icon: '♡',
    title: 'Get support at every step',
    description: 'Manage your listing and reservations in one place, with help when you need it.',
  },
];

const steps = [
  ['01', 'Create your account', 'Tell us a little about yourself to get your host profile started.'],
  ['02', 'Build your listing', 'Add your space, photos, amenities, availability and nightly price.'],
  ['03', 'Welcome your first guest', 'Once your listing is reviewed, you can start receiving booking requests.'],
];

const faqs = [
  ['Do I need to host full time?', 'Not at all. You choose when your home is available and can update your calendar whenever plans change.'],
  ['Can I finish setting up later?', 'Yes. Your host profile can be completed in stages, so you can come back when you are ready.'],
  ['Will my property be published right away?', 'No. New listings are reviewed before they go live. Your account remains a guest account until host onboarding is complete.'],
];

export default function BecomeAHostPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="StayNest home">
          <span className={styles.brandMark} aria-hidden="true">S</span>
          <span>StayNest</span>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/">Explore stays</Link>
          <Link className={styles.navActive} href="/become-a-host" aria-current="page">Become a host</Link>
        </nav>
        <div className={styles.navActions}>
          <Link className={styles.login} href="/login">Log in</Link>
          <Link className={styles.navCta} href="/host/dashboard">Host dashboard <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}><span aria-hidden="true">✦</span> A little more from your space</span>
          <h1>Make room for <em>something good.</em></h1>
          <p className={styles.intro}>Share a place you love, meet people from near and far, and earn on a schedule that works for you. Hosting starts right here.</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/login">Start hosting <span aria-hidden="true">→</span></Link>
            <a className={styles.textButton} href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
          </div>
          <div className={styles.socialProof}>
            <div className={styles.avatarStack} aria-hidden="true"><span>A</span><span>T</span><span>K</span></div>
            <p><strong>Made for thoughtful hosts</strong><br />Share your home, your way.</p>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Warm, light-filled living room ready to welcome guests" />
          <div className={styles.photoNote}><span className={styles.noteIcon} aria-hidden="true">✦</span><span><strong>Your space, your story</strong><small>Let the right guests find you.</small></span></div>
          <div className={styles.ratingBadge}><span aria-hidden="true">★</span><strong>4.9</strong><small>host experience</small></div>
        </div>
      </section>

      <section className={styles.trustBar} aria-label="Hosting with StayNest">
        <p>GOOD HOSTING STARTS WITH GOOD SUPPORT</p>
        <div><span>✓</span> You set the rules</div>
        <div><span>✓</span> You choose your dates</div>
        <div><span>✓</span> Every listing is reviewed</div>
      </section>

      <section className={styles.section} aria-labelledby="benefits-title">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Hosting that fits real life</span>
          <h2 id="benefits-title">Your home. Your call.</h2>
          <p>Good hosting should feel rewarding, not complicated. You stay in charge from the first step.</p>
        </div>
        <div className={styles.benefits}>
          {benefits.map((benefit) => (
            <article className={styles.benefitCard} key={benefit.title}>
              <span className={styles.benefitIcon} aria-hidden="true">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process} id="how-it-works" aria-labelledby="process-title">
        <div className={styles.processIntro}>
          <span className={styles.eyebrow}>A simple place to start</span>
          <h2 id="process-title">Three steps to your first stay.</h2>
          <p>Take it at your own pace. We’ll guide you from a new host profile to a listing guests can book.</p>
          <Link className={styles.processLink} href="/login">Let’s get started <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.stepList}>
          {steps.map(([number, title, description]) => (
            <article className={styles.step} key={number}>
              <span className={styles.stepNumber}>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <span className={styles.stepArrow} aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.faqHeading}>
          <span className={styles.eyebrow}>Before you begin</span>
          <h2 id="faq-title">A few good questions.</h2>
          <p>Still deciding? Here are a few things hosts often want to know.</p>
        </div>
        <div className={styles.faqList}>
          {faqs.map(([question, answer]) => (
            <details className={styles.faq} key={question}>
              <summary>{question}<span aria-hidden="true">＋</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.studioSection} aria-labelledby="studio-title">
        <div className={styles.studioCopy}>
          <span className={styles.eyebrow}>Your hosting, in one place</span>
          <h2 id="studio-title">Meet your Host Studio.</h2>
          <p>From the first booking request to your latest guest review, your workspace keeps the important details close at hand.</p>
          <Link className={styles.primaryButton} href="/host/dashboard">Explore the host workspace <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.studioMenu} aria-label="Host workspace features">
          {[
            ['⌂', 'Overview', 'A clear view of your hosting'],
            ['▦', 'My properties', 'Keep your listings up to date'],
            ['▤', 'Bookings', 'Manage guest stays and requests'],
            ['◌', 'Messages', 'Stay in touch with guests'],
            ['₦', 'Earnings', 'Follow payouts and income'],
            ['★', 'Reviews', 'Build trust with thoughtful replies'],
            ['⚙', 'Settings', 'Manage your host account'],
          ].map(([icon, title, text]) => (
            <div className={styles.studioItem} key={title}><span aria-hidden="true">{icon}</span><div><strong>{title}</strong><small>{text}</small></div><span className={styles.studioArrow} aria-hidden="true">↗</span></div>
          ))}
          <div className={styles.studioLogout}><span aria-hidden="true">↪</span> Sign out securely whenever you need to</div>
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div><span className={styles.eyebrow}>Your next chapter starts at home</span><h2>Ready to welcome someone in?</h2><p>Create your account and take the first step. You can build your listing when it suits you.</p></div>
        <Link className={styles.primaryButton} href="/login">Become a host <span aria-hidden="true">→</span></Link>
      </section>

      <footer className={styles.footer}><Link className={styles.brand} href="/"><span className={styles.brandMark} aria-hidden="true">S</span><span>StayNest</span></Link><p>Thoughtful stays, made together.</p><Link href="/">Back to exploring</Link></footer>
    </main>
  );
}
