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
import './Home.css';

export default function Home() {
  const { projects, loading } = useGitHubProjects();
  const repoCount = projects ? projects.length : 34;

  return (
    <div className="container home-page">
      {/* Hero */}
      <HomeHero />

      {/* Highlights & Evidence Bar */}
      <ProofBar repoCount={repoCount} />

      {/* 01: Capabilities & Core Focus */}
      <CapabilitiesMatrix />

      {/* 02: Featured Flagship Projects */}
      <SelectedWork />

      {/* 03: How I Build & Solve Problems */}
      <EngineeringApproach />

      {/* 04: Currently Building & System Status */}
      <CurrentlyBuilding />

      {/* 05: Interactive Workstation & Telemetry */}
      {loading ? (
        <CliLoader />
      ) : (
        <InteractiveConsole repoCount={repoCount} />
      )}

      {/* 06: Get in Touch & Contact */}
      <HomeContact />
    </div>
  );
}
