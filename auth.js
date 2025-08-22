class PasswordProtection {
  constructor() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    if (token === 'access_granted') {
      this.showMainContent();
    } else {
      this.createPasswordForm();
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


  showMainContent() {
    document.body.style.overflow = '';
    const overlay = document.getElementById('passwordOverlay');
    if (overlay) {
      overlay.remove();
    }
    
    // Вставляем весь контент сайта
    const siteContent = \`
    <header class="header">
        <nav class="nav">
            <div class="nav-container">
                <div class="logo">
                    <h1>САТЕЛЛИТ</h1>
                </div>
                <ul class="nav-menu">
                    <li><a href="#home" class="nav-link">Главная</a></li>
                    <li><a href="#games" class="nav-link">Игры</a></li>
                    <li><a href="#bonuses" class="nav-link">Бонусы</a></li>
                    <li><a href="#about" class="nav-link">О нас</a></li>
                    <li><a href="#contacts" class="nav-link">Контакты</a></li>
                </ul>
                <div class="auth-buttons">
                    <button class="btn btn-outline" id="loginBtn">Войти</button>
                    <button class="btn btn-primary" id="registerBtn">Регистрация</button>
                </div>
                <div class="hamburger" id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="hero-content">
                <h1 class="hero-title">Добро пожаловать в мир азартных игр</h1>
                <p class="hero-subtitle">Современная платформа онлайн казино с лицензированными играми и честной игрой</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary btn-large" id="startPlayingBtn">Начать играть</button>
                    <button class="btn btn-outline btn-large" id="learnMoreBtn">Узнать больше</button>
                </div>
            </div>
            <div class="hero-bg">
                <div class="floating-card card-1"></div>
                <div class="floating-card card-2"></div>
                <div class="floating-card card-3"></div>
            </div>
        </section>

        <section class="advantages">
            <div class="container">
                <h2 class="section-title">Наши преимущества</h2>
                <div class="advantages-grid">
                    <div class="advantage-card">
                        <div class="advantage-icon">🛡️</div>
                        <h3>Безопасность</h3>
                        <p>Лицензированная платформа с шифрованием данных и защитой средств игроков</p>
                    </div>
                    <div class="advantage-card">
                        <div class="advantage-icon">⚡</div>
                        <h3>Быстрые выплаты</h3>
                        <p>Мгновенные депозиты и быстрые выводы средств на все популярные платежные системы</p>
                    </div>
                    <div class="advantage-card">
                        <div class="advantage-icon">🎯</div>
                        <h3>Честная игра</h3>
                        <p>Генератор случайных чисел сертифицирован международными организациями</p>
                    </div>
                    <div class="advantage-card">
                        <div class="advantage-icon">🎁</div>
                        <h3>Щедрые бонусы</h3>
                        <p>Приветственные бонусы, акции и программа лояльности для постоянных игроков</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="games" class="games">
            <div class="container">
                <h2 class="section-title">Популярные игры</h2>
                <div class="games-grid">
                    <div class="slot-card" data-slot="1">
                        <div class="slot-image">
                            <div class="slot-placeholder">СЛОТ 1</div>
                        </div>
                        <div class="slot-info">
                            <h4>Космические приключения</h4>
                            <p>RTP: 96.5%</p>
                        </div>
                    </div>
                    <div class="slot-card" data-slot="2">
                        <div class="slot-image">
                            <div class="slot-placeholder">СЛОТ 2</div>
                        </div>
                        <div class="slot-info">
                            <h4>Сокровища пиратов</h4>
                            <p>RTP: 95.8%</p>
                        </div>
                    </div>
                    <div class="slot-card" data-slot="3">
                        <div class="slot-image">
                            <div class="slot-placeholder">СЛОТ 3</div>
                        </div>
                        <div class="slot-info">
                            <h4>Фруктовый взрыв</h4>
                            <p>RTP: 96.2%</p>
                        </div>
                    </div>
                    <div class="slot-card" data-slot="4">
                        <div class="slot-image">
                            <div class="slot-placeholder">СЛОТ 4</div>
                        </div>
                        <div class="slot-info">
                            <h4>Египетские тайны</h4>
                            <p>RTP: 97.1%</p>
                        </div>
                    </div>
                    <div class="slot-card" data-slot="5">
                        <div class="slot-image">
                            <div class="slot-placeholder">СЛОТ 5</div>
                        </div>
                        <div class="slot-info">
                            <h4>Дикий запад</h4>
                            <p>RTP: 96.0%</p>
                        </div>
                    </div>
                    <div class="slot-card" data-slot="6">
                        <div class="slot-image">
                            <div class="slot-placeholder">СЛОТ 6</div>
                        </div>
                        <div class="slot-info">
                            <h4>Алмазная лихорадка</h4>
                            <p>RTP: 95.9%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="bonuses" class="bonuses">
            <div class="container">
                <h2 class="section-title">Бонусы и акции</h2>
                <div class="bonuses-grid">
                    <div class="bonus-card featured">
                        <div class="bonus-badge">Популярное</div>
                        <h3>Приветственный бонус</h3>
                        <div class="bonus-amount">200%</div>
                        <p>до 50 000 рублей + 100 фриспинов</p>
                        <ul class="bonus-features">
                            <li>✓ Бонус на первый депозит</li>
                            <li>✓ Фриспины на популярные слоты</li>
                            <li>✓ Вейджер x35</li>
                        </ul>
                        <button class="btn btn-primary">Получить бонус</button>
                    </div>
                    <div class="bonus-card">
                        <h3>Еженедельный кэшбэк</h3>
                        <div class="bonus-amount">15%</div>
                        <p>возврат проигранных средств</p>
                        <ul class="bonus-features">
                            <li>✓ Каждый понедельник</li>
                            <li>✓ Без отыгрыша</li>
                            <li>✓ Автоматическое начисление</li>
                        </ul>
                        <button class="btn btn-outline">Узнать больше</button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer id="contacts" class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>САТЕЛЛИТ</h3>
                    <p>Современное онлайн казино с честной игрой и быстрыми выплатами. Лицензия Кюрасао №365/JAZ.</p>
                </div>
                <div class="footer-section">
                    <h4>Поддержка</h4>
                    <ul>
                        <li>📧 support@satellite-casino.com</li>
                        <li>📞 +7 (800) 123-45-67</li>
                        <li>💬 Онлайн чат: 24/7</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Сателлит Казино. Все права защищены.</p>
                <p class="academic-notice">Данный сайт создан в академических целях.</p>
                <span class="age-restriction">18+</span>
            </div>
        </div>
    </footer>

    <!-- Модальные окна -->
    <div id="loginModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Вход в аккаунт</h2>
                <span class="close">&times;</span>
            </div>
            <form class="modal-form">
                <div class="form-group">
                    <input type="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Пароль" required>
                </div>
                <button type="submit" class="btn btn-primary btn-full">Войти</button>
                <p class="form-text">
                    Нет аккаунта? <a href="#" id="switchToRegister">Зарегистрироваться</a>
                </p>
            </form>
        </div>
    </div>

    <div id="registerModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Регистрация</h2>
                <span class="close">&times;</span>
            </div>
            <form class="modal-form">
                <div class="form-group">
                    <input type="text" placeholder="Имя" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Пароль" required>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Подтвердите пароль" required>
                </div>
                <div class="form-checkbox">
                    <input type="checkbox" id="terms" required>
                    <label for="terms">Я согласен с правилами и условиями</label>
                </div>
                <button type="submit" class="btn btn-primary btn-full">Зарегистрироваться</button>
                <p class="form-text">
                    Уже есть аккаунт? <a href="#" id="switchToLogin">Войти</a>
                </p>
            </form>
        </div>
    </div>
    \`;
    
    document.getElementById('app-container').innerHTML = siteContent;
    document.title = 'Сателлит Казино - Современная платформа азартных игр';
    document.body.classList.remove('auth-verified');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    new PasswordProtection();
  } catch (error) {
    console.error('Ошибка инициализации:', error);
    // Показываем форму напрямую если есть ошибка
    document.getElementById('app-container').innerHTML = `
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
          <form onsubmit="handleAuth(event)">
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
                id="simplePasswordInput"
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
  }
});

// Простая функция аутентификации
async function handleAuth(event) {
  event.preventDefault();
  const password = document.getElementById('simplePasswordInput').value;
  
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
      loadSiteContent();
    } else {
      alert('Неверный пароль');
    }
  } catch (error) {
    alert('Ошибка подключения к серверу');
  }
}

// Загрузка контента сайта
function loadSiteContent() {
  const siteContent = \`
    <header class="header">
        <nav class="nav">
            <div class="nav-container">
                <div class="logo">
                    <h1>САТЕЛЛИТ</h1>
                </div>
                <ul class="nav-menu">
                    <li><a href="#home" class="nav-link">Главная</a></li>
                    <li><a href="#games" class="nav-link">Игры</a></li>
                    <li><a href="#bonuses" class="nav-link">Бонусы</a></li>
                    <li><a href="#about" class="nav-link">О нас</a></li>
                    <li><a href="#contacts" class="nav-link">Контакты</a></li>
                </ul>
                <div class="auth-buttons">
                    <button class="btn btn-outline" id="loginBtn">Войти</button>
                    <button class="btn btn-primary" id="registerBtn">Регистрация</button>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="hero-content">
                <h1 class="hero-title">Добро пожаловать в мир азартных игр</h1>
                <p class="hero-subtitle">Современная платформа онлайн казино с лицензированными играми и честной игрой</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary btn-large">Начать играть</button>
                    <button class="btn btn-outline btn-large">Узнать больше</button>
                </div>
            </div>
        </section>

        <section class="advantages">
            <div class="container">
                <h2 class="section-title">Наши преимущества</h2>
                <div class="advantages-grid">
                    <div class="advantage-card">
                        <div class="advantage-icon">🛡️</div>
                        <h3>Безопасность</h3>
                        <p>Лицензированная платформа с шифрованием данных</p>
                    </div>
                    <div class="advantage-card">
                        <div class="advantage-icon">⚡</div>
                        <h3>Быстрые выплаты</h3>
                        <p>Мгновенные депозиты и быстрые выводы средств</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Сателлит Казино. Все права защищены.</p>
        </div>
    </footer>
  \`;
  
  document.getElementById('app-container').innerHTML = siteContent;
  document.title = 'Сателлит Казино - Современная платформа азартных игр';
}