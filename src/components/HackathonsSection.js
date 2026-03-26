'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DRIVE_FOLDER_ID = '1ah28yhihK0P98Szw5L9PzBYFxesXl05F';
const DRIVE_FOLDER_URL = `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`;

// Placeholder cert cards — these link to the Drive folder
// Replace with dynamic API data once NEXT_PUBLIC_DRIVE_API_KEY is set
const PLACEHOLDER_CERTS = [
  {
    name: 'Hackathon Certificates',
    year: '2025–2026',
    icon: '🏆',
    driveUrl: DRIVE_FOLDER_URL,
    note: 'View all certificates',
  },
];

function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group"
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Cert preview area */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/10',
          borderRadius: 12,
          background: 'linear-gradient(135deg, var(--bg-deep), var(--surface-2))',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {cert.thumbnail ? (
          <img
            src={cert.thumbnail}
            alt={cert.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="hover-zoom group-hover:scale-105"
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 8, filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.3))' }}>{cert.icon || '📜'}</div>
            <p className="font-mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              VERIFIED_CREDENTIAL
            </p>
          </div>
        )}
      </div>

      {/* Meta */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
          <h3
            className="font-display"
            style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}
          >
            {cert.name}
          </h3>
          {cert.year && (
            <span
              className="font-mono"
              style={{
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 6,
                background: 'rgba(245,158,11,0.08)',
                color: 'var(--accent-tertiary)',
                border: '1px solid rgba(245,158,11,0.2)',
                fontWeight: 700,
              }}
            >
              {cert.year}
            </span>
          )}
        </div>
        {cert.note && (
          <p style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.6 }}>{cert.note}</p>
        )}
      </div>

      <a
        href={cert.driveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline"
        style={{ 
          fontSize: 12, 
          padding: '10px 16px', 
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.03)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <span>View Credential</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
      </a>
    </motion.div>
  );
}

export default function HackathonsSection() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiConfigured, setApiConfigured] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_DRIVE_API_KEY;
    if (!apiKey) {
      setApiConfigured(false);
      setLoading(false);
      return;
    }
    setApiConfigured(true);
    // Fetch files from Drive API
    const url = `https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER_ID}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,thumbnailLink,webViewLink)&orderBy=name`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const files = (data.files || [])
          .filter((f) => f.name !== 'pfp.jpg' && !f.name.toLowerCase().includes('resume'))
          .map((f) => ({
            name: f.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '),
            year: f.name.match(/\d{4}/)?.[0] || '2025',
            thumbnail: f.thumbnailLink,
            driveUrl: f.webViewLink || `https://drive.google.com/file/d/${f.id}/view`,
            icon: f.mimeType.includes('pdf') ? '📄' : '🖼️',
          }));
        setCerts(files.length ? files : PLACEHOLDER_CERTS);
        setLoading(false);
      })
      .catch(() => {
        setCerts(PLACEHOLDER_CERTS);
        setLoading(false);
      });
  }, []);

  const displayCerts = apiConfigured ? certs : PLACEHOLDER_CERTS;

  return (
    <section id="hackathons" className="section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">04. Achievements</p>
          <h2 className="section-title grad" data-text="ACHIEVEMENTS">Hackathons & Certs</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 16, maxWidth: 520 }}>
            Certificates auto-synced from Google Drive.
          </p>

          {/* Drive folder link */}
          <div style={{ marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ fontSize: 13, padding: '8px 18px' }}
            >
              📁 View All Certificates
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </a>
            {!apiConfigured && (
              <p className="font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Add <code style={{ color: 'var(--accent)' }}>NEXT_PUBLIC_DRIVE_API_KEY</code> to .env.local for auto-sync
              </p>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
              Loading certificates...
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 24,
              }}
            >
              {displayCerts.map((cert, i) => (
                <CertCard key={i} cert={cert} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
