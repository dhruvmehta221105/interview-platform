import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import TrustedBy from '../components/home/TrustedBy';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import AnalyticsShowcase from '../components/home/AnalyticsShowcase';
import CompanyLibrary from '../components/home/CompanyLibrary';
import Testimonials from '../components/home/Testimonials';
import Pricing from '../components/home/Pricing';
import FAQ from '../components/home/FAQ';
import FinalCTA from '../components/home/FinalCTA';
import Footer from '../components/home/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <AnalyticsShowcase />
      <CompanyLibrary />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}