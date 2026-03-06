// Lead Capture & Conversion Features

// ==========================================
// 1. EXIT INTENT POPUP
// ==========================================
let exitIntentShown = false;

document.addEventListener('mouseout', function(e) {
    if (e.clientY < 0 && !exitIntentShown) {
        showExitIntentPopup();
        exitIntentShown = true;
    }
});

function showExitIntentPopup() {
    const popup = document.createElement('div');
    popup.className = 'exit-popup';
    popup.innerHTML = `
        <div class="exit-popup-overlay"></div>
        <div class="exit-popup-content">
            <button class="exit-popup-close" onclick="closeExitPopup()">&times;</button>
            <div class="exit-popup-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <h2>Wait! Get Your Free Guide</h2>
            <p>Download our <strong>2025 Physician Mortgage Rate Guide</strong> with current rates, qualification requirements, and insider tips for Arizona doctors.</p>
            <form onsubmit="submitLeadMagnet(event, 'rate-guide')">
                <input type="email" placeholder="Your email address" required>
                <button type="submit" class="btn-primary">Send Me The Guide!</button>
            </form>
            <p class="exit-popup-note">📧 Delivered instantly to your inbox</p>
        </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.classList.add('active'), 10);
}

function closeExitPopup() {
    const popup = document.querySelector('.exit-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    }
}

// ==========================================
// 2. SOCIAL PROOF COUNTERS
// ==========================================
function initSocialProof() {
    // Social proof bar removed per request
    return;

// ==========================================
// 3. RECENT ACTIVITY FEED
// ==========================================
const recentActivity = [
    { name: 'Dr. Sarah Chen', action: 'just got pre-approved!', location: 'Phoenix', time: '2 hours ago' },
    { name: 'Dr. Michael Torres', action: 'locked in their rate', location: 'Scottsdale', time: '4 hours ago' },
    { name: 'Dr. Jennifer Park', action: 'submitted application', location: 'Mesa', time: '6 hours ago' },
    { name: 'Dr. David Kim', action: 'closed on their home!', location: 'Tempe', time: 'Yesterday' }
];

function showActivityToast() {
    const activity = recentActivity[Math.floor(Math.random() * recentActivity.length)];
    const toast = document.createElement('div');
    toast.className = 'activity-toast';
    toast.innerHTML = `
        <div class="activity-avatar">${activity.name.split(' ').map(n => n[0]).join('')}</div>
        <div class="activity-content">
            <strong>${activity.name}</strong> ${activity.action}
            <span>${activity.location} • ${activity.time}</span>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ==========================================
// 4. AFFORDABILITY CALCULATOR
// ==========================================
function initCalculator() {
    const calculatorHTML = `
        <div class="calculator-widget" id="affordabilityCalculator">
            <h3><i class="fas fa-calculator"></i> How Much House Can You Afford?</h3>
            <div class="calc-inputs">
                <div class="calc-group">
                    <label>Annual Income</label>
                    <input type="number" id="calcIncome" placeholder="250000" oninput="calculateAffordability()">
                </div>
                <div class="calc-group">
                    <label>Monthly Debts</label>
                    <input type="number" id="calcDebts" placeholder="2500" oninput="calculateAffordability()">
                </div>
                <div class="calc-group">
                    <label>Down Payment</label>
                    <input type="number" id="calcDownPayment" placeholder="0" oninput="calculateAffordability()">
                </div>
            </div>
            <div class="calc-result" id="calcResult" style="display:none;">
                <div class="result-amount">$<span id="resultAmount">0</span></div>
                <p>Estimated home price you qualify for</p>
                <button class="btn-primary" onclick="showCalculatorGate()">Get Your Exact Rate</button>
            </div>
        </div>
    `;
    
    // Add calculator after hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const calcSection = document.createElement('section');
        calcSection.className = 'calculator-section';
        calcSection.innerHTML = `<div class="container">${calculatorHTML}</div>`;
        hero.after(calcSection);
    }
}

function calculateAffordability() {
    const income = parseFloat(document.getElementById('calcIncome').value) || 0;
    const debts = parseFloat(document.getElementById('calcDebts').value) || 0;
    const downPayment = parseFloat(document.getElementById('calcDownPayment').value) || 0;
    
    if (income > 0) {
        const monthlyIncome = income / 12;
        const maxDebtPayment = monthlyIncome * 0.43 - debts; // 43% DTI
        const homePrice = (maxDebtPayment * 200) + downPayment; // Rough estimate
        
        document.getElementById('resultAmount').textContent = Math.floor(homePrice).toLocaleString();
        document.getElementById('calcResult').style.display = 'block';
    }
}

function showCalculatorGate() {
    const popup = document.createElement('div');
    popup.className = 'gate-popup';
    popup.innerHTML = `
        <div class="gate-popup-overlay" onclick="closeGatePopup()"></div>
        <div class="gate-popup-content">
            <h2>Get Your Personalized Rate Quote</h2>
            <p>Enter your email to receive your exact interest rate and pre-approval letter.</p>
            <form onsubmit="submitLeadMagnet(event, 'rate-quote')">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="tel" placeholder="Phone Number" required>
                <label class="checkbox-label">
                    <input type="checkbox" required>
                    I agree to receive SMS rate alerts
                </label>
                <button type="submit" class="btn-primary">Get My Rate Quote</button>
            </form>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('active'), 10);
}

function closeGatePopup() {
    const popup = document.querySelector('.gate-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    }
}

// ==========================================
// 5. LEAD MAGNET FORMS
// ==========================================
function submitLeadMagnet(event, type) {
    event.preventDefault();
    
    // Show success message
    const form = event.target;
    form.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Check your email in the next few minutes for your ${getLeadMagnetName(type)}.</p>
            <p class="bonus-text">💡 Bonus: Edward will personally call you within 24 hours to discuss your mortgage options.</p>
        </div>
    `;
    
    // Close popup after delay
    setTimeout(() => {
        closeExitPopup();
        closeGatePopup();
    }, 3000);
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', { 'send_to': 'LEAD_MAGNET_' + type });
    }
}

function getLeadMagnetName(type) {
    const names = {
        'rate-guide': '2025 Physician Mortgage Rate Guide',
        'rate-quote': 'Personalized Rate Quote',
        'checklist': 'First-Time Home Buyer Checklist',
        'calculator': 'Affordability Calculator Results'
    };
    return names[type] || 'download';
}

// ==========================================
// 6. STICKY MOBILE CTA
// ==========================================
function initStickyMobileCTA() {
    const stickyCTA = document.createElement('div');
    stickyCTA.className = 'sticky-mobile-cta';
    stickyCTA.innerHTML = `
        <a href="tel:4805550199" class="btn-call">
            <i class="fas fa-phone"></i> Call Edward
        </a>
        <a href="prequalify.html" class="btn-apply">
            <i class="fas fa-edit"></i> Apply Now
        </a>
    `;
    document.body.appendChild(stickyCTA);
}

// ==========================================
// 7. SCROLL-TRIGGERED FORMS
// ==========================================
function initScrollForms() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.querySelector('.inline-cta')) {
                addInlineCTA(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

function addInlineCTA(section) {
    const cta = document.createElement('div');
    cta.className = 'inline-cta';
    cta.innerHTML = `
        <div class="inline-cta-content">
            <h4>Ready to Get Started?</h4>
            <p>Join 127+ Arizona doctors who've saved thousands on their mortgages.</p>
            <div class="inline-cta-buttons">
                <a href="prequalify.html" class="btn-primary">Get Pre-Qualified</a>
                <a href="tel:4805550199" class="btn-secondary">
                    <i class="fas fa-phone"></i> Call Now
                </a>
            </div>
        </div>
    `;
    section.appendChild(cta);
}

// ==========================================
// 8. URGENCY TIMER
// ==========================================
function initUrgencyTimer() {
    const timer = document.createElement('div');
    timer.className = 'urgency-banner';
    timer.innerHTML = `
        <div class="container">
            <i class="fas fa-clock"></i>
            <span><strong>Rates change daily!</strong> Lock your rate before they go up.</span>
            <span class="urgency-timer" id="urgencyTimer">Offer ends in 04:32:18</span>
            <a href="prequalify.html" class="btn-small">Lock Rate Now</a>
        </div>
    `;
    
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
        topBar.after(timer);
    }
    
    // Update timer every second
    let hours = 4, minutes = 32, seconds = 18;
    setInterval(() => {
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 4; minutes = 32; seconds = 18; } // Reset
        
        const timerEl = document.getElementById('urgencyTimer');
        if (timerEl) {
            timerEl.textContent = `Offer ends in ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
        }
    }, 1000);
}

// ==========================================
// 9. RETARGETING PIXELS
// ==========================================
function loadRetargetingPixels() {
    // Facebook Pixel
    !(function(f,b,e,v,n,t,s) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
    })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', 'YOUR_FB_PIXEL_ID');
    fbq('track', 'PageView');
    
    // LinkedIn Insight Tag
    const linkedinScript = document.createElement('script');
    linkedinScript.innerHTML = `
        _linkedin_partner_id = "YOUR_LINKEDIN_ID";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    `;
    document.head.appendChild(linkedinScript);
}

// ==========================================
// 10. LIVE CHAT WIDGET
// ==========================================
function initLiveChat() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'live-chat-widget';
    chatWidget.innerHTML = `
        <button class="chat-toggle" onclick="toggleChat()">
            <i class="fas fa-comments"></i>
            <span class="chat-badge">1</span>
        </button>
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <img src="edward-lopez.jpg" alt="Edward Lopez">
                <div>
                    <strong>Edward Lopez</strong>
                    <span class="status-online">● Online</span>
                </div>
                <button onclick="toggleChat()">&times;</button>
            </div>
            <div class="chat-messages">
                <div class="chat-message bot">
                    <p>Hi! I'm Edward. How can I help you with your physician mortgage today? 👋</p>
                </div>
            </div>
            <div class="chat-quick-replies">
                <button onclick="sendQuickReply('What are the current rates?')">Current rates?</button>
                <button onclick="sendQuickReply('How do I pre-qualify?')">How to pre-qualify?</button>
                <button onclick="sendQuickReply('Do you work with residents?')">Residents eligible?</button>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type a message..." id="chatInput">
                <button onclick="sendChatMessage()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);
}

function toggleChat() {
    document.getElementById('chatWindow').classList.toggle('active');
}

function sendQuickReply(text) {
    const messages = document.querySelector('.chat-messages');
    messages.innerHTML += `<div class="chat-message user"><p>${text}</p></div>`;
    
    setTimeout(() => {
        messages.innerHTML += `
            <div class="chat-message bot">
                <p>Great question! Let me connect you with the answer. Would you like to schedule a quick 15-minute call to discuss this? <a href="#" onclick="showCalendly()">Book here</a></p>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (input.value.trim()) {
        sendQuickReply(input.value);
        input.value = '';
    }
}

function showCalendly() {
    alert('Calendly integration would open here - https://calendly.com/edward-lopez');
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initSocialProof();
    initCalculator();
    initStickyMobileCTA();
    initScrollForms();
    initUrgencyTimer();
    initLiveChat();
    loadRetargetingPixels();
    
    // Show activity toasts periodically
    setTimeout(() => showActivityToast(), 10000);
    setInterval(() => showActivityToast(), 45000);
});
