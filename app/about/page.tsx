import SiteInfoPage from '../site-info-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About StayNest',
  description: 'Learn about StayNest and our thoughtful approach to stays and hospitality across Nigeria.',
};

export default function AboutPage() {
  return <SiteInfoPage slug="about" />;
}