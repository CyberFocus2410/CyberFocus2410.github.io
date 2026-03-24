'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function BikeRideSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Bike Movement: from left (-30%) to right (130%)
  // We use scroll progress through this specific container
  const rawBikeX = useTransform(scrollYProgress, [0.15, 0.85], ["-35%", "135%"]);
  const bikeX = useSpring(rawBikeX, { stiffness: 45, damping: 15, mass: 1 });

  // Wheels rotation based on progress
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 2880]); // 8 full spins
  const wheelSpin = useSpring(rotation, { stiffness: 50, damping: 20 });

  // Suspension Bounce (2-5px) - oscillate quickly as progress increases
  const bounce = useTransform(scrollYProgress, (v) => Math.sin(v * 150) * 3);
  const bikeY = useSpring(bounce, { stiffness: 100, damping: 25 });

  // Parallax: Road moves medium-speed (tiled)
  const roadX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  
  // Parallax: Cityscape moves slow-speed
  const cityX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // Motion Blur effect as scroll velocity increases
  const blur = useTransform(scrollYProgress, (v) => {
    // Basic blur on movement
    return (v > 0.1 && v < 0.9) ? "blur(0.5px)" : "blur(0px)";
  });

  return (
    <section 
      ref={containerRef} 
      style={{ 
        height: '250vh', // Significant scroll room for the animation
        position: 'relative',
        background: 'var(--bg-deep)',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Sticky viewport content - this is the "camera" */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        
        {/* Parallax Layer 1: Cityscape (Slower) */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            x: cityX,
            width: '150%', // Wider to allow movement
            zIndex: 1,
            opacity: 0.5,
          }}
        >
          <Image 
            src="/city_bg.png" 
            alt="City Background" 
            fill 
            sizes="150vw" 
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

        {/* Cinematic gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--bg-deep) 0%, transparent 25%, transparent 75%, var(--bg-deep) 100%)',
          zIndex: 2,
        }} />

        {/* Road & Motion Layer (Medium) */}
        <div style={{
          position: 'absolute',
          bottom: '15%',
          width: '100%',
          height: '25vh',
          zIndex: 3,
        }}>
          {/* Scrolling Road Texture */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              width: '400%', // Tiled for long scroll
              x: roadX,
              display: 'flex',
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Image 
                  src="/road.png" 
                  alt="Road Texture" 
                  fill 
                  sizes="100vw" 
                  style={{ objectFit: 'cover', opacity: 0.8 }}
                />
              </div>
            ))}
          </motion.div>
          {/* Road Bloom */}
          <div style={{
            position: 'absolute',
            bottom: -5,
            left: 0, right: 0, height: 10,
            background: 'var(--accent)',
            filter: 'blur(15px)',
            opacity: 0.1,
          }} />
        </div>

        {/* Interactive Text / Context (Optional but adds to the scene) */}
        <motion.div
          style={{
            position: 'absolute',
            top: '25%',
            left: '10%',
            zIndex: 4,
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
          }}
        >
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--text-primary)', opacity: 0.8 }}>
            SHAPING THE <span className="grad-text">FUTURE</span>
          </h2>
          <p className="font-mono" style={{ color: 'var(--accent)', marginTop: 10 }}>[ SYSTEM ENGAGED | ACCELERATING ]</p>
        </motion.div>

        {/* --- THE BIKE --- */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            width: 320,
            height: 200,
            x: bikeX,
            y: bikeY,
            bottom: '18%',
            zIndex: 10,
            filter: blur,
          }}
        >
          {/* Bike Image */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            
            {/* Realistic Glow Underglow */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 10,
                left: '15%',
                right: '15%',
                height: 8,
                background: 'var(--accent)',
                borderRadius: '50%',
                filter: 'blur(8px)',
                opacity: 0.6,
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            <Image 
              src="/bike.png" 
              alt="BMW S1000RR" 
              fill 
              sizes="320px" 
              style={{ 
                objectFit: 'contain',
                // Keep the 'screen' mode for dark blending if it's the original image
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))'
              }}
            />

            {/* Spinning wheels: Simulated by overlay rings */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 12,
                left: 32,
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid rgba(56, 189, 248, 0.25)',
                borderTopColor: 'var(--accent)',
                rotate: wheelSpin,
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                bottom: 12,
                right: 32,
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid rgba(56, 189, 248, 0.25)',
                borderTopColor: 'var(--accent)',
                rotate: wheelSpin,
              }}
            />
          </div>
        </motion.div>

        {/* Progress Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          fontFamily: 'JetBrains Mono, monospace',
          color: 'var(--text-muted)',
          fontSize: 10,
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span>BIKE_ENGINE: ACTIVE</span>
          <div style={{ width: 100, height: 2, background: 'var(--border)' }}>
             <motion.div style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), height: '100%', background: 'var(--accent)' }} />
          </div>
          <span>[ {Math.round(scrollYProgress.get() * 100)}% ]</span>
        </div>

      </div>
    </section>
  );
}
