'use client';
import { motion } from 'framer-motion';

const EXPERIENCE = [
  {
    role: 'Open Source Contributor',
    org: 'NVIDIA NVFlare',
    duration: 'Jan 2026',
    type: 'OSS',
    typeColor: '#34d399',
    typeBg: 'rgba(52,211,153,0.08)',
    bullets: [
      'Forked and explored NVIDIA\'s Federated Learning Application Runtime Environment (NVFlare).',
      'Studied federated learning architectures and privacy-preserving ML pipeline implementations.',
      'Engaged with the open-source community to understand production-grade distributed systems.',
    ],
  },
  {
    role: 'Independent Project Developer',
    org: 'Self-directed',
    duration: 'Jul 2025 – Present',
    type: 'Projects',
    typeColor: '#38bdf8',
    typeBg: 'rgba(56,189,248,0.08)',
    bullets: [
      'Built 10+ projects spanning cybersecurity tools, accessibility tech, health platforms, and OSINT utilities.',
      'Used Python, Flutter, TypeScript, and SQL across projects targeting real-world problem domains.',
      'Deployed applications on Replit and Dreamflow, integrating APIs such as Gemini and HaveIBeenPwned.',
    ],
  },
  {
    role: 'B.Tech CSE (Cybersecurity)',
    org: 'Delhi Technical Campus, Greater Noida',
    duration: 'Nov 2025 – Present',
    type: 'Education',
    typeColor: '#818cf8',
    typeBg: 'rgba(129,140,248,0.08)',
    bullets: [
      'Pursuing B.Tech in Computer Science Engineering with specialization in Cybersecurity.',
      'Coursework covers networking, operating systems, Linux fundamentals, and data structures.',
      'Actively participating in hackathons, coding competitions, and technical community events.',
    ],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-base)', position: 'relative' }}>
      {/* Right glow */}
      <div className="glow-orb" style={{
        width: 450, height: 450,
        background: 'radial-gradient(circle, rgba(129,140,248,0.05), transparent 65%)',
        top: '50%', right: '-80px',
        transform: 'translateY(-50%)',
      }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={fadeLeft}>
            <p className="section-label">03. Professional History</p>
            <h2 className="section-title grad" data-text="PROFESSIONAL">Experience</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32, maxWidth: 460 }}>
              Actively building. First-year student turning coursework into real products.
            </p>
          </motion.div>

          {/* Timeline */}
          <div style={{ maxWidth: 740 }}>
            {EXPERIENCE.map((exp, i) => (
              <motion.div key={i} variants={fadeLeft} className="timeline-item">
                <div className="timeline-dot" />

                {/* Card */}
                <div
                  className="card"
                  style={{
                    padding: '32px',
                    background: 'var(--surface)',
                    marginLeft: 4,
                    borderLeft: `4px solid ${exp.typeColor}`,
                  }}
                >
                  {/* Top row: badge + date */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        padding: '4px 14px',
                        borderRadius: 8,
                        background: exp.typeBg,
                        color: exp.typeColor,
                        border: `1px solid ${exp.typeColor}25`,
                        letterSpacing: '0.12em',
                        fontWeight: 700,
                      }}
                    >
                      {exp.type.toUpperCase()}
                    </span>
                    <span className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                      {exp.duration}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                    {exp.role}
                  </h3>
                  <p style={{
                    fontSize: 13,
                    color: 'var(--accent)',
                    marginBottom: 20,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                  }}>
                    @ {exp.org}
                  </p>

                  {/* Bullets */}
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: 'flex', gap: 14, fontSize: 15, color: 'var(--text-soft)', lineHeight: 1.7 }}>
                        <span style={{ color: exp.typeColor, flexShrink: 0, marginTop: 4, fontSize: 12 }}>✦</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
