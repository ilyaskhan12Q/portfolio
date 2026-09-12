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
      {/* 01: Hero Console */}
      <HomeHero />

      {/* 02: Evidence & Benchmark Proof Bar */}
      <ProofBar repoCount={repoCount} />

      {/* 03: Engineering Capabilities Matrix */}
      <CapabilitiesMatrix />

      {/* 04: Flagship Selected Systems (Top 3 with Architecture Diagrams) */}
      <SelectedWork />

      {/* 05: Engineering Methodology */}
      <EngineeringApproach />

      {/* 06: Currently Building / Active Processes */}
      <CurrentlyBuilding />

      {/* 07: Interactive Terminal Shell & Neofetch Telemetry */}
      {loading ? (
        <CliLoader />
      ) : (
        <InteractiveConsole repoCount={repoCount} />
      )}

      {/* 08: Direct Deployment & Contact Terminal */}
      <HomeContact />
    </div>
  );
}
