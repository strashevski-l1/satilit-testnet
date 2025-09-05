document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModals();
    initializeFAQ();
    initializeAnimations();
    initializeSlotInteractions();
    initializeDepositWidget();
});

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (!header) return;
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }
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
    
    loginBtn?.addEventListener('click', () => showModal(loginModal));
    registerBtn?.addEventListener('click', () => showModal(registerModal));
    startPlayingBtn?.addEventListener('click', () => showModal(registerModal));
    
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
            
            const formData = new FormData(this);
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

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('advantages-grid') || 
                    entry.target.classList.contains('games-grid') || 
                    entry.target.classList.contains('bonuses-grid') || 
                    entry.target.classList.contains('security-grid')) {
                    
                    const cards = entry.target.querySelectorAll('.advantage-card, .slot-card, .bonus-card, .security-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.section-title, .advantages-grid, .games-grid, .bonuses-grid, .security-grid, .hero-content');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = scrolled * speed;
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrolled * 0.02}deg)`;
        });
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const heroOffset = scrolled * 0.3;
            heroContent.style.transform = `translate3d(0, ${heroOffset}px, 0)`;
        }
    });
    
    const counters = document.querySelectorAll('.bonus-amount');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, '')) || 200;
                const suffix = counter.textContent.replace(/\d/g, '');
                let current = 0;
                
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + suffix;
                    }
                }, 20);
                
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        if (counter.textContent.match(/\d/)) {
            counterObserver.observe(counter);
        }
    });
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

    btn?.addEventListener('click', () => {
        document.getElementById('registerBtn')?.click();
    });

    updateBtn();
}

function initializeSlotInteractions() {
    const slotCards = document.querySelectorAll('.slot-card');
    
    slotCards.forEach(card => {
        card.addEventListener('click', function() {
            const slotNumber = this.dataset.slot;
            const slotName = this.querySelector('h4').textContent;
            
            showSlotModal(slotNumber, slotName);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            
            const placeholder = this.querySelector('.slot-placeholder');
            if (placeholder) {
                placeholder.style.animation = 'pulse 1s infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const placeholder = this.querySelector('.slot-placeholder');
            if (placeholder) {
                placeholder.style.animation = '';
            }
        });
    });
}

function showSlotModal(slotNumber, slotName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${slotName}</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-form">
                <div class="slot-demo">
                    <div class="demo-placeholder">
                        <div class="demo-reels">
                            <div class="reel">🍒</div>
                            <div class="reel">🍋</div>
                            <div class="reel">🍊</div>
                        </div>
                        <p class="demo-text">Демо версия слота ${slotNumber}</p>
                    </div>
                </div>
                <div class="slot-info-detailed">
                    <h4>Информация об игре:</h4>
                    <ul>
                        <li>📊 RTP: ${95 + Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 9)}%</li>
                        <li>🎰 Барабаны: 5x3</li>
                        <li>💰 Мин. ставка: 10 рублей</li>
                        <li>🎯 Макс. ставка: 1000 рублей</li>
                        <li>🎁 Бонусная игра: Да</li>
                        <li>⚡ Фриспины: Да</li>
                    </ul>
                </div>
                <div class="slot-buttons">
                    <button class="btn btn-outline btn-full">Демо игра</button>
                    <button class="btn btn-primary btn-full">Играть на деньги</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }
    });
    
    modal.style.display = 'block';
    
    const demoBtn = modal.querySelector('.btn-outline');
    const playBtn = modal.querySelector('.btn-primary');
    
    demoBtn.addEventListener('click', function() {
        showNotification('Демо игра запущена! (Имитация)', 'info');
        spinReels(modal);
    });
    
    playBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
        document.getElementById('registerBtn').click();
    });
}

function spinReels(modal) {
    const reels = modal.querySelectorAll('.reel');
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '⭐', '7️⃣'];
    
    reels.forEach((reel, index) => {
        reel.style.animation = 'spin 1s ease-out';
        
        setTimeout(() => {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            reel.textContent = randomSymbol;
            reel.style.animation = '';
            
            if (index === reels.length - 1) {
                setTimeout(() => {
                    checkWin(reels);
                }, 200);
            }
        }, 1000 + (index * 200));
    });
}

function checkWin(reels) {
    const symbols = Array.from(reels).map(reel => reel.textContent);
    const uniqueSymbols = [...new Set(symbols)];
    
    if (uniqueSymbols.length === 1) {
        showNotification('🎉 ДЖЕКПОТ! Все символы совпали!', 'success');
    } else if (uniqueSymbols.length === 2) {
        showNotification('🎊 Хороший выигрыш!', 'success');
    } else {
        showNotification('Попробуйте еще раз!', 'info');
    }
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
        <style>
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
        </style>
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.innerHTML = styles;
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
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
        }
        
        .demo-placeholder {
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, var(--secondary-green), #2A5C4A);
            border-radius: var(--border-radius);
            margin-bottom: 20px;
        }
        
        .demo-reels {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .reel {
            width: 60px;
            height: 60px;
            background: var(--glass-bg);
            border: 2px solid var(--primary-green);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            backdrop-filter: blur(10px);
        }
        
        .demo-text {
            color: var(--primary-green);
            font-weight: 600;
            margin: 0;
        }
        
        .slot-info-detailed {
            background: var(--glass-bg);
            border-radius: var(--border-radius);
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .slot-info-detailed h4 {
            color: var(--primary-green);
            margin-bottom: 15px;
        }
        
        .slot-info-detailed ul {
            list-style: none;
            padding: 0;
        }
        
        .slot-info-detailed li {
            padding: 5px 0;
            color: var(--text-secondary);
        }
        
        .slot-buttons {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .header.scrolled {
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(25px);
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