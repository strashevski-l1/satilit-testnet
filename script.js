document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModals();
    initializeFAQ();
    // Expose deposit widget for dynamic render calls
    window.initializeDepositWidget = initializeDepositWidget;
});

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    hamburger?.addEventListener('click', function() {
        const willOpen = !hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger?.classList.remove('active');
                hamburger?.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    });

    // Highlight active nav by hash route
    function updateActiveByHash() {
        const hash = location.hash || '#/';
        document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href='${hash}']`);
        active?.classList.add('active');
    }
    window.addEventListener('hashchange', updateActiveByHash);
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger?.classList.remove('active');
            hamburger?.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });
    updateActiveByHash();
}

function initializeModals() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const startPlayingBtn = document.getElementById('startPlayingBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const closeBtns = document.querySelectorAll('.close');
    const modals = document.querySelectorAll('.modal');
    
    function showModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('active'), 10);
    }
    
    function hideModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Route both header auth buttons to registration page (no modals)
    loginBtn?.addEventListener('click', () => { location.hash = '#/register'; });
    registerBtn?.addEventListener('click', () => { location.hash = '#/register'; });
    startPlayingBtn?.addEventListener('click', () => { location.hash = '#/register'; });
    
    switchToRegister?.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(loginModal);
        setTimeout(() => showModal(registerModal), 350);
    });
    
    switchToLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(registerModal);
        setTimeout(() => showModal(loginModal), 350);
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    hideModal(modal);
                }
            });
        }
    });
    
    const forms = document.querySelectorAll('.modal-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formType = this.closest('#loginModal') ? 'login' : 'register';
            showNotification(`${formType === 'login' ? 'Вход' : 'Регистрация'} выполнена успешно!`, 'success');
            const modal = this.closest('.modal');
            hideModal(modal);
            this.reset();
        });
    });
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = '0';
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    const styles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 3000;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                backdrop-filter: blur(20px);
                padding: 15px 20px;
                min-width: 300px;
                animation: slideIn 0.3s ease;
                box-shadow: var(--shadow-glass);
            }
            
            .notification-success {
                border-left: 4px solid var(--primary-green);
            }
            
            .notification-info {
                border-left: 4px solid #3498db;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .notification-message {
                color: var(--text-primary);
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 15px;
                transition: color 0.3s ease;
            }
            
            .notification-close:hover {
                color: var(--primary-green);
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
    styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function initializeDepositWidget() {
    const widget = document.getElementById('depositWidget');
    if (!widget) return;
    const amountInput = document.getElementById('depositAmount');
    const minus = widget.querySelector('.amount-minus');
    const plus = widget.querySelector('.amount-plus');
    const plan = document.getElementById('bonusPlan');
    const btn = document.getElementById('getBonusBtn');

    function updateBtn() {
        const amount = Math.max(parseFloat(amountInput.value || '0'), parseFloat(amountInput.min || '0'));
        const percent = parseFloat(plan.value || '0');
        const bonus = Math.round((amount * (percent / 100)) * 100) / 100;
        const currency = (document.getElementById('currency')?.value || 'EUR');
        const symbol = currency === 'USD' ? '$' : currency === 'AUD' ? 'A$' : '€';
        btn.textContent = `Get ${symbol}${bonus.toFixed(2)}`;
    }

    minus?.addEventListener('click', () => {
        const step = parseFloat(amountInput.step || '10');
        const min = parseFloat(amountInput.min || '10');
        amountInput.value = Math.max(min, parseFloat(amountInput.value || '0') - step);
        updateBtn();
    });
    plus?.addEventListener('click', () => {
        const step = parseFloat(amountInput.step || '10');
        amountInput.value = (parseFloat(amountInput.value || '0') + step).toString();
        updateBtn();
    });
    amountInput?.addEventListener('input', updateBtn);
    plan?.addEventListener('change', updateBtn);
    document.getElementById('currency')?.addEventListener('change', updateBtn);

    btn?.addEventListener('click', () => { location.hash = '#/register'; });

    updateBtn();
}

const additionalCSS = `
    <style>
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            z-index: 999;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        .nav-link.active {
            color: var(--primary-green);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalCSS);