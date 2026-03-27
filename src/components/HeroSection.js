'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const ROLES = [
  'Cybersecurity Student',
  'Builder',
  'Hackathon Participant',
  'Python Developer',
  'Backend Developer',
];

// Matrix rain canvas
function MatrixRain() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ[]{}()<>/\\|~*@#$%ABCDEFGabcdef';
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = theme === 'light' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(2, 8, 23, 0.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();
        
        if (theme === 'light') {
           if (brightness > 0.95) ctx.fillStyle = '#111827';
           else ctx.fillStyle = `rgba(37, 99, 235, ${0.1 + brightness * 0.25})`;
        } else {
           if (brightness > 0.98) ctx.fillStyle = '#ffffff';
           else if (brightness > 0.9) ctx.fillStyle = '#00d4ff';
           else ctx.fillStyle = `rgba(56, 189, 248, ${0.08 + brightness * 0.18})`;
        }
        
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        zIndex: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
      id="matrix-canvas"
    />
  );
}

// Animated cyber profile with radar glow
function CyberProfile() {
  return (
    <motion.div
      style={{
        position: 'relative',
        width: 'min(380px, 85vw)',
        height: 'min(380px, 85vw)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      {/* Radar rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid var(--accent)',
            opacity: 0,
          }}
          animate={{
            scale: [1, 1.4],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Rotating outer ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1.5px dashed var(--accent)',
          opacity: 0.2,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Central Shield Badge (Re-integrated per user request) */}
      <div style={{
        position: 'relative',
        width: 'min(250px, 60vw)',
        height: 'min(250px, 60vw)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
      }}>
        {/* Glow behind shield */}
        <div style={{
          position: 'absolute',
          inset: '20%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)',
          filter: 'blur(25px)',
        }} />

        <svg width="160" height="160" viewBox="0 0 100 120" fill="none" style={{ position: 'relative', zIndex: 2 }}>
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#9f7aea" stopOpacity="0.7"/>
            </linearGradient>
            <linearGradient id="shieldFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05"/>
            </linearGradient>
            <filter id="shieldGlow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path
            d="M50 5 L90 22 L90 55 C90 80 70 100 50 115 C30 100 10 80 10 55 L10 22 Z"
            fill="url(#shieldFill)"
            stroke="url(#shieldGrad)"
            strokeWidth="1.5"
            filter="url(#shieldGlow)"
          />
          <rect x="38" y="58" width="24" height="20" rx="3" fill="none" stroke="url(#shieldGrad)" strokeWidth="1.5"/>
          <path d="M44 58 L44 52 C44 46 56 46 56 52 L56 58" fill="none" stroke="url(#shieldGrad)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="50" cy="68" r="2.5" fill="url(#shieldGrad)"/>
          <line x1="50" y1="68" x2="50" y2="74" stroke="url(#shieldGrad)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* Scanning line effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%', left: '10%', right: '10%',
            height: 1,
            background: 'var(--accent)',
            opacity: 0.3,
            boxShadow: '0 0 8px var(--accent)',
            zIndex: 10,
          }}
          animate={{ top: ['20%', '80%', '20%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating data tags */}
      {[
        { label: 'ADMIN_RT', x: -30, y: 100 },
        { label: 'OSINT_OK', x: 260, y: 50 },
        { label: 'SEC_AUDIT', x: 250, y: 280 },
        { label: 'ROOT_SHELL', x: -60, y: 240 },
      ].map((tag, i) => (
        <motion.div
          key={tag.label}
          style={{
            position: 'absolute',
            left: tag.x,
            top: tag.y,
            background: 'var(--surface)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 10,
            fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--accent)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        >
          {tag.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Typewriter
function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const current = ROLES[roleIndex];
    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout.current);
  }, [displayed, deleting, roleIndex]);

  return (
    <span>
      <span className="grad-text">{displayed}</span>
      <span style={{
        display: 'inline-block',
        width: 2,
        height: '0.85em',
        background: 'var(--accent)',
        marginLeft: 3,
        verticalAlign: 'middle',
        animation: 'blink-cursor 1s step-end infinite',
        borderRadius: 1,
      }} />
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-deep)',
        paddingTop: 80,
        paddingBottom: 0,
        marginBottom: 0,
      }}
    >
      {/* Grid pattern */}
      <div className="bg-grid-subtle" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Matrix Rain */}
      <MatrixRain />

      {/* Radial gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,0.04) 0%, transparent 70%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Scanline */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '100%',
          height: 120,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(56,189,248,0.025) 50%, transparent 100%)',
          animation: 'scanline 10s linear infinite',
        }} />
      </div>

      {/* Glow orbs */}
      <div className="glow-orb" style={{
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(56,189,248,0.06), transparent 65%)',
        top: '-200px', left: '-150px', zIndex: 1,
      }} />
      <div className="glow-orb" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(129,140,248,0.05), transparent 65%)',
        bottom: '-100px', right: '-100px', zIndex: 1,
      }} />

      {/* Bottom neon line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'linear-gradient(to right, transparent 0%, rgba(56,189,248,0.4) 30%, rgba(129,140,248,0.4) 70%, transparent 100%)',
        zIndex: 2,
      }} />

      {/* Main content */}
      <div className="section-inner" style={{ position: 'relative', zIndex: 2, width: '100%', paddingBottom: 0 }}>
        <div 
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center text-center lg:text-left"
          style={{ width: '100%', paddingBottom: 0 }}
        >
          {/* Left: Text */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-7 justify-center lg:justify-start"
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(56,189,248,0.07)',
                border: '1px solid rgba(56,189,248,0.2)',
                borderRadius: 100,
                padding: '6px 16px',
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{ position: 'relative', width: 8, height: 8 }}>
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: 'var(--accent-green)',
                    animation: 'ping-dot 1.5s cubic-bezier(0,0,0.2,1) infinite',
                  }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)', position: 'relative' }} />
                </div>
                <span className="font-mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em' }}>
                  OPEN TO INTERNSHIPS · 2026
                </span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(129,140,248,0.07)',
                border: '1px solid rgba(129,140,248,0.2)',
                borderRadius: 100,
                padding: '6px 16px',
                backdropFilter: 'blur(12px)',
              }}>
                <span className="font-mono" style={{ fontSize: 11, color: 'var(--accent-2)', letterSpacing: '0.1em' }}>
                  B.TECH CSE · CYBERSECURITY
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label">00. THE DEVELOPER</p>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="section-title"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                marginBottom: 20,
                perspective: '1000px',
                display: 'block',
              }}
            >
              <div style={{ overflow: 'hidden', display: 'block' }}>
                <motion.span
                  style={{ color: 'var(--text-primary)', display: 'inline-block' }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  VIVAN
                </motion.span>
              </div>
              <div style={{ overflow: 'hidden', display: 'block', marginTop: -5 }}>
                <motion.span
                  className="grad-text"
                  style={{ display: 'inline-block' }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  MITTAL
                </motion.span>
              </div>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ marginBottom: 20 }}
            >
              <p className="font-mono" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', color: 'var(--text-soft)' }}>
                <span style={{ color: 'var(--border-bright)' }}>{'> '}</span>
                <TypewriterText />
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                color: 'var(--text-muted)',
                maxWidth: 500,
                lineHeight: 1.75,
                marginBottom: 40,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              className="lg:ml-0"
            >
              Building security tools and accessible technology — one commit at a time.
              <br />
              <span style={{ color: 'var(--text-soft)' }}>Delhi Technical Campus, Greater Noida</span>
            </motion.p>

            {/* CTAs */}
              <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-start mt-8 mb-8">
                <a href="#projects" className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>
                  <span>View Projects</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </a>
                <a href="/resume.pdf" download className="btn-outline" style={{ padding: '10px 20px', fontSize: 13 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  <span>Resume</span>
                </a>
              </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-white/5 justify-center lg:justify-start"
            >
              {[
                { value: '10+', label: 'Projects' },
                { value: '12+', label: 'Repositories' },
                { value: 'CyberSec', label: 'Focus Area' },
                { value: '1st Yr', label: 'BTech CSE' },
              ].map((stat, i) => (
                <div key={stat.label} className="min-w-[100px]">
                  <div className="font-display" style={{
                    fontSize: 22,
                    fontWeight: 800,
                    background: i % 2 === 0 ? 'linear-gradient(135deg, #4f46e5, #38bdf8)' : 'linear-gradient(135deg, #f59e0b, #ef4444)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, textAlign: 'inherit', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                    {stat.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'backOut' }}
            className="flex items-center justify-center p-4 lg:p-0 order-first lg:order-none"
          >
            <CyberProfile />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
