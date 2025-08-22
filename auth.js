class PasswordProtection {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.initProtection();
    this.init();
  }

  async init() {
    await this.checkAuthStatus();
    this.createPasswordForm();
    this.startSecurityChecks();
  }

  initProtection() {
    // Отключаем контекстное меню
    document.addEventListener('contextmenu', e => e.preventDefault());
    
    // Блокируем горячие клавиши разработчика
    document.addEventListener('keydown', e => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
      }
    });

    // Скрываем содержимое при попытке выделения
    document.addEventListener('selectstart', e => {
      if (!document.body.classList.contains('auth-verified')) {
        e.preventDefault();
      }
    });

    // Обнаружение DevTools
    let devtools = {open: false, orientation: null};
    const threshold = 160;
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open && !document.body.classList.contains('auth-verified')) {
          document.body.innerHTML = '<div style="background:#000;color:#777;font-family:monospace;padding:20px;text-align:center;">Access Denied</div>';
        }
        devtools.open = true;
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  startSecurityChecks() {
    // Проверяем валидность токена каждые 30 секунд
    setInterval(() => {
      this.validateToken();
    }, 30000);

    // Проверяем целостность DOM
    setInterval(() => {
      if (document.body.classList.contains('auth-verified')) {
        const overlay = document.getElementById('passwordOverlay');
        if (!overlay && !this.isAuthenticated()) {
          location.reload();
        }
      }
    }, 5000);
  }

  validateToken() {
    const token = localStorage.getItem('authToken');
    const sessionId = localStorage.getItem('sessionId');
    
    if (token === 'access_granted' && sessionId === this.sessionId) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  isAuthenticated() {
    return localStorage.getItem('authToken') === 'access_granted' && 
           localStorage.getItem('sessionId') === this.sessionId;
  }

  async checkAuthStatus() {
    if (this.isAuthenticated()) {
      await this.showMainContent();
    } else {
      this.showPasswordForm();
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('sessionId');
    document.body.classList.remove('auth-verified');
    location.reload();
  }

  createPasswordForm() {
    const formHTML = `
      <div id="passwordOverlay" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      ">
        <div style="
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          text-align: center;
          max-width: 400px;
          width: 90%;
        ">
          <h2 style="
            color: #1a1a2e;
            margin-bottom: 20px;
            font-family: 'Inter', sans-serif;
          ">🔒 Доступ ограничен</h2>
          <p style="
            color: #666;
            margin-bottom: 30px;
            font-family: 'Inter', sans-serif;
          ">Введите пароль для просмотра содержимого сайта</p>
          <form id="passwordForm">
            <input 
              type="password" 
              id="passwordInput" 
              placeholder="Введите пароль"
              style="
                width: 100%;
                padding: 15px;
                border: 2px solid #ddd;
                border-radius: 10px;
                font-size: 16px;
                margin-bottom: 20px;
                box-sizing: border-box;
                font-family: 'Inter', sans-serif;
              "
              required
            />
            <button 
              type="submit"
              style="
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                cursor: pointer;
                font-family: 'Inter', sans-serif;
                font-weight: 600;
              "
            >Войти</button>
          </form>
          <div id="errorMessage" style="
            color: #e74c3c;
            margin-top: 15px;
            font-family: 'Inter', sans-serif;
            display: none;
          "></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', formHTML);
    
    const form = document.getElementById('passwordForm');
    form.addEventListener('submit', (e) => this.handlePasswordSubmit(e));
  }

  async handlePasswordSubmit(e) {
    e.preventDefault();
    const password = document.getElementById('passwordInput').value;
    const errorDiv = document.getElementById('errorMessage');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('sessionId', this.sessionId);
        await this.showMainContent();
      } else {
        errorDiv.textContent = data.error || 'Неверный пароль';
        errorDiv.style.display = 'block';
        document.getElementById('passwordInput').value = '';
      }
    } catch (error) {
      errorDiv.textContent = 'Ошибка подключения к серверу';
      errorDiv.style.display = 'block';
    }
  }

  showPasswordForm() {
    document.body.style.overflow = 'hidden';
    const overlay = document.getElementById('passwordOverlay');
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }

  async showMainContent() {
    document.body.style.overflow = '';
    document.body.classList.add('auth-verified');
    const overlay = document.getElementById('passwordOverlay');
    if (overlay) {
      overlay.remove();
    }
    
    // Загружаем основной контент
    await this.loadMainContent();
  }

  async loadMainContent() {
    const token = localStorage.getItem('authToken');
    
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        document.getElementById('app-container').innerHTML = data.content;
        document.title = 'Сателлит Казино - Современная платформа азартных игр';
        
        // Переинициализируем скрипты после загрузки контента
        if (window.initializeScripts) {
          window.initializeScripts();
        }
      } else {
        this.logout();
      }
    } catch (error) {
      console.error('Ошибка загрузки контента:', error);
      this.logout();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PasswordProtection();
});