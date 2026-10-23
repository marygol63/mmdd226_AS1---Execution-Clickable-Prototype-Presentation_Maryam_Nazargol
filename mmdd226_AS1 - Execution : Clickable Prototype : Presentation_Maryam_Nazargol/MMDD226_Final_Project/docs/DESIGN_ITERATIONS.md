# Design Iterations & Ideation Wireframe Mapping

**Project:** Walmart Mobile Customer Support UX Redesign  
**Student:** Maryam Nazargol  
**Source Asset:** `sketches/walmart_ux_sketches.png`

---

## 1. Ideation Overview

The design process began with rapid paper sketching to explore how to restructure Walmart's mobile support journey. Four distinct rows were conceptualized, annotated, and subsequently converted into functional interactive prototypes.

---

## 2. Row A: Order-First Support Workflow
- **Core Thesis:** Direct handoff from customer delivery history minimizes cognitive friction and eliminates manual order typing.
- **Key Note:** *"straight from order to agent (less steps)"*
- **Screen Sequence:**
  1. **Walmart Home / Account Menu:** Surfacing "My Orders" as the prominent primary option.
  2. **My Orders List:** Segmented Online / In store tabs, showing Order #1234 (Delivered Apr 3).
  3. **Order #1234 Detail:** Status banner, action rows (Track package, Return or replace, Item details), and "Get help" CTA.
  4. **How Can We Help?:** Radio options (`Damaged item`, `Missing item`, `Wrong item`, `Return question`, `Something else`) + Continue.
  5. **Live Agent:** 🎧 Headset icon, animated loader dots, wait time estimate (2-4 min), and auto-handoff into chat.

---

## 3. Row B: Support-First Navigation Workflow
- **Core Thesis:** When a customer encounters an issue without knowing their order number or having a general inquiry, issue-first triage is superior.
- **Key Note:** *"good if they don't have an order in mind"*
- **Screen Sequence:**
  1. **Walmart Home:** Prominent `Search help...` bar and primary `Help Centre` link.
  2. **Help Centre:** `Contact Support`, `Track an order`, `Returns & refunds`, `Manage account`.
  3. **What Do You Need Help With?:** Radio selector (`An order`, `Returns`, `Account`, `Payment`).
  4. **Select Your Order:** Tabs for Online / In store with radio list for Order #1234 (Delivered Jun 3).
  5. **Live Agent:** 🎧 Headset, connecting status, and 2-4 minute wait estimate.

---

## 4. Row C: Transparent Queue UX
- **Core Thesis:** Queue anxiety stems from lack of progress visibility and fear of losing one's spot if navigating away.
- **Key Notes:** *"let them check order without losing their spot"*, *"(doesn't lose place in queue)"*, *"keep my place?"*
- **Screen Sequence:**
  1. **Initial Queue State:** Position #12, estimated wait 3–7 min, progress bar, Cancel button.
  2. **Dynamic Queue Update:** Position #5, estimated wait 2–5 min, progress bar at 60%, info card: *"You can still view your order while you wait"* + "View My Order" CTA.
  3. **Order Inspection:** Non-blocking My Orders view with sticky persistent queue HUD showing position #5 held.
  4. **Agent Ready Alert:** Radiant glowing headset with rays 🎧✨, headline *"An agent is ready for you!"*, primary "Join Now", and secondary "Not now (keep my place?)".

---

## 5. Row D: Context-Aware Live Chat
- **Core Thesis:** Chat interactions fail when mobile keyboards hide the Send button or when the customer is forced to leave the chat to find invoice information.
- **Key Note:** *"order details stay visible while chatting"*
- **Screen Sequence:**
  1. **Screen D1 (10:14 - 10:15 AM):** Agent greeting and user explanation of damaged item received.
  2. **Screen D2 (Order Details Drawer):** Slide-over sheet displaying Order #1234, Portable Blender ($24.99, Qty: 1), and issue shortcuts (`Damaged item >`, `Return item >`, `Get more help >`).
  3. **Screen D3 (10:16 - 10:17 AM):** Agent photo request and in-chat damaged photo attachment card.
  4. **Screen D4 (10:18 - 10:19 AM):** Replacement confirmation, sticky composer input, and mutual resolution.
