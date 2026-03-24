'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export default function BikeScrollAnimation() {
  const [viewportH, setViewportH] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll();
  
  // Track vertical progress from top of the page (0) to bottom (1)
  // Maps to a vertical Y position from start to end of viewport area
  const rawY = useTransform(scrollYProgress, [0, 1], [viewportH * 0.1, viewportH * 0.85]);
  const bikeY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 1 });

  // Tilt forward based on scroll velocity (simulating acceleration)
  const bikeTilt = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [-2, -8, -2]), { stiffness: 80, damping: 25 });
  
  // Show speed lines only when scrolling in the middle of sections
  const speedOpacity = useTransform(scrollYProgress, [0.03, 0.1, 0.9, 0.98], [0, 0.8, 0.8, 0]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 50,
        pointerEvents: 'none',
        y: bikeY,
        rotate: bikeTilt,
        transformOrigin: 'center center',
      }}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
    >
      {/* Speed lines trail behind bike */}
      <motion.div
        style={{
          position: 'absolute',
          right: 210,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          opacity: speedOpacity,
        }}
      >
        {[100, 150, 90, 130, 110, 80].map((w, i) => (
          <motion.div
            key={i}
            style={{
              height: 1.2,
              width: w,
              background: `linear-gradient(to left, var(--accent), transparent)`,
              opacity: 0.5,
            }}
            animate={{ x: [-15, 0, -15], opacity: [0.3, 0.7, 0.3], scaleX: [1, 1.2, 1] }}
            transition={{ duration: 0.2 + i * 0.05, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </motion.div>

      {/* Bike Container */}
      <div style={{ 
        position: 'relative', 
        width: 240, 
        height: 140,
        filter: theme === 'dark' 
          ? 'drop-shadow(0 0 15px var(--accent)) contrast(110%) brightness(110%)' 
          : 'contrast(105%) saturate(120%)'
      }}>
        <Image
          src="/bike.png"
          alt="BMW S1000RR"
          fill
          sizes="240px"
          style={{
            objectFit: 'contain',
            mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
            filter: theme === 'light' ? 'invert(0.1) brightness(1.1)' : 'none',
          }}
          priority
        />
      </div>

      {/* Ground glow streak - moves with bike */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 10,
          right: 30,
          width: 200,
          height: 10,
          background: `radial-gradient(ellipse, var(--accent), transparent 75%)`,
          opacity: speedOpacity,
          filter: 'blur(5px)',
          zIndex: -1,
        }}
      />
    </motion.div>
  );
}
