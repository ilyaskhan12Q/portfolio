# HOMEPAGE UX / INFORMATION ARCHITECTURE REDESIGN
## Phase 01: Research, Audit & UX Blueprint

**Target**: Ilyas Khan Portfolio (`ilyaskhan12Q/portfolio`)  
**Branch**: `redesign/homepage-ux-phase-01`  
**Date**: September 2026  
**Status**: Proposal / Blueprint (Phase 01 Deliverable)  

---

## 1. Executive Summary

This document presents the complete UX and Information Architecture (IA) redesign blueprint for the portfolio of Ilyas Khan—an AI/ML Engineer and Computer Science researcher based in Swat, KP, Pakistan.

The existing portfolio possesses a distinctive engineering identity: a retro-modern phosphor-green terminal interface running on React 19 and Vite, styled with custom design tokens, monospace command-line motifs, and interactive telemetry widgets.

However, a comprehensive technical and UX audit revealed critical structural misalignments:
1. **Recruiter Friction**: High-signal proof (such as winning NeoHack 2025 with an AI oncology classifier, 1.00 AUC, multi-agent systems, and production pipelines) is buried behind a blocking boot sequence, understated stat counters, and duplicate project lists.
2. **Redundant Information Architecture**: The homepage currently displays projects twice—once in a featured 2-column card grid, and again in a full ASCII terminal directory table (`ls -la ~/projects`). This dilutes the boundary between `Home` and `Projects`.
3. **Underutilized Interactive DNA**: A fully functional interactive terminal shell component (`TerminalShell.jsx`) with command execution exists in the codebase but is orphaned and unused anywhere in the application. Meanwhile, decorative elements like `BinaryClock` consume high visual real estate with minimal informational return for hiring managers.
4. **Implementation Bugs**: Critical CSS/component desyncs in navigation and status badge mapping degrade the visual cohesion.

This blueprint establishes a clear roadmap to transform the homepage into a razor-sharp, recruiter-optimized, high-density AI engineer console—preserving its authentic hacker DNA while elevating conversion rates for global remote AI/ML roles and research opportunities.

---

## 2. Current Homepage Audit

A line-by-line inspection of the active codebase (`src/pages/Home.jsx`, `src/pages/Home.css`, related components, and configuration) yields the following inventory:

### Component Inventory & Screen Flow

| # | Section / Component | Purpose / Content | UX Evaluation |
|---|---|---|---|
| **1** | `CliLoader.jsx` (Boot Sequence) | Full-screen CLI bootloader simulating memory checks, kernel load, and subsystem initialization (~700ms). | **Friction**: Blocks viewport. Session-gated via `sessionStorage`, but introduces a bounce risk for first-time recruiters seeking immediate verification. |
| **2** | `Nav.jsx` | Fixed header with command prompt path (`guest@ik-terminal:~$`), status badge, and routing tabs. | **Bug / Visual Desync**: JSX renders `.nav-titlebar`, `.nav-wb-dots`, and prompt spans, but `Nav.css` contains zero matching selectors (still references legacy `.nav-inner`, `.nav-brand`). Header is currently unstyled/misaligned. |
| **3** | `HomeHero` (Split View) | **Left**: Monospace command prompt, subhead "AI/ML Engineer & Systems Builder", bio snippet, CTA buttons (View Work, Contact, Resume download).<br>**Right**: `TerminalFrame` enclosing `profile.jpg` with simulated CRT scanlines. | **Strong Identity, Weak Scannability**: Visual style is distinctive, but the primary tech stack (PyTorch, LangChain, Python, C++, Supabase) is absent from the hero viewport. |
| **4** | `StatsBar` | 4 horizontal stat metrics: Total Repos (API dynamic), Hackathon Wins (`1`), CGPA (`3.51`), Graduation Year (`2027`). | **Undersells Impact**: Flat numbers without context. "1 Hackathon Wins" masks the significance of NeoHack 2025 and domain difficulty (cancer genomics). |
| **5** | `FeaturedProjects` | 2-column card grid displaying 4 curated projects (`cancer-omics-classifier`, `autoinsight-ai`, `Plancraft-ai`, `DocSmith`). Cards contain title, description, tags, status badge, GitHub/live links. | **High Value**: Strongest section on current page, but status badges fail to render correct colors due to config string mismatch (`[LIVE INFERENCE]` vs expected `'active'`). |
| **6** | `DashboardGrid` | 2-column telemetry dashboard: `Neofetch.jsx` (system specs, OS, uptime, packages) on the left; `BinaryClock.jsx` (live binary hours/minutes/seconds) on the right. | **Mixed Utility**: `Neofetch` reinforces the authentic Unix engineer persona; `BinaryClock` is visually novel but has near-zero relevance to AI/ML technical evaluation. |
| **7** | `ProjectsTable` (`ls -la ~/projects`) | Monospace ASCII table listing all repository items with permission masks, size, date, category filters, and links. | **Redundancy & Mobile Degradation**: Replicates the dedicated `/projects` route; requires aggressive horizontal scrolling on mobile viewports; dilutes hero CTA purpose. |
| **8** | `Footer.jsx` | Monospace copyright, system status indicator, quick links. | **Clean**: Minimal, fits aesthetic. |

---

## 3. Current UX Problems & Root Causes

### 3.1 Recruiter Friction & Time-to-Signal
- **Average Recruiter Review Time**: Recruiter screenings last 15 to 30 seconds.
- **The Boot Problem**: First impressions are consumed by simulated boot logs (`[OK] Initialized memory`, etc.). While fun for enthusiasts, hiring managers evaluating 50 portfolios per hour may bounce before the hero finishes rendering.
- **Hidden Core Stack**: A reviewer cannot immediately answer: *"Does Ilyas know PyTorch? LangChain? FastAPIs? RAG architectures?"* without scrolling past the fold or parsing dense paragraph prose.

### 3.2 Information Architecture Cannibalization
- The homepage currently does everything the `/projects` page does, only in a compressed and cramped ASCII table.
- Users navigating from `Home` to `Projects` encounter near-identical data, creating cognitive fatigue and rendering the multi-page structure redundant.

### 3.3 Missed Credibility Levers
- **Hackathon Victory**: Winning NeoHack 2025 with an end-to-end multi-omics AI platform is top 1% signal for an undergraduate. It is presented as a plain `1` in a generic counter card.
- **Orphaned Capabilities**: `TerminalShell.jsx`—a pre-built interactive CLI capable of executing commands (`help`, `whoami`, `skills`, `status`, `ls projects`)—is completely dormant in the repository.
- **Missing Proof of Systems Building**: Ilyas works across AI agents, LLM RAG pipelines, autonomous drone flight controllers (Pixhawk/ArduCopter), and genomics. None of these architecture diagrams or benchmark figures are surfaced on the homepage.

---

## 4. Recruiter & Engineering Lead User Journey

To maximize conversion (invitations to interview, technical screening, research collaborations), the homepage must be engineered around the mental models of two primary technical personas:

### Persona A: Technical Recruiter / Talent Sourcer
* **Goal**: Rapidly qualify skills, candidate availability, location, domain competence, and resume match within 15 seconds.
* **Scan Path**:
  1. **Hero**: Role title (`AI/ML Engineer & Systems Builder`), current location (Swat, Pakistan / Open to Remote), core stack tags (`PyTorch`, `LangChain`, `Python`, `Supabase`).
  2. **Call to Action**: Immediate, prominent buttons for `Download Resume` and `View GitHub / Email`.
  3. **Credibility Validation**: Highlighted proof badges: `NeoHack 2025 Winner`, `3.51 CGPA (BS CS AI, AWKUM)`.

### Persona B: Senior Engineering Lead / AI Hiring Manager
* **Goal**: Validate engineering depth, architectural maturity, codebase quality, and problem-solving rigor within 60-90 seconds.
* **Scan Path**:
  1. **Flagship Work**: Dive into 3 curated, production-grade projects with verifiable technical depth (metrics, system architecture, live demo/repo).
  2. **Technical Breadth**: Inspect production capabilities (agent orchestration, vector databases, embedded flight controllers, model inference).
  3. **Interactive Telemetry / Terminal**: Engage with interactive command console (`TerminalShell`) or inspect `Neofetch` system telemetry to confirm an authentic systems engineer mindset.

---

## 5. New Homepage Information Architecture (IA) Blueprint

The redesigned homepage transitions from a flat "dump everything" page into a structured, narrative-driven technical console.

```mermaid
graph TD
    A[Global Nav: Command Prompt + Status + Quick Links] --> B[Hero: Value Proposition + Core Stack + Instant CTAs]
    B --> C[Impact & Credibility Ticker: NeoHack Winner | 34+ Repos | 3.51 GPA]
    C --> D[Flagship Systems Spotlight: 3 Deep-Dive Engineering Showcases]
    D --> E[Technical Architecture Matrix: AI/ML | Systems/Robotics | Cloud/Data]
    E --> F[Interactive Console: Embedded TerminalShell + System Telemetry]
    F --> G[Academic & Research Foundation: BS CS AI, AWKUM + Certifications]
    G --> H[Deployment Terminal / Contact CTA + Global Footer]
```

### Proposed Section Breakdown

1. **Global Nav (`Nav.jsx`)**
   - Retro command line header with real system latency, terminal prompt, and fixed high-priority CTA (`Resume`).
2. **Hero Console (`HomeHero`)**
   - High-impact terminal prompt, positioning statement, instant tech stack badges, portrait terminal frame, and dual CTAs (`Inspect Flagship Systems` / `Download Resume`).
3. **Proof & Impact Bar (`ProofTicker`)**
   - High-contrast telemetry bar spotlighting verifiable milestones: NeoHack 2025 Champion, 1.00 AUC Cancer Classifier, 34+ Public Repositories, 3.51 CGPA.
4. **Flagship Engineering Showcase (`FlagshipSpotlight`)**
   - Curated deep-dive into the top 3 high-signal systems:
     - **Cancer Omics Classifier**: NeoHack 2025 winning multi-omics diagnostic platform (1.00 AUC, multi-agent pipeline).
     - **AutoInsight AI / Plancraft AI**: Production-grade RAG and autonomous LLM agent workflow engine.
     - **Robotics / Systems Flight Controller**: Hardware-in-the-loop autonomous UAV systems (Pixhawk / ArduCopter).
5. **Technical Architecture & Capabilities Matrix (`CoreCompetencies`)**
   - Structured terminal matrix categorizing applied engineering skills by domain: Machine Learning & Generative AI, Distributed & Backend Systems, Robotics & Embedded Control.
6. **Interactive Telemetry & Terminal Shell (`InteractiveConsole`)**
   - Seamlessly activates the dormant `TerminalShell.jsx` alongside `Neofetch.jsx`, providing tech leads with a fully functional CLI to query candidate metadata (`whoami`, `cat skills`, `git log`, `ssh contact`).
7. **Academic & Research Foundation (`AcademicCredentials`)**
   - BS in Computer Science (Artificial Intelligence) at Abdul Wali Khan University Mardan (AWKUM), expected graduation 2027, honors, and verified deep learning certifications.
8. **Contact Terminal & Deployment Gateway (`ContactTerminal`)**
   - High-conversion closing prompt inviting interview opportunities, remote roles, and research projects with one-click email copying and PGP/social verification.

---

## 6. Detailed Section-by-Section Specification

### Section 1: Top Navigation Bar (`Nav.jsx`)
* **Purpose**: Persistent site-wide orientation, route navigation, and instant access to recruiter collateral.
* **Component Changes**:
  - Re-sync `Nav.jsx` with `Nav.css` by fixing CSS class selectors (`.nav-titlebar`, `.nav-prompt-row`).
  - Add quick action: Direct `Resume.pdf` action button on the far right.
  - Active route highlighting using green monospace pill indicator.

### Section 2: Hero Console
* **Headline**: `Ilyas Khan`
* **Subhead**: `AI/ML Engineer & Systems Builder`
* **Tagline**: `Building high-throughput machine learning pipelines, autonomous multi-agent systems, and embedded flight computing.`
* **Core Stack Chips (Immediately visible)**:
  - `[PyTorch]` `[Python / C++]` `[LangChain / RAG]` `[Supabase / SQL]` `[Autonomous Systems]`
* **Primary CTAs**:
  - `[01] Explore Systems` (Smooth scroll to Flagship Projects)
  - `[02] Download CV` (Opens `/resume.pdf`)
  - `[03] Launch Terminal` (Jumps to interactive shell)

### Section 3: Proof & Verification Bar
* **Replaces**: Generic 4-box stat counter.
* **Metrics**:
  1. **Hackathon Champion**: `NeoHack 2025 1st Place` (Multi-omics cancer classification, 1.00 AUC).
  2. **Codebase Activity**: `34+ Repositories` (Synchronized dynamically via GitHub GraphQL/REST API).
  3. **Academic Excellence**: `3.51 CGPA` (BS Computer Science - AI Specialization, AWKUM '27).
  4. **Production Architecture**: `Full-Stack AI` (RAG, Vector Databases, Autonomous Agents, Edge Control).

### Section 4: Flagship Engineering Systems (Top 3 Only)
* **Replaces**: 4-card generic project list.
* **Layout**: Rich interactive cards featuring architecture diagrams, system inputs/outputs, model performance metrics, and direct live links:
  1. **System 01: Multi-Omics Cancer Biomarker & Clinical Classifier**
     - *Badge*: `[NEOHACK '25 WINNER] [1.00 AUC]`
     - *Highlights*: XGBoost, Random Forest, PyTorch, Multi-omics genomic dataset integration, automated clinical explainability via SHAP.
     - *Links*: `[GitHub Repo]` `[System Architecture]` `[Live Demo]`
  2. **System 02: AutoInsight AI / Plancraft Multi-Agent Workflow Engine**
     - *Badge*: `[LLM AGENTS] [PRODUCTION RAG]`
     - *Highlights*: Orchestrated autonomous LLM agents using LangChain, Supabase vector storage, streaming inference, automated plan generation.
     - *Links*: `[GitHub Repo]` `[Demo Video]`
  3. **System 03: Autonomous UAV Flight Control & Robotics Telemetry**
     - *Badge*: `[EMBEDDED HARDWARE] [ARDUCOPTER]`
     - *Highlights*: Pixhawk firmware integration, C++ mission planning, autonomous waypoint navigation, fail-safe edge telemetry.
     - *Links*: `[GitHub Repo]` `[Telemetry Logs]`

### Section 5: Core Competencies & Architecture Matrix
* **Layout**: 3-column terminal block grouped by technical domain rather than loose tags:
  - **Column A (AI & Machine Learning)**: PyTorch, Scikit-learn, LangChain, RAG, Transformers, SHAP Explainability, Model Fine-Tuning.
  - **Column B (Systems, Hardware & Robotics)**: C++, Python, Linux Kernel/SysAdmin, Pixhawk / ArduCopter, Hardware-in-the-Loop Testing.
  - **Column C (Data, Cloud & Tooling)**: Supabase, PostgreSQL, Pinecone Vector DB, n8n Workflow Automation, Git, Docker, REST APIs.

### Section 6: Interactive Terminal Console & Telemetry
* **Activation**: Integrates the existing, unrendered `TerminalShell.jsx` directly into the page layout next to `Neofetch.jsx`.
* **Utility**: Technical evaluators can click into the terminal and run real commands:
  - `help`: List available commands.
  - `cat about.txt`: Display bio and research focus.
  - `top`: Display live mock system resources and memory stats.
  - `open resume`: Open resume in new tab.
  - `contact`: Print direct contact channels.

### Section 7: Academic Foundation & Certifications
* **Content**:
  - **Degree**: Bachelor of Science in Computer Science (Specialization in Artificial Intelligence).
  - **Institution**: Abdul Wali Khan University Mardan (AWKUM).
  - **Graduation**: Expected 2027 | CGPA: 3.51.
  - **Verified Credentials**: Coursera & SimpliLearn AI/ML Certifications.

### Section 8: Final Deployment Gateway & Contact Terminal
* **Prompt**: `ilyas@workstation:~$ ./contact.sh --hire`
* **Features**: One-click email copy button (`ilyaskhan12q@gmail.com`), social verification badges (GitHub, LinkedIn, WhatsApp), and response SLA indicator (`Average response time: < 12 hours`).

---

## 7. Home vs. Projects: Boundary Definition

A major flaw in the current architecture is the duplication of project listings. The new boundary is strictly defined:

| Dimension | `Home` (`/`) | `Projects` (`/projects`) |
|---|---|---|
| **Primary Objective** | Qualification, conversion, high-level technical positioning. | Deep technical exploration, comprehensive archive search, filtering. |
| **Project Quantity** | Exactly **3 flagship systems**. | **All 34+ repositories** (enriched + dynamically fetched from GitHub). |
| **Detail Level** | High-level system architecture, business/clinical impact, top performance metrics (e.g. 1.00 AUC). | Full parameter breakdown, commit activity, language distributions, complete file structure. |
| **Interaction** | Quick link to live system, code repo, or project case study. | Interactive search bar (`grep`), category filtering (`AI/ML`, `Agents`, `Robotics`, `Full-Stack`), tag toggles. |
| **Component Used** | New `FlagshipSpotlight.jsx` card component. | Refactored `ProjectsTable` / card directory with live filtering. |

---

## 8. Content Hierarchy & Recruiter Scanning Flow

Recruiters follow an F-shaped or inverted pyramid scanning pattern. The content on the homepage is engineered to provide progressive disclosure of competence:

```
[0-5s]   WHO & WHAT: Ilyas Khan | AI/ML Engineer | Swat, Pakistan (Remote Ready)
         STACK BADGES: PyTorch, LangChain, C++, Supabase
         PRIMARY CTAs: [Download CV] [Inspect Flagship Systems]
            │
[5-15s]  PROOF VALIDATION: NeoHack '25 Winner (1.00 AUC) | 34+ Repos | 3.51 GPA
            │
[15-45s] FLAGSHIP DEEP-DIVES:
         1. Cancer Multi-Omics Classifier (Clinical Diagnostic Engine)
         2. AutoInsight AI / Plancraft (Autonomous Multi-Agent Systems)
         3. Autonomous UAV Flight Control (Embedded Systems & Pixhawk)
            │
[45-75s] BREADTH & INTERACTION:
         Domain Matrix: AI/ML, Embedded Systems, Cloud/Data
         Interactive Console: Run `whoami`, `cat skills`, `top` in live terminal
            │
[75s+]   CONVERSION: Direct Contact Terminal + Response SLA (<12h)
```

---

## 9. Proof & Impact Strategy

Every technical claim on the homepage must link to verifiable code, evaluation metrics, or third-party validation:

| Capability Claim | Verifiable Proof | Homepage Placement |
|---|---|---|
| **High-Precision ML & Oncology** | NeoHack 2025 First Place, 1.00 AUC, SHAP interpretability graphs, public GitHub repository. | Section 3 (Proof Bar) & Section 4 (Flagship Card 1). |
| **Autonomous Multi-Agent AI** | Multi-step LangChain agent loops, vector retrieval benchmarks, streaming LLM outputs, clean system architecture diagram. | Section 4 (Flagship Card 2). |
| **Robotics & Systems Engineering** | Embedded C++ firmware, hardware-in-the-loop Pixhawk/ArduCopter autopilot logs, real-time telemetry. | Section 4 (Flagship Card 3) & Section 5 (Matrix). |
| **Academic Rigor** | 3.51 CGPA at AWKUM (BS CS Artificial Intelligence), Coursera Deep Learning Specialization credentials. | Section 3 (Proof Bar) & Section 7 (Academic Block). |

---

## 10. Visual Direction & Aesthetics

### Core Philosophy: "Authentic Engineering Workstation, Not Cyberpunk Gimmick"
The visual language must honor Unix terminal minimalism, high typography contrast, and high-density telemetry, while avoiding neon cyber-dystopian tropes.

### Visual Design Tokens
- **Background Foundation**: Deep console black (`#0a0e0c`) with subtle dark surface elevation (`#111714` / `#161e1a`).
- **Primary Phosphor Accent**: Vivid monochrome terminal green (`#00ff66`), used strictly for focus states, command prompts, active links, and status indicators.
- **Muted Structural Borders**: Subtle terminal border stroke (`rgba(0, 255, 102, 0.2)` to `rgba(255, 255, 255, 0.08)`).
- **Secondary Accents**:
  - Warning/Build: Phosphor Amber (`#ffb000`)
  - Error/Interrupt: Retro CRT Red (`#ff3333`)
  - Accent Telemetry: Cyan (`#00e5ff`)
- **Typography Stack**:
  - Code & Headings: `JetBrains Mono`, `monospace` (weight 400, 600)
  - Longform Body Text: `Inter`, `system-ui` for superior legibility and recruiter eye-comfort

---

## 11. Image, Diagram & Visual Asset Strategy

To anchor the technical achievements visually without slowing down page load speeds:
1. **Interactive Architecture Diagrams**: SVG-based system topology for Flagship 1 (Multi-Omics) and Flagship 2 (Multi-Agent RAG), showing data ingestion, vector index, LLM reasoning, and validation output.
2. **Terminal Scanline Profile Frame**: Preserve the existing `profile.jpg` inside `TerminalFrame.jsx` with subtle CRT scanline effect to maintain human connection.
3. **Telemetry & Benchmark Sparklines**: Micro SVG sparklines illustrating model loss curves and AUC benchmarks.

---

## 12. Motion & Interaction Principles

All animations must serve a UX purpose (orientation, feedback, status) rather than decoration:
- **Instant Interactive Readiness**: Never block user interaction with arbitrary loading timers. The bootloader will be converted to an optional or non-blocking micro-toast rather than a full-page modal blocker.
- **Tactile Monospace Feedback**: Command inputs in `TerminalShell` respond instantly (<16ms) with authentic monospace blinking cursors.
- **Smooth Content Transitions**: Subtle CSS opacity and transform transitions (150ms ease-out) on interactive cards and tabs.
- **Respect User Accessibility**: Respect `prefers-reduced-motion` across all CSS animations and CRT scanline shaders.

---

## 13. Responsive Strategy (Mobile, Tablet, Desktop)

### Desktop (>= 1024px)
- Multi-column telemetry view.
- Side-by-side terminal frame in hero.
- 2-column or 3-column architecture matrix.
- Full interactive `TerminalShell` command prompt.

### Tablet (768px - 1023px)
- Stacks hero vertically: text value proposition first, profile frame below.
- 2-column layout for flagship project showcases.
- Scrollable interactive terminal with touch keyboard support.

### Mobile (< 768px)
- **Eliminate Horizontal Scroll Triggers**: Replace wide ASCII tables with responsive flex cards and tap-to-expand details.
- **Touch-Optimized CTAs**: Sticky bottom or prominent thumb-friendly buttons for `[Download CV]` and `[Email]`.
- **Streamlined Telemetry**: Condense `Neofetch` to essential lines (`OS`, `Kernel`, `Uptime`, `Focus Stack`).

---

## 14. What to Remove from Current Homepage

To eliminate clutter and maximize recruiter signal density:
1. **Full-Page Blocking `CliLoader`**: Convert from a blocking viewport gate into a lightweight hero prompt animation or non-blocking header telemetry ticker.
2. **Duplicate ASCII Projects Table**: Remove `ls -la ~/projects` from the homepage entirely. Direct users interested in the full archive to the dedicated `/projects` route via a clean prompt.
3. **Low-Signal `BinaryClock`**: Demote or relocate `BinaryClock.jsx` to an experimental toy tab or modal. Replace its desktop grid slot with the interactive `TerminalShell.jsx`.

---

## 15. What to Preserve & Elevate

1. **Terminal Aesthetics & Monochrome Identity**: Keep the phosphor-green color tokens, JetBrains Mono typography, window title bars with control dots, and prompt formatting.
2. **`Neofetch.jsx` System Telemetry**: Preserve this unique component as an authentic badge of Linux systems capability.
3. **`TerminalShell.jsx` (Dormant Gem)**: Elevate from an unused file into an active centerpiece of the interactive experience.
4. **Dynamic GitHub Sync**: Keep `useGitHubProjects` fetching live repository counts and activity to demonstrate continuous development.

---

## 16. Technical Bug Fixes Required for Phase 02

Prior to or during Phase 02 implementation, the following existing bugs must be resolved:
1. **`Nav.jsx` & `Nav.css` Synchronization**: Reconcile mismatched class names (`.nav-titlebar`, `.nav-prompt-row`, `.nav-wb-dots`) to restore intended navigation styling.
2. **`StatusBadge.jsx` String Normalization**: Update status badge color logic to handle metadata strings like `[LIVE INFERENCE]`, `[ACTIVE RUNNING]`, `[SHIPPED]` without falling back to neutral gray.
3. **CRT Overlay Integration**: Properly integrate or deprecate `CrtOverlay.jsx`.

---

## 17. Phase 02 & Phase 03 Implementation Roadmap

### Phase 02: Core Homepage UI & Information Architecture Build
- Refactor `Home.jsx` into modular section components (`HomeHero`, `ProofTicker`, `FlagshipSpotlight`, `CoreCompetencies`, `InteractiveConsole`, `ContactTerminal`).
- Fix `Nav.css` and `StatusBadge.css` desync issues.
- Connect `TerminalShell.jsx` to the homepage telemetry section with working commands.
- Implement responsive styles eliminating mobile horizontal scroll.

### Phase 03: Projects Page Optimization & Interactive Enhancements
- Refactor `/projects` page to feature interactive search (`grep <query>`), category filter buttons, and detailed architecture popouts.
- Add command auto-completion and sound toggles (optional retro key clicks) to `TerminalShell`.
- Polish Lighthouse performance, CWV, accessibility (WCAG AA color contrast on phosphor green), and SEO meta tags.

---

## 18. Open Decisions for User Alignment

1. **Upcoming Projects Scope (ZYRA, ZYR0 Research, SchoolOS)**: Confirm whether these upcoming ventures should be featured in the flagship spotlight or listed under an "Active Research & Early Access" subsection.
2. **Interactive Terminal Prominence**: Confirm whether `TerminalShell` should be embedded directly on the homepage or toggled via an omnipresent floating terminal drawer/modal.
3. **Bootloader Preference**: Confirm preference for complete removal of the 700ms boot sequence vs. transforming it into a non-blocking 300ms inline hero prompt typing effect.


