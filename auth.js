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