/**
 * Prototype B: Support-First Workflow (Exact to Sketch Row B)
 * Workflow: Home / Search help... -> Help Centre -> What do you need help with? -> Select your order -> Live Agent
 * Student: Maryam Nazargol
 */

document.addEventListener('DOMContentLoaded', () => {
  // Screen Elements
  const screens = {
    home: document.getElementById('screen-home'),
    'help-centre': document.getElementById('screen-help-centre'),
    'what-need': document.getElementById('screen-what-need'),
    'select-order': document.getElementById('screen-select-order'),
    'live-agent-b': document.getElementById('screen-live-agent-b'),
    'chat-b': document.getElementById('screen-chat-b')
  };

  const bottomNav = document.getElementById('mainBottomNav');
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

    // Hide mobile bottom nav during live chat
    if (bottomNav) {
      if (screenKey === 'chat-b') {
        bottomNav.style.display = 'none';
      } else {
        bottomNav.style.display = 'flex';
      }
    }

    // Update bottom nav active state
    const navHome = document.getElementById('navItemHome');
    if (navHome) {
      if (screenKey === 'home') {
        navHome.classList.add('active');
      } else {
        navHome.classList.remove('active');
      }
    }
  }

  // --- Step 1: Home -> Help Centre ---
  const btnGoToHelpCentre = document.getElementById('btnGoToHelpCentre');
  const homeSearchBar = document.getElementById('homeSearchBar');
  const navItemHome = document.getElementById('navItemHome');

  if (btnGoToHelpCentre) {
    btnGoToHelpCentre.addEventListener('click', () => showScreen('help-centre'));
  }
  if (homeSearchBar) {
    homeSearchBar.addEventListener('click', () => showScreen('help-centre'));
  }
  if (navItemHome) {
    navItemHome.addEventListener('click', () => showScreen('home'));
  }

  // Back from Help Centre to Home
  const btnBackToHome = document.getElementById('btnBackToHome');
  if (btnBackToHome) {
    btnBackToHome.addEventListener('click', () => showScreen('home'));
  }

  // --- Step 2: Help Centre -> What do you need help with? ---
  const btnProceedToWhatNeed = document.getElementById('btnProceedToWhatNeed');
  const rowContactSupport = document.getElementById('rowContactSupport');

  if (btnProceedToWhatNeed) {
    btnProceedToWhatNeed.addEventListener('click', () => showScreen('what-need'));
  }
  if (rowContactSupport) {
    rowContactSupport.addEventListener('click', () => {
      // Small visual feedback then navigate
      setTimeout(() => showScreen('what-need'), 150);
    });
  }

  // Radio items selection on Help Centre
  const helpCentreOptions = document.querySelectorAll('#screen-help-centre .sketch-radio-option');
  helpCentreOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      helpCentreOptions.forEach(o => o.classList.remove('checked'));
      opt.classList.add('checked');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Back from What Need to Help Centre
  const btnBackToHelpCentre = document.getElementById('btnBackToHelpCentre');
  if (btnBackToHelpCentre) {
    btnBackToHelpCentre.addEventListener('click', () => showScreen('help-centre'));
  }

  // --- Step 3: What do you need help with? -> Select your order ---
  const btnContinueToSelectOrder = document.getElementById('btnContinueToSelectOrder');
  if (btnContinueToSelectOrder) {
    btnContinueToSelectOrder.addEventListener('click', () => showScreen('select-order'));
  }

  // Radio items on What Need
  const whatNeedOptions = document.querySelectorAll('#screen-what-need .sketch-radio-option');
  whatNeedOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      whatNeedOptions.forEach(o => o.classList.remove('checked'));
      opt.classList.add('checked');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Back from Select Order to What Need
  const btnBackToWhatNeed = document.getElementById('btnBackToWhatNeed');
  if (btnBackToWhatNeed) {
    btnBackToWhatNeed.addEventListener('click', () => showScreen('what-need'));
  }

  // Segmented Tabs on Select Order (Online | In store)
  const tabProtoBOnline = document.getElementById('tabProtoBOnline');
  const tabProtoBInStore = document.getElementById('tabProtoBInStore');
  if (tabProtoBOnline && tabProtoBInStore) {
    tabProtoBOnline.addEventListener('click', () => {
      tabProtoBOnline.classList.add('active');
      tabProtoBInStore.classList.remove('active');
    });
    tabProtoBInStore.addEventListener('click', () => {
      tabProtoBInStore.classList.add('active');
      tabProtoBOnline.classList.remove('active');
    });
  }

  // Radio items on Select Order
  const selectOrderOptions = document.querySelectorAll('#screen-select-order .sketch-radio-option');
  selectOrderOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      selectOrderOptions.forEach(o => o.classList.remove('checked'));
      opt.classList.add('checked');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // --- Step 4: Select your order -> Live Agent ---
  const btnContinueToLiveAgentB = document.getElementById('btnContinueToLiveAgentB');
  const agentConnectedCardB = document.getElementById('agentConnectedCardB');

  if (btnContinueToLiveAgentB) {
    btnContinueToLiveAgentB.addEventListener('click', () => {
      showScreen('live-agent-b');
      // After 2 seconds, simulate agent connecting
      setTimeout(() => {
        if (agentConnectedCardB) {
          agentConnectedCardB.style.display = 'flex';
        }
      }, 2000);
    });
  }

  // Back from Live Agent to Select Order
  const btnBackToSelectOrder = document.getElementById('btnBackToSelectOrder');
  if (btnBackToSelectOrder) {
    btnBackToSelectOrder.addEventListener('click', () => showScreen('select-order'));
  }

  // --- Step 5 (Bonus): Enter Live Chat ---
  const btnEnterChatRoomB = document.getElementById('btnEnterChatRoomB');
  if (btnEnterChatRoomB) {
    btnEnterChatRoomB.addEventListener('click', () => showScreen('chat-b'));
  }

  const btnExitChatB = document.getElementById('btnExitChatB');
  if (btnExitChatB) {
    btnExitChatB.addEventListener('click', () => showScreen('home'));
  }

  // In-chat messaging simulation
  const chatInputB = document.getElementById('chatInputB');
  const btnSendMessageB = document.getElementById('btnSendMessageB');
  const dynamicUserMessagesB = document.getElementById('dynamicUserMessagesB');
  const chatMessagesAreaB = document.getElementById('chatMessagesAreaB');

  function sendChatMessageB() {
    if (!chatInputB) return;
    const text = chatInputB.value.trim();
    if (!text) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'message-bubble user-bubble';
    userBubble.textContent = text;
    dynamicUserMessagesB.appendChild(userBubble);
    chatInputB.value = '';

    if (chatMessagesAreaB) {
      chatMessagesAreaB.scrollTop = chatMessagesAreaB.scrollHeight;
    }

    // Auto agent reply
    setTimeout(() => {
      const agentBubble = document.createElement('div');
      agentBubble.className = 'message-bubble agent-bubble';
      agentBubble.innerHTML = `
        <div class="message-sender">David M.</div>
        <div class="message-text">Thank you for confirming! I am reviewing the delivery history for Order #1234 right now. I can resolve this immediately.</div>
        <div class="message-time">Just now</div>
      `;
      dynamicUserMessagesB.appendChild(agentBubble);
      if (chatMessagesAreaB) {
        chatMessagesAreaB.scrollTop = chatMessagesAreaB.scrollHeight;
      }
    }, 1000);
  }

  if (btnSendMessageB && chatInputB) {
    btnSendMessageB.addEventListener('click', sendChatMessageB);
    chatInputB.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessageB();
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
