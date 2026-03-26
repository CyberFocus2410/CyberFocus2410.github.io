'use client';
import { motion } from 'framer-motion';

const SOCIALS = [
  { 
    label: 'GitHub', 
    href: 'https://github.com/CyberFocus2410', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> 
  },
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/cyberfocus2410/', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg> 
  },
  { 
    label: 'Email', 
    href: 'mailto:cyberfocus2410@gmail.com', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> 
  },
  { 
    label: 'Discord', 
    href: 'https://discord.com/users/cyberhub2410', 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.3 6.7a3.8 3.8 0 0 0-2.3 2.3A3.8 3.8 0 0 0 6.7 10.3m10.6-3.6a3.8 3.8 0 0 1 2.3 2.3 3.8 3.8 0 0 1 1.3 1.3m-13.9 3.6a3.8 3.8 0 0 1-2.3 2.3"></path><path d="M11 20H4l.6-3.4A16.4 16.4 0 0 1 2 10a16.4 16.4 0 0 1 1.6-4.6c.7-1.4 1.8-2.6 3-3.4a16.4 16.4 0 0 1 10.8 0 13.3 13.3 0 0 1 3 3.4 16.4 16.4 0 0 1 1.6 4.6 16.4 16.4 0 0 1-.6 6.6L22 20h-7.1"></path></svg> 
  }
];

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      style={{
        position: 'fixed',
        right: 28,
        bottom: 0,
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
      className="hidden lg:flex"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {SOCIALS.map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4, color: 'var(--accent)' }}
            style={{ 
              color: 'var(--text-muted)', 
              transition: 'all 0.2s ease', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '4px',
            }}
            title={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
      <div style={{
        width: 1,
        height: 100,
        background: 'linear-gradient(to bottom, var(--accent), transparent)',
        marginTop: 10,
        opacity: 0.4,
      }} />
    </motion.div>
  );
}
