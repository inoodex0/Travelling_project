'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DestinationCard {
  id: number;
  title: string;
  country: string;
  toursCount: number;
  priceFrom: number;
  rating: number;
  image: string;
  gridSpan: string; // Tailwind grid span logic
  badge?: string;
  isPopular: boolean;
}

const DESTINATIONS_DATA: DestinationCard[] = [
  {
    id: 1,
    title: "Paris, Romantic Escape",
    country: "France",
    toursCount: 142,
    priceFrom: 899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    gridSpan: "lg:col-span-6 md:col-span-12",
    badge: "Most Visited",
    isPopular: true
  },
  {
    id: 2,
    title: "Bali Tropical Resorts",
    country: "Indonesia",
    toursCount: 98,
    priceFrom: 499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    gridSpan: "lg:col-span-3 md:col-span-6",
    isPopular: true
  },
  {
    id: 3,
    title: "Kyoto Heritage Shrine",
    country: "Japan",
    toursCount: 74,
    priceFrom: 1200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
    gridSpan: "lg:col-span-3 md:col-span-6",
    badge: "Cultural",
    isPopular: false
  },
  {
    id: 4,
    title: "Swiss Alps Adventure",
    country: "Switzerland",
    toursCount: 112,
    priceFrom: 1450,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    gridSpan: "lg:col-span-3 md:col-span-6",
    badge: "Top Rated",
    isPopular: true
  },
  {
    id: 5,
    title: "Cappadocia Hot Air Balloons",
    country: "Turkey",
    toursCount: 65,
    priceFrom: 650,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&auto=format&fit=crop&q=80",
    gridSpan: "lg:col-span-3 md:col-span-6",
    isPopular: false
  },
  {
    id: 6,
    title: "Amalfi Coast Hideout",
    country: "Italy",
    toursCount: 88,
    priceFrom: 1100,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=80",
    gridSpan: "lg:col-span-6 md:col-span-12",
    badge: "Summer Special",
    isPopular: true
  }
];

export default function DestinationsGrid() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridItemsRef = useRef<HTMLDivElement>(null);

  // Toggle favorite destinations
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card click
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (gridItemsRef.current) {
      const items = gridItemsRef.current.children;
      gsap.fromTo(items,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridItemsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 bg-white w-full overflow-hidden border-b border-gray-100"
    >
      {/* Visual background soft blobs for a luxury feel */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] bg-blue-100/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        { }
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 text-[#ff5a1f] text-xs md:text-sm font-extrabold tracking-widest uppercase mb-4 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a1f] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </span>
              Top Destinations
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight mb-4">
              Explore Beautiful <br />
              Places Around The World
            </h2>
            <p className="text-gray-500 font-light text-base md:text-lg leading-relaxed">
              We have handpicked the world's most scenic, safe, and culturally-rich destinations to fulfill your true traveling desire.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <span className="text-sm font-bold text-gray-500">All Destinations</span>
            <div className="w-12 h-12 rounded-full bg-[#ff5a1f] hover:bg-gray-900 flex items-center justify-center text-white cursor-pointer shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 active:scale-95">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        { }
        <div 
          ref={gridItemsRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {DESTINATIONS_DATA.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className={`group relative h-[380px] sm:h-[420px] rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer ${item.gridSpan}`}
              >
                {/* Background Image with Slow Zoom */}
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-all duration-500 group-hover:from-black/95 group-hover:via-black/45" />

                {/* Top Badge Overlay */}
                {item.badge && (
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-gray-950 text-[10px] font-black uppercase px-4 py-2 rounded-full tracking-wider shadow-md z-20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]"></span>
                    {item.badge}
                  </div>
                )}

                {/* Heart/Favorite button overlay */}
                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  className={`absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center border z-20 transition-all duration-300 ${
                    isFav 
                      ? 'bg-[#ff5a1f] border-[#ff5a1f] text-white shadow-lg' 
                      : 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-[#ff5a1f] hover:border-white'
                  }`}
                  aria-label="Add to Favorites"
                >
                  <svg 
                    className={`w-5 h-5 ${isFav ? 'fill-current' : 'fill-none'}`} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-left z-20 flex flex-col justify-end">
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="flex items-center gap-1 bg-yellow-400 text-gray-950 text-xs font-bold px-2.5 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {item.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-300 text-xs font-medium">{item.toursCount}+ Tours</span>
                  </div>

                  <span className="text-[#ff5a1f] text-xs font-black uppercase tracking-widest mb-1.5">
                    {item.country}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-5 group-hover:text-orange-50 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Divider line that transitions on hover */}
                  <div className="h-[1px] w-full bg-white/20 mb-5 group-hover:bg-[#ff5a1f]/60 transition-colors duration-300" />

                  {/* Flex info: Pricing and Interactive booking button */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Tours start from</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-white">
                        ${item.priceFrom} <span className="text-xs font-normal text-gray-400">/ person</span>
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#ff5a1f] border border-white/20 group-hover:border-[#ff5a1f] flex items-center justify-center text-white transition-all duration-300 group-hover:scale-105">
                      <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Glowing border frame on hover */}
                <div className="absolute inset-0 border-2 rounded-[2.5rem] border-transparent group-hover:border-[#ff5a1f]/30 pointer-events-none transition-all duration-500" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
