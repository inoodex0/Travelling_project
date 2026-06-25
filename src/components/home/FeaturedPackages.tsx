'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from "@/components/ui/button";

interface TourPackage {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  badge?: string;
}

const PACKAGES_DATA: TourPackage[] = [
  {
    id: 1,
    title: "Alpine Adventure & Glacier Trekking",
    location: "Swiss Alps, Switzerland",
    duration: "7 Days / 6 Nights",
    price: "$1,299",
    rating: 4.9,
    reviews: 142,
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    badge: "Best Seller"
  },
  {
    id: 2,
    title: "Tropical Paradise Island Getaway",
    location: "Maldives Luxury Resorts",
    duration: "5 Days / 4 Nights",
    price: "$1,850",
    rating: 4.8,
    reviews: 98,
    category: "Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    badge: "Premium Offer"
  },
  {
    id: 3,
    title: "Mystical Forest & Canyon Expedition",
    location: "Grand Canyon National Park, USA",
    duration: "6 Days / 5 Nights",
    price: "$890",
    rating: 4.7,
    reviews: 115,
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Ancient Temples & Heritage Tour",
    location: "Kyoto & Tokyo, Japan",
    duration: "10 Days / 9 Nights",
    price: "$2,450",
    rating: 4.9,
    reviews: 210,
    category: "Culture",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
    badge: "Trending"
  },
  {
    id: 5,
    title: "Wild Safari & Luxury Camping",
    location: "Serengeti National Park, Tanzania",
    duration: "8 Days / 7 Nights",
    price: "$1,699",
    rating: 4.8,
    reviews: 76,
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "Amalfi Coast Scenic Hideaway",
    location: "Positano, Italy",
    duration: "6 Days / 5 Nights",
    price: "$1,420",
    rating: 4.8,
    reviews: 134,
    category: "Beach",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=80",
    badge: "Exclusive"
  }
];

const CATEGORIES = ["All", "Mountain", "Beach", "Adventure", "Culture"];

export default function FeaturedPackages() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter packages based on category selected
  const filteredPackages = PACKAGES_DATA.filter(pkg => 
    selectedCategory === "All" ? true : pkg.category === selectedCategory
  );

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(cards, 
        { opacity: 0, y: 30, scale: 0.98 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    }
  }, [selectedCategory]);

  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50/50 w-full">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 text-[#ff5a1f] text-xs md:text-sm font-bold tracking-widest uppercase mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a1f]/25 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f]"></span>
              </span>
              Trendy Packages
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
              Explore Our Popular <br />
              Travel Packages
            </h2>
            <p className="text-gray-500 font-light text-base leading-relaxed">
              Find customized itineraries filled with extraordinary adventures, first-class accommodations, and hidden gems recommended by locals.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 md:self-end">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#ff5a1f] text-white shadow-lg shadow-orange-600/20'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              
              {/* Card Image Area with Zoom Effects */}
              <div className="relative h-72 w-full overflow-hidden">
                {pkg.badge && (
                  <span className="absolute top-5 left-5 bg-[#ff5a1f] text-white text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-md">
                    {pkg.badge}
                  </span>
                )}
                
                {/* Visual Overlay gradient on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Category Floater */}
                <span className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-10">
                  {pkg.category}
                </span>
              </div>

              {/* Package Details Content */}
              <div className="p-8 flex flex-col flex-grow text-left">
                
                {/* Rating & Review and Location */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                    {/* Map Pin Icon */}
                    <svg className="w-3.5 h-3.5 text-[#ff5a1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {pkg.location}
                  </span>
                  
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-800">
                    {/* Gold Star */}
                    <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {pkg.rating} <span className="text-gray-400 font-normal">({pkg.reviews})</span>
                  </span>
                </div>

                {/* Package Main Title */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#ff5a1f] transition-colors duration-300 leading-snug mb-3">
                  {pkg.title}
                </h3>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-6">
                  {/* Clock icon */}
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {pkg.duration}
                </div>

                {/* Divider line */}
                <div className="w-full h-px bg-gray-100 mb-6 mt-auto" />

                {/* Bottom Row: Pricing & Book button */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">From Only</span>
                    <span className="text-2xl font-black text-gray-900">{pkg.price}</span>
                  </div>

                  <Button className="h-11 px-5 bg-gray-950 hover:bg-[#ff5a1f] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-2 group/btn">
                    Book Package
                    <span className="bg-white/20 p-1 rounded-full group-hover/btn:translate-x-1 transition-transform duration-300">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

