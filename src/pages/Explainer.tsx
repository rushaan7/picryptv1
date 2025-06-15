
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExplainerLayout from '@/components/explainer/ExplainerLayout';
import MathHero from '@/components/explainer/MathHero';
import FormulaSection from '@/components/explainer/FormulaSection';
import ProcessFlow from '@/components/explainer/ProcessFlow';
import SecurityComparison from '@/components/explainer/SecurityComparison';
import InteractiveDemo from '@/components/explainer/InteractiveDemo';
import Footer from '@/components/explainer/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Explainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP ScrollTrigger animations
    const sections = containerRef.current.querySelectorAll('.section-animate');
    
    sections.forEach((section, index) => {
      gsap.fromTo(section, 
        { 
          opacity: 0, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white">
      <ExplainerLayout>
        <MathHero />
        <FormulaSection />
        <ProcessFlow />
        <SecurityComparison />
        <InteractiveDemo />
        <Footer />
      </ExplainerLayout>
    </div>
  );
};

export default Explainer;
