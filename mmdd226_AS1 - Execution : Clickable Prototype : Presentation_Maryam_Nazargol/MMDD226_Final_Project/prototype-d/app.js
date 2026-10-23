/**
 * Prototype D: Context-Aware Live Chat (Exact to Sketch Row D)
 * Workflow:
 * Screen D1: Initial chat (10:14-10:15)
 * Screen D2: Order Details Drawer (Order #1234, Portable Blender $24.99, Damaged item)
 * Screen D3: Photo request & upload (10:16-10:17)
 * Screen D4: Replacement confirmation (10:18-10:19)
 * Student: Maryam Nazargol
 */

document.addEventListener('DOMContentLoaded', () => {
  const orderDetailsDrawer = document.getElementById('orderDetailsDrawer');
  const btnToggleOrderDetails = document.getElementById('btnToggleOrderDetails');
  const btnCloseOrderDetails = document.getElementById('btnCloseOrderDetails');
  const btnReturnToChatFromDrawer = document.getElementById('btnReturnToChatFromDrawer');
  const btnQuickInspect = document.getElementById('btnQuickInspect');
  const btnSelectDamagedItem = document.getElementById('btnSelectDamagedItem');

  const dynamicDialogueContainer = document.getElementById('dynamicDialogueContainer');
  const chatStreamBody = document.getElementById('chatStreamBody');
  const typingBubble = document.getElementById('typingBubble');

  const chatComposerForm = document.getElementById('chatComposerForm');
  const messageTextInput = document.getElementById('messageTextInput');
  const btnAttachment = document.getElementById('btnAttachment');

  const btnStepD2 = document.getElementById('btnStepD2');
  const btnStepD3 = document.getElementById('btnStepD3');
  const btnStepD4 = document.getElementById('btnStepD4');

  const viewModeToggle = document.getElementById('viewModeToggle');
  const viewModeText = document.getElementById('viewModeText');

  // --- Helper to append bubbles ---
  function appendAgentBubble(text, time = '10:16 AM') {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble agent-bubble';
    bubble.innerHTML = `
      <div class="bubble-text">${text}</div>
      <div class="bubble-time">${time}</div>
    `;
    dynamicDialogueContainer.appendChild(bubble);
    scrollChat();
  }

  function appendUserBubble(text, time = '10:17 AM') {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user-bubble';
    bubble.innerHTML = `
      <div class="bubble-text">${text}</div>
      <div class="bubble-time">${time}</div>
    `;
    dynamicDialogueContainer.appendChild(bubble);
    scrollChat();
  }

  function appendPhotoBubble(caption = "Here's a photo.", time = '10:17 AM') {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-attachment-card';
    photoCard.innerHTML = `
      <div class="photo-preview-box">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D92D20" stroke-width="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <path d="m9 9 6 6M15 9l-6 6"/>
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
        </svg>
      </div>
      <div class="photo-caption">
        <span>${caption}</span>
        <span class="bubble-time">${time}</span>
      </div>
    `;
    dynamicDialogueContainer.appendChild(photoCard);
    scrollChat();
  }

  function scrollChat() {
    if (chatStreamBody) {
      chatStreamBody.scrollTop = chatStreamBody.scrollHeight;
    }
  }

  // --- Step D2: Toggle Order Details Drawer ---
  function openDrawer() {
    if (orderDetailsDrawer) {
      orderDetailsDrawer.classList.add('open');
    }
  }

  function closeDrawer() {
    if (orderDetailsDrawer) {
      orderDetailsDrawer.classList.remove('open');
    }
  }

  if (btnToggleOrderDetails) btnToggleOrderDetails.addEventListener('click', openDrawer);
  if (btnQuickInspect) btnQuickInspect.addEventListener('click', openDrawer);
  if (btnCloseOrderDetails) btnCloseOrderDetails.addEventListener('click', closeDrawer);
  if (btnReturnToChatFromDrawer) btnReturnToChatFromDrawer.addEventListener('click', closeDrawer);

  if (btnSelectDamagedItem) {
    btnSelectDamagedItem.addEventListener('click', () => {
      closeDrawer();
      triggerStepD3();
    });
  }

  // --- Step Buttons (Sketch Progression) ---
  if (btnStepD2) {
    btnStepD2.addEventListener('click', () => {
      openDrawer();
    });
  }

  let stepD3Triggered = false;
  function triggerStepD3() {
    if (stepD3Triggered) return;
    stepD3Triggered = true;

    // Agent asks for photo (10:16 AM)
    if (typingBubble) typingBubble.style.display = 'flex';
    scrollChat();

    setTimeout(() => {
      if (typingBubble) typingBubble.style.display = 'none';
      appendAgentBubble("I'm sorry to hear that! Can you share a photo of the damaged item?", "10:16 AM");

      // After small delay, user uploads photo (10:17 AM)
      setTimeout(() => {
        appendPhotoBubble("Here's a photo.", "10:17 AM");
      }, 1000);
    }, 900);
  }

  if (btnStepD3) {
    btnStepD3.addEventListener('click', triggerStepD3);
  }

  if (btnAttachment) {
    btnAttachment.addEventListener('click', triggerStepD3);
  }

  let stepD4Triggered = false;
  function triggerStepD4() {
    if (stepD4Triggered) return;
    stepD4Triggered = true;

    // Agent response: "Thanks! I can help get a replacement started for you." (10:18 AM)
    if (typingBubble) typingBubble.style.display = 'flex';
    scrollChat();

    setTimeout(() => {
      if (typingBubble) typingBubble.style.display = 'none';
      appendAgentBubble("Thanks! I can help get a replacement started for you.", "10:18 AM");

      // User says: "Great, thank you!" (10:18 AM)
      setTimeout(() => {
        appendUserBubble("Great, thank you!", "10:18 AM");

        // Agent says: "You're welcome! Is there anything else I can help with?" (10:19 AM)
        setTimeout(() => {
          if (typingBubble) typingBubble.style.display = 'flex';
          scrollChat();

          setTimeout(() => {
            if (typingBubble) typingBubble.style.display = 'none';
            appendAgentBubble("You're welcome! Is there anything else I can help with?", "10:19 AM");
          }, 800);
        }, 800);
      }, 700);
    }, 800);
  }

  if (btnStepD4) {
    btnStepD4.addEventListener('click', () => {
      if (!stepD3Triggered) triggerStepD3();
      setTimeout(triggerStepD4, 2200);
    });
  }

  // --- Manual Composer Messaging ---
  if (chatComposerForm && messageTextInput) {
    chatComposerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = messageTextInput.value.trim();
      if (!text) return;

      appendUserBubble(text, 'Just now');
      messageTextInput.value = '';

      // Automatic context reply
      if (typingBubble) typingBubble.style.display = 'flex';
      scrollChat();

      setTimeout(() => {
        if (typingBubble) typingBubble.style.display = 'none';
        appendAgentBubble("Got it! Order #1234 context is preserved on my screen. I am taking care of that for you now.", "Just now");
      }, 1000);
    });
  }

  // --- Sketch Comparison Modal ---
  const btnToggleSketchModal = document.getElementById('btnToggleSketchModal');
  const sketchModalOverlay = document.getElementById('sketchModalOverlay');
  const btnCloseSketchModal = document.getElementById('btnCloseSketchModal');

  if (btnToggleSketchModal && sketchModalOverlay) {
    btnToggleSketchModal.addEventListener('click', () => {
      sketchModalOverlay.style.display = 'flex';
    });
  }

  if (btnCloseSketchModal && sketchModalOverlay) {
    btnCloseSketchModal.addEventListener('click', () => {
      sketchModalOverlay.style.display = 'none';
    });
  }

  if (sketchModalOverlay) {
    sketchModalOverlay.addEventListener('click', (e) => {
      if (e.target === sketchModalOverlay) {
        sketchModalOverlay.style.display = 'none';
      }
    });
  }

  // --- Phone Frame vs Responsive Fluid Mode Toggle ---
  if (viewModeToggle && viewModeText) {
    viewModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('fluid-mode');
      const isFluid = document.body.classList.contains('fluid-mode');
      if (isFluid) {
        viewModeText.textContent = 'Fluid Responsive View';
        viewModeToggle.classList.remove('active');
      } else {
        viewModeText.textContent = 'Phone Frame (390×844)';
        viewModeToggle.classList.add('active');
      }
    });
  }
});
