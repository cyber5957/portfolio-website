import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { SiteBackdrop } from '@/components/SiteBackdrop';
import { PointerHalo } from '@/components/PointerHalo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600']
});

export const metadata: Metadata = {
  title: 'Vinayak | Cybersecurity Portfolio',
  description: 'A modern dark cybersecurity portfolio for a SOC Analyst and Blue Team enthusiast.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true
  },
  openGraph: {
    title: 'Vinayak | Cybersecurity Portfolio',
    description: 'A modern dark cybersecurity portfolio for a SOC Analyst and Blue Team enthusiast.',
    type: 'website',
    siteName: 'Vinayak Cybersecurity Portfolio',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinayak | Cybersecurity Portfolio',
    description: 'A modern dark cybersecurity portfolio for a SOC Analyst and Blue Team enthusiast.'
  },
  keywords: ['cybersecurity portfolio', 'SOC analyst', 'blue team', 'digital forensics', 'incident response', 'threat detection']
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vinayak Chauhan',
  url: siteUrl,
  jobTitle: 'Cybersecurity Student',
  description: 'BCA Cyber Security & Forensics student specializing in Blue Team operations, incident response, and digital forensics.',
  sameAs: ['https://github.com/cyber5957', 'https://www.linkedin.com/in/vinayak-chauhan-a438b9375'],
  email: 'mailto:coderspoint1587@gmail.com'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} relative isolate font-body antialiased`}>
        <SiteBackdrop />
        <PointerHalo />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
