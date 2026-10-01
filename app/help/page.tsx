import SiteInfoPage from '../site-info-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & Support | StayNest',
  description: 'Get help with StayNest stays, hosting, and account questions.',
};

export default function HelpPage() {
  return <SiteInfoPage slug="help" />;
}