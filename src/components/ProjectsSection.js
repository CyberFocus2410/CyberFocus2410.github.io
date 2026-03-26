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
  'LaunchLens': '/projects/project_launchlens_1774287367690.png',
  'PhishLeakGuard_1': '/projects/project_phishleakguard_1774287385294.png',
  'CYBERCOP_OSINT': '/projects/project_cybercop_osint_1774287401654.png',
  'Health_Vault4': '/projects/project_healthvault_1774287419280.png',
  'SkillBridge_1': '/projects/project_skillbridge_1774287435430.png',
  'toursphere-backend': '/projects/project_toursphere_1774287452966.png'
};

const PINNED_LIST = [
  { owner: 'CyberFocus2410', repo: 'LaunchLens' },
  { owner: 'CyberFocus2410', repo: 'PhishLeakGuard_1' },
  { owner: 'CyberFocus2410', repo: 'Health_Vault4' },
  { owner: 'CyberFocus2410', repo: 'CyberFocus2410' },
  { owner: 'Adhya08', repo: 'GFG' },
  { owner: 'Fork-IT-2026', repo: 'VisionAI' },
];

function ProjectCard({ repo, index }) {
  const lang = repo.language;
  const langMeta = repo.languageColor ? { color: repo.languageColor } : (LANG_COLORS[lang] || { color: '#64748b' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 280,
      }}
    >
      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="font-display" style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>
            {repo.name.replace(/_/g, ' ')}
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
             {repo.stargazers_count > 0 && (
               <span className="font-mono" style={{ fontSize: 10, color: 'var(--accent-tertiary)' }}>★ {repo.stargazers_count}</span>
             )}
          </div>
        </div>
        
        <p style={{ 
          fontSize: '0.82rem', 
          color: 'var(--text-soft)', 
          lineHeight: 1.6, 
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '4.8em',
        }}>
          {repo.description || 'Exploring security and software development.'}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 14,
          marginTop: 6,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: langMeta.color }} />
            <span style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{lang}</span>
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-accent hover:underline">
              REPO
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-accent-secondary hover:underline">
                DEMO
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
    // Fetch individual pinned repos from the specified owners
    const fetchPromises = PINNED_LIST.map(item => 
      fetch(`https://api.github.com/repos/${item.owner}/${item.repo}`)
        .then(res => res.ok ? res.json() : null)
    );

    Promise.all(fetchPromises)
      .then(results => {
        const valid = results.filter(r => r !== null);
        setRepos(valid);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-base)' }}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">02. Selected Work</p>
          <h2 className="section-title grad" data-text="WORK">Pinned Projects</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 32, maxWidth: 480 }}>
            The top 6 projects currently pinned on my GitHub profile.
          </p>

          {loading ? (
             <div className="font-mono" style={{ color: 'var(--text-muted)', fontSize: 13 }}>Syncing results...</div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
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
