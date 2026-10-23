/**
 * ==========================================================================
 * Walmart Mobile Customer Support UX Redesign — Version B (Help-First)
 * Full Interactive State Machine & Simulated Support Logic
 * Student: Maryam Nazargol (MMDD-226)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Central Application State ---
  const state = {
    currentStep: 1,
    currentScreenId: 'screen-home',
    user: {
      name: 'Maryam Nazargol',
      email: 'maryam.nazargol@example.com',
      membership: 'Walmart+ Member',
      savedAmount: '$24.50 this month'
    },
    order: {
      id: 'Order #1234',
      date: 'Delivered Jun 3, 2026',
      carrier: 'Walmart Fleet Delivery',
      address: '205 Humber College Blvd, Etobicoke M9W 5L7',
      total: '$34.98',
      items: [
        {
          id: 'item-blender',
          name: 'Portable Personal USB Blender',
          price: '$24.99',
          qty: 1,
          image: 'assets/images/damaged_blender.jpg',
          damaged: true
        },
        {
          id: 'item-apples',
          name: 'Organic Fuji Apples (3 lb bag)',
          price: '$5.97',
          qty: 1,
          damaged: false
        }
      ]
    },
    supportTriage: {
      category: 'An order',
      selectedOrder: 'Order #1234',
      issueType: 'Damaged item / Arrived broken',
      damagedItemName: 'Portable Personal USB Blender ($24.99)',
      issueDescription: 'Package box was crushed upon delivery; acrylic tumbler container has a visible hairline crack.',
      hasPhotoAttached: true,
      ticketNumber: 'WM-84920'
    },
    queue: {
      isJoined: false,
      position: 3,
      estimatedMinutes: '2–4 min',
      progressPercent: 35,
      intervalId: null,
      isAgentReady: false
    },
    agent: {
      name: 'David M.',
      role: 'Walmart Care Specialist • Order Resolution',
      avatar: 'assets/images/agent_david.jpg',
      status: 'Online • Connected'
    },
    chat: {
      hasStarted: false,
      messages: [],
      isAgentTyping: false
    },
    viewMode: 'phone' // 'phone' or 'fluid'
  };

  // --- DOM Elements References ---
  const screens = {
    1: document.getElementById('screen-home'),
    2: document.getElementById('screen-help-centre'),
    3: document.getElementById('screen-what-need'),
    4: document.getElementById('screen-select-order'),
    5: document.getElementById('screen-support-options'),
    6: document.getElementById('screen-queue-confirmed'),
    7: document.getElementById('screen-live-chat')
  };

  const deviceFrame = document.getElementById('deviceFrame');
  const viewModeToggle = document.getElementById('viewModeToggle');
  const viewModeLabel = document.getElementById('viewModeLabel');
  const btnResetDemo = document.getElementById('btnResetDemo');
  const mainBottomNav = document.getElementById('mainBottomNav');
  const flowTrackerDots = document.querySelectorAll('.flow-step-dot');
  const flowTrackerLines = document.querySelectorAll('.flow-step-line');

  // --- Navigation & Screen Transition Controller ---
  function navigateToStep(stepNumber) {
    if (!screens[stepNumber]) return;

    // Update state
    state.currentStep = stepNumber;
    state.currentScreenId = screens[stepNumber].id;

    // Hide all screens
    Object.values(screens).forEach(screen => {
      if (screen) {
        screen.classList.remove('active');
        screen.style.display = 'none';
      }
    });

    // Show target screen
    const target = screens[stepNumber];
    target.classList.add('active');
    target.style.display = 'flex';

    // Scroll viewport container to top
    const screenScrolls = target.querySelectorAll('.screen-scroll-body, .chat-messages-body');
    screenScrolls.forEach(el => el.scrollTop = 0);
    const appScreen = document.getElementById('appScreenContainer');
    if (appScreen) appScreen.scrollTop = 0;

    // Toggle bottom navigation bar visibility
    if (mainBottomNav) {
      if (stepNumber === 6 || stepNumber === 7) {
        // Hide during queue confirmation & full chat to prevent occlusion
        mainBottomNav.style.display = 'none';
      } else {
        mainBottomNav.style.display = 'flex';
      }
    }

    // Update Top Tracker UI
    updateTopFlowTracker(stepNumber);

    // Sync any state-driven content for that screen
    syncScreenData(stepNumber);
  }

  function updateTopFlowTracker(activeStep) {
    flowTrackerDots.forEach(dot => {
      const dotStep = parseInt(dot.getAttribute('data-step'), 10);
      dot.classList.remove('active', 'completed');
      if (dotStep === activeStep) {
        dot.classList.add('active');
      } else if (dotStep < activeStep) {
        dot.classList.add('completed');
      }
    });

    flowTrackerLines.forEach((line, index) => {
      if (index + 1 < activeStep) {
        line.classList.add('filled');
      } else {
        line.classList.remove('filled');
      }
    });
  }

  // Allow clicking on flow tracker dots in academic toolbar
  flowTrackerDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetStep = parseInt(dot.getAttribute('data-step'), 10);
      if (targetStep === 6 && !state.queue.isJoined) {
        // Automatically join queue if jumping straight to confirmation
        joinQueueSimulation();
      } else if (targetStep === 7 && !state.chat.hasStarted) {
        initializeChatSession();
      }
      navigateToStep(targetStep);
    });
  });

  // --- Dynamic Data Synchronization ---
  function syncScreenData(step) {
    if (step === 4) {
      // Step 4: Ensure selected order and damaged item are highlighted
      updateOrderIssueSummary();
    } else if (step === 5) {
      // Step 5: Update carried dossier preview
      const carriedOrderNum = document.getElementById('carriedOrderNum');
      const carriedItemName = document.getElementById('carriedItemName');
      const carriedIssueText = document.getElementById('carriedIssueText');
      const carriedTicketId = document.getElementById('carriedTicketId');

      if (carriedOrderNum) carriedOrderNum.textContent = state.supportTriage.selectedOrder;
      if (carriedItemName) carriedItemName.textContent = state.supportTriage.damagedItemName;
      if (carriedIssueText) carriedIssueText.textContent = state.supportTriage.issueType;
      if (carriedTicketId) carriedTicketId.textContent = `#${state.supportTriage.ticketNumber}`;
    } else if (step === 6) {
      // Step 6: Confirmation screen sync
      renderQueueConfirmationStats();
    } else if (step === 7) {
      // Step 7: Live Chat sync
      if (!state.chat.hasStarted) {
        initializeChatSession();
      }
    }
  }

  function updateOrderIssueSummary() {
    const selectedItemName = state.supportTriage.damagedItemName;
    const notesInput = document.getElementById('damageNotesInput');
    if (notesInput && !notesInput.value) {
      notesInput.value = state.supportTriage.issueDescription;
    }
  }

  // ==========================================================================
  // STEP 1: SIGNED-IN WALMART HOMEPAGE INTERACTIONS
  // ==========================================================================
  const btnGoToHelpCentre = document.getElementById('btnGoToHelpCentre');
  const homeSearchBar = document.getElementById('homeSearchBar');
  const btnQuickPillHelp = document.getElementById('btnQuickPillHelp');
  const btnOrderAlertHelp = document.getElementById('btnOrderAlertHelp');

  // Any of these primary access points initiates Step 2: Help-First Flow
  [btnGoToHelpCentre, homeSearchBar, btnQuickPillHelp, btnOrderAlertHelp].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        navigateToStep(2);
      });
    }
  });

  // Search input on home
  const homeSearchInput = document.getElementById('homeSearchInput');
  if (homeSearchInput) {
    homeSearchInput.addEventListener('focus', () => {
      navigateToStep(2);
    });
    homeSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') navigateToStep(2);
    });
  }

  // ==========================================================================
  // STEP 2: HELP CENTRE INTERACTIONS
  // ==========================================================================
  const btnBackFromHelpCentre = document.getElementById('btnBackFromHelpCentre');
  if (btnBackFromHelpCentre) {
    btnBackFromHelpCentre.addEventListener('click', () => navigateToStep(1));
  }

  // Radio list on Help Centre
  const helpCentreRadios = document.querySelectorAll('#screen-help-centre .radio-row-item');
  helpCentreRadios.forEach(item => {
    item.addEventListener('click', () => {
      helpCentreRadios.forEach(r => r.classList.remove('checked'));
      item.classList.add('checked');
      const radioInput = item.querySelector('input[type="radio"]');
      if (radioInput) radioInput.checked = true;

      // If user clicks Contact Support, advance to Step 3
      if (item.id === 'radioContactSupport') {
        setTimeout(() => navigateToStep(3), 180);
      }
    });
  });

  const btnProceedToWhatNeed = document.getElementById('btnProceedToWhatNeed');
  if (btnProceedToWhatNeed) {
    btnProceedToWhatNeed.addEventListener('click', () => navigateToStep(3));
  }

  // Quick Order shortcut on Help Centre
  const btnQuickHelpRecentOrder = document.getElementById('btnQuickHelpRecentOrder');
  if (btnQuickHelpRecentOrder) {
    btnQuickHelpRecentOrder.addEventListener('click', () => {
      state.supportTriage.category = 'An order';
      navigateToStep(4);
    });
  }

  // ==========================================================================
  // STEP 3: WHAT DO YOU NEED HELP WITH? INTERACTIONS
  // ==========================================================================
  const btnBackFromWhatNeed = document.getElementById('btnBackFromWhatNeed');
  if (btnBackFromWhatNeed) {
    btnBackFromWhatNeed.addEventListener('click', () => navigateToStep(2));
  }

  const whatNeedRadios = document.querySelectorAll('#screen-what-need .radio-row-item');
  whatNeedRadios.forEach(item => {
    item.addEventListener('click', () => {
      whatNeedRadios.forEach(r => r.classList.remove('checked'));
      item.classList.add('checked');
      const radioInput = item.querySelector('input[type="radio"]');
      if (radioInput) {
        radioInput.checked = true;
        state.supportTriage.category = radioInput.value;
      }
    });
  });

  const btnContinueToSelectOrder = document.getElementById('btnContinueToSelectOrder');
  if (btnContinueToSelectOrder) {
    btnContinueToSelectOrder.addEventListener('click', () => navigateToStep(4));
  }

  // ==========================================================================
  // STEP 4: SELECT ORDER & REPORT DAMAGED ITEM INTERACTIONS
  // ==========================================================================
  const btnBackFromSelectOrder = document.getElementById('btnBackFromSelectOrder');
  if (btnBackFromSelectOrder) {
    btnBackFromSelectOrder.addEventListener('click', () => navigateToStep(3));
  }

  // Subtabs: Online | In store (Exact to Sketch B4)
  const tabOnline = document.getElementById('tabOnlineOrders');
  const tabInStore = document.getElementById('tabInStoreOrders');
  const onlineOrdersList = document.getElementById('onlineOrdersList');
  const inStoreOrdersList = document.getElementById('inStoreOrdersList');

  if (tabOnline && tabInStore) {
    tabOnline.addEventListener('click', () => {
      tabOnline.classList.add('active');
      tabInStore.classList.remove('active');
      if (onlineOrdersList) onlineOrdersList.style.display = 'flex';
      if (inStoreOrdersList) inStoreOrdersList.style.display = 'none';
    });

    tabInStore.addEventListener('click', () => {
      tabInStore.classList.add('active');
      tabOnline.classList.remove('active');
      if (onlineOrdersList) onlineOrdersList.style.display = 'none';
      if (inStoreOrdersList) inStoreOrdersList.style.display = 'flex';
    });
  }

  // Order selection radios
  const orderSelectCards = document.querySelectorAll('.order-card-detailed');
  orderSelectCards.forEach(card => {
    card.addEventListener('click', () => {
      orderSelectCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const orderRadio = card.querySelector('input[name="targetOrder"]');
      if (orderRadio) {
        orderRadio.checked = true;
        state.supportTriage.selectedOrder = orderRadio.value;
      }
    });
  });

  // Damaged Item Issue Selector Radio & Checkbox
  const damageRadios = document.querySelectorAll('input[name="orderIssueType"]');
  damageRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      state.supportTriage.issueType = radio.value;
    });
  });

  const chkDamagedBlender = document.getElementById('chkDamagedBlender');
  if (chkDamagedBlender) {
    chkDamagedBlender.addEventListener('change', (e) => {
      state.supportTriage.damagedItemName = e.target.checked 
        ? 'Portable Personal USB Blender ($24.99)' 
        : 'Order #1234 General Damage';
    });
  }

  // Editable Damage Description Notes
  const damageNotesInput = document.getElementById('damageNotesInput');
  if (damageNotesInput) {
    damageNotesInput.addEventListener('input', (e) => {
      state.supportTriage.issueDescription = e.target.value;
    });
  }

  // Photo Preview Toggle
  const togglePhotoPreviewBtn = document.getElementById('togglePhotoPreviewBtn');
  const photoDrawerContainer = document.getElementById('photoDrawerContainer');
  if (togglePhotoPreviewBtn && photoDrawerContainer) {
    togglePhotoPreviewBtn.addEventListener('click', () => {
      const isVisible = photoDrawerContainer.style.display === 'block';
      photoDrawerContainer.style.display = isVisible ? 'none' : 'block';
      togglePhotoPreviewBtn.querySelector('.toggle-icon').textContent = isVisible ? '▼' : '▲';
    });
  }

  const btnContinueToSupportChannels = document.getElementById('btnContinueToSupportChannels');
  if (btnContinueToSupportChannels) {
    btnContinueToSupportChannels.addEventListener('click', () => navigateToStep(5));
  }

  // ==========================================================================
  // STEP 5: SHOW CHAT SUPPORT INFO & QUEUE STATUS PREVIEW
  // ==========================================================================
  const btnBackFromSupportOptions = document.getElementById('btnBackFromSupportOptions');
  if (btnBackFromSupportOptions) {
    btnBackFromSupportOptions.addEventListener('click', () => navigateToStep(4));
  }

  // Button to Join the Queue (Step 7)
  const btnJoinQueueCTA = document.getElementById('btnJoinQueueCTA');
  if (btnJoinQueueCTA) {
    btnJoinQueueCTA.addEventListener('click', () => {
      // Show brief button loading effect
      btnJoinQueueCTA.innerHTML = `
        <svg class="spinner-inline" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span>Reserving your spot in line...</span>
      `;
      btnJoinQueueCTA.style.pointerEvents = 'none';

      setTimeout(() => {
        btnJoinQueueCTA.innerHTML = `<span>Join Live Chat Queue</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m9 18 6-6-6-6"/></svg>`;
        btnJoinQueueCTA.style.pointerEvents = 'auto';
        joinQueueSimulation();
        navigateToStep(6);
      }, 600);
    });
  }

  // ==========================================================================
  // STEP 6: VISIBLE CONFIRMATION SCREEN (QUEUE CONFIRMED & LIVE TRACKER)
  // ==========================================================================
  function joinQueueSimulation() {
    state.queue.isJoined = true;
    state.queue.position = 3;
    state.queue.progressPercent = 40;
    state.queue.estimatedMinutes = '2–3 min';
    state.queue.isAgentReady = false;

    // Reset toast alert if previously visible
    const agentToast = document.getElementById('agentReadyToast');
    if (agentToast) agentToast.style.display = 'none';

    // Clear any previous interval
    if (state.queue.intervalId) {
      clearInterval(state.queue.intervalId);
    }

    renderQueueConfirmationStats();

    // Start simulated live queue countdown (3 -> 2 -> 1 -> Agent Ready)
    state.queue.intervalId = setInterval(() => {
      if (state.queue.position > 1) {
        state.queue.position -= 1;
        state.queue.progressPercent = state.queue.position === 2 ? 70 : 92;
        state.queue.estimatedMinutes = state.queue.position === 2 ? '1–2 min' : '< 1 min';
        renderQueueConfirmationStats();
      } else if (state.queue.position === 1 && !state.queue.isAgentReady) {
        triggerAgentReadyAlert();
        clearInterval(state.queue.intervalId);
      }
    }, 4000);
  }

  function renderQueueConfirmationStats() {
    const queueNumBadge = document.getElementById('queueNumBadge');
    const queueProgressBar = document.getElementById('queueProgressBar');
    const queueEstWaitText = document.getElementById('queueEstWaitText');
    const queueTicketLabel = document.getElementById('queueTicketLabel');

    if (queueNumBadge) {
      queueNumBadge.innerHTML = `#${state.queue.position} <span>in line</span>`;
    }
    if (queueProgressBar) {
      queueProgressBar.style.width = `${state.queue.progressPercent}%`;
    }
    if (queueEstWaitText) {
      queueEstWaitText.textContent = state.queue.estimatedMinutes;
    }
    if (queueTicketLabel) {
      queueTicketLabel.textContent = `Ticket #${state.supportTriage.ticketNumber}`;
    }
  }

  function triggerAgentReadyAlert() {
    state.queue.isAgentReady = true;
    state.queue.progressPercent = 100;
    renderQueueConfirmationStats();

    const agentToast = document.getElementById('agentReadyToast');
    if (agentToast) {
      agentToast.style.display = 'flex';
      agentToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const queueNumBadge = document.getElementById('queueNumBadge');
    if (queueNumBadge) {
      queueNumBadge.innerHTML = `<span style="color:#0B823D;">Ready!</span>`;
    }
  }

  // Fast-Forward Queue Simulation (Accelerator button for demo)
  const btnFastForwardQueue = document.getElementById('btnFastForwardQueue');
  if (btnFastForwardQueue) {
    btnFastForwardQueue.addEventListener('click', () => {
      if (state.queue.intervalId) clearInterval(state.queue.intervalId);
      state.queue.position = 1;
      triggerAgentReadyAlert();
    });
  }

  // Open Chat Window from Confirmation Screen
  const btnOpenLiveChatNow = document.getElementById('btnOpenLiveChatNow');
  const btnToastEnterChat = document.getElementById('btnToastEnterChat');

  [btnOpenLiveChatNow, btnToastEnterChat].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        navigateToStep(7);
      });
    }
  });

  // Cancel Queue
  const btnCancelQueue = document.getElementById('btnCancelQueue');
  if (btnCancelQueue) {
    btnCancelQueue.addEventListener('click', () => {
      if (confirm('Are you sure you want to cancel your place in the support queue?')) {
        if (state.queue.intervalId) clearInterval(state.queue.intervalId);
        state.queue.isJoined = false;
        navigateToStep(5);
      }
    });
  }

  // Back from Confirmation screen
  const btnBackFromQueueConfirmed = document.getElementById('btnBackFromQueueConfirmed');
  if (btnBackFromQueueConfirmed) {
    btnBackFromQueueConfirmed.addEventListener('click', () => {
      navigateToStep(5);
    });
  }

  // ==========================================================================
  // STEP 7: INTERACTIVE LIVE CHAT CONSOLE
  // ==========================================================================
  const chatMessagesStream = document.getElementById('chatMessagesStream');
  const chatInput = document.getElementById('chatInput');
  const btnSendChat = document.getElementById('btnSendChat');
  const typingIndicator = document.getElementById('typingIndicator');
  const btnChatBack = document.getElementById('btnChatBack');

  function initializeChatSession() {
    if (state.chat.hasStarted) return;
    state.chat.hasStarted = true;

    if (!chatMessagesStream) return;
    chatMessagesStream.innerHTML = '';

    // 1. Initial System Bubble
    appendChatMessage({
      sender: 'system',
      text: `Customer ${state.user.name} connected from Queue. Ticket #${state.supportTriage.ticketNumber} verified. Context attached: ${state.supportTriage.selectedOrder} • ${state.supportTriage.damagedItemName}. Issue: ${state.supportTriage.issueType}. Photo verified.`
    });

    // 2. Initial Agent Greeting
    setTimeout(() => {
      appendChatMessage({
        sender: 'agent',
        name: 'David M.',
        text: `Hi Maryam! Thank you for contacting Walmart Customer Care. I have your file right here for <strong>${state.supportTriage.selectedOrder}</strong> and I see you reported that your <strong>${state.order.items[0].name}</strong> arrived damaged in transit. I'm very sorry for the frustration! I can issue an immediate replacement or process a full refund to your card. Which would you prefer?`,
        time: getCurrentTimeString()
      });
    }, 400);
  }

  function appendChatMessage(msg) {
    if (!chatMessagesStream) return;

    const bubble = document.createElement('div');

    if (msg.sender === 'system') {
      bubble.className = 'chat-bubble bubble-system';
      bubble.innerHTML = `<span>${msg.text}</span>`;
    } else if (msg.sender === 'agent') {
      bubble.className = 'chat-bubble bubble-agent';
      bubble.innerHTML = `
        <div class="bubble-text">${msg.text}</div>
        <div class="bubble-time">${msg.time || getCurrentTimeString()}</div>
      `;
    } else if (msg.sender === 'user') {
      bubble.className = 'chat-bubble bubble-user';
      let content = `<div class="bubble-text">${msg.text}</div>`;
      if (msg.photoUrl) {
        content += `
          <div class="bubble-photo-attachment">
            <img src="${msg.photoUrl}" alt="Damaged product proof">
          </div>
        `;
      }
      content += `<div class="bubble-time">${msg.time || getCurrentTimeString()}</div>`;
      bubble.innerHTML = content;
    }

    chatMessagesStream.appendChild(bubble);
    chatMessagesStream.scrollTop = chatMessagesStream.scrollHeight;
  }

  function getCurrentTimeString() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  // Handle User Sending a Message
  function handleUserSendMessage(customText, photoAttached = false) {
    const text = customText || (chatInput ? chatInput.value.trim() : '');
    if (!text && !photoAttached) return;

    appendChatMessage({
      sender: 'user',
      text: text,
      photoUrl: photoAttached ? 'assets/images/damaged_blender.jpg' : null,
      time: getCurrentTimeString()
    });

    if (chatInput && !customText) {
      chatInput.value = '';
    }

    // Agent response simulation
    simulateAgentReply(text, photoAttached);
  }

  function simulateAgentReply(userText, photoAttached) {
    if (typingIndicator) {
      typingIndicator.style.display = 'flex';
      chatMessagesStream.scrollTop = chatMessagesStream.scrollHeight;
    }

    const lower = userText.toLowerCase();

    setTimeout(() => {
      if (typingIndicator) typingIndicator.style.display = 'none';

      let reply = '';

      if (lower.includes('replacement') || lower.includes('send another') || lower.includes('exchange')) {
        reply = `I have successfully arranged an <strong>expedited replacement</strong> for your ${state.order.items[0].name} at $0.00! Your new tracking number is <strong>#WMT-9948210</strong>. Estimated delivery: <strong>Tomorrow by 5:00 PM</strong>. You do not need to ship back the damaged item.`;
      } else if (lower.includes('refund') || lower.includes('money back') || lower.includes('credit')) {
        reply = `I have processed a <strong>full refund of $24.99 + tax ($28.24)</strong> to your original payment method (Visa ending in 4128). You will see the credit posted to your statement in 2–3 business days. Reference ID: <strong>#REF-492104</strong>.`;
      } else if (photoAttached || lower.includes('photo') || lower.includes('picture')) {
        reply = `Thank you for sharing the photo! The transit crack on the acrylic tumbler is clearly visible. This satisfies our damage claim criteria immediately without requiring a return. Would you like me to dispatch a brand-new unit now?`;
      } else if (lower.includes('how fast') || lower.includes('how soon') || lower.includes('when')) {
        reply = `Replacements for damaged items are sent via priority courier with guaranteed next-day delivery. If approved right now, it will arrive tomorrow between 1:00 PM and 5:00 PM at your Etobicoke address!`;
      } else if (lower.includes('thank') || lower.includes('great') || lower.includes('perfect')) {
        reply = `You're very welcome, Maryam! It's my absolute pleasure to help. Is there anything else with Order #1234 or your account I can assist you with today?`;
      } else {
        reply = `Understood! I've logged this directly on Order #1234. Since the item arrived damaged in shipment, I can either click to dispatch an identical replacement right away or issue an instant refund to your Visa. Let me know what works best for you!`;
      }

      appendChatMessage({
        sender: 'agent',
        name: 'David M.',
        text: reply,
        time: getCurrentTimeString()
      });

    }, 1200);
  }

  if (btnSendChat) {
    btnSendChat.addEventListener('click', () => handleUserSendMessage());
  }
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserSendMessage();
    });
  }

  // In-Chat Quick Suggestion Chips
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt');
      handleUserSendMessage(promptText);
    });
  });

  // Attach Photo Button inside Chat
  const btnAttachPhoto = document.getElementById('btnAttachPhoto');
  if (btnAttachPhoto) {
    btnAttachPhoto.addEventListener('click', () => {
      handleUserSendMessage('Here is a photo of the cracked tumbler on the portable blender.', true);
    });
  }

  // Exit / Back from Live Chat
  if (btnChatBack) {
    btnChatBack.addEventListener('click', () => {
      if (confirm('Leave live chat session and return to the main homepage? Your order dossier will remain recorded.')) {
        navigateToStep(1);
      }
    });
  }

  // ==========================================================================
  // SLIDE-OVER ORDER DOSSIER TRAY (Exact to Sketch D2)
  // ==========================================================================
  const btnToggleOrderDossier = document.getElementById('btnToggleOrderDossier');
  const btnInspectDossierFromQueue = document.getElementById('btnInspectDossierFromQueue');
  const orderDossierOverlay = document.getElementById('orderDossierOverlay');
  const btnCloseOrderDossier = document.getElementById('btnCloseOrderDossier');

  function openDossierDrawer() {
    if (orderDossierOverlay) {
      orderDossierOverlay.style.display = 'flex';
    }
  }

  function closeDossierDrawer() {
    if (orderDossierOverlay) {
      orderDossierOverlay.style.display = 'none';
    }
  }

  if (btnToggleOrderDossier) btnToggleOrderDossier.addEventListener('click', openDossierDrawer);
  if (btnInspectDossierFromQueue) btnInspectDossierFromQueue.addEventListener('click', openDossierDrawer);
  if (btnCloseOrderDossier) btnCloseOrderDossier.addEventListener('click', closeDossierDrawer);

  if (orderDossierOverlay) {
    orderDossierOverlay.addEventListener('click', (e) => {
      if (e.target === orderDossierOverlay) closeDossierDrawer();
    });
  }

  // ==========================================================================
  // VIEW MODE TOGGLE (Phone Bezel vs Desktop Fluid Responsive)
  // ==========================================================================
  if (viewModeToggle && deviceFrame && viewModeLabel) {
    viewModeToggle.addEventListener('click', () => {
      if (state.viewMode === 'phone') {
        state.viewMode = 'fluid';
        deviceFrame.classList.add('view-fluid');
        viewModeLabel.textContent = 'Desktop Fluid Mode';
        viewModeToggle.classList.add('active');
      } else {
        state.viewMode = 'phone';
        deviceFrame.classList.remove('view-fluid');
        viewModeLabel.textContent = 'Phone Frame (390×844)';
        viewModeToggle.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // SKETCH COMPARISON MODAL VIEWER
  // ==========================================================================
  const btnOpenSketchModal = document.getElementById('btnOpenSketchModal');
  const sketchModalOverlay = document.getElementById('sketchModalOverlay');
  const btnCloseSketchModal = document.getElementById('btnCloseSketchModal');

  if (btnOpenSketchModal && sketchModalOverlay) {
    btnOpenSketchModal.addEventListener('click', () => {
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

  // Reset Demo Action
  if (btnResetDemo) {
    btnResetDemo.addEventListener('click', () => {
      if (state.queue.intervalId) clearInterval(state.queue.intervalId);
      state.queue.isJoined = false;
      state.chat.hasStarted = false;
      navigateToStep(1);
    });
  }

  // Bottom Navigation Items Switching
  const navTabs = document.querySelectorAll('.nav-tab-item');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabTarget = tab.getAttribute('data-target');
      if (tabTarget === 'home') {
        navigateToStep(1);
      } else if (tabTarget === 'orders') {
        navigateToStep(4);
      } else if (tabTarget === 'help') {
        navigateToStep(2);
      }
    });
  });

  // Start on Step 1 (Signed-in Walmart Homepage)
  navigateToStep(1);

});
