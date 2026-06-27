"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { 
  FaHome, 
  FaInfoCircle, 
  FaMapMarkedAlt, 
  FaBlog, 
  FaPhone, 
  FaEnvelope, 
  FaBuilding,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaGlobe,
  FaPlane,
  FaHotel,
  FaUmbrellaBeach,
  FaMountain,
  FaTree,
  FaFire,
  FaTrophy,
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaDollarSign,
  FaHeart,
  FaNewspaper,
  FaAddressBook,
  FaCog,
  FaBookmark,
  FaHistory,
  FaComments,
  FaQuestionCircle,
  FaShieldAlt,
  FaHeadset
} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

// ============= Types =============
interface DropdownItem {
  label: string;
  href: string;
  icon?: JSX.Element;
  description?: string;
}

interface NavLink {
  label: string;
  href: string;
  icon: JSX.Element;
  dropdown?: DropdownItem[];
  badge?: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ============= Scroll Effect =============
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============= Dropdown Hover =============
  const handleDropdownEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // ============= Navigation Links =============
  const navLinks: NavLink[] = [
    {
      label: "Home",
      href: "/",
      icon: <FaHome />,
    },
    {
      label: "About",
      href: "/about",
      icon: <FaInfoCircle />,
    },
    {
      label: "Destinations",
      href: "/destinations",
      icon: <FaMapMarkedAlt />,
      dropdown: [
        { 
          label: "Cox's Bazar", 
          href: "/destinations/cox-bazar", 
          icon: <FaUmbrellaBeach />,
          description: "World's longest sea beach"
        },
        { 
          label: "Sundarbans", 
          href: "/destinations/sundarbans", 
          icon: <FaTree />,
          description: "Largest mangrove forest"
        },
        { 
          label: "St. Martin", 
          href: "/destinations/st-martin", 
          icon: <FaGlobe />,
          description: "Only coral island"
        },
        { 
          label: "Sylhet", 
          href: "/destinations/sylhet", 
          icon: <FaMountain />,
          description: "Tea gardens & hills"
        },
        { 
          label: "Bandarban", 
          href: "/destinations/bandarban", 
          icon: <FaFire />,
          description: "Hills & waterfalls"
        },
        { 
          label: "Rangamati", 
          href: "/destinations/rangamati", 
          icon: <FaHotel />,
          description: "Lake & hills"
        },
        { 
          label: "Sajek Valley", 
          href: "/destinations/sajek", 
          icon: <FaMountain />,
          description: "Queen of hills"
        },
        { 
          label: "Kuakata", 
          href: "/destinations/kuakata", 
          icon: <FaUmbrellaBeach />,
          description: "Sea beach & sunrise"
        },
      ]
    },
    {
      label: "Packages",
      href: "/packages",
      icon: <FaPlane />,
      dropdown: [
        { 
          label: "Family Package", 
          href: "/packages/family", 
          icon: <FaUsers />,
          description: "For 5-10 people"
        },
        { 
          label: "Honeymoon Package", 
          href: "/packages/honeymoon", 
          icon: <FaHeart />,
          description: "For couples"
        },
        { 
          label: "Adventure Package", 
          href: "/packages/adventure", 
          icon: <FaTrophy />,
          description: "Trekking & camping"
        },
        { 
          label: "Budget Package", 
          href: "/packages/budget", 
          icon: <FaDollarSign />,
          description: "Affordable prices"
        },
        { 
          label: "Luxury Package", 
          href: "/packages/luxury", 
          icon: <FaStar />,
          description: "Premium experience"
        },
        { 
          label: "Group Package", 
          href: "/packages/group", 
          icon: <FaUsers />,
          description: "For 10+ people"
        },
      ]
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FaUser />,
      dropdown: [
        { 
          label: "My Profile", 
          href: "/dashboard/profile", 
          icon: <FaUser /> 
        },
        { 
          label: "My Bookings", 
          href: "/dashboard/bookings", 
          icon: <FaCalendarAlt /> 
        },
        { 
          label: "Wishlist", 
          href: "/dashboard/wishlist", 
          icon: <FaBookmark /> 
        },
        { 
          label: "Payment History", 
          href: "/dashboard/payments", 
          icon: <FaHistory /> 
        },
        { 
          label: "Settings", 
          href: "/dashboard/settings", 
          icon: <FaCog /> 
        },
      ]
    },
    {
      label: "Blog",
      href: "/blog",
      icon: <FaNewspaper />,
      dropdown: [
        { 
          label: "Travel Tips", 
          href: "/blog/travel-tips", 
          icon: <FaComments />,
          description: "Expert travel advice"
        },
        { 
          label: "Destination Guides", 
          href: "/blog/destination-guides", 
          icon: <FaMapMarkedAlt />,
          description: "Complete travel guides"
        },
        { 
          label: "Travel Stories", 
          href: "/blog/stories", 
          icon: <FaHeart />,
          description: "Real travel experiences"
        },
        { 
          label: "News & Updates", 
          href: "/blog/news", 
          icon: <FaNewspaper />,
          description: "Latest travel news"
        },
      ]
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <FaAddressBook />,
      dropdown: [
        { 
          label: "Contact Us", 
          href: "/contact", 
          icon: <FaHeadset />,
          description: "Get in touch"
        },
        { 
          label: "FAQ", 
          href: "/faq", 
          icon: <FaQuestionCircle />,
          description: "Frequently asked questions"
        },
        { 
          label: "Support", 
          href: "/support", 
          icon: <FaShieldAlt />,
          description: "24/7 customer support"
        },
      ]
    },
  ];

  // ============= Contact Info =============
  const contactInfo = [
   
    { icon: <FaBuilding className="text-cyan-500" />, text: "Office", href: "#" },
  ];

  // ============= Render Dropdown =============
  const renderDropdown = (link: NavLink) => {
    if (!link.dropdown) return null;

    return (
      <div
        className={`absolute top-full left-0 mt-1 w-72 bg-slate-900 rounded-2xl shadow-2xl border border-cyan-900/50 overflow-hidden transition-all duration-300 ${
          openDropdown === link.label 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-2"
        }`}
        onMouseEnter={() => handleDropdownEnter(link.label)}
        onMouseLeave={handleDropdownLeave}
      >
        <div className="py-2 max-h-96 overflow-y-auto">
          {link.dropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 px-5 py-3 hover:bg-cyan-900/20 transition-colors group"
              onClick={() => setOpenDropdown(null)}
            >
                    <span className="text-cyan-400 text-lg mt-0.5 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <div>
                    <p className="font-medium text-gray-200 group-hover:text-cyan-300 transition-colors">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  // ============= Main Render =============
  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-slate-900/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-b border-cyan-500/10" 
          : "bg-slate-900/95 border-b border-cyan-500/5"
      }`}
    >
      {/* Navbar Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      {isScrolled && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-cyan-400/5 blur-2xl rounded-full" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* ====== Logo ====== */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">
              🌪️
            </span>
            <div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                CYCLONE
              </span>
              <span className="text-xs text-gray-400 block -mt-0.5 font-medium">
                Tour & Travels
              </span>
            </div>
          </Link>

          {/* ====== Desktop Navigation - Center ====== */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-1 px-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              const hasDropdown = link.dropdown && link.dropdown.length > 0;

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleDropdownEnter(link.label)}
                  onMouseLeave={hasDropdown ? handleDropdownLeave : undefined}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all font-medium text-sm whitespace-nowrap ${
                      isActive
                        ? "text-cyan-300 bg-cyan-900/50"
                        : "text-gray-300 hover:text-cyan-300 hover:bg-cyan-900/30"
                    }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                    {hasDropdown && (
                      <FaChevronDown className={`text-xs transition-transform duration-300 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`} />
                    )}
                    {link.badge && (
                      <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {hasDropdown && renderDropdown(link)}
                </div>
              );
            })}
          </div>

          {/* ====== Right Side ====== */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            
            {/* Contact Info - Desktop */}
            <div className="hidden xl:flex items-center gap-3 text-sm">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-300 transition-colors whitespace-nowrap"
                >
                  {item.icon}
                  <span className="text-xs">{item.text}</span>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden xl:block w-px h-6 bg-gray-700" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Buttons */}
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="px-3 py-2 text-cyan-300 font-medium hover:bg-cyan-900/30 rounded-xl transition-all text-sm hidden sm:block"
              >
                <FaSignInAlt className="inline mr-1.5" />
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl hover:shadow-xl transition-all hover:scale-105 text-sm hidden sm:block"
              >
                <FaUserPlus className="inline mr-1.5" />
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-800 transition-all"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl text-gray-300" />
              ) : (
                <FaBars className="text-xl text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* ====== Mobile Menu ====== */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800 max-h-[80vh] overflow-y-auto bg-slate-900/98 backdrop-blur-2xl rounded-b-2xl shadow-2xl">
            {/* Navigation Links */}
            <div className="px-2 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                const hasDropdown = link.dropdown && link.dropdown.length > 0;

                return (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-900/50 to-blue-900/50 text-cyan-300"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg w-5 text-center">{link.icon}</span>
                      <span className="font-medium text-sm">{link.label}</span>
                      {link.badge && (
                        <span className="ml-auto px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>

                    {/* Mobile Dropdown - Always expanded */}
                    {hasDropdown && (
                      <div className="ml-6 mt-0.5 mb-1 space-y-0.5 border-l border-gray-800 pl-3">
                        {link.dropdown!.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-cyan-900/20 text-gray-400 hover:text-gray-200 text-sm transition-all"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="text-cyan-400 text-xs w-4 text-center">{item.icon}</span>
                            <div className="flex-1">
                              <span className="text-xs">{item.label}</span>
                              {item.description && (
                                <span className="text-[10px] text-gray-600 ml-2">{item.description}</span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Contact Info - Mobile */}
            <div className="mt-4 mx-2 p-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2 px-1">Contact</p>
              <div className="space-y-1">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-cyan-300 transition-colors rounded-lg hover:bg-white/5"
                  >
                    <span className="text-cyan-400 text-sm w-4 text-center">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Auth Section - Mobile */}
            <div className="mt-4 mx-2 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Account</p>
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-3 px-1">
                <Link
                  href="/login"
                  className="flex-1 text-center py-2.5 border border-cyan-500/30 text-cyan-300 rounded-xl font-medium hover:bg-cyan-900/20 transition-all text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 text-center py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all text-sm"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}