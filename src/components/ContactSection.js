'use client';
import { motion } from 'framer-motion';

const CONTACT_ACTIONS = [
  {
    id: 'email',
    emoji: '✉️',
    label: 'Email Me',
    sublabel: 'cyberfocus2410@gmail.com',
    href: 'mailto:cyberfocus2410@gmail.com',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(56,189,248,0.03))',
    border: 'rgba(56,189,248,0.25)',
  },
  {
    id: 'github',
    emoji: '🐙',
    label: 'GitHub',
    sublabel: '@CyberFocus2410',
    href: 'https://github.com/CyberFocus2410',
    color: '#e2e8f0',
    gradient: 'linear-gradient(135deg, rgba(226,232,240,0.06), rgba(226,232,240,0.02))',
    border: 'rgba(226,232,240,0.12)',
  },
  {
    id: 'linkedin',
    emoji: '💼',
    label: 'LinkedIn',
    sublabel: 'in/cyberfocus2410',
    href: 'https://www.linkedin.com/in/cyberfocus2410/',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(56,189,248,0.02))',
    border: 'rgba(56,189,248,0.2)',
  },
  {
    id: 'resume',
    emoji: '📄',
    label: 'Download Resume',
    sublabel: 'PDF · Updated Mar 2026',
    href: '/resume.pdf',
    download: true,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.03))',
    border: 'rgba(245,158,11,0.25)',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function ContactSection() {
  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
      {/* Center glow */}
      <div className="glow-orb" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(56,189,248,0.05), transparent 65%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <div className="bg-grid-subtle" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-label" style={{ justifyContent: 'center' }}>05. Get in touch</p>
            <h2 className="section-title grad" data-text="CONNECT">Let&apos;s Connect</h2>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: 15,
              maxWidth: 440,
              margin: '12px auto 0',
              lineHeight: 1.75,
            }}>
              Open to internships in software development, cybersecurity, and backend systems.
            </p>
          </motion.div>

          {/* Action cards */}
          <motion.div
            variants={containerVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: 18,
              maxWidth: 860,
              margin: '0 auto 52px',
            }}
          >
            {CONTACT_ACTIONS.map((action) => (
              <motion.a
                key={action.id}
                variants={fadeUp}
                href={action.href}
                download={action.download || undefined}
                target={action.download ? undefined : '_blank'}
                rel={action.download ? undefined : 'noopener noreferrer'}
                className="card"
                style={{
                  padding: '32px 28px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  background: 'var(--surface)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                }}
                whileHover={{
                  y: -8,
                  borderColor: action.color + '40',
                  boxShadow: `0 20px 40px -15px ${action.color}15`,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                <div style={{ fontSize: 40, marginBottom: 8 }}>{action.emoji}</div>
                <div>
                  <p className="font-display" style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {action.label}
                  </p>
                  <p className="font-mono" style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                    {action.sublabel}
                  </p>
                </div>
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: action.color, letterSpacing: '0.1em' }} className="font-mono">
                    {action.download ? 'DOWNLOAD' : 'CONNECT'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: action.color }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            variants={fadeUp}
            style={{
              maxWidth: 860,
              margin: '0 auto',
            }}
          >
            <div className="card" style={{
              padding: '40px 44px',
              background: 'rgba(13, 20, 36, 0.7)',
            }}>
              {/* Form header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(56,189,248,0.1)',
                  border: '1px solid rgba(56,189,248,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  ✍️
                </div>
                <div>
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
                    Send a Message
                  </h3>
                  <p className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                    I usually respond within 24 hours
                  </p>
                </div>
              </div>

              <form
                action={`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_KEY || 'xkgjpzpk'}`}
                method="POST"
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'name', placeholder: 'Your name', type: 'text' },
                    { name: 'email', placeholder: 'your@email.com', type: 'email' },
                  ].map((f) => (
                    <input
                      key={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      style={{
                        background: 'rgba(2, 8, 23, 0.6)',
                        border: '1px solid var(--border)',
                        borderRadius: 11,
                        padding: '13px 16px',
                        color: 'var(--text-primary)',
                        fontSize: 14,
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(56,189,248,0.45)'; e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.06)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  ))}
                </div>
                <textarea
                  name="message"
                  placeholder="What's on your mind?"
                  rows={4}
                  required
                  style={{
                    background: 'rgba(2, 8, 23, 0.6)',
                    border: '1px solid var(--border)',
                    borderRadius: 11,
                    padding: '13px 16px',
                    color: 'var(--text-primary)',
                    fontSize: 14,
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(56,189,248,0.45)'; e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.06)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-primary">
                    <span>Send Message</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
