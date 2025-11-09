import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import ImpactSection from '@/components/ImpactSection';
import Footer from '@/components/Footer';

export default function ProgramHub() {
  return (
    <>
      <Header />
      <Hero />
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-16 space-y-24">
        <ProblemSection />
        <SolutionSection />
        <ImpactSection />
      </main>
      <Footer />
    </>
  );
}
