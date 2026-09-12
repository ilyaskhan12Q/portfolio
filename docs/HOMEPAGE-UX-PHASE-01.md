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
