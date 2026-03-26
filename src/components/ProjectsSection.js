'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'CyberFocus2410';
const FEATURED = ['LaunchLens', 'PhishLeakGuard_1', 'CYBERCOP_OSINT', 'Health_Vault4', 'SkillBridge_1', 'toursphere-backend'];

const LANG_COLORS = {
  Python: { color: '#4f93ff', bg: 'rgba(79,147,255,0.1)' },
  TypeScript: { color: '#5b86cf', bg: 'rgba(91,134,207,0.1)' },
  JavaScript: { color: '#f1e05a', bg: 'rgba(241,224,90,0.1)' },
  Dart: { color: '#22d3ee', bg: 'rgba(34,211,238,0.1)' },
  HTML: { color: '#fb923c', bg: 'rgba(251,146,60,0.1)' },
};

const FILTER_TAGS = ['All', 'Security', 'Web', 'Tools', 'Data'];
const REPO_FILTER_MAP = {
  LaunchLens: 'Security', PhishLeakGuard_1: 'Security', CYBERCOP_OSINT: 'Security',
  Health_Vault4: 'Web', SkillBridge_1: 'Web', 'toursphere-backend': 'Data',
  toursphere: 'Web', MiniatureCalculator: 'Tools', NVFlare: 'Data',
};

const PROJECT_IMAGES = {
  'LaunchLens': '/PORTFOLIO/projects/project_launchlens_1774287367690.png',
  'PhishLeakGuard_1': '/PORTFOLIO/projects/project_phishleakguard_1774287385294.png',
  'CYBERCOP_OSINT': '/PORTFOLIO/projects/project_cybercop_osint_1774287401654.png',
  'Health_Vault4': '/PORTFOLIO/projects/project_healthvault_1774287419280.png',
  'SkillBridge_1': '/PORTFOLIO/projects/project_skillbridge_1774287435430.png',
  'toursphere-backend': '/PORTFOLIO/projects/project_toursphere_1774287452966.png'
};

function ProjectCard({ repo, index }) {
  const lang = repo.language;
  const langMeta = LANG_COLORS[lang] || { color: '#64748b', bg: 'rgba(100,116,139,0.1)' };
  const projectImg = PROJECT_IMAGES[repo.name];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07, ease: [0.23, 1, 0.32, 1] }}
      className="card overflow-hidden"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 0,
      }}
    >
      {/* Project Image */}
      {projectImg && (
        <div style={{ position: 'relative', height: 180, width: '100%', overflow: 'hidden' }}>
          <img 
            src={projectImg} 
            alt={repo.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            className="hover-zoom"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, var(--surface) 100%)',
          }} />
          <div style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(245,158,11,0.25)',
              border: '1px solid rgba(245,158,11,0.4)',
              borderRadius: 5,
              padding: '2px 8px',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ color: '#fbbf24', fontSize: 9, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>PINNED</span>
            </div>
        </div>
      )}

      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 className="font-mono" style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>
          {repo.name}
        </h3>
        
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>
          {repo.description || 'No description available for this pinned project.'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
          {repo.topics?.slice(0, 3).map((t) => (
            <span key={t} className="tag-pill" style={{ fontSize: 10 }}>{t}</span>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 16,
          marginTop: 8,
          borderTop: '1px solid var(--border)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: langMeta.color }} />
            <span style={{ color: 'var(--text-soft)', fontFamily: 'JetBrains Mono, monospace' }}>{lang}</span>
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '4px 12px', fontSize: 11 }}>
              Code
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '4px 12px', fontSize: 11, borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          // FILTER: only keep pinned/featured
          const pinned = data.filter(r => FEATURED.includes(r.name));
          setRepos(pinned);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-base)', position: 'relative' }}>
        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">02. Featured Projects</p>
          <h2 className="section-title grad" data-text="WORK">Pinned Projects</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 44, maxWidth: 520 }}>
            Curated list of pinned projects with AI-visualized concepts.
          </p>

          {loading ? (
            <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ color: 'var(--accent)' }}>▋</motion.span>
              accessing restricted repo cache...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 32,
            }}>
              {repos.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
