import { useGitHubProjects } from '../hooks/useGitHubProjects';
import HomeHero from '../components/HomeHero';
import ProofBar from '../components/ProofBar';
import CapabilitiesMatrix from '../components/CapabilitiesMatrix';
import SelectedWork from '../components/SelectedWork';
import EngineeringApproach from '../components/EngineeringApproach';
import CurrentlyBuilding from '../components/CurrentlyBuilding';
import InteractiveConsole from '../components/InteractiveConsole';
import HomeContact from '../components/HomeContact';
import CliLoader from '../components/CliLoader';
import BlurReveal from '../components/ui/BlurReveal';
import './Home.css';

export default function Home() {
  const { projects, loading } = useGitHubProjects();
  const repoCount = projects ? projects.length : 34;

  return (
    <div className="container home-page">
      {/* Hero (instant sharp entrance with slight smooth fade) */}
      <BlurReveal duration={0.6} yOffset={16} blur={4}>
        <HomeHero />
      </BlurReveal>

      {/* Highlights & Evidence Bar */}
      <BlurReveal delay={0.1} duration={0.5} yOffset={20} blur={5}>
        <ProofBar repoCount={repoCount} />
      </BlurReveal>

      {/* 01: Capabilities & Core Focus */}
      <BlurReveal delay={0.05} duration={0.5} yOffset={24} blur={6}>
        <CapabilitiesMatrix />
      </BlurReveal>

      {/* 02: Featured Flagship Projects */}
      <BlurReveal delay={0.05} duration={0.5} yOffset={24} blur={6}>
        <SelectedWork />
      </BlurReveal>

      {/* 03: How I Build & Solve Problems */}
      <BlurReveal delay={0.05} duration={0.5} yOffset={24} blur={6}>
        <EngineeringApproach />
      </BlurReveal>

      {/* 04: Currently Building & System Status */}
      <BlurReveal delay={0.05} duration={0.5} yOffset={24} blur={6}>
        <CurrentlyBuilding />
      </BlurReveal>

      {/* 05: Interactive Workstation & Telemetry */}
      <BlurReveal delay={0.05} duration={0.5} yOffset={24} blur={6}>
        {loading ? (
          <CliLoader />
        ) : (
          <InteractiveConsole repoCount={repoCount} />
        )}
      </BlurReveal>

      {/* 06: Get in Touch & Contact */}
      <BlurReveal delay={0.05} duration={0.5} yOffset={24} blur={6}>
        <HomeContact />
      </BlurReveal>
    </div>
  );
}
