'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  statValue: string;
  statLabel: string;
}

const FEATURES_DATA: ExperienceFeature[] = [
  {
    id: 1,
    title: "Handpicked Luxury Stays",
    description: "We personally inspect and select only the top 5% of boutique hotels and private villas around the globe to guarantee your absolute comfort.",
    icon: "🏰",
    statValue: "99.4%",
    statLabel: "Satisfaction Rate"
  },
  {
    id: 2,
    title: "Curated Expert-Led Itineraries",
    description: "Skip the tourist traps. Our local guides and travel designers build unique, off-the-beaten-path journeys tailored exactly to your pace.",
    icon: "🗺️",
    statValue: "150+",
    statLabel: "Local Experts"
  },
  {
    id: 3,
    title: "Seamless 24/7 Concierge Support",
    description: "From delayed flights to midnight table reservations, your dedicated personal travel assistant is always just a single text away.",
    icon: "🛎️",
    statValue: "24/7",
    statLabel: "Live Support"
  }
];

export default function TravelExperience() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Scroll Animation for split content
    if (leftColRef.current && rightColRef.current) {
      gsap.fromTo(leftColRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(rightColRef.current,
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-28 px-6 md:px-12 bg-white w-full overflow-hidden border-b border-gray-100"
    >
      {/* Cinematic Blur Background Orbs */}
      <div className="absolute top-[20%] left-[-15%] w-[600px] h-[600px] bg-emerald-200/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[#ff5a1f]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {}
          <div ref={leftColRef} className="lg:col-span-6 text-left flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-[#ff5a1f] text-xs md:text-sm font-extrabold tracking-widest uppercase mb-5 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f]"></span>
              Why Choose Trivana
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight mb-6">
              We Craft Travel Experiences <br />
              That Stay With You Forever
            </h2>

            <p className="text-gray-500 font-light text-base md:text-lg leading-relaxed mb-10">
              We believe travel should be effortless, inspiring, and unique. That's why we coordinate every tiny detail, leaving you free to immerse yourself in the magic of your adventure.
            </p>

            {/* Interactive Feature Accordion List */}
            <div className="space-y-4 mb-8">
              {FEATURES_DATA.map((feature) => {
                const isActive = activeTab === feature.id;
                return (
                  <div 
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className={`p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer text-left ${
                      isActive 
                        ? 'bg-white border-orange-200 shadow-xl shadow-orange-500/5 translate-x-2' 
                        : 'bg-gray-50/50 hover:bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Interactive Icon Box */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
                        isActive ? 'bg-[#ff5a1f] text-white shadow-md' : 'bg-white border border-gray-100'
                      }`}>
                        {feature.icon}
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl">
                          {feature.title}
                        </h3>
                      </div>

                      {/* Dropdown Indicator arrow */}
                      <div className={`transition-transform duration-300 ${isActive ? 'rotate-90 text-[#ff5a1f]' : 'text-gray-400'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Smooth expanding description */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                      isActive ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-gray-500 font-normal text-sm sm:text-base leading-relaxed pl-16">
                        {feature.description}
                      </p>
                      
                      {/* Stat tag highlighted */}
                      <div className="pl-16 mt-4 flex items-center gap-3">
                        <span className="text-[#ff5a1f] text-xl font-black">{feature.statValue}</span>
                        <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{feature.statLabel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {}
          <div ref={rightColRef} className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Main Luxury Overlapping Photo Frame */}
            <div className="relative w-full max-w-[500px] h-[450px] sm:h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white bg-gray-50">
              <img 
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80" 
                alt="Adventure Travelers on Cliff"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* FLOATING VIDEO CARD: Perfectly resembles the card in image_2279a6.jpg */}
            <div 
              onClick={() => setIsVideoPlaying(true)}
              className="absolute bottom-10 right-[-5px] sm:right-[-20px] bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-white shadow-2xl shadow-black/15 max-w-[280px] sm:max-w-[320px] cursor-pointer hover:scale-105 transition-all duration-300 z-20 group"
            >
              <div className="relative rounded-2xl overflow-hidden h-36 sm:h-40 mb-3.5 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=500&auto=format&fit=crop&q=80" 
                  alt="Friends Jumping"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  {/* Floating Pulsing Play Button */}
                  <div className="w-12 h-12 rounded-full bg-[#ff5a1f] flex items-center justify-center text-white shadow-lg shadow-orange-600/30 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                    <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Story</p>
                  <p className="text-sm font-extrabold text-gray-900 group-hover:text-[#ff5a1f] transition-colors duration-300">Beauty of Every Journey</p>
                </div>
                {/* Arrow Button */}
                <div className="p-2 bg-gray-50 rounded-full text-gray-800 border border-gray-100 group-hover:bg-[#ff5a1f] group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Decorative background visual elements */}
            <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-orange-100/30 rounded-3xl rotate-12 -z-10 border border-orange-200/20" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-50 rounded-[2.5rem] -rotate-6 -z-10 border border-emerald-100" />
          </div>

        </div>
      </div>

      {}
      {/* POPUP FULLSCREEN VIDEO MODAL */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[999] flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-gray-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsVideoPlaying(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-[#ff5a1f] hover:text-white flex items-center justify-center transition-all duration-300 z-50 hover:rotate-90 active:scale-95 border border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Beautiful, High-Quality Travel Experience Video Loop */}
            <video 
              autoPlay 
              controls 
              className="w-full h-full object-cover"
              src="https://assets.mixkit.co/videos/preview/mixkit-women-walking-on-a-wooden-bridge-41584-large.mp4"
            />
          </div>
        </div>
      )}

    </section>
  );
}
