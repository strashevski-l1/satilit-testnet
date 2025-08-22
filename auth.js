class PasswordProtection {
  constructor() {
    this.checkAuthStatus();
    this.createPasswordForm();
  }

  checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    if (token === 'access_granted') {
      this.showMainContent();
    } else {
      this.showPasswordForm();
    }
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
    const overlay = document.getElementById('passwordOverlay');
    if (overlay) {
      overlay.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PasswordProtection();
});