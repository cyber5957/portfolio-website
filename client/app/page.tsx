import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { PortfolioSections } from '@/components/PortfolioSections';
import { MotionSection } from '@/components/MotionSection';
import { Footer } from '@/components/Footer';
import { IntroGate } from '@/components/IntroGate';
import { CommandPalette } from '@/components/CommandPalette';
import { GitHubStats } from '@/components/GitHubStats';

export default function HomePage() {
  return (
    <IntroGate>
      <div className="relative overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <CommandPalette />
        <Navbar />
        <main className="relative overflow-visible space-y-16 pb-16 sm:space-y-20 sm:pb-20 lg:space-y-24 lg:pb-24">
          <Hero />
          <MotionSection delay={0.12}>
            <PortfolioSections />
          </MotionSection>
          <MotionSection delay={0.16}>
            <GitHubStats />
          </MotionSection>
          <MotionSection delay={0.2}>
            <Footer />
          </MotionSection>
        </main>
      </div>
    </IntroGate>
  );
}
