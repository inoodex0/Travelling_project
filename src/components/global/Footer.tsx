'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn, 
  FaPlane, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, 
  FaArrowRight, FaStar, FaShieldAlt, FaHeadset, FaLock,
  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal,
  FaAngleUp, FaPaperPlane
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-[200px]" />

      {/* Newsletter Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600/20 via-blue-600/10 to-slate-800 border border-white/10 backdrop-blur-xl p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-4">
                  <FaPaperPlane className="text-cyan-400 text-xs" />
                  <span className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">Stay Updated</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Join Our <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Newsletter</span>
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Subscribe to get exclusive travel deals, early-bird discounts, and insider tips delivered to your inbox.
                </p>
              </div>
              <div>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3.5 text-white text-sm placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-sm rounded-xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 flex items-center justify-center gap-2 shrink-0"
                  >
                    Subscribe
                    <FaArrowRight className="text-xs" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            
            {/* Column 1: Brand - Large */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-5 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                  🌪️
                </div>
                <div>
                  <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-tight">
                    CYCLONE
                  </span>
                  <span className="text-[10px] text-gray-500 block -mt-0.5 font-medium tracking-wider uppercase">
                    Tour & Travels
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                Award-winning travel agency curating extraordinary journeys since 2015. Trusted by 10,000+ travelers worldwide for hassle-free, unforgettable experiences.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span className="text-white text-xs font-semibold">4.9</span>
                  <span className="text-gray-500 text-[10px]">(2.4k reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <FaShieldAlt className="text-cyan-400 text-xs" />
                  <span className="text-white text-xs font-semibold">Secure</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <FaHeadset className="text-orange-400 text-xs" />
                  <span className="text-white text-xs font-semibold">24/7 Support</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-3 font-semibold">Follow Us</p>
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: <FaFacebookF />, href: '#', color: 'hover:bg-blue-600 hover:border-blue-500' },
                    { icon: <FaInstagram />, href: '#', color: 'hover:bg-pink-600 hover:border-pink-500' },
                    { icon: <FaTwitter />, href: '#', color: 'hover:bg-sky-500 hover:border-sky-400' },
                    { icon: <FaYoutube />, href: '#', color: 'hover:bg-red-600 hover:border-red-500' },
                    { icon: <FaLinkedinIn />, href: '#', color: 'hover:bg-blue-700 hover:border-blue-600' },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all hover:scale-110 hover:text-white text-sm ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Destinations */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-white/80 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-cyan-400" />
                Destinations
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Cox's Bazar", href: '/destinations/cox-bazar', desc: 'World\'s longest beach' },
                  { label: 'Sundarbans', href: '/destinations/sundarbans', desc: 'Mangrove forest' },
                  { label: 'Sylhet', href: '/destinations/sylhet', desc: 'Tea gardens' },
                  { label: 'Bandarban', href: '/destinations/bandarban', desc: 'Hill tracts' },
                  { label: 'St. Martin', href: '/destinations/st-martin', desc: 'Coral island' },
                  { label: 'Sajek Valley', href: '/destinations/sajek', desc: 'Queen of hills' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-2.5">
                        <FaMapMarkerAlt className="text-[9px] text-cyan-500/60 group-hover:text-cyan-400 transition-colors" />
                        <div>
                          <p className="text-gray-300 group-hover:text-white text-sm transition-colors">{item.label}</p>
                          <p className="text-gray-600 text-[10px]">{item.desc}</p>
                        </div>
                      </div>
                      <FaArrowRight className="text-[8px] text-cyan-500/0 group-hover:text-cyan-400 transition-all group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-white/80 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-cyan-400" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Us', href: '/about' },
                  { label: 'All Packages', href: '/packages' },
                  { label: 'Honeymoon', href: '/packages/honeymoon' },
                  { label: 'Family Tours', href: '/packages/family' },
                  { label: 'Blog & Stories', href: '/blog' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'FAQ', href: '/faq' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-cyan-400 transition-colors" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-white/80 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-cyan-400" />
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="group">
                  <a href="tel:+8801234567890" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-all">
                      <FaPhoneAlt className="text-cyan-400 text-sm" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">+880 1234 5678</p>
                      <p className="text-gray-500 text-[10px]">24/7 Customer Support</p>
                    </div>
                  </a>
                </li>
                <li className="group">
                  <a href="mailto:info@cyclonetour.com" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-all">
                      <FaEnvelope className="text-blue-400 text-sm" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">info@cyclonetour.com</p>
                      <p className="text-gray-500 text-[10px]">We reply within 24hrs</p>
                    </div>
                  </a>
                </li>
                <li className="group">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-all">
                      <FaMapMarkerAlt className="text-orange-400 text-sm" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Dhaka, Bangladesh</p>
                      <p className="text-gray-500 text-[10px]">Gulshan 1, Dhaka 1212</p>
                    </div>
                  </div>
                </li>
                <li className="group">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-all">
                      <FaClock className="text-purple-400 text-sm" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Sat - Thu: 9:00 AM - 9:00 PM (BST)</p>
                      <p className="text-gray-500 text-[10px]">GMT+6 — Friday: Closed</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {currentYear} <span className="text-gray-400">CYCLONE Tour & Travels</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-gray-500">
                Developed by{' '}
                <Link href="https://inoodex.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:underline">
                  Inoodex
                </Link>
              </span>
              <span className="text-white/5">|</span>
              <Link href="/privacy" className="text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <FaLock className="text-[8px]" />
                Privacy Policy
              </Link>
              <span className="text-white/5">|</span>
              <Link href="/terms" className="text-gray-500 hover:text-cyan-400 transition-colors">Terms</Link>
              <span className="text-white/5">|</span>
              <Link href="/sitemap" className="text-gray-500 hover:text-cyan-400 transition-colors">Sitemap</Link>
            </div>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all hover:scale-110"
            >
              <FaAngleUp className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
