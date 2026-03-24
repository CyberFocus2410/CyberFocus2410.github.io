'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        followerRef.current.style.transform = `translate3d(${clientX - 15}px, ${clientY - 15}px, 0)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div id="custom-cursor" ref={cursorRef} className="hidden md:block" />
      <div id="custom-cursor-follower" ref={followerRef} className="hidden md:block" />
    </>
  );
}
