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
      <div class="nav-container">
        <div class="logo">
          <img class="logo-img" src="assets/logo-CAVS3gze.webp" alt="BeonBet Logo" />
        </div>
        <ul class="nav-menu">
          <li><a class="nav-link" href="#home">Home</a></li>
          <li><a class="nav-link" href="#games">Games</a></li>
          <li><a class="nav-link" href="#bonuses">Bonuses</a></li>
          <li><a class="nav-link" href="#faq">FAQ</a></li>
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
      <section id="home" class="hero hero-banner">
        <div class="hero-bg-image" aria-hidden="true"></div>
        <div class="container hero-grid">
          <div class="promo-card" role="region" aria-label="Welcome bonus widget">
            <div class="promo-head">
              <img class="promo-logo" src="assets/logo-CAVS3gze.webp" alt="BeonBet" />
              <div>
                <h1 class="promo-title">Welcome Pack</h1>
                <p class="promo-sub">400% up to €2,150 + 300 FS</p>
              </div>
            </div>
            <form id="depositWidget" class="promo-form">
              <label class="form-label">Deposit Amount</label>
              <div class="amount-row">
                <button type="button" class="amount-btn amount-minus" aria-label="Decrease">−</button>
                <input type="number" id="depositAmount" value="50" min="10" step="10" aria-label="Amount" />
                <button type="button" class="amount-btn amount-plus" aria-label="Increase">+</button>
              </div>
              <div class="select-row">
                <select id="country" aria-label="Country">
                  <option value="EU" selected>Europe</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                </select>
                <select id="currency" aria-label="Currency">
                  <option value="EUR" selected>EUR</option>
                  <option value="USD">USD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
              <div class="bonus-row">
                <div class="bonus-label">Choose your bonus <a href="#" class="tnc">T&C</a></div>
                <select id="bonusPlan" aria-label="Bonus plan">
                  <option value="400" selected>Welcome Pack 400%</option>
                  <option value="150">Casino Welcome 1st Deposit 150%</option>
                  <option value="100">Sports First Bet 100%</option>
                </select>
              </div>
              <button id="getBonusBtn" class="btn btn-primary btn-full" type="button">Get €200.00</button>
              <div class="hero-ctas">
                <a href="#bonuses" class="btn btn-outline btn-full">View promotions</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section class="banner-tiles">
        <div class="container tiles-grid">
          <div class="tile-card">
            <h3>CASINO</h3>
            <p>We offer a vast selection of exciting casino games, including classic slots, video slots, table games, and live dealer games.</p>
            <button class="btn btn-outline">Play now</button>
          </div>
          <div class="tile-card">
            <h3>SPORT BETTING</h3>
            <p>Bet on your favorite sports from around the world. Enjoy attractive promotions like free bets and cashback offers.</p>
            <button class="btn btn-outline">Make bets</button>
          </div>
        </div>
      </section>

      <section class="content">
        <div class="container">
          <p class="meta-desc">Join BeonBet, the trusted online casino, for real money slots, thrilling table games, and immersive live dealer experiences. Claim your generous welcome bonus and enjoy a secure mobile casino adventure! BeonBet login for instant play.</p>

          <h2>Unleash the Thrill: Welcome to BeonBet Online Casino</h2>
          <p>Step into the electrifying world of BeonBet online casino, where every moment is packed with excitement and the potential for incredible real money casino wins. We invite you to play casino online at a platform crafted for both seasoned enthusiasts and newcomers alike. BeonBet redefines online gaming, offering a secure, exhilarating, and fair environment designed for unparalleled entertainment. Get ready to discover a universe of premium casino games and generous rewards, all accessible right from your device.</p>

          <h2>Why Choose BeonBet? A Legacy of Trust and Innovation</h2>
          <p>Since its inception, BeonBet has quickly risen as a beacon in the online gambling industry, built on a foundation of integrity and a player-first approach. We are committed to providing a fully secure casino experience, employing advanced encryption technologies to protect your data and transactions. As a licensed casino operating under the strict regulations of Curacao eGaming, BeonBet guarantees transparent operations and fair play, cementing our reputation as a trusted casino where you can play with absolute confidence.</p>
          <blockquote>
            "At BeonBet, player security and fair play aren't just features; they're the core of everything we do. We strive to create an environment where every spin is a joy, and every win is well-deserved."
          </blockquote>

          <h2>Dive into a World of Unrivaled Casino Games</h2>
          <p>BeonBet boasts an expansive and continually growing library of casino games, meticulously curated to cater to every preference and skill level. Whether you seek the rush of the reels or the strategic depth of card games, your perfect match awaits.</p>
          <ul>
            <li><strong>Online Slots Extravaganza:</strong> Spin your way to big wins with our incredible selection of online slots, ranging from timeless classics to the latest video slots with breathtaking graphics and innovative bonus features. Chase life-altering jackpots on titles designed to deliver thrilling big wins with every spin.</li>
            <li><strong>Classic Table Game Perfection:</strong> Challenge your skills at our virtual tables, offering a comprehensive selection of Blackjack, Roulette, Baccarat, and Poker variants. Experience the elegance and strategy of these timeless favorites.</li>
            <li><strong>Immersive Live Dealer Experiences:</strong> For the ultimate authentic feel, immerse yourself in our Live dealer games. Interact with professional croupiers in real-time as you enjoy live-streamed Blackjack, Roulette, and other classics, replicating the vibrant atmosphere of a land-based casino from the comfort of your home.</li>
            <li><strong>Unique Specialty Games:</strong> Looking for something different? Our selection of specialty games, including engaging scratch cards and virtual sports, offers quick thrills and instant winning opportunities.</li>
          </ul>

          <h2>Unlock Your Potential with Exclusive BeonBet Bonuses</h2>
          <p>Your journey at BeonBet is supercharged from the start with our array of exceptionally generous casino bonuses and promotions. Designed for both new players and loyal enthusiasts, our offers maximize your playtime and enhance your chances of hitting it big.</p>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Bonus Type</th>
                  <th>Description</th>
                  <th>Key Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Welcome Bonus</td>
                  <td>Substantial match bonus on your first deposit, plus abundant free spins.</td>
                  <td>Massive boost for new players.</td>
                </tr>
                <tr>
                  <td>Reload Bonuses</td>
                  <td>Consistent match bonuses on subsequent deposits throughout the week.</td>
                  <td>Keeps your bankroll topped up.</td>
                </tr>
                <tr>
                  <td>Free Spins Offers</td>
                  <td>Regular bundles of free spins on popular online slots.</td>
                  <td>Explore new games or enjoy favorites on us.</td>
                </tr>
                <tr>
                  <td>Cashback Rewards</td>
                  <td>A percentage of your losses returned, offering a safety net.</td>
                  <td>Reduces risk and gives a second chance.</td>
                </tr>
                <tr>
                  <td>Loyalty Program</td>
                  <td>Earn points for every bet, redeemable for exclusive rewards and perks.</td>
                  <td>Rewarding consistent play.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <blockquote>
            "At BeonBet, we believe in rewarding every player. Our bonus structure is designed to give you more chances to win, making every gaming session an adventure."
          </blockquote>

          <h2>Seamless Gaming, Anywhere, Anytime: The BeonBet Mobile Casino</h2>
          <p>Experience unparalleled freedom with the BeonBet mobile casino. Our platform is meticulously optimized for all modern smartphones and tablets, offering a fluid and intuitive gaming experience directly through your web browser. No downloads, no apps – just instant access to your favorite casino games on the go. Whether you're on iOS or Android, the full thrill of BeonBet is always just a tap away, ensuring you never miss out on the action.</p>

          <hr style="border: none; border-top: 1px solid var(--glass-border); margin: 30px 0;" />

          <h2>Start Your Winning Journey: BeonBet Login & Registration</h2>
          <p>Ready to join the excitement? Creating your casino account at BeonBet is straightforward and secure. Click "Register" to begin your seamless casino registration process, and you'll soon be ready to explore our vast universe of games. For our returning members, your BeonBet login provides instant access to your personalized gaming hub.</p>
          <p>At BeonBet, your peace of mind is paramount. Our dedicated player support team is available 24/7 to assist with any queries, ensuring a smooth and enjoyable experience. We also champion responsible gaming, providing tools and resources to help you play safely and within your limits. Join the ranks of satisfied players and discover why BeonBet is quickly becoming the go-to destination for elite online casino entertainment.</p>
          <p>
            <button class="btn btn-primary" id="registerCta">Join BeonBet Now!</button>
            <button class="btn btn-outline" id="loginCta">BeonBet Login</button>
          </p>
        </div>
      </section>

      <section id="games" class="games">
        <div class="container">
          <h2 class="section-title">Popular Games</h2>
          <div class="games-grid">
            <div class="slot-card" data-slot="1">
              <div class="slot-image"><div class="slot-placeholder">SLOT 1</div></div>
              <div class="slot-info">
                <h4>Jackpot Legends</h4>
                <p>RTP: 96.5%</p>
              </div>
            </div>
            <div class="slot-card" data-slot="2">
              <div class="slot-image"><div class="slot-placeholder">SLOT 2</div></div>
              <div class="slot-info">
                <h4>Roulette Royale</h4>
                <p>Classic table excitement</p>
              </div>
            </div>
            <div class="slot-card" data-slot="3">
              <div class="slot-image"><div class="slot-placeholder">SLOT 3</div></div>
              <div class="slot-info">
                <h4>Blackjack Pro</h4>
                <p>Strategy meets thrill</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="bonuses" class="bonuses">
        <div class="container">
          <h2 class="section-title">Bonuses & Promotions</h2>
          <div class="bonuses-grid">
            <div class="bonus-card featured">
              <div class="bonus-badge">Top Offer</div>
              <h3>Welcome Bonus</h3>
              <div class="bonus-amount">200%</div>
              <p>up to $500 + 100 Free Spins</p>
              <ul class="bonus-features">
                <li>✓ 1st deposit match</li>
                <li>✓ Free spins on popular slots</li>
                <li>✓ Fair wagering</li>
              </ul>
              <button class="btn btn-primary" id="bonusClaimBtn">Claim Bonus</button>
            </div>
            <div class="bonus-card">
              <h3>Weekly Cashback</h3>
              <div class="bonus-amount">15%</div>
              <p>Automatic returns on net losses</p>
              <ul class="bonus-features">
                <li>✓ Every Monday</li>
                <li>✓ No wagering</li>
                <li>✓ Instant credit</li>
              </ul>
              <button class="btn btn-outline">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" class="faq">
        <div class="container">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <div class="faq-list">
            <div class="faq-item">
              <div class="faq-question">
                <h3>Is BeonBet a licensed and safe online casino?</h3>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer"><div>
                <p>Yes, absolutely. BeonBet is a fully licensed casino, regulated by Curacao eGaming. We employ advanced security measures, including SSL encryption, to ensure your data and transactions are always secure, making us a trusted casino.</p>
              </div></div>
            </div>
            <div class="faq-item">
              <div class="faq-question">
                <h3>What types of games can I play at BeonBet?</h3>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer"><div>
                <p>We offer a vast array of casino games, including hundreds of online slots, classic table games like Blackjack, Roulette, and Baccarat, immersive Live dealer games, progressive jackpots, and unique specialty games like scratch cards.</p>
              </div></div>
            </div>
            <div class="faq-item">
              <div class="faq-question">
                <h3>Does BeonBet offer welcome bonuses?</h3>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer"><div>
                <p>Yes! New players at BeonBet are greeted with a generous welcome bonus package, often including a significant match bonus and free spins. Be sure to check our "Promotions" page for the latest offers.</p>
              </div></div>
            </div>
            <div class="faq-item">
              <div class="faq-question">
                <h3>Can I play BeonBet casino games on my mobile device?</h3>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer"><div>
                <p>Definitely. Our mobile casino is fully optimized for iOS and Android devices, allowing you to enjoy most of our casino games directly through your mobile browser without any downloads.</p>
              </div></div>
            </div>
            <div class="faq-item">
              <div class="faq-question">
                <h3>How do I register and log in to my BeonBet account?</h3>
                <div class="faq-icon">+</div>
              </div>
              <div class="faq-answer"><div>
                <p>You can easily complete your casino registration by clicking the "Sign Up" button on our homepage. Once registered, simply use your credentials for your BeonBet login to access your account and start playing.</p>
              </div></div>
            </div>
          </div>
        </div>
      </section>
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

    <!-- JSON-LD FAQ Schema -->
    <script type="application/ld+json">
      ${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is BeonBet a licensed and safe online casino?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, absolutely. BeonBet is a fully licensed casino, regulated by Curacao eGaming. We employ advanced security measures, including SSL encryption, to ensure your data and transactions are always secure, making us a trusted casino.'
            }
          },
          {
            '@type': 'Question',
            name: 'What types of games can I play at BeonBet?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We offer a vast array of casino games, including hundreds of online slots, classic table games like Blackjack, Roulette, and Baccarat, immersive Live dealer games, progressive jackpots, and unique specialty games like scratch cards.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does BeonBet offer welcome bonuses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes! New players at BeonBet are greeted with a generous welcome bonus package, often including a significant match bonus and free spins. Be sure to check our 'Promotions' page for the latest offers."
            }
          },
          {
            '@type': 'Question',
            name: 'Can I play BeonBet casino games on my mobile device?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Definitely. Our mobile casino is fully optimized for iOS and Android devices, allowing you to enjoy most of our casino games directly through your mobile browser without any downloads.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I register and log in to my BeonBet account?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "You can easily complete your casino registration by clicking the 'Sign Up' button on our homepage. Once registered, simply use your credentials for your BeonBet login to access your account and start playing."
            }
          }
        ]
      })}
    </script>

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
  
  document.title = 'BeonBet Casino: Play Online Slots — Get Your Welcome Bonus';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'Join BeonBet, the trusted online casino, for real money slots, thrilling table games, and immersive live dealer experiences. Claim your generous welcome bonus and enjoy a secure mobile casino adventure! BeonBet login for instant play.');
  }

  // Wire CTAs to modals
  document.getElementById('registerCta')?.addEventListener('click', () => document.getElementById('registerBtn')?.click());
  document.getElementById('loginCta')?.addEventListener('click', () => document.getElementById('loginBtn')?.click());
}