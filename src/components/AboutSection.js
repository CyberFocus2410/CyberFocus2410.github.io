'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SKILLS = [
  // Languages
  { label: 'Python', category: 'lang', color: '#4f93ff', bg: 'rgba(79,147,255,0.08)', icon: '🐍' },
  { label: 'C / C#', category: 'lang', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', icon: '#️⃣' },
  { label: 'JavaScript', category: 'lang', color: '#f1e05a', bg: 'rgba(241,224,90,0.08)', icon: '📜' },
  { label: 'Flutter / Dart', category: 'lang', color: '#22d3ee', bg: 'rgba(34,211,238,0.08)', icon: '📱' },
  
  // Databases & Cloud
  { label: 'Firebase', category: 'cloud', color: '#ffca28', bg: 'rgba(255,202,40,0.08)', icon: '🔥' },
  { label: 'Supabase', category: 'cloud', color: '#3ecf8e', bg: 'rgba(62,207,142,0.08)', icon: '⚡' },
  { label: 'MongoDB', category: 'cloud', color: '#47a248', bg: 'rgba(71,162,72,0.08)', icon: '🍃' },
  { label: 'MySQL', category: 'cloud', color: '#34d399', bg: 'rgba(52,211,153,0.08)', icon: '🗄️' },

  // Security
  { label: 'Kali Linux', category: 'security', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', icon: '🛡️' },
  { label: 'OSINT', category: 'security', color: '#f43f5e', bg: 'rgba(244,63,94,0.08)', icon: '👁️' },
  { label: 'Web Security', category: 'security', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', icon: '🔎' },

  // Tools
  { label: 'Git', category: 'tools', color: '#f05032', bg: 'rgba(240,80,50,0.08)', icon: '🌿' },
  { label: 'Docker', category: 'tools', color: '#2496ed', bg: 'rgba(36,150,237,0.08)', icon: '🐳' },
  { label: 'Figma / Canva', category: 'tools', color: '#a259ff', bg: 'rgba(162,89,255,0.08)', icon: '🎨' },
  { label: 'Stitch', category: 'tools', color: '#ec4899', bg: 'rgba(236,72,153,0.08)', icon: '🧵' },

  // Soft Skills
  { label: 'Leadership', category: 'soft', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', icon: '🚩' },
  { label: 'Collaborator', category: 'soft', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', icon: '🤝' },
  { label: 'Analytical', category: 'soft', color: '#c084fc', bg: 'rgba(192,132,252,0.08)', icon: '🧠' },
  { label: 'Adaptable', category: 'soft', color: '#10b981', bg: 'rgba(16,185,129,0.08)', icon: '🔄' },
];

const CATEGORY_META = {
  lang: { label: 'Development Languages', color: '#38bdf8' },
  cloud: { label: 'Databases & Cloud', color: '#10b981' },
  security: { label: 'Security & Research', color: '#ef4444' },
  tools: { label: 'Tools & Design', color: '#f59e0b' },
  soft: { label: 'Soft Skills & Leadership', color: '#c084fc' },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function AboutSection() {
  const grouped = SKILLS.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <section id="about" className="section" style={{ background: 'var(--bg-base)' }}>
      {/* Accent glow */}
      <div className="glow-orb" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(129,140,248,0.05), transparent 65%)',
        top: '50%', right: '-100px',
        transform: 'translateY(-50%)',
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div variants={fadeUp} className="text-center lg:text-left">
            <p className="section-label justify-center lg:justify-start">01. Who I Am</p>
            <h2 className="section-title grad" data-text="PROFILE">About Me</h2>
          </motion.div>

          <div 
            className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 mt-12 items-start"
          >
            {/* Photo column */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              {/* Photo with hexagon-ish glow */}
              <div style={{ position: 'relative', width: 200 }}>
                {/* Outer glow ring */}
                <motion.div
                  className="pulse-glow"
                  style={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(56,189,248,0.4)',
                    boxShadow: '0 0 20px rgba(56,189,248,0.2)',
                  }}
                />
                {/* Secondary ring */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: -16,
                    borderRadius: '50%',
                    border: '1px solid rgba(129,140,248,0.15)',
                    borderTopColor: 'rgba(129,140,248,0.4)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />

                <div style={{
                  width: 200,
                  height: 200,
                  borderRadius: 24,
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'var(--surface)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}>
                  <Image
                    src="/pfp.jpg"
                    alt="Vivan Mittal"
                    fill
                    sizes="200px"
                    style={{ objectFit: 'cover' }}
                    className="hover-zoom"
                    priority
                  />
                </div>
              </div>

              {/* Info card below photo */}
              <div className="card" style={{
                padding: '24px',
                width: '100%',
                textAlign: 'center',
                background: 'rgba(56,189,248,0.03)',
                borderColor: 'rgba(56,189,248,0.1)',
              }}>
                <p className="font-mono text-accent" style={{ fontSize: 11, letterSpacing: '0.15em', marginBottom: 6, fontWeight: 700 }}>
                  ESTD. 2006
                </p>
                <p className="font-display" style={{ fontSize: 18, color: 'var(--text-primary)', fontWeight: 800, marginBottom: 8 }}>
                  Vivan Mittal
                </p>
                <div style={{ height: 1.5, width: 32, background: 'var(--accent)', margin: '12px auto' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                   <p className="font-mono text-xs text-soft">B.Tech CSE (CyberSec)</p>
                   <p className="font-mono text-xs text-muted">Delhi Technical Campus</p>
                </div>
              </div>
            </motion.div>

            {/* Right: bio + skills */}
            <div>
              {/* Bio */}
              <motion.div variants={fadeUp}>
                <p style={{
                  fontSize: 15.5,
                  lineHeight: 1.85,
                  color: 'var(--text-muted)',
                  marginBottom: 24,
                  borderLeft: '2px solid var(--accent)',
                  paddingLeft: 20,
                }}>
                  Motivated B.Tech CSE (Cyber Security) first-year student with hands-on experience in{' '}
                  <span style={{ color: 'var(--text-primary)' }}>Linux environments, Python, SQL, and Flutter-based application development</span>.
                  Actively building real-world projects in{' '}
                  <span style={{ color: 'var(--accent)' }}>accessibility tech and government-scale data platforms</span>.
                  Seeking internship opportunities in software development, cybersecurity, and backend systems.
                </p>
              </motion.div>

              {/* Skills by category */}
              {Object.entries(grouped).map(([cat, skills]) => (
                <motion.div key={cat} variants={fadeUp} style={{ marginBottom: 24 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 12,
                  }}>
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: CATEGORY_META[cat].color,
                      boxShadow: `0 0 8px ${CATEGORY_META[cat].color}`,
                    }} />
                    <p className="font-mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {CATEGORY_META[cat].label}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {skills.map((s) => (
                      <motion.span
                        key={s.label}
                        whileHover={{ y: -3, scale: 1.06 }}
                        className="skill-pill"
                        style={{
                          color: s.color,
                          borderColor: s.color + '40',
                          background: s.bg,
                        }}
                      >
                        <span style={{ fontSize: 13 }}>{s.icon}</span>
                        {s.label}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
