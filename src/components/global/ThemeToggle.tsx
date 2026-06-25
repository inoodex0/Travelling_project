'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all hover:scale-110 text-sm"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
    </button>
  );
}
