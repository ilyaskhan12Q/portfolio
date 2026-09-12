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

