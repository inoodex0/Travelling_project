'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStar, FaShieldAlt, FaGlobe } from 'react-icons/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Brand {
  id: number;
  name: string;
  tag: string;
  gradient: string;
  color: string;
}

const BRANDS_DATA: Brand[] = [
  { id: 1, name: 'Emirates', tag: 'Airline', gradient: 'from-red-600 to-orange-500', color: 'red' },
  { id: 2, name: 'Airbnb', tag: 'Stays', gradient: 'from-pink-500 to-rose-400', color: 'pink' },
  { id: 3, name: 'Marriott', tag: 'Hotels', gradient: 'from-amber-600 to-yellow-500', color: 'amber' },
  { id: 4, name: 'TripAdvisor', tag: 'Reviews', gradient: 'from-emerald-500 to-green-400', color: 'emerald' },
  { id: 5, name: 'NatGeo', tag: 'Media', gradient: 'from-yellow-500 to-amber-400', color: 'yellow' },
  { id: 6, name: 'Booking.com', tag: 'Booking', gradient: 'from-blue-600 to-cyan-400', color: 'blue' },
  { id: 7, name: 'Expedia', tag: 'Travel', gradient: 'from-purple-600 to-pink-500', color: 'purple' },
  { id: 8, name: 'Skyscanner', tag: 'Flights', gradient: 'from-blue-500 to-indigo-400', color: 'indigo' },
  { id: 9, name: 'Lonely Planet', tag: 'Guides', gradient: 'from-orange-500 to-red-500', color: 'orange' },
  { id: 10, name: 'Kayak', tag: 'Search', gradient: 'from-green-500 to-emerald-400', color: 'green' },
];

export default function Sponsors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // ====== SECTION FADE ======
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 95%', 
            toggleActions: 'play none none none' 
          }
        }
      );

      // ====== TITLE ANIMATION ======
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1, 
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: titleRef.current, 
            start: 'top 90%', 
            toggleActions: 'play none none none' 
          }
        }
      );

      // ====== SUBTITLE ANIMATION ======
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: subtitleRef.current, 
            start: 'top 90%', 
            toggleActions: 'play none none none' 
          }
        }
      );

      // ====== GRID CARDS WITH STAGGER ======
      const cards = gridRef.current?.querySelectorAll('.brand-card');
      if (cards) {
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 50, 
            scale: 0.9,
            rotationX: 10
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotationX: 0,
            duration: 0.8, 
            stagger: {
              amount: 0.4,
              from: 'start',
              ease: 'power2.out'
            },
            ease: 'back.out(1.7)',
            scrollTrigger: { 
              trigger: gridRef.current, 
              start: 'top 85%', 
              toggleActions: 'play none none none' 
            }
          }
        );

        // ====== CARD HOVER ANIMATIONS ======
        cards.forEach((card) => {
          const glow = card.querySelector('.brand-glow');
          const accent = card.querySelector('.brand-accent');
          const bottomGlow = card.querySelector('.brand-bottom-glow');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -8,
              duration: 0.4,
              ease: 'power2.out',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            });

            if (glow) {
              gsap.to(glow, {
                opacity: 0.15,
                scale: 1.5,
                duration: 0.5,
                ease: 'power2.out'
              });
            }

            if (accent) {
              gsap.to(accent, {
                width: '80%',
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
              });
            }

            if (bottomGlow) {
              gsap.to(bottomGlow, {
                width: '80%',
                opacity: 0.6,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: 'power2.in',
              boxShadow: 'none'
            });

            if (glow) {
              gsap.to(glow, {
                opacity: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.in'
              });
            }

            if (accent) {
              gsap.to(accent, {
                width: '0%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
              });
            }

            if (bottomGlow) {
              gsap.to(bottomGlow, {
                width: '0%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
              });
            }
          });
        });
      }

      // ====== TRUST BAR ANIMATION ======
      gsap.fromTo(trustRef.current,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: trustRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 ref={titleRef} className="text-2xl sm:text-3xl font-bold text-white">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Global Leaders
            </span>
          </h2>
          <p ref={subtitleRef} className="text-gray-400 text-sm mt-1">
            100+ travel brands worldwide
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {BRANDS_DATA.map((brand) => (
            <div
              key={brand.id}
              className="brand-card group relative cursor-pointer"
            >
              <div className={`
                relative overflow-hidden rounded-xl 
                bg-white/5 border border-white/10 
                p-4 flex flex-col items-center text-center 
                transition-all duration-500 
              `}>
                
                {/* Glow */}
                <div className={`brand-glow absolute -inset-1 bg-gradient-to-r ${brand.gradient} opacity-0 blur-xl transition-opacity duration-500`} />
                
                {/* Top Accent */}
                <div className={`brand-accent absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${brand.gradient} opacity-0 transition-all duration-500`} />

                {/* Name */}
                <h3 className="text-white/80 group-hover:text-white text-sm font-semibold transition-colors duration-300 relative z-10">
                  {brand.name}
                </h3>

                {/* Tag */}
                <p className="text-gray-500 text-[9px] uppercase tracking-wider mt-0.5 relative z-10">
                  {brand.tag}
                </p>

                {/* Bottom Glow */}
                <div className={`brand-bottom-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r ${brand.gradient} opacity-0 transition-all duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div ref={trustRef} className="mt-8 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 md:px-6 md:py-2.5 backdrop-blur-sm hover:border-white/20 transition-all duration-500">
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] md:text-xs">
              <FaShieldAlt className="text-cyan-400" />
              <span>Trusted by <span className="text-white font-bold">500+</span> companies</span>
            </div>
            <span className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="w-2.5 h-2.5" />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}