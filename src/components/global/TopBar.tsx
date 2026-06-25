'use client';

import Link from 'next/link';
import { FaPlane } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div className="w-full bg-[#111827] text-white text-xs sm:text-sm py-3 border-b border-gray-800 block relative z-40 overflow-hidden">
      
      {/* Animated Plane */}
      <div className="absolute inset-0 pointer-events-none">
        <FaPlane className="absolute text-cyan-400 text-lg animate-fly-plane" />
      </div>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative z-10">
        
        {/* Left Side: Contact Info */}
        <div className="flex gap-4 sm:gap-6 font-medium">
          <span>Phone: +880 1234 5678</span>
          <span className="hidden sm:inline">Email: info@travelx.com</span>
        </div>
        
        {/* Right Side: Action Button */}
        <div>
          <Link 
            href="/packages" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1.5 rounded transition text-xs inline-block"
          >
            Buy Tickets
          </Link>
        </div>

      </div>
    </div>
  );
}