'use client';
import { motion } from 'framer-motion';

export default function ResumeSection() {
  return (
    <section id="resume" className="section" style={{ background: 'var(--surface)' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">06. Full picture</p>
          <h2 className="section-title">Resume</h2>

          <div style={{ marginTop: 40 }}>
            {/* PDF Viewer */}
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--bg-base)',
                height: 700,
                position: 'relative',
              }}
            >
              <iframe
                src="/resume.pdf"
                title="Vivan Mittal Resume"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
              />
            </div>

            {/* Download */}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a href="/resume.pdf" download className="btn-primary">
                Download PDF
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
              <p className="font-mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Last updated: March 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
