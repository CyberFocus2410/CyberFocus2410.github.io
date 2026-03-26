'use client';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import HackathonsSection from '@/components/HackathonsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ResumeSection from '@/components/ResumeSection';
import Footer from '@/components/Footer';

import Cursor from '@/components/Cursor';
import SocialSidebar from '@/components/SocialSidebar';
import AIAssistant from '@/components/AIAssistant';
import Starfield from '@/components/Starfield';

export default function HomePage() {
  return (
    <>
      <Cursor />
      <Starfield />
      <SocialSidebar />
      <AIAssistant />
      <Navbar />
      {/* Bike animation removed per user request */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <HackathonsSection />
        <ContactSection />
        <ResumeSection />
      </main>
      <Footer />
    </>
  );
}
