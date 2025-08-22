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
                <!-- Большой баннер сверху точно как на скриншоте -->
                <div class="main-banner">
                    <div class="main-banner-bg"></div>
                    <img src="assets/bg-banner-desktop-Dl6I0ttm.webp" alt="Game Characters" class="banner-characters">
                </div>
                
                <!-- Два баннера снизу точно как на скриншоте -->
                <div class="bottom-banners">
                    <div class="bottom-banner casino-banner">
                        <div class="casino-bg"></div>
                        <div class="banner-icon casino-icon">
                            <div class="slot-machine">
                                <div class="slot-display">777</div>
                                <div class="slot-handle"></div>
                            </div>
                        </div>
                        <div class="banner-info">
                            <h3 class="banner-title">CASINO</h3>
                            <p class="banner-desc">We offer a comprehensive range of exciting casino games, including classic slots, video slots, table games, and live dealer options featuring real dealers and authentic casino atmosphere.</p>
                            <button class="banner-button purple-btn">Play now</button>
                        </div>
                    </div>
                    
                    <div class="bottom-banner sport-banner">
                        <div class="sport-bg"></div>
                        <div class="banner-icon sport-icon">
                            <div class="sport-balls">
                                <div class="soccer-ball"></div>
                                <div class="basketball"></div>
                            </div>
                        </div>
                        <div class="banner-info">
                            <h3 class="banner-title">SPORT BETTING</h3>
                            <p class="banner-desc">Here, you can bet on your favorite sports events from around the world. We offer extensive coverage, such as live bets and competitive odds.</p>
                            <button class="banner-button purple-btn">Place bets</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <style>
            .banner-section {
                padding: 0;
                background: #0d1421;
                min-height: 80vh;
            }
            
            .banner-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 15px;
                height: 80vh;
            }
            
            /* Большой баннер точно как на скриншоте */
            .main-banner {
                background: linear-gradient(135deg, #2a3b5c 0%, #1e2a44 50%, #0f1a2e 100%);
                border-radius: 12px;
                height: 65%;
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
            }
            
            .main-banner-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to right, rgba(42,59,92,0.8) 0%, rgba(42,59,92,0.3) 70%, transparent 100%);
                z-index: 2;
            }
            
            .banner-characters {
                position: absolute;
                right: -50px;
                top: 0;
                height: 120%;
                width: auto;
                z-index: 1;
                object-fit: contain;
            }
            
            /* Нижние баннеры точно как на скриншоте */
            .bottom-banners {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                height: 30%;
            }
            
            .bottom-banner {
                border-radius: 12px;
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                gap: 20px;
                padding: 25px;
            }
            
            /* Casino баннер */
            .casino-banner {
                background: linear-gradient(135deg, #8b1538 0%, #5d0e24 100%);
                position: relative;
            }
            
            .casino-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('assets/bg-banner-desktop-Dl6I0ttm.webp') no-repeat left center;
                background-size: cover;
                opacity: 0.15;
                z-index: 1;
            }
            
            /* Sport баннер */
            .sport-banner {
                background: linear-gradient(135deg, #1a3a7a 0%, #0f1e42 100%);
                position: relative;
            }
            
            .sport-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('assets/bg-banner-desktop-Dl6I0ttm.webp') no-repeat right center;
                background-size: cover;
                opacity: 0.15;
                z-index: 1;
            }
            
            /* Иконки точно как на скриншоте */
            .banner-icon {
                width: 80px;
                height: 80px;
                position: relative;
                z-index: 3;
                flex-shrink: 0;
            }
            
            /* Слот-машина */
            .slot-machine {
                width: 80px;
                height: 80px;
                background: linear-gradient(145deg, #ff6b35 0%, #f7931e 100%);
                border-radius: 8px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
            }
            
            .slot-display {
                background: #000;
                color: #00ff00;
                padding: 8px 12px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                font-weight: bold;
            }
            
            .slot-handle {
                position: absolute;
                right: -8px;
                top: 15px;
                width: 6px;
                height: 30px;
                background: #333;
                border-radius: 3px;
            }
            
            /* Спортивные мячи */
            .sport-balls {
                width: 80px;
                height: 80px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .soccer-ball {
                width: 35px;
                height: 35px;
                background: #fff;
                border-radius: 50%;
                position: relative;
                border: 2px solid #000;
            }
            
            .soccer-ball::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 12px;
                height: 12px;
                background: #000;
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            }
            
            .basketball {
                width: 30px;
                height: 30px;
                background: #d2691e;
                border-radius: 50%;
                position: relative;
            }
            
            .basketball::before {
                content: '';
                position: absolute;
                top: 2px;
                left: 50%;
                transform: translateX(-50%);
                width: 1px;
                height: 26px;
                background: #000;
            }
            
            .basketball::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 2px;
                transform: translateY(-50%);
                width: 26px;
                height: 1px;
                background: #000;
            }
            
            /* Текст и кнопки */
            .banner-info {
                flex: 1;
                z-index: 3;
                position: relative;
            }
            
            .banner-title {
                font-size: 18px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .banner-desc {
                font-size: 12px;
                color: #e0e0e0;
                line-height: 1.4;
                margin-bottom: 15px;
                opacity: 0.9;
            }
            
            .banner-button {
                background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
                color: #ffffff;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
            }
            
            .banner-button:hover {
                background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
            }
            
            @media (max-width: 768px) {
                .banner-container {
                    padding: 15px;
                    height: auto;
                    min-height: 80vh;
                }
                
                .main-banner {
                    height: 250px;
                }
                
                .banner-characters {
                    opacity: 0.6;
                    right: -100px;
                }
                
                .bottom-banners {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
                
                .bottom-banner {
                    padding: 20px;
                }
                
                .banner-icon {
                    width: 60px;
                    height: 60px;
                }
                
                .slot-machine {
                    width: 60px;
                    height: 60px;
                }
                
                .sport-balls {
                    width: 60px;
                    height: 60px;
                }
                
                .soccer-ball {
                    width: 28px;
                    height: 28px;
                }
                
                .basketball {
                    width: 24px;
                    height: 24px;
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