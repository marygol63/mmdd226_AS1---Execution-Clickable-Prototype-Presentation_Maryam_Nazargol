# Walmart Mobile Customer Support UX Redesign

**Course:** MMDD-226 Advanced Multimedia Technology  
**Assignment:** Assignment 1 — Milestone 2: Exploration & Prototyping  
**Student:** Maryam Nazargol  
**Program:** Multimedia Design and Development (MMDD), Humber College  
**Target Viewport:** Mobile (~390 × 844 px) & Fluid Responsive  

---

## 📖 Project Overview

This project presents a complete UX exploration and prototyping redesign for the **Walmart Canada Mobile Customer Support Experience**. Four distinct, fully interactive mobile prototypes were conceptualized, sketched, and built to solve the five primary usability issues discovered during UX research:

1. **Buried Support Links:** Solved by Prototype B (1-tap header pill & Help Centre) and Prototype A (order card triage).
2. **Excessive Navigation Steps:** Solved by Prototype A (reduced to 3 direct steps).
3. **Misleading 00:00 Countdown Timer:** Solved by Prototype C (realistic 2–5m ranges & live position tracker #12 → #5).
4. **Unresponsive Mobile Chat:** Solved by Prototype D (guaranteed sticky bottom composer without keyboard occlusion).
5. **Loss of Order Context:** Solved by Prototype D (slide-over Order Dossier tray) and Prototype C (non-blocking queue tabs).

All four prototypes have been engineered to match Maryam Nazargol's hand-drawn sketches (`sketches/walmart_ux_sketches.png`) screen by screen.

---

## 📂 Project Directory Structure

```text
MMDD226_Final_Project/
├── index.html                   # Main Prototype Hub & Showcase page
├── README.md                    # Project documentation & local execution instructions
├── assets/                      # Shared assets directory
│   ├── css/
│   │   └── common.css           # Shared design tokens, phone frame simulator & reset
│   └── images/
│       └── walmart_ux_sketches.png # High-resolution hand-drawn sketches & visual assets
├── sketches/                    # Ideation sketches & wireframe documentation
│   ├── README.md                # Sketch documentation
│   └── walmart_ux_sketches.png  # Scanned drawing sheet (Rows A, B, C, D)
├── docs/                        # Academic documentation
│   ├── PROJECT_REPORT.md        # Comprehensive usability issue report & evaluation
│   └── DESIGN_ITERATIONS.md     # Step-by-step mapping of hand-drawn wireframes to code
├── prototype-a/                 # PROTOTYPE A: Order-First Workflow
│   ├── index.html               # Screens: Menu -> Orders -> Order #1234 -> How help -> Live Agent
│   ├── style.css                # Flow-specific styles & animations
│   └── app.js                   # Navigation state machine & sketch modal handler
├── prototype-b/                 # PROTOTYPE B: Support-First Workflow
│   ├── index.html               # Screens: Search help -> Help Centre -> Topic -> Select Order -> Live Agent
│   ├── style.css                # Flow-specific styles & animations
│   └── app.js                   # Decision tree logic & sketch modal handler
├── prototype-c/                 # PROTOTYPE C: Transparent Queue UX
│   ├── index.html               # Screens: Queue #12 -> Queue #5 -> Non-blocking Orders -> Agent Ready!
│   ├── style.css                # Radiant headset, glow effects & progress bars
│   └── app.js                   # Dynamic queue progression & simulation tools
└── prototype-d/                 # PROTOTYPE D: Context-Aware Live Chat
    ├── index.html               # Screens: Live Chat (10:14) -> Order Drawer -> Photo upload -> Resolution
    ├── style.css                # Chat bubbles, slide-over drawer & sticky composer
    └── app.js                   # Dialogue engine, drawer animation & photo upload simulator
```

---

## 🚀 How to Run the Website Locally

This project is built using semantic HTML5, CSS3, and vanilla JavaScript. It is completely self-contained and does not require external package managers, compilers, or third-party CDNs.

### Method 1: Double-Click (Direct Browser Opening)
1. Navigate into the `MMDD226_Final_Project` directory.
2. Double-click `index.html` to open the Prototype Hub in your default browser (Google Chrome, Apple Safari, Microsoft Edge, or Mozilla Firefox).

### Method 2: Local Python Server (Recommended for Best Experience)
Open your terminal, navigate into the project directory, and start a local HTTP server:

```bash
cd MMDD226_Final_Project
python3 -m http.server 8080
```

Then open your browser and visit:
```
http://localhost:8080/index.html
```

### Method 3: VS Code Live Server
1. Open the `MMDD226_Final_Project` folder in Visual Studio Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

---

## 📱 Interactive Prototype Features

Every prototype includes built-in academic evaluation tools:
- **Phone Frame Toggle:** In the top toolbar, toggle between a realistic mobile phone bezel (`390 × 844 px`) and a fluid responsive layout.
- **View Hand-Drawn Sketch (`[ 📐 View Sketch ]`):** Opens a side modal displaying Maryam's original hand-drawn wireframe row alongside the interactive prototype for immediate side-by-side comparison.
- **Direct Navigation to Hub (`Back to Hub`):** Seamlessly switch between Prototypes A, B, C, and D.
- **Interactive Lightbox:** On the main Hub page, click the Ideation Sketches preview to view the full drawing sheet at maximum resolution.
