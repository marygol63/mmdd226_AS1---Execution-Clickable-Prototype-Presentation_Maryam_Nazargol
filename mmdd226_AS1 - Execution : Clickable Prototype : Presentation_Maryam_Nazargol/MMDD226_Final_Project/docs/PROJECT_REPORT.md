# Walmart Mobile Customer Support UX Redesign — Project Report

**Course:** MMDD-226 Advanced Multimedia Technology  
**Assignment:** Assignment 1 — Milestone 2: Exploration & Prototyping  
**Student:** Maryam Nazargol  
**Program:** Multimedia Design and Development (MMDD), Humber College  
**Target Viewport:** Mobile (~390 × 844 px) & Fluid Responsive  

---

## 1. Executive Summary

This project investigates and redesigns the mobile customer support experience for Walmart Canada. Customer support is a critical post-purchase touchpoint, particularly when orders arrive with damaged goods or delivery discrepancies. Based on heuristic evaluation and user journey mapping, five significant usability pain points were identified in the existing Walmart mobile web application.

To address these pain points, four distinct, fully interactive prototypes were designed and built:
- **Prototype A (Order-First Support):** Direct support access originating from order history to reduce navigation steps.
- **Prototype B (Support-First Navigation):** High-discoverability triage starting from the Help Centre for customers without a specific order in mind.
- **Prototype C (Transparent Queue Experience):** Mitigates queue abandonment by replacing frozen countdowns with honest ranges, live position updates, and non-blocking order inspection.
- **Prototype D (Responsive Context-Aware Chat):** Prevents keyboard occlusion and loss of context via a sticky composer and a slide-over Order Dossier tray.

All prototypes were designed to match Maryam Nazargol's hand-drawn wireframes and ideation sketches (`sketches/walmart_ux_sketches.png`) 1:1.

---

## 2. Identified Usability Issues & Design Solutions

### Usability Issue #1: Buried Support Links
- **Problem:** Customers experiencing an issue must navigate through multi-layered FAQs and knowledge base articles before finding any path to contact support.
- **Solutions Explored:**
  - *Prototype A:* Elevated support CTAs directly onto recent delivery cards.
  - *Prototype B (Primary):* Elevated "24/7 Live Care" to the top search bar and main menu.

### Usability Issue #2: Excessive Navigation Steps
- **Problem:** Users must click through 7+ screens and re-enter their information to speak with an agent.
- **Solutions Explored:**
  - *Prototype A (Primary):* Reduced flow to 3 straightforward steps: My Orders → Order #1234 → Damaged item selection → Live Agent.
  - *Prototype B:* 3-step decision tree categorizing the issue before agent routing.

### Usability Issue #3: Misleading 00:00 Countdown Timer
- **Problem:** Countdowns that freeze at `00:00` induce severe user frustration and anxiety.
- **Solutions Explored:**
  - *Prototype C (Primary):* Realistic wait time ranges (e.g., 2–4 min or 3–7 min), live position tracking (#12 → #5 → #1), and radiant visual connection indicators.

### Usability Issue #4: Unresponsive Mobile Chat Composer
- **Problem:** On mobile browsers, the virtual keyboard frequently obscures the message input field or Send button.
- **Solutions Explored:**
  - *Prototype D (Primary):* Fixed flex layout with guaranteed sticky bottom input bar, accessible attachment triggers, and touch-optimized buttons.

### Usability Issue #5: Loss of Order Context During Handoff
- **Problem:** Upon connecting to a live human agent, users are forced to manually repeat their 9-digit order number, item name, and issue description.
- **Solutions Explored:**
  - *Prototypes A & B:* Automatic pre-transfer of order dossier to live specialist console.
  - *Prototype C:* Non-blocking tabs allowing order inspection without losing queue spot.
  - *Prototype D (Primary):* Slide-out Order Context Tray accessible mid-chat without resetting the conversation.

---

## 3. Technology Stack & Architecture

- **Structure:** Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<fieldset>`, `<nav>`, `<footer>`)
- **Styling:** Vanilla CSS3 with custom properties (CSS variables), Flexbox, CSS Grid, and subtle hardware-accelerated animations (`transform`, `opacity`).
- **Interaction Logic:** Vanilla JavaScript (ES6+), DOM event delegation, dynamic view-switching state machine, and simulated live chat responses.
- **Zero External Dependencies:** Completely self-contained, no external framework or CDN dependencies required for offline evaluation.
