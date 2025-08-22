class PasswordProtection {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.initProtection();
    this.checkAuthStatus();
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

  checkAuthStatus() {
    if (this.isAuthenticated()) {
      this.showMainContent();
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
        background: #000000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: 'Courier New', monospace;
      ">
        <div style="
          background: #000000;
          border: 1px solid #777;
          padding: 40px;
          text-align: left;
          max-width: 400px;
          width: 90%;
        ">
          <h2 style="
            color: #fff;
            margin: 0 0 20px 0;
            font-family: 'Courier New', monospace;
            font-size: 18px;
            font-weight: normal;
          ">ACCESS RESTRICTED</h2>
          <p style="
            color: #777;
            margin: 0 0 30px 0;
            font-family: 'Courier New', monospace;
            font-size: 14px;
          ">Enter password to proceed</p>
          <form id="passwordForm">
            <div style="margin-bottom: 20px;">
              <label style="
                color: #777;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                display: block;
                margin-bottom: 5px;
              ">PASSWORD:</label>
              <input 
                type="password" 
                id="passwordInput" 
                style="
                  width: 100%;
                  padding: 10px;
                  border: 1px solid #777;
                  background: #000000;
                  color: #fff;
                  font-size: 14px;
                  box-sizing: border-box;
                  font-family: 'Courier New', monospace;
                "
                required
              />
            </div>
            <button 
              type="submit"
              style="
                padding: 10px 20px;
                background: #000000;
                color: #fff;
                border: 1px solid #777;
                font-size: 14px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
              "
            >ENTER</button>
          </form>
          <div id="errorMessage" style="
            color: #777;
            margin-top: 15px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            display: none;
          "></div>
        </div>
        
        <div style="
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          border-top: 1px solid #777;
          padding-top: 20px;
          text-align: center;
        ">
          <div style="
            color: #777;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            margin-bottom: 10px;
          ">Buy access for 0.05 ETH</div>
          <div style="
            color: #fff;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            word-break: break-all;
          ">0xd19a8132c4ab8a9fde0acffa786c3f8b01738ad7</div>
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
        this.showMainContent();
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

  showMainContent() {
    document.body.style.overflow = '';
    document.body.classList.add('auth-verified');
    const overlay = document.getElementById('passwordOverlay');
    if (overlay) {
      overlay.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PasswordProtection();
});