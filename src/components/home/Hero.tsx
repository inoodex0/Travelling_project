'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { 
  FaPlay, 
  FaArrowRight, 
  FaStar, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCloudSun,
  FaSearch,
  FaUsers,
  FaUmbrellaBeach,
  FaMountain,
  FaTree,
  FaGlobe,
  FaChevronDown,
  FaTimes,
  FaExpand,
  FaFire,
  FaHotel
} from 'react-icons/fa';

// ============= Types =============
interface Destination {
  id: number;
  name: string;
  country: string;
  icon: JSX.Element;
  image: string;
}

interface SearchFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const bottomFooterRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ============= Destinations Data =============
  const destinations: Destination[] = [
    { id: 1, name: "Cox's Bazar", country: "Bangladesh", icon: <FaUmbrellaBeach />, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
    { id: 2, name: "Sundarbans", country: "Bangladesh", icon: <FaTree />, image: "https://images.unsplash.com/photo-1547915736-8c2e5cf92efd?w=600&q=80" },
    { id: 3, name: "Sylhet", country: "Bangladesh", icon: <FaMountain />, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80" },
    { id: 4, name: "Bandarban", country: "Bangladesh", icon: <FaFire />, image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80" },
    { id: 5, name: "Rangamati", country: "Bangladesh", icon: <FaHotel />, image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80" },
    { id: 6, name: "Saint Martin", country: "Bangladesh", icon: <FaGlobe />, image: "https://images.unsplash.com/photo-1515238152791-8216bfdf89a8?w=600&q=80" },
  ];

  // ============= Images =============
  const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=90",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=90",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=90",
    "https://images.unsplash.com/photo-1515238152791-8216bfdf89a8?w=1920&q=90"
  ];

  // ============= Calendar Functions =============
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const today = new Date();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isToday = date.getDate() === today.getDate() && 
                      date.getMonth() === today.getMonth() && 
                      date.getFullYear() === today.getFullYear();
      const isSelected = selectedDate && 
                         date.getDate() === selectedDate.getDate() && 
                         date.getMonth() === selectedDate.getMonth() && 
                         date.getFullYear() === selectedDate.getFullYear();
      
      days.push({
        day,
        date,
        isPast,
        isToday,
        isSelected,
        isDisabled: isPast
      });
    }

    return days;
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const selectDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      return;
    }

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: null });
      setSearchFilters({
        ...searchFilters,
        checkIn: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      setSelectedDate(date);
    } else if (selectedRange.start && !selectedRange.end) {
      if (date >= selectedRange.start) {
        setSelectedRange({ ...selectedRange, end: date });
        setSearchFilters({
          ...searchFilters,
          checkOut: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        });
        setIsCalendarOpen(false);
      } else {
        setSelectedRange({ start: date, end: null });
        setSearchFilters({
          ...searchFilters,
          checkIn: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          checkOut: ''
        });
        setSelectedDate(date);
      }
    }
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // ============= GSAP Animations =============
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.2 })
      .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, '-=0.7')
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=0.7')
      .fromTo(buttonRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, '-=0.6')
      .fromTo(statsRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, '-=0.5')
      .fromTo(videoCardRef.current, { opacity: 0, x: 40, rotate: 2 }, { opacity: 1, x: 0, rotate: 0 }, '-=0.8')
      .fromTo(bottomFooterRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0 }, '-=0.5');
  }, []);

  // ============= Image Slider =============
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (activeSlide + 1) % images.length;
      if (imgRefs.current[activeSlide]) {
        gsap.to(imgRefs.current[activeSlide], {
          opacity: 0,
          scale: 1.1,
          duration: 1.5,
          ease: 'power2.inOut'
        });
      }
      if (imgRefs.current[nextSlide]) {
        gsap.fromTo(imgRefs.current[nextSlide],
          { opacity: 0, scale: 1.2 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.inOut' }
        );
      }
      setActiveSlide(nextSlide);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSlide, images.length]);

  // ============= Video Functions =============
  const openVideoModal = () => {
    setIsModalOpen(true);
    setIsVideoPlaying(true);
    gsap.fromTo('.video-modal',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
    );
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => setIsVideoPlaying(false);

  // ============= Search Functions =============
  const handleSearch = () => {
    console.log('Searching...', searchFilters);
  };

  const handleDestinationSelect = (destination: Destination) => {
    setSearchFilters({ ...searchFilters, destination: destination.name });
    setShowSuggestions(false);
  };

  const goToSlide = (index: number) => {
    if (index === activeSlide) return;
    if (imgRefs.current[activeSlide]) {
      gsap.to(imgRefs.current[activeSlide], {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }
    if (imgRefs.current[index]) {
      gsap.fromTo(imgRefs.current[index],
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.inOut' }
      );
    }
    setActiveSlide(index);
  };

  return (
    <>
      <section className="relative w-screen h-[75vh] overflow-hidden bg-black">
        {/* ====== Full Screen Background Slider ====== */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="absolute inset-0 w-full h-full transition-opacity duration-1000"
              style={{ opacity: idx === activeSlide ? 1 : 0, zIndex: idx === activeSlide ? 1 : 0 }}
            >
              <img
                ref={(el) => { imgRefs.current[idx] = el; }}
                src={src}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
                style={{
                  transform: idx === activeSlide ? 'scale(1)' : 'scale(1.1)',
                  transition: 'transform 8s ease-in-out'
                }}
              />
            </div>
          ))}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] z-10" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] z-10" />
        </div>

        {/* ====== Main Content ====== */}
        <div className="relative z-20 w-full h-full px-4 md:px-8 lg:px-12 py-1 flex flex-col justify-between">
          <div className="h-10 md:h-12" />

          {/* ====== Middle Content ====== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start flex-1 max-w-7xl mx-auto w-full">
            
            {/* ====== Left Column ====== */}
            <div className="flex flex-col justify-center text-left">
              {/* Badge */}
              <div ref={badgeRef} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 w-fit mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-white/80 text-[10px] font-semibold tracking-[0.15em] uppercase">Discover Your Next Adventure</span>
              </div>

              {/* Title */}
              <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-3 drop-shadow-2xl tracking-tight">
                Explore The
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  World Your Way
                </span>
              </h1>

              {/* Subtitle */}
              <p ref={subtitleRef} className="text-sm sm:text-base text-gray-300/80 max-w-lg mb-6 leading-relaxed font-light">
                Curated travel experiences, clear pricing, and simple booking — 
                everything you need to plan your next journey with confidence.
              </p>

              {/* ====== Search Bar ====== */}
              <div className="relative mb-4 max-w-2xl">
                <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-2 border border-white/10 shadow-2xl">
                  <div className="flex flex-col sm:flex-row gap-1.5">
                    <div className="flex-1 relative">
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 focus-within:bg-white/10 transition-all">
                        <FaMapMarkerAlt className="text-orange-400 text-xs shrink-0" />
                        <input
                          type="text"
                          placeholder="Destination"
                          value={searchFilters.destination}
                          onChange={(e) => {
                            setSearchFilters({ ...searchFilters, destination: e.target.value });
                            setShowSuggestions(e.target.value.length > 0);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          className="w-full bg-transparent text-white text-xs placeholder-gray-400/70 outline-none"
                        />
                      </div>
                      {showSuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden z-50">
                          {destinations
                            .filter(d => d.name.toLowerCase().includes(searchFilters.destination.toLowerCase()))
                            .map((dest) => (
                              <button
                                key={dest.id}
                                onClick={() => handleDestinationSelect(dest)}
                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 transition-colors text-left"
                              >
                                <span className="text-orange-400 text-xs">{dest.icon}</span>
                                <div>
                                  <p className="text-white text-xs font-medium">{dest.name}</p>
                                  <p className="text-gray-400 text-[10px]">{dest.country}</p>
                                </div>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="relative" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                        <FaCalendarAlt className="text-orange-400 text-xs shrink-0" />
                        <span className="text-white text-xs whitespace-nowrap">{searchFilters.checkIn || 'Check In'}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5">
                        <FaUsers className="text-orange-400 text-xs shrink-0" />
                        <span className="text-white text-xs whitespace-nowrap">{searchFilters.guests} Guest(s)</span>
                      </div>
                    </div>
                    <button
                      onClick={handleSearch}
                      className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 shrink-0"
                    >
                      <FaSearch className="text-xs" />
                      Search
                    </button>
                  </div>
                </div>

                {/* Calendar */}
                {isCalendarOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-3 z-50 max-w-sm">
                    <div className="flex items-center justify-between mb-2">
                      <button onClick={() => { setIsCalendarOpen(false); }} className="text-gray-400 hover:text-white transition-colors">
                        <FaTimes className="text-xs" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button onClick={prevMonth} className="text-white/70 hover:text-orange-400 transition-colors text-xs">◀</button>
                        <span className="text-white text-xs font-semibold">{monthNames[currentMonth]} {currentYear}</span>
                        <button onClick={nextMonth} className="text-white/70 hover:text-orange-400 transition-colors text-xs">▶</button>
                      </div>
                      <button onClick={() => { setSelectedRange({ start: null, end: null }); setSearchFilters({ ...searchFilters, checkIn: '', checkOut: '' }); }} className="text-[9px] text-orange-400 hover:text-orange-300">Clear</button>
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 text-center">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
                        <div key={d} className="text-gray-500 text-[9px] font-medium py-0.5">{d}</div>
                      ))}
                      {generateCalendarDays().map((dayData, index) => {
                        if (!dayData) return <div key={index} className="py-1" />;
                        const isInRange = selectedRange.start && selectedRange.end && dayData.date >= selectedRange.start && dayData.date <= selectedRange.end;
                        const isStart = selectedRange.start && dayData.date.getTime() === selectedRange.start.getTime();
                        const isEnd = selectedRange.end && dayData.date.getTime() === selectedRange.end.getTime();
                        return (
                          <button key={index} onClick={() => selectDate(dayData.day, currentMonth, currentYear)} disabled={dayData.isDisabled}
                            className={`py-1 text-[11px] font-medium rounded-full transition-all ${dayData.isDisabled ? 'text-gray-600 cursor-not-allowed' : 'hover:bg-orange-500/30'} ${dayData.isToday ? 'border border-orange-500/50' : ''} ${dayData.isSelected || isStart || isEnd ? 'bg-orange-500 text-white' : ''} ${isInRange && !isStart && !isEnd ? 'bg-orange-500/20' : ''} ${!dayData.isDisabled && !dayData.isSelected && !isStart && !isEnd ? 'text-white/80' : ''}`}>
                            {dayData.day}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-500 rounded-full" /> Selected</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 border border-orange-500 rounded-full" /> Today</span>
                      </div>
                      <span>Select dates</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div ref={buttonRef} className="flex items-center gap-3 mb-4">
                <Link href="/packages" className="group inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm rounded-full shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-orange-500/40">
                  Explore Packages
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </Link>
                <button onClick={openVideoModal} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-medium text-sm rounded-full border border-white/10 transition-all hover:scale-105 backdrop-blur-md">
                  <FaPlay className="text-xs text-orange-400" />
                  Watch Story
                </button>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-7 h-7 rounded-full ring-2 ring-black/50 object-cover" />
                  ))}
                  <div className="w-7 h-7 rounded-full ring-2 ring-black/50 bg-orange-500 flex items-center justify-center text-white text-[9px] font-bold">+50</div>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (<FaStar key={i} className="w-2.5 h-2.5" />))}
                  </div>
                  <p className="text-[9px] text-gray-300 font-medium"><span className="text-white font-bold">1K+</span> Happy Travelers</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full border border-white/5">
                  <FaCloudSun className="text-yellow-400 text-[10px]" />
                  <span className="text-white font-bold text-[10px]">31°C</span>
                </div>
              </div>
            </div>

            {/* ====== Right Column - Video Card ====== */}
            <div className="flex items-center justify-end self-center">
              <div ref={videoCardRef} className="w-full max-w-[260px] rounded-xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl cursor-pointer group" onClick={openVideoModal}>
                <div className="relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent" />
                  <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80" alt="Travel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[8px] px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" /> Featured
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300">
                      <FaPlay className="ml-0.5 text-orange-500 text-xs" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded text-[9px]">2:30</div>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-[11px] font-semibold">Beauty of Every Journey</h4>
                    <p className="text-gray-400 text-[9px]">Watch our travel story</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 transition-all">
                    <FaArrowRight className="text-orange-400 text-[10px] group-hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====== Bottom Bar ====== */}
          <div ref={bottomFooterRef} className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-2 pb-0 gap-1 text-[9px] tracking-[0.15em] uppercase font-semibold text-white/30">
            <div className="flex items-center gap-3">
              <span>✦ Travel With Confidence</span>
              <span className="hidden sm:inline text-white/10">·</span>
              <span className="hidden sm:inline">Every Trip Planned With Care</span>
            </div>
            <Link href="/about" className="group flex items-center gap-1.5 text-white/40 hover:text-white transition-all">
              Join Our Travelers
              <FaArrowRight className="text-[9px] group-hover:translate-x-1 transition-transform text-orange-400" />
            </Link>
          </div>
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
          {images.map((_, idx) => (
            <button key={idx} onClick={() => goToSlide(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${activeSlide === idx ? 'bg-orange-500 w-5' : 'bg-white/25 hover:bg-white/50 w-1.5'}`} />
          ))}
        </div>
      </section>

      {/* ====== VIDEO MODAL ====== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={closeVideoModal}>
          <div className="video-modal relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeVideoModal} className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-all">
              <FaTimes className="text-sm" />
            </button>
            <button onClick={() => { if (videoRef.current) { if (document.fullscreenElement) { document.exitFullscreen(); } else { videoRef.current.requestFullscreen(); } } }} className="absolute top-3 right-12 z-10 w-8 h-8 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white hover:text-orange-400 transition-all">
              <FaExpand className="text-sm" />
            </button>
            <div className="relative aspect-video">
              <video ref={videoRef} src="/videos/travel.mp4" className="w-full h-full object-contain" controls autoPlay playsInline onEnded={handleVideoEnd} onPlay={() => setIsVideoPlaying(true)} onPause={() => setIsVideoPlaying(false)} />
              {!isVideoPlaying && (
                <button onClick={toggleVideoPlay} className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-all">
                    <FaPlay className="text-white text-2xl ml-1" />
                  </div>
                </button>
              )}
            </div>
            <div className="p-3 bg-black/80">
              <h3 className="text-white text-sm font-bold">Beauty of Every Journey</h3>
              <p className="text-gray-400 text-xs">Explore the world with CYCLONE Tour & Travels</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}