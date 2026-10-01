import type { Metadata } from 'next';
import './globals.css';
import './reservation.css';
import './host-dashboard.css';
import '../site-info.css';
import './home-footer.css';

export const metadata: Metadata = {
  title: 'StayNest',
  description: 'Comfortable stays and trusted hosts across Nigeria.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
