export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      background: 'var(--bg-deep)',
      borderTop: '1px solid var(--border)',
      padding: '36px 28px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top neon line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.3) 30%, rgba(129,140,248,0.3) 70%, transparent)',
      }} />

      {/* Subtle grid */}
      <div className="bg-grid-subtle" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 6 }}>
            <span className="font-mono" style={{ fontSize: 13, color: 'rgba(56,189,248,0.5)' }}>{'<'}</span>
            <span className="font-display" style={{ fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>VM</span>
            <span className="font-mono" style={{ fontSize: 13, color: 'rgba(129,140,248,0.5)' }}>{'/>'}</span>
          </div>
          <p className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            © {year} Vivan Mittal · Built with Next.js
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { label: 'GitHub', href: 'https://github.com/CyberFocus2410' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cyberfocus2410/' },
            { label: 'Email', href: 'mailto:cyberfocus2410@gmail.com' },
            { label: 'Resume ↓', href: '/resume.pdf', download: true },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              download={l.download || undefined}
              target={l.download ? undefined : '_blank'}
              rel={l.download ? undefined : 'noopener noreferrer'}
              className="font-mono"
              style={{
                fontSize: 12,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                padding: '7px 14px',
                borderRadius: 8,
                border: '1px solid transparent',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.borderColor = 'rgba(56,189,248,0.2)';
                e.currentTarget.style.background = 'rgba(56,189,248,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
