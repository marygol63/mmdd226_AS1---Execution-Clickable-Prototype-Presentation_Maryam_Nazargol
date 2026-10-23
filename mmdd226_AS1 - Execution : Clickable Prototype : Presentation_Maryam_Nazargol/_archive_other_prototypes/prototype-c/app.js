/**
 * Prototype C: Transparent Queue Experience (Exact to Sketch Row C)
 * Workflow: Live Support (#12, 3-7 min) -> Live Support (#5, 2-5 min) -> View My Order (doesn't lose place) -> Agent is Ready! (Join Now / Not now)
 * Student: Maryam Nazargol
 */

document.addEventListener('DOMContentLoaded', () => {
  // Screen Elements
  const screens = {
    'queue-initial': document.getElementById('screen-queue-initial'),
    'queue-advanced': document.getElementById('screen-queue-advanced'),
    'queue-orders': document.getElementById('screen-queue-orders'),
    'agent-ready': document.getElementById('screen-agent-ready'),
    'chat-c': document.getElementById('screen-chat-c')
  };

  const viewModeToggle = document.getElementById('viewModeToggle');
  const viewModeText = document.getElementById('viewModeText');

  // Screen Switching Helper
  function showScreen(screenKey) {
    Object.keys(screens).forEach(key => {
      const screen = screens[key];
      if (screen) {
        screen.classList.remove('active');
        screen.style.display = 'none';
      }
    });

    if (screens[screenKey]) {
      screens[screenKey].classList.add('active');
      screens[screenKey].style.display = 'flex';
      const container = document.getElementById('appScreenContainer');
      if (container) container.scrollTop = 0;
    }
  }

  // --- Step 1: Initial Queue (#12) -> Advanced Queue (#5) ---
  const btnAdvanceToC2 = document.getElementById('btnAdvanceToC2');
  if (btnAdvanceToC2) {
    btnAdvanceToC2.addEventListener('click', () => {
      showScreen('queue-advanced');
    });
  }

  const btnCancelQueue1 = document.getElementById('btnCancelQueue1');
  if (btnCancelQueue1) {
    btnCancelQueue1.addEventListener('click', () => {
      alert("Queue cancelled. Returning to main hub.");
      window.location.href = '../index.html';
    });
  }

  // --- Step 2: Advanced Queue (#5) -> View My Order ---
  const btnViewMyOrder = document.getElementById('btnViewMyOrder');
  if (btnViewMyOrder) {
    btnViewMyOrder.addEventListener('click', () => {
      showScreen('queue-orders');
    });
  }

  // Back from My Orders to Queue Dashboard
  const btnBackToQueueDashboard = document.getElementById('btnBackToQueueDashboard');
  if (btnBackToQueueDashboard) {
    btnBackToQueueDashboard.addEventListener('click', () => {
      showScreen('queue-advanced');
    });
  }

  // Segmented Tabs on My Orders
  const tabProtoCOnline = document.getElementById('tabProtoCOnline');
  const tabProtoCInStore = document.getElementById('tabProtoCInStore');
  if (tabProtoCOnline && tabProtoCInStore) {
    tabProtoCOnline.addEventListener('click', () => {
      tabProtoCOnline.classList.add('active');
      tabProtoCInStore.classList.remove('active');
    });
    tabProtoCInStore.addEventListener('click', () => {
      tabProtoCInStore.classList.add('active');
      tabProtoCOnline.classList.remove('active');
    });
  }

  // --- Step 3: Trigger Agent Ready Alert ---
  const btnSimulateAgentReady = document.getElementById('btnSimulateAgentReady');
  if (btnSimulateAgentReady) {
    btnSimulateAgentReady.addEventListener('click', () => {
      showScreen('agent-ready');
    });
  }

  // Back from Agent Ready to Orders
  const btnBackToOrdersFromReady = document.getElementById('btnBackToOrdersFromReady');
  if (btnBackToOrdersFromReady) {
    btnBackToOrdersFromReady.addEventListener('click', () => {
      showScreen('queue-orders');
    });
  }

  // --- Step 4: Join Now vs Not Now ---
  const btnJoinNow = document.getElementById('btnJoinNow');
  if (btnJoinNow) {
    btnJoinNow.addEventListener('click', () => {
      showScreen('chat-c');
    });
  }

  const btnNotNow = document.getElementById('btnNotNow');
  if (btnNotNow) {
    btnNotNow.addEventListener('click', () => {
      alert("Your place (#1) is held for 3 minutes while you finish browsing! Tap Join Now when ready.");
    });
  }

  const btnExitChatC = document.getElementById('btnExitChatC');
  if (btnExitChatC) {
    btnExitChatC.addEventListener('click', () => {
      showScreen('queue-initial');
    });
  }

  // Chat message simulation
  const chatInputC = document.getElementById('chatInputC');
  const btnSendMessageC = document.getElementById('btnSendMessageC');
  const dynamicUserMessagesC = document.getElementById('dynamicUserMessagesC');
  const chatMessagesAreaC = document.getElementById('chatMessagesAreaC');

  function sendChatMessageC() {
    if (!chatInputC) return;
    const text = chatInputC.value.trim();
    if (!text) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'message-bubble user-bubble';
    userBubble.textContent = text;
    dynamicUserMessagesC.appendChild(userBubble);
    chatInputC.value = '';

    if (chatMessagesAreaC) {
      chatMessagesAreaC.scrollTop = chatMessagesAreaC.scrollHeight;
    }

    // Auto agent reply
    setTimeout(() => {
      const agentBubble = document.createElement('div');
      agentBubble.className = 'message-bubble agent-bubble';
      agentBubble.innerHTML = `
        <div class="message-sender">Liam K.</div>
        <div class="message-text">I've got your order information right here. Let me process this for you immediately!</div>
        <div class="message-time">Just now</div>
      `;
      dynamicUserMessagesC.appendChild(agentBubble);
      if (chatMessagesAreaC) {
        chatMessagesAreaC.scrollTop = chatMessagesAreaC.scrollHeight;
      }
    }, 1000);
  }

  if (btnSendMessageC && chatInputC) {
    btnSendMessageC.addEventListener('click', sendChatMessageC);
    chatInputC.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessageC();
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
