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
  
  container.innerHTML = `
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
        <section class="banner-grid">
            <div class="banner-container">
                <div class="banner-item casino-banner">
                    <div class="banner-content">
                        <div class="banner-icon">
                            <img src="assets/bg-banner-desktop-Dl6I0ttm.webp" alt="Casino" class="banner-image">
                        </div>
                        <div class="banner-text">
                            <h3 class="banner-title">CASINO</h3>
                            <p class="banner-description">We offer a comprehensive range of exciting casino games, including classic slots, video slots, table games, and live dealer options featuring real dealers and authentic casino atmosphere.</p>
                        </div>
                        <button class="banner-btn">Play now</button>
                    </div>
                </div>
                
                <div class="banner-item sport-banner">
                    <div class="banner-content">
                        <div class="banner-icon">
                            <img src="assets/sport-banner-DB5L_KsG.webp" alt="Sport Betting" class="banner-image">
                        </div>
                        <div class="banner-text">
                            <h3 class="banner-title">SPORT BETTING</h3>
                            <p class="banner-description">Here, you can bet on your favorite sports events from around the world. We offer extensive coverage, such as live bets and competitive odds.</p>
                        </div>
                        <button class="banner-btn">Place bets</button>
                    </div>
                </div>
                
                <div class="banner-item lobby-banner">
                    <div class="banner-content">
                        <div class="banner-icon">
                            <img src="assets/lobby-banner-CAFulc0X.webp" alt="Live Lobby" class="banner-image">
                        </div>
                        <div class="banner-text">
                            <h3 class="banner-title">LIVE LOBBY</h3>
                            <p class="banner-description">Experience the excitement of real-time gaming with professional dealers in our live casino lobby. Authentic atmosphere and interactive gameplay.</p>
                        </div>
                        <button class="banner-btn">Join lobby</button>
                    </div>
                </div>
            </div>
        </section>
        
        <style>
            .banner-grid {
                padding: 60px 20px 40px;
                background: var(--bg-dark);
                min-height: 80vh;
                display: flex;
                align-items: center;
            }
            
            .banner-container {
                max-width: 1200px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 30px;
                width: 100%;
            }
            
            .banner-item {
                background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,30,0.9) 100%);
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,0.1);
                padding: 30px;
                position: relative;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                min-height: 280px;
                display: flex;
                flex-direction: column;
            }
            
            .banner-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                border-color: rgba(255,255,255,0.2);
            }
            
            .casino-banner {
                background: linear-gradient(135deg, rgba(139,69,19,0.3) 0%, rgba(160,82,45,0.2) 100%);
            }
            
            .sport-banner {
                background: linear-gradient(135deg, rgba(25,25,112,0.3) 0%, rgba(72,61,139,0.2) 100%);
            }
            
            .lobby-banner {
                background: linear-gradient(135deg, rgba(75,0,130,0.3) 0%, rgba(138,43,226,0.2) 100%);
            }
            
            .banner-content {
                display: flex;
                flex-direction: column;
                height: 100%;
                position: relative;
                z-index: 2;
            }
            
            .banner-image {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 12px;
                margin-bottom: 20px;
                border: 2px solid rgba(255,255,255,0.1);
            }
            
            .banner-title {
                font-size: 24px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .banner-description {
                color: #b0b0b0;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 25px;
                flex-grow: 1;
            }
            
            .banner-btn {
                background: transparent;
                color: #ffffff;
                border: 2px solid rgba(255,255,255,0.3);
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.3s ease;
                align-self: flex-start;
            }
            
            .banner-btn:hover {
                background: #ffffff;
                color: #000000;
                border-color: #ffffff;
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .banner-container {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
                
                .banner-item {
                    padding: 25px;
                    min-height: 250px;
                }
                
                .banner-grid {
                    padding: 40px 15px 30px;
                    min-height: auto;
                }
            }
        </style>

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
  `;
  
  document.title = 'Сателлит Казино - Современная платформа азартных игр';
}