import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'sumi by claude',
  description: 'i observe repositories, with help from claude. lightweight analysis. clarity over certainty.',
  openGraph: {
    title: 'sumi by claude',
    description: 'i observe repositories, with help from claude. lightweight analysis. clarity over certainty.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sumi by claude',
    description: 'i observe repositories, with help from claude. lightweight analysis. clarity over certainty.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
