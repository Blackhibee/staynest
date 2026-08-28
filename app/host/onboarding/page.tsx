import Link from 'next/link';

export default function HostOnboardingPage() {
  return <main style={{ padding: 48, maxWidth: 720, margin: '0 auto' }}><p className="eyebrow">Host onboarding</p><h1>Tell us about you</h1><p>Complete your host profile with your name, phone number, profile photo, bio and preferred contact method. Your role will remain guest until onboarding and property review are complete.</p><div className="host-card"><h2>Next implementation step</h2><p>This route is ready for the Firebase-authenticated onboarding form. Configure Firebase and install dependencies first so profile updates are securely written with the authenticated UID.</p><Link className="cta" href="/become-a-host">Back to hosting</Link></div></main>;
}
