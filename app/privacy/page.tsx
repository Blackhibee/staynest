import SiteInfoPage from '../site-info-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | StayNest',
  description: 'Read how StayNest approaches your information and privacy.',
};

export default function PrivacyPage() {
  return <SiteInfoPage slug="privacy" />;
}