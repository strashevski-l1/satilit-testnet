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
        <section class="banner-section">
            <div class="banner-container">
                <!-- Большой баннер сверху -->
                <div class="main-banner">
                    <div class="main-banner-bg"></div>
                    <div class="main-banner-content">
                        <h1 class="main-banner-title">ДОБРО ПОЖАЛОВАТЬ В МИР АЗАРТНЫХ ИГР</h1>
                        <p class="main-banner-subtitle">Современная платформа онлайн казино с лицензированными играми и честной игрой</p>
                    </div>
                    <!-- Персонажи как на скриншоте -->
                    <div class="banner-characters">
                        <img src="assets/bg-banner-desktop-Dl6I0ttm.webp" alt="Characters" class="characters-image">
                    </div>
                </div>
                
                <!-- Два маленьких баннера снизу -->
                <div class="small-banners">
                    <div class="small-banner casino-small">
                        <div class="small-banner-bg"></div>
                        <div class="small-banner-icon">🎰</div>
                        <div class="small-banner-content">
                            <h3 class="small-banner-title">CASINO</h3>
                            <p class="small-banner-description">We offer a comprehensive range of exciting casino games, including classic slots, video slots, table games, and live dealer options featuring real dealers.</p>
                            <button class="small-banner-btn">Play now</button>
                        </div>
                    </div>
                    
                    <div class="small-banner sport-small">
                        <div class="small-banner-bg"></div>
                        <div class="small-banner-icon">⚽</div>
                        <div class="small-banner-content">
                            <h3 class="small-banner-title">SPORT BETTING</h3>
                            <p class="small-banner-description">Here, you can bet on your favorite sports events from around the world. We offer extensive coverage, such as live bets and competitive odds.</p>
                            <button class="small-banner-btn">Place bets</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <style>
            .banner-section {
                padding: 0;
                background: var(--bg-dark);
                min-height: 80vh;
            }
            
            .banner-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                height: 80vh;
            }
            
            /* Большой баннер */
            .main-banner {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%);
                border-radius: 16px;
                height: 60%;
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                padding: 40px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            
            .main-banner-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('assets/bg-banner-desktop-Dl6I0ttm.webp') no-repeat center;
                background-size: cover;
                opacity: 0.3;
                z-index: 1;
            }
            
            .main-banner-content {
                position: relative;
                z-index: 2;
                max-width: 50%;
                color: white;
            }
            
            .main-banner-title {
                font-size: 36px;
                font-weight: 800;
                color: #ffffff;
                margin-bottom: 20px;
                text-transform: uppercase;
                letter-spacing: 2px;
                line-height: 1.2;
            }
            
            .main-banner-subtitle {
                font-size: 16px;
                color: #b0b0b0;
                line-height: 1.6;
                margin-bottom: 0;
            }
            
            .banner-characters {
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                width: 50%;
                z-index: 2;
            }
            
            .characters-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: right center;
            }
            
            /* Маленькие баннеры */
            .small-banners {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                height: 35%;
            }
            
            .small-banner {
                border-radius: 16px;
                position: relative;
                overflow: hidden;
                padding: 25px;
                display: flex;
                align-items: flex-start;
                gap: 20px;
                transition: transform 0.3s ease;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            }
            
            .small-banner:hover {
                transform: translateY(-3px);
            }
            
            .casino-small {
                background: linear-gradient(135deg, rgba(220,20,60,0.8) 0%, rgba(139,0,0,0.9) 100%);
            }
            
            .casino-small .small-banner-bg {
                background: url('assets/bg-banner-desktop-Dl6I0ttm.webp') no-repeat left center;
                background-size: cover;
                opacity: 0.2;
            }
            
            .sport-small {
                background: linear-gradient(135deg, rgba(25,25,112,0.8) 0%, rgba(72,61,139,0.9) 100%);
            }
            
            .sport-small .small-banner-bg {
                background: url('assets/bg-banner-desktop-Dl6I0ttm.webp') no-repeat right center;
                background-size: cover;
                opacity: 0.2;
            }
            
            .small-banner-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
            }
            
            .small-banner-icon {
                font-size: 32px;
                z-index: 2;
                position: relative;
            }
            
            .small-banner-content {
                flex: 1;
                z-index: 2;
                position: relative;
            }
            
            .small-banner-title {
                font-size: 18px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .small-banner-description {
                font-size: 13px;
                color: #e0e0e0;
                line-height: 1.4;
                margin-bottom: 15px;
            }
            
            .small-banner-btn {
                background: rgba(255,255,255,0.2);
                color: #ffffff;
                border: 1px solid rgba(255,255,255,0.3);
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .small-banner-btn:hover {
                background: #ffffff;
                color: #000000;
                border-color: #ffffff;
            }
            
            @media (max-width: 768px) {
                .banner-container {
                    padding: 15px;
                    height: auto;
                    min-height: 80vh;
                }
                
                .main-banner {
                    height: 300px;
                    padding: 30px 20px;
                }
                
                .main-banner-content {
                    max-width: 100%;
                }
                
                .main-banner-title {
                    font-size: 24px;
                }
                
                .main-banner-subtitle {
                    font-size: 14px;
                }
                
                .banner-characters {
                    opacity: 0.3;
                }
                
                .small-banners {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
                
                .small-banner {
                    padding: 20px;
                    flex-direction: column;
                    gap: 15px;
                    text-align: center;
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