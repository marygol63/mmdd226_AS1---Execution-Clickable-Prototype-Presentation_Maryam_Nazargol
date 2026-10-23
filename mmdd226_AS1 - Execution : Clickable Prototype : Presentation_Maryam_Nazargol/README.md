# Walmart Mobile Customer Support UX Redesign — Design B (Help-First)

**Course:** MMDD-226 Advanced Multimedia Technology  
**Assignment:** Assignment 1 — Milestone 2: Execution & Clickable Prototype  
**Student:** Maryam Nazargol  
**Program:** Multimedia Design and Development (MMDD), Humber College  
**Target Viewport:** Mobile (~390 × 844 px) & Fluid Responsive  
**Live Entry Point:** Opens directly into **Design B (Help-First)** (`index.html`)

---

## 📖 Project Overview

This website provides a complete, fully functional, clickable interactive mobile prototype for **Walmart Help/Chat Redesign — Design B (Help-First)**. Built upon Maryam Nazargol's hand-drawn wireframes and high-fidelity screens, it represents an issue-first customer support triage that solves critical mobile UX friction points.

### Key Thesis of Design B:
> *"Good if they don't have an order in mind"* — Surfaces **"Search help..."** and **"Help Centre"** directly at the top level of the signed-in Walmart experience, enabling users to categorize their issue first before selecting a delivery or connecting to a live specialist.

---

## 🎯 Complete User Journey

1. **Signed-in Walmart Homepage (`screen-home`):**
   - Authentic Walmart blue header with Spark logo, delivery location (`Maryam • 205 Humber College Blvd, Etobicoke`), and profile chip.
   - Prominent **"Search help..."** bar and highlighted **Help Centre** primary action row with *24/7 Live* indicator.
   - Recent delivery context alert for Order #1234 (Delivered Jun 3).
2. **User selects Help (`screen-help-centre`):**
   - Help Centre landing page with search input and prioritized support topics.
   - Priority 1-tap option: **"Contact Support"** (*Live Agents Available*).
3. **User navigates through support options (`screen-what-need`):**
   - Clean category decision tree: **"An order"** (selected by default), *Returns & exchanges*, *Account & login*, *Payment & gift cards*, *Walmart+*.
4. **User selects an issue related to a damaged order (`screen-select-order`):**
   - Segmented subtabs: **Online Orders** vs **In Store Receipts**.
   - Selects **Order #1234** (Delivered Jun 3) containing the **Portable Personal USB Blender ($24.99)** with high-res product imagery.
   - Dedicated damaged item checklist: marks item as damaged in transit, pre-populates damage notes, and toggles photo verification of the cracked tumbler (`assets/images/damaged_blender.jpg`).
5. **Order information carried into support conversation (`screen-support-options`):**
   - Visual **Order Context Carried Forward** dossier: shows Order #1234, Portable Blender ($24.99), damage description, customer name, and Ticket #WM-84920 automatically locked in.
6. **Clear chat support info & queue status (`screen-support-options`):**
   - Live status indicator: *3 ahead in queue*, *Estimated wait: 2–4 min*, *Specialists online 24/7*.
7. **User joins customer support queue (`btnJoinQueueCTA`):**
   - Clickable button with instant tactile feedback securing the user's place in line.
8. **Visible confirmation of successfully joined queue (`screen-queue-confirmed`):**
   - Radiant glowing headset icon with ambient pulse.
   - Visible confirmation pill: **"Joined Customer Support Queue"**.
   - Large live position ticker: **#3 in line** dynamically animating to **#2**, **#1**, and **Agent Ready!**.
   - Smooth animated progress bar (40% → 70% → 95% → 100%).
   - Honest wait time estimate (2–3 min) and no-spot-loss guarantee.
   - Fast-Forward accelerator (`⏩`) to speed up testing.
   - Seamless transition into the **Interactive Live Chat Console (`screen-live-chat`)** with Walmart Care Specialist **David M.**, featuring persistent pinned context, damaged item photo attachment, interactive prompt chips, and intelligent simulated replies!

---

## 🚀 How to Run Locally

This website is **100% self-contained**, built strictly with standard HTML5, CSS3, and Vanilla JavaScript. It requires **no NPM dependencies, no build tools, and no external CDNs**.

### Method 1: Direct Double-Click (Zero Setup)
Double-click `index.html` in this folder to open directly in Google Chrome, Apple Safari, Microsoft Edge, or Mozilla Firefox.

### Method 2: Local HTTP Server (Recommended)
From your terminal in this repository folder:
```bash
python3 -m http.server 8080
```
Then open your browser to:
```
http://localhost:8080/
```
The website immediately opens into **Step 1 of Design B (Help-First)**. Refreshing the browser preserves the direct entry point into Design B.

---

## 🌐 GitHub Pages Deployment Guide

This repository is pre-configured and 100% ready for GitHub Pages:
- All asset paths are relative (`assets/css/style.css`, `assets/js/app.js`, `assets/images/...`).
- An empty `.nojekyll` file is included to prevent GitHub Pages from processing static assets with Jekyll.
- The root `index.html` is Design B, so the published URL will open directly into Design B with no intermediate splash or prototype selection page.

### Steps to Deploy on GitHub Pages:
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Deploy Walmart Support Redesign - Design B"
   ```
2. Create a GitHub repository and push your `main` branch:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Enable GitHub Pages:
   - Go to your repository on GitHub.
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
4. In ~1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/<repo-name>/`
   Visiting that link will open directly into Design B.

---

## 📱 Interactive Presentation Features

- **7-Step Flow Breadcrumb Tracker (Top Bar):** Click any number (`1` through `7`) to jump directly to any step of the user journey during presentations or grading.
- **Phone Frame vs. Responsive Toggle (`[ 📱 Phone Frame (390×844) ]`):** Toggle between an authentic iPhone bezel simulator and full desktop fluid responsive mode.
- **View Sketch B Modal (`[ 📐 View Sketch B ]`):** Side-by-side modal displaying Maryam's original hand-drawn wireframes (`assets/images/walmart_ux_sketches.png`).
- **Reset Demo Button (`[ ↺ Reset Demo ]`):** Clears queue intervals and restarts the experience from Step 1.
- **Slide-Over Order Dossier Drawer:** Toggle open at any time during chat or queue status without losing place or refreshing.

---

## 📂 Directory Structure

```text
├── index.html                  # Direct entry point: Design B (Help-First)
├── .nojekyll                   # GitHub Pages static asset bypass
├── README.md                   # Documentation & deployment guide
├── assets/
│   ├── css/
│   │   └── style.css           # Walmart design tokens, simulator & responsive styles
│   ├── js/
│   │   └── app.js              # State machine, queue timer & dialogue engine
│   └── images/
│       ├── agent_david.jpg     # Realistic support specialist avatar
│       ├── damaged_blender.jpg # Product & transit damage photo
│       └── walmart_ux_sketches.png # Maryam's hand-drawn wireframe row asset
├── Walmart_Version_B_Final/    # Working copy of Version B
├── MMDD226_Final_Project/      # Coursework archive of previous project milestones
└── _archive_other_prototypes/  # Archive of previous 4-prototype hub and alternate prototypes
```
