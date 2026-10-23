/**
 * Prototype A: Order-First Support (Exact to Sketch Row A)
 * Workflow: Home / My Orders -> My Orders List -> Order #1234 Details -> How Can We Help? -> Live Agent
 * Student: Maryam Nazargol
 */

document.addEventListener('DOMContentLoaded', () => {
  // Screen Elements
  const screens = {
    home: document.getElementById('screen-home'),
    orders: document.getElementById('screen-orders'),
    'order-detail': document.getElementById('screen-order-detail'),
    'how-help': document.getElementById('screen-how-help'),
    'live-agent': document.getElementById('screen-live-agent'),
    chat: document.getElementById('screen-chat')
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
      if (screenKey === 'chat') {
        bottomNav.style.display = 'none';
      } else {
        bottomNav.style.display = 'flex';
      }
    }

    // Update bottom nav active state
    const navHome = document.getElementById('navItemHome');
    const navOrders = document.getElementById('navItemOrders');
    if (navHome && navOrders) {
      if (screenKey === 'home') {
        navHome.classList.add('active');
        navOrders.classList.remove('active');
      } else {
        navHome.classList.remove('active');
        navOrders.classList.add('active');
      }
    }
  }

  // --- Step 1: Home -> My Orders ---
  const btnGoToMyOrders = document.getElementById('btnGoToMyOrders');
  const navItemOrders = document.getElementById('navItemOrders');
  const navItemHome = document.getElementById('navItemHome');

  if (btnGoToMyOrders) {
    btnGoToMyOrders.addEventListener('click', () => showScreen('orders'));
  }
  if (navItemOrders) {
    navItemOrders.addEventListener('click', () => showScreen('orders'));
  }
  if (navItemHome) {
    navItemHome.addEventListener('click', () => showScreen('home'));
  }

  // Back from Orders to Home
  const btnBackToHome = document.getElementById('btnBackToHome');
  if (btnBackToHome) {
    btnBackToHome.addEventListener('click', () => showScreen('home'));
  }

  // Segmented Tabs on My Orders (Online | In store)
  const tabOnline = document.getElementById('tabOnline');
  const tabInStore = document.getElementById('tabInStore');
  if (tabOnline && tabInStore) {
    tabOnline.addEventListener('click', () => {
      tabOnline.classList.add('active');
      tabInStore.classList.remove('active');
    });
    tabInStore.addEventListener('click', () => {
      tabInStore.classList.add('active');
      tabOnline.classList.remove('active');
    });
  }

  // --- Step 2: My Orders -> Order #1234 Detail ---
  const cardOrder1234 = document.getElementById('cardOrder1234');
  if (cardOrder1234) {
    cardOrder1234.addEventListener('click', () => showScreen('order-detail'));
  }

  // Back from Order Detail to Orders List
  const btnBackToOrdersList = document.getElementById('btnBackToOrdersList');
  if (btnBackToOrdersList) {
    btnBackToOrdersList.addEventListener('click', () => showScreen('orders'));
  }

  // --- Step 3: Order #1234 Detail -> How can we help? ---
  const btnGetHelp = document.getElementById('btnGetHelp');
  if (btnGetHelp) {
    btnGetHelp.addEventListener('click', () => showScreen('how-help'));
  }

  // Back from How can we help? to Order Detail
  const btnBackToOrderDetail = document.getElementById('btnBackToOrderDetail');
  if (btnBackToOrderDetail) {
    btnBackToOrderDetail.addEventListener('click', () => showScreen('order-detail'));
  }

  // Radio selection styling in "How can we help?"
  const radioLabels = document.querySelectorAll('.sketch-radio-option');
  radioLabels.forEach(label => {
    label.addEventListener('click', () => {
      radioLabels.forEach(l => l.classList.remove('checked'));
      label.classList.add('checked');
      const radioInput = label.querySelector('input[type="radio"]');
      if (radioInput) radioInput.checked = true;
    });
  });

  // --- Step 4: How can we help? -> Live Agent ---
  const btnContinueToLiveAgent = document.getElementById('btnContinueToLiveAgent');
  const agentConnectedCard = document.getElementById('agentConnectedCard');

  if (btnContinueToLiveAgent) {
    btnContinueToLiveAgent.addEventListener('click', () => {
      showScreen('live-agent');
      // After 2 seconds, simulate agent connecting
      setTimeout(() => {
        if (agentConnectedCard) {
          agentConnectedCard.style.display = 'flex';
        }
      }, 2000);
    });
  }

  // Back from Live Agent to How can we help?
  const btnBackToHowHelp = document.getElementById('btnBackToHowHelp');
  if (btnBackToHowHelp) {
    btnBackToHowHelp.addEventListener('click', () => showScreen('how-help'));
  }

  // --- Step 5 (Bonus): Enter Live Chat ---
  const btnEnterChatRoom = document.getElementById('btnEnterChatRoom');
  if (btnEnterChatRoom) {
    btnEnterChatRoom.addEventListener('click', () => showScreen('chat'));
  }

  const btnExitChat = document.getElementById('btnExitChat');
  if (btnExitChat) {
    btnExitChat.addEventListener('click', () => showScreen('home'));
  }

  // In-chat messaging simulation
  const chatInput = document.getElementById('chatInput');
  const btnSendMessage = document.getElementById('btnSendMessage');
  const dynamicUserMessages = document.getElementById('dynamicUserMessages');
  const chatMessagesArea = document.getElementById('chatMessagesArea');

  function sendChatMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'message-bubble user-bubble';
    userBubble.textContent = text;
    dynamicUserMessages.appendChild(userBubble);
    chatInput.value = '';

    if (chatMessagesArea) {
      chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
    }

    // Auto agent reply
    setTimeout(() => {
      const agentBubble = document.createElement('div');
      agentBubble.className = 'message-bubble agent-bubble';
      agentBubble.innerHTML = `
        <div class="message-sender">Sarah C.</div>
        <div class="message-text">Got it! I am submitting the replacement request for Order #1234 now. You'll receive a confirmation email shortly.</div>
        <div class="message-time">Just now</div>
      `;
      dynamicUserMessages.appendChild(agentBubble);
      if (chatMessagesArea) {
        chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
      }
    }, 1000);
  }

  if (btnSendMessage && chatInput) {
    btnSendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatMessage();
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
