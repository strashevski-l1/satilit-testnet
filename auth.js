// Простая система аутентификации
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем токен при загрузке
  const token = localStorage.getItem('authToken');
  if (token === 'access_granted') {
    showSiteContent();
  } else {
    showLoginForm();
  }
});

function showLoginForm() {
  const container = document.getElementById('app-container');
  if (!container) return;
  
  container.innerHTML = `
    <div style="
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
        <form id="loginForm">
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
              id="passwordField"
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
        <div id="error" style="
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

  // Добавляем обработчик формы
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', handleLogin);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const password = document.getElementById('passwordField').value;
  const errorDiv = document.getElementById('error');
  
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('authToken', 'access_granted');
      showSiteContent();
    } else {
      errorDiv.textContent = 'Invalid password';
      errorDiv.style.display = 'block';
      document.getElementById('passwordField').value = '';
    }
  } catch (error) {
    errorDiv.textContent = 'Connection error';
    errorDiv.style.display = 'block';
  }
}

function showSiteContent() {
  const container = document.getElementById('app-container');
  if (!container) return;

  // External referral URL for logo and banner clicks
  const REF_URL = 'https://beonbet.com'; // adjust to your referral link if needed

  container.innerHTML = `
    <header class="header">
      <div class="nav-container">
        <div class="logo">
          <a href="${REF_URL}" target="_blank" rel="noopener noreferrer" aria-label="Go to BeonBet">
            <img class="logo-img" src="assets/logo-CAVS3gze.webp" alt="BeonBet Logo" />
          </a>
        </div>
        <ul class="nav-menu">
          <li><a class="nav-link" href="#/">Home</a></li>
          <li><a class="nav-link" href="#/bonuses">Bonuses</a></li>
        </ul>
        <div class="auth-buttons">
          <button class="btn btn-outline" id="loginBtn">Login</button>
          <button class="btn btn-primary" id="registerBtn">Register</button>
          <div class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div id="view-root"></div>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>BeonBet</h3>
            <p>Trusted online casino with secure play, generous bonuses, and 24/7 support. Licensed under Curacao eGaming.</p>
          </div>
          <div class="footer-section">
            <h4>Support</h4>
            <ul>
              <li>✉️ support@beonbet.example</li>
              <li>💬 Live chat: 24/7</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-legal">
            <p>&copy; 2025 BeonBet. All rights reserved.</p>
            <p class="academic-notice">This site is an academic project. Content is for demonstration only.</p>
          </div>
          <span class="age-restriction">18+</span>
        </div>
      </div>
    </footer>

    <!-- Login Modal -->
    <div id="loginModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="loginTitle">Login</h2>
          <span class="close" aria-label="Close">&times;</span>
        </div>
        <form class="modal-form" id="loginFormReal">
          <div class="form-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div class="form-checkbox">
            <input type="checkbox" id="rememberMe" />
            <label for="rememberMe">Remember me</label>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Login</button>
          <p class="form-text">Don't have an account? <a href="#" id="switchToRegister">Register</a></p>
        </form>
      </div>
    </div>

    <!-- Register Modal -->
    <div id="registerModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="registerTitle">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="registerTitle">Create Account</h2>
          <span class="close" aria-label="Close">&times;</span>
        </div>
        <form class="modal-form" id="registerFormReal">
          <div class="form-group">
            <input type="text" placeholder="Full name" required />
          </div>
          <div class="form-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div class="form-checkbox">
            <input type="checkbox" id="agreeTerms" required />
            <label for="agreeTerms">I am 18+ and accept Terms</label>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Create account</button>
          <p class="form-text">Already have an account? <a href="#" id="switchToLogin">Login</a></p>
        </form>
      </div>
    </div>
  `;

  function setMeta(title, description) {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }

  function renderHome() {
    const root = document.getElementById('view-root');
    if (!root) return;
    root.innerHTML = `
      <section class="banner-hero">
        <div class="container">
          <div class="banner-wrap">
            <a href="${REF_URL}" target="_blank" rel="noopener noreferrer" class="banner-link">
              <img class="banner-img banner-desktop" src="BeOnBet banners/EN/EN 728x90 Welcome bonus.png" alt="BeonBet Welcome Bonus 728x90" />
              <img class="banner-img banner-mobile" src="BeOnBet banners/EN/EN 300x250 Welcome bonus.png" alt="BeonBet Welcome Bonus 300x250" />
            </a>
            <p class="banner-note">Welcome Pack — 400% up to €2,150 + 300 FS</p>
          </div>
        </div>
      </section>
    `;

    setMeta(
      'BeonBet — Welcome Bonus',
      'Play at BeonBet. Claim your welcome pack and start today. Lightweight landing with banner only.'
    );
  }

  function renderBonuses() {
    const root = document.getElementById('view-root');
    if (!root) return;
    root.innerHTML = `
      <section class="content">
        <div class="container">
          <h1>Bonuses & Promotions</h1>
          <p class="meta-desc">Explore BeonBet welcome package and ongoing offers designed to maximize your playtime.</p>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Bonus</th><th>Details</th><th>Benefits</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Welcome Pack</td>
                  <td>Up to 400% match bonus + 300 free spins on first deposits</td>
                  <td>Big boost for new players</td>
                </tr>
                <tr>
                  <td>Reload Offers</td>
                  <td>Weekly deposit matches for active players</td>
                  <td>More balance, more play</td>
                </tr>
                <tr>
                  <td>Cashback</td>
                  <td>Percentage of net losses returned</td>
                  <td>Softer variance</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <a href="${REF_URL}" target="_blank" rel="noopener" class="btn btn-primary">Get Bonus</a>
          </p>
        </div>
      </section>
    `;

    setMeta(
      'BeonBet — Bonuses',
      'BeonBet Bonuses and Promotions: welcome pack, reloads, cashback.'
    );
  }

  function router() {
    const hash = (location.hash || '#/').replace('#', '');
    if (hash === '/' || hash === '') {
      renderHome();
    } else if (hash.startsWith('/bonuses')) {
      renderBonuses();
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', router);
  router();
}