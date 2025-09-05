document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeModals();
    initializeFAQ();
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
        link.addEventListener('click', function() {
            if (navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger?.classList.remove('active');
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