/* ============================================
   TAP SURPRISE STUDIO - Interactive JavaScript
   ============================================ */

// ============================================
// Language Toggle System
// ============================================
const langToggle = document.getElementById('langToggle');
let currentLang = 'ar';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('data-lang', currentLang);
    langToggle.querySelector('.lang-text').textContent = currentLang === 'ar' ? 'EN' : 'ع';
    updateContent();
});

function updateContent() {
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) el.textContent = text;
    });
}

// ============================================
// Loading Screen
// ============================================
const loadingScreen = document.getElementById('loadingScreen');

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

// ============================================
// Navigation Scroll Effect
// ============================================
const mainNav = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// ============================================
// Particle System
// ============================================
const particlesContainer = document.getElementById('particles');

function createParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${8 + Math.random() * 4}s`;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.strategic-card, .service-card, .case-study, .timeline-item').forEach(el => {
    el.classList.add('fade-in-section');
    observer.observe(el);
});

// ============================================
// Parallax Effect on Scroll
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * 0.3;
        hero.style.backgroundPositionY = `${rate}px`;
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Advanced Chatbot Funnel System
// ============================================
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotCard = document.getElementById('chatbotCard');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotOptions = document.getElementById('chatbotOptions');

// Chatbot State
let chatbotState = {
    step: 'initial',
    answers: {}
};

// Chatbot Flow Definitions
const chatbotFlows = {
    initial: {
        message: 'مرحبًا 🤍 أنا مساعد Tap Surprise Studio.\nسأطرح عليك بعض الأسئلة لنحدد أفضل حل لمشروعك.',
        options: [
            { label: 'أريد موقع لمشروعي', value: 'website', next: 'website_type' },
            { label: 'أحتاج أتمتة وردود', value: 'automation', next: 'automation_type' },
            { label: 'أريد صفحة مفاجأة رقمية', value: 'surprise', next: 'surprise_type' },
            { label: 'لا أعرف من أين أبدأ', value: 'help', next: 'help_start' }
        ]
    },
    website_type: {
        message: 'ما نوع مشروعك؟',
        options: [
            { label: 'منتجات', value: 'products', next: 'website_products' },
            { label: 'خدمات', value: 'services', next: 'website_services' },
            { label: 'حسب الطلب', value: 'custom', next: 'website_custom' }
        ]
    },
    website_products: {
        message: 'كم منتج تقريبًا لديك؟',
        options: [
            { label: 'أقل من 10', value: 'few', next: 'website_assets' },
            { label: '10-50', value: 'medium', next: 'website_assets' },
            { label: 'أكثر من 50', value: 'many', next: 'website_assets' }
        ]
    },
    website_services: {
        message: 'هل تقدم خدمات متعددة أم خدمة واحدة؟',
        options: [
            { label: 'خدمة واحدة', value: 'single', next: 'website_assets' },
            { label: 'خدمات متعددة', value: 'multiple', next: 'website_assets' }
        ]
    },
    website_custom: {
        message: 'صف لنا مشروعك باختصار',
        options: [
            { label: 'متابعة', value: 'continue', next: 'website_assets' }
        ]
    },
    website_assets: {
        message: 'هل لديك صور جاهزة للمنتجات/الخدمات؟',
        options: [
            { label: 'نعم، صور جاهزة', value: 'yes_images', next: 'website_brand' },
            { label: 'لا، أحتاج تصوير', value: 'no_images', next: 'website_brand' },
            { label: 'بعض الصور', value: 'some_images', next: 'website_brand' }
        ]
    },
    website_brand: {
        message: 'هل لديك هوية بصرية (لوغو، ألوان، خطوط)؟',
        options: [
            { label: 'نعم، موجودة', value: 'has_brand', next: 'suggestion_website' },
            { label: 'لا، أحتاج تصميم', value: 'no_brand', next: 'suggestion_website_full' },
            { label: 'بعض العناصر', value: 'partial_brand', next: 'suggestion_website' }
        ]
    },
    automation_type: {
        message: 'ما نوع الأتمتة التي تحتاجها؟',
        options: [
            { label: 'ردود أوتوماتيكية', value: 'auto_replies', next: 'automation_platform' },
            { label: 'طلب واستفسارات', value: 'orders', next: 'automation_platform' },
            { label: 'كلاهما', value: 'both', next: 'automation_platform' }
        ]
    },
    automation_platform: {
        message: 'ما المنصة الرئيسية التي تعمل عليها؟',
        options: [
            { label: 'إنستغرام', value: 'instagram', next: 'suggestion_automation_ig' },
            { label: 'واتساب', value: 'whatsapp', next: 'suggestion_automation_wa' },
            { label: 'كلاهما', value: 'both', next: 'suggestion_automation_both' }
        ]
    },
    surprise_type: {
        message: 'ما نوع الصفحة المفاجأة التي تريدها؟',
        options: [
            { label: 'لحلقة زفاف', value: 'wedding', next: 'surprise_details' },
            { label: 'لعيد ميلاد', value: 'birthday', next: 'surprise_details' },
            { label: 'لoccasion خاص', value: 'special', next: 'surprise_details' }
        ]
    },
    surprise_details: {
        message: 'هل تريد أن تكون الصفحة تفاعلية مع عناصر مفاجأة؟',
        options: [
            { label: 'نعم، كاملة التفاعل', value: 'interactive', next: 'suggestion_surprise' },
            { label: 'بسيطة会更好', value: 'simple', next: 'suggestion_surprise' }
        ]
    },
    help_start: {
        message: 'أخبرنا أكثر عن مشروعك أو فكرتك...',
        options: [
            { label: 'متابعة', value: 'continue', next: 'help_category' }
        ]
    },
    help_category: {
        message: 'في أي مجال يعمل مشروعك؟',
        options: [
            { label: 'تجارة إلكترونية', value: 'ecommerce', next: 'suggestion_ecommerce' },
            { label: 'خدمات', value: 'services', next: 'suggestion_services' },
            { label: 'حرفي/يدوي', value: 'handmade', next: 'suggestion_handmade' },
            { label: 'أخرى', value: 'other', next: 'suggestion_general' }
        ]
    },
    // Suggestion States
    suggestion_website: {
        message: 'ممتاز! بناءً على إجاباتك، نقترح:',
        isSuggestion: true,
        suggestion: 'موقع عرض احترافي + نظام طلب عبر DM',
        details: 'هذا الحل مثالي لمشروعك - موقع يعرض منتجاتك بشكل جذاب مع تكامل سلس مع إنستغرام لتلقي الطلبات مباشرة.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_website_full: {
        message: 'ممتاز! بناءً على إجاباتك، نقترح:',
        isSuggestion: true,
        suggestion: 'باقة كاملة: موقع + هوية بصرية + تصوير',
        details: 'سنصمم لك موقعًا احترافيًا مع هوية بصرية متكاملة لجعل مشروعك يبرز بشكل فريد.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_automation_ig: {
        message: 'ممتاز! بناءً على إجاباتك، نقترح:',
        isSuggestion: true,
        suggestion: 'نظام أتمتة إنستغرام',
        details: 'ردود أوتوماتيكية ذكية + تحويل الطلبات لنظام إدارة - يعمل 24/7 بدون من يرد.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_automation_wa: {
        message: 'ممتاز! بناءً على إجاباتك، نقترح:',
        isSuggestion: true,
        suggestion: 'أتمتة واتساب متكاملة',
        details: 'ردود آلية + قوالب طلب + إشعارات فورية - نظام كامل لإدارة العملاء.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_automation_both: {
        message: 'ممتاز! بناءً على إجاباتك، نقترح:',
        isSuggestion: true,
        suggestion: 'باقة أتمتة شاملة (إنستغرام + واتساب)',
        details: 'نظام متكامل يعمل على كلا المنصرفتين مع لوحة تحكم موحدة.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_surprise: {
        message: 'ممتاز! بناءً على إحتياجاتك، نقترح:',
        isSuggestion: true,
        suggestion: 'صفحة مفاجأة رقمية تفاعلية',
        details: 'تصميم فريد مع مؤثرات بصرية وصوتية ورسائل مفاجأة تفاعلية.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_ecommerce: {
        message: 'لمشروعك في التجارة الإلكترونية، نقترح:',
        isSuggestion: true,
        suggestion: 'متجر إلكتروني متكامل + أتمتة',
        details: 'منتجات، طلبات، دفع، وتكامل مع DM لتحويل الزوار إلى عملاء.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_services: {
        message: 'لمشروعك في الخدمات، نقترح:',
        isSuggestion: true,
        suggestion: 'موقع خدمات احترافي + حجوزات',
        detail: 'عرض خدماتك مع نظام حجز وتأكيد تلقائي.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_handmade: {
        message: 'لمشروعك الحرفي، نقترح:',
        isSuggestion: true,
        suggestion: 'معرض رقمي + نظام طلب + قصة البراند',
        details: 'عرض منتجاتك الفنية بطريقة تروي قصتك وتربط العملاء عاطفيًا.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    },
    suggestion_general: {
        message: 'مشروع رائع! لنبدأ...',
        isSuggestion: true,
        suggestion: 'استشارة استراتيجية مجانية',
        details: 'أحتاج بعض المعلومات الإضافية لفهم مشروعك بشكل أفضل.',
        button: 'تحويل إلى إنستغرام 💌',
        buttonAction: 'instagram'
    }
};

// Chatbot Functions
function toggleChatbot() {
    chatbotCard.classList.toggle('active');
    if (chatbotCard.classList.contains('active')) {
        setTimeout(() => {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 100);
    }
}

function closeChatbot() {
    chatbotCard.classList.remove('active');
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    setTimeout(() => {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 100);
}

function renderOptions(options) {
    chatbotOptions.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.label;
        btn.addEventListener('click', () => handleOptionClick(opt));
        chatbotOptions.appendChild(btn);
    });
}

function handleOptionClick(option) {
    // Add user message
    addMessage(option.label, true);
    
    // Store answer
    chatbotState.answers[chatbotState.step] = option.value;
    chatbotState.step = option.next;
    
    // Get next flow
    const nextFlow = chatbotFlows[chatbotState.step];
    
    if (nextFlow) {
        setTimeout(() => {
            addMessage(nextFlow.message.replace(/\n/g, '<br>'));
            
            if (nextFlow.isSuggestion) {
                // Render suggestion box
                renderSuggestion(nextFlow);
            } else if (nextFlow.options) {
                renderOptions(nextFlow.options);
            }
        }, 500);
    }
}

function renderSuggestion(flow) {
    const suggestionHTML = `
        <div class="suggestion-box">
            <h4>💡 ${flow.suggestion}</h4>
            <p>${flow.details || flow.detail}</p>
            <div class="suggestion-buttons">
                <a href="https://www.instagram.com/" target="_blank" class="btn-instagram">
                    ${flow.button}
                </a>
                <a href="mailto:tapsurprisestudio@gmail.com?subject=${encodeURIComponent('استشارة من موقع Tap Surprise Studio')}" class="btn-email">
                    📧 أرسل بريد إلكتروني
                </a>
            </div>
        </div>
    `;
    
    chatbotOptions.innerHTML = suggestionHTML;
}

// Event Listeners
chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', closeChatbot);

// Initialize chatbot with initial options
renderOptions(chatbotFlows.initial.options);

// ============================================
// Magnetic Button Effect (Optional Enhancement)
// ============================================
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});

// ============================================
// Counter Animation for Stats (if needed)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Initialize all sections visible on load
document.addEventListener('DOMContentLoaded', () => {
    // Add slight delay for smooth appearance
    setTimeout(() => {
        document.querySelectorAll('.fade-in-section').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }, 500);
});

// ============================================
// Console Clean (No Errors)
// ============================================
console.log('%c Tap Surprise Studio ', 'background: #c9a45c; color: #fff; padding: 10px; font-size: 16px; border-radius: 5px;');
console.log('Welcome to your luxury digital agency website!');
