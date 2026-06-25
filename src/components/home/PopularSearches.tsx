'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SearchDestination {
  id: number;
  name: string;
  country: string;
  searchCount: string;
  image: string;
  badge?: string;
  trend: string;
}

const POPULAR_DATA: SearchDestination[] = [
  {
    id: 1,
    name: "Bali Province",
    country: "Indonesia",
    searchCount: "28k+ Searches",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80",
    badge: "Trending #1",
    trend: "+24% this week"
  },
  {
    id: 2,
    name: "Cappadocia",
    country: "Turkey",
    searchCount: "22k+ Searches",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&auto=format&fit=crop&q=80",
    badge: "Most Liked",
    trend: "+18% this week"
  },
  {
    id: 3,
    name: "Kyoto Heritage",
    country: "Japan",
    searchCount: "19k+ Searches",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80",
    badge: "Cultural Hotspot",
    trend: "+12% this week"
  },
  {
    id: 4,
    name: "Santorini Caldera",
    country: "Greece",
    searchCount: "16k+ Searches",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80",
    badge: "Romantic",
    trend: "+15% this week"
  }
];

const QUICK_TAGS = [
  "Swiss Alps 🏔️",
  "Maldives Resorts 🏝️",
  "Amalfi Coast 🇮🇹",
  "Serengeti Safari 🦁",
  "Paris Romance 🗼",
  "Iceland Lights 🌌"
];

export default function PopularSearches() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-6 md:px-12 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 text-[#ff5a1f] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a1f]/25 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-ping"></span>
              </span>
              Top Queries
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight mb-4">
              Popular Searches <br />By Travelers
            </h2>
            <p className="text-gray-500 font-light text-base leading-relaxed">
              Discover where everyone is dreaming of going this season. See real-time trending destinations backed by thousands of search queries weekly.
            </p>
          </div>

          {/* Quick Stats Banner inside header */}
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex items-center gap-4 text-left shadow-sm self-start md:self-end">
            <div className="p-3 bg-[#ff5a1f]/10 rounded-xl">
              <svg className="w-6 h-6 text-[#ff5a1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Search Velocity</p>
              <p className="text-lg font-bold text-gray-950">142,500+ This Week</p>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap items-center gap-3 mb-12 text-left">
          <span className="text-sm font-bold text-gray-900 uppercase tracking-wider mr-2">Quick Tags:</span>
          {QUICK_TAGS.map((tag, idx) => (
            <button 
              key={idx}
              className="px-4 py-2 bg-gray-50 hover:bg-[#ff5a1f]/10 hover:text-[#ff5a1f] border border-gray-100 text-gray-700 text-sm font-semibold rounded-full transition-all duration-300 shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Destiantion Grid Container */}
        {}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {POPULAR_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative h-[360px] rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Cover Image with Zoom */}
              <img 
                src={item.image} 
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

              {/* Top Badge */}
              {item.badge && (
                <span className="absolute top-5 left-5 bg-white/95 backdrop-blur-md text-gray-950 text-[10px] font-black uppercase px-3.5 py-1.5 rounded-full tracking-wider shadow-sm z-10">
                  {item.badge}
                </span>
              )}

              {/* Bottom Info Area */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-left flex flex-col z-10">
                <span className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                  {item.country}
                </span>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff5a1f] transition-colors duration-300">
                  {item.name}
                </h3>

                <div className="h-[1px] w-full bg-white/20 mb-3" />

                {/* Search counts & mini dynamic trend stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-white text-xs font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {item.searchCount}
                  </div>

                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {item.trend}
                  </span>
                </div>
              </div>

              {/* Glowing Interactive Border on Hover */}
              <div className={`absolute inset-0 border-2 rounded-[2rem] transition-all duration-500 pointer-events-none ${
                hoveredId === item.id ? 'border-[#ff5a1f] scale-100 opacity-100' : 'border-transparent scale-98 opacity-0'
              }`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
