import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StayNest',
  description: 'Comfortable stays and trusted hosts across Nigeria.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
