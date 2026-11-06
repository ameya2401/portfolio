import type { Metadata } from 'next';
import AboutContent from '@/components/quiet/AboutContent';

export const metadata: Metadata = {
  title: 'About · Ameya Bhagat',
  alternates: { canonical: '/about' },
};

export default function About() {
  return <AboutContent />;
}
