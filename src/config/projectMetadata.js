export const projectMetadata = {
  'cancer-omics-classifier': {
    status: '[LIVE INFERENCE]',
    metrics: '1.00 AUC Winner',
    stack: ['Python', 'Jupyter', 'scikit-learn', 'Pandas'],
    liveUrl: 'https://github.com/ilyaskhan12Q/cancer-omics-classifier',
    architecture: `
[Genomic Data] ──┐
[Clinical Data] ─┼─► [Multi-Modal Fusion] ──► [RandomForest/XGBoost] ──► [1.00 AUC Prediction]
[Transcriptomic] ┘
    `,
    longFormMarkdown: `
# Multi-Modal Cancer Omics Classifier
Winner of **NeoHack 2025**. A high-performance bioinformatics pipeline designed to classify patient outcomes by fusing diverse omics modalities.

### Core Architecture & Engineering Highlights
- **Multi-Modal Data Fusion**: Combines clinical tabular metadata with genomic variants and transcriptomic expression matrices.
- **Dimensionality Reduction**: Implements customized VarianceThreshold and SelectKBest algorithms to reduce features from 20k+ down to 150 critical markers.
- **Model Performance**: Evaluation sets achieved **1.00 AUC** utilizing an ensemble of XGBoost and RandomForest classifiers.
- **Explainability**: Integrated SHAP values to map feature contributions, ensuring clinical interpretability of model decisions.
    `
  },
  'autoinsight-ai': {
    status: '[ACTIVE RUNNING]',
    metrics: '98.4% SHAP Expl.',
    stack: ['Python', 'scikit-learn', 'SHAP', 'Gemini'],
    liveUrl: 'https://github.com/ilyaskhan12Q/autoinsight-ai',
    architecture: `
[Raw CSV File] ──► [Automated EDA] ──► [AutoML Classifier] ──► [SHAP Explainer] ──► [Gemini Summary]
    `,
    longFormMarkdown: `
# AutoInsight AI
Turns raw CSV files into structured machine learning insights automatically, generating polished analysis reports.

### Technical Achievements
- **Dynamic Ingestion**: Automated schema detection and missing value imputation via intelligent Pandas heuristics.
- **AutoML Pipeline**: Evaluates multiple model architectures (Linear, Random Forest, Gradient Boosting) and auto-tunes hyperparameters using cross-validation.
- **Natural Language Reports**: Passes SHAP feature importances to Gemini LLM to compile natural-language, executive-level summaries of model predictions.
    `
  },
  'Plancraft-ai': {
    status: '[STANDBY RENDER]',
    metrics: '94.2% Acc Rate',
    stack: ['Flutter', 'FastAPI', 'Gemini 2.5 Flash', 'Celery', 'Redis', 'Blender 4.2'],
    liveUrl: 'https://github.com/ilyaskhan12Q/Plancraft-ai',
    architecture: `
[User Specs] ──► [FastAPI Router] ──► [Redis/Celery Queue] ──► [Blender Render] ──► [2D/3D Model]
    `,
    longFormMarkdown: `
# PlanCraft AI
Generates 2D and 3D architectural floor plans and luxury renders from natural language parameters.

### System Infrastructure
- **Async Task Queue**: Offloads Blender photorealistic renders to a background worker pool using Celery and Redis.
- **Blender Automation**: Implements custom headless Python scripts for Blender to generate walls, doors, and furniture coordinates dynamically.
- **Frontend App**: Responsive Flutter mobile and web client visualizing layouts and displaying interactive 3D WebGL render containers.
    `
  },
  'DocSmith': {
    status: '[STABLE PIPELINE]',
    metrics: '99.9% Gen Rate',
    stack: ['Python', 'AI/LLM tooling'],
    liveUrl: 'https://github.com/ilyaskhan12Q/DocSmith',
    architecture: `
[Resume Metadata] ──► [DocSmith Engine] ──► [Markdown Processing] ──► [WeasyPrint PDF]
    `,
    longFormMarkdown: `
# DocSmith
An automated document generation suite leveraging AI-driven prompt pipelines to generate tailormade resumes and cover letters.

### Architecture Features
- **Prompt Engineering**: Dynamic system context templates matching job descriptions with candidate skill graphs.
- **Decoupled Engine**: Outputs intermediate JSON schemas before compiling to markdown and HTML, separating data from presentation.
- **PDF Compilation**: Employs headless layout tools to output print-ready, ATS-compliant single-page PDF assets.
    `
  },
  'flexstock': {
    status: '[SHIPPED]',
    metrics: '99.9% Uptime',
    stack: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express'],
    liveUrl: 'https://github.com/ilyaskhan12Q/flexstock',
    architecture: `
[React Client] ──► [REST API Gateway] ──► [Stock Control Service] ──► [SQL Database]
    `,
    longFormMarkdown: `
# FlexStock
A responsive inventory and stock-management dashboard containing real-time analytics.

### Engineering & Features
- **Real-time Inventory Mapping**: Sub-millisecond frontend filter grids mapping 10k+ stock keeping units (SKUs).
- **CRUD Operations**: Secure endpoints verifying input formats and tracking historic transaction logs.
- **State Management**: Optimized UI triggers preventing unnecessary rendering cycles during heavy batch edits.
    `
  },
  'langchain-ai-doctor': {
    status: '[ACTIVE INFERENCE]',
    metrics: '0.1s Latency',
    stack: ['LangChain', 'Python', 'LLM'],
    liveUrl: 'https://github.com/ilyaskhan12Q/langchain-ai-doctor',
    architecture: `
[User Query] ──► [LangChain Agent] ──► [Medical DB RAG] ──► [Triage Outcome]
    `,
    longFormMarkdown: `
# LangChain AI Doctor
Conversational AI medical assistant employing structured query routing to perform triage simulation.

### Security & Precision
- **RAG System**: References verified medical documents using vector searches to prevent LLM hallucinations.
- **Guardrails**: Built-in regex filters matching dangerous terms to immediately prompt the user to seek human medical professionals.
- **Agent Router**: Uses LangChain routing to determine whether to fetch general information, execute a triage questionnaire, or output emergency disclaimers.
    `
  },
  'escrow-app': {
    status: '[SECURE ESCROW]',
    metrics: '100% Trust Rate',
    stack: ['TypeScript', 'React', 'Node.js'],
    liveUrl: 'https://github.com/ilyaskhan12Q/escrow-app',
    architecture: `
[Buyer Deposit] ──► [Escrow Vault] ──► [Oracle Condition Check] ──► [Seller Release]
    `,
    longFormMarkdown: `
# Escrow App
Trust infrastructure verifying and releasing funds conditionally for secure two-party transactions.

### Key Aspects
- **Transaction Security**: Employs state locks preventing funds from double-spending or premature release.
- **Interactive UI**: Dashboard visualizing transaction timeline status (Deposited, Verification, Completed, Disputed).
- **Audit Logging**: Full server-side ledger reporting the history of actions, timestamps, and active user credentials.
    `
  },
  'Transformers-self_attention': {
    status: '[COMPILE SUCCESS]',
    metrics: '0.001 MSE',
    stack: ['Python', 'Jupyter', 'NumPy'],
    liveUrl: 'https://github.com/ilyaskhan12Q/Transformers-self_attention',
    architecture: `
[Input Vectors] ──► [Query/Key/Value Projections] ──► [Scaled Dot-Product Attention] ──► [Context Matrix]
    `,
    longFormMarkdown: `
# Transformers Self-Attention
A from-scratch mathematical implementation of the scaled dot-product attention mechanism.

### Deep Learning Mechanics
- **Matrix Calculations**: Avoids high-level framework wrappers to compute query, key, and value projections using raw NumPy matrix operations.
- **Softmax Scale Factor**: Implements scaling by the square root of the head dimension to prevent vanishing gradients during backward updates.
- **Interactive Visualization**: Outputs attention weight heatmaps representing tokens focus profiles.
    `
  },
  'QR-generator-mvp': {
    status: '[LIVE INSTANCE]',
    metrics: '0.05s Generate',
    stack: ['JavaScript', 'HTML5', 'CSS3'],
    liveUrl: 'https://github.com/ilyaskhan12Q/QR-generator-mvp',
    architecture: `
[Raw URL / Text] ──► [QR Code Engine] ──► [Canvas Drawing] ──► [PNG Export]
    `,
    longFormMarkdown: `
# QR Generator MVP
Fast, no-nonsense QR code generator.

### Design Details
- **Lightweight Footprint**: Pure client-side generation without external API dependencies.
- **Coursework Deliverable**: Part of assignments for computer science studies at AWKUM.
- **Direct Canvas Export**: Draws generated matrices to canvas contexts, supporting instant image download prompts.
    `
  }
};
