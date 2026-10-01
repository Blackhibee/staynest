import SiteInfoPage from '../site-info-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | StayNest',
  description: 'Read the StayNest Terms of Service.',
};

export default function TermsPage() {
  return <SiteInfoPage slug="terms" />;
}