'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLight = theme === 'light';

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transition: 'all 0.3s ease',
      // Much more visible background for light mode
      background: scrolled 
        ? (isLight ? '#ffffff' : 'rgba(2, 8, 23, 0.9)') 
        : (isLight ? 'rgba(255, 255, 255, 0.8)' : 'transparent'),
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: scrolled ? (isLight ? '1px solid #e2e8f0' : '1px solid #1a2540') : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 28px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span className="font-mono" style={{ fontSize: 16, color: 'var(--accent)', fontWeight: 700 }}>{'<'}</span>
          <span className="font-display" style={{ 
            fontSize: 20, 
            fontWeight: 800, 
            color: isLight ? '#0f172a' : '#ffffff',
            letterSpacing: '-0.02em'
          }}>VM</span>
          <span className="font-mono" style={{ fontSize: 16, color: 'var(--accent-2)', fontWeight: 700 }}>{'/>'}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setActive(link.href)}
              onMouseLeave={() => setActive('')}
              style={{
                color: active === link.href 
                  ? 'var(--accent)' 
                  : (isLight ? '#1e293b' : '#94a3b8'),
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 700, // Make it very visible
                padding: '8px 12px',
                transition: 'all 0.2s ease',
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.05)',
              border: 'none',
              cursor: 'pointer',
              color: isLight ? '#0f172a' : '#ffffff',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              marginLeft: 10,
              transition: 'all 0.2s ease',
            }}
          >
            {isLight ? (
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </button>

          <a href="/resume.pdf" download className="btn-primary" style={{ marginLeft: 16 }}>
            Resume
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: isLight ? '#0f172a' : '#ffffff', padding: 8, zIndex: 110 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: isLight ? '#ffffff' : '#020817',
              zIndex: 105, // Slightly less than the toggle button but more than the header content
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 40px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', width: '100%' }}>
              {navLinks.map((link, idx) => (
                <motion.a 
                  key={link.href} 
                  href={link.href} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setMenuOpen(false)} 
                  className="font-display"
                  style={{ 
                    color: isLight ? '#0f172a' : '#ffffff', 
                    textDecoration: 'none', 
                    fontSize: 32, 
                    fontWeight: 800,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 300, marginTop: 40 }}>
                <button 
                  onClick={toggleTheme} 
                  style={{ 
                    padding: '16px', 
                    borderRadius: '16px', 
                    background: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--border)', 
                    color: isLight ? '#0f172a' : '#ffffff', 
                    fontWeight: 700,
                    fontSize: 16
                  }}
                >
                  {isLight ? 'Switch to Dark' : 'Switch to Light'} Mode
                </button>
                <a 
                  href="/resume.pdf" 
                  style={{ 
                    textAlign: 'center', 
                    padding: '16px', 
                    borderRadius: '16px', 
                    background: 'var(--accent)', 
                    color: 'white', 
                    fontWeight: 700, 
                    textDecoration: 'none',
                    fontSize: 16
                  }}
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
