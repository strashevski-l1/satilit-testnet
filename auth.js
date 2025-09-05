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

  // i18n setup
  const REGION_TO_LANG = { DE: 'DE', AT: 'DE', CH: 'DE', IT: 'IT', AU: 'EN', CA: 'EN', GR: 'GR', PT: 'PT', NO: 'NO', FI: 'FI', DK: 'DK' };
  const SUPPORTED = ['EN','DE','IT','GR','PT','NO','FI','DK'];
  function getInitialLocale() {
    const saved = localStorage.getItem('locale');
    if (saved && (SUPPORTED.includes(saved) || Object.keys(REGION_TO_LANG).includes(saved))) return saved;
    return 'EN';
  }
  let LOCALE = getInitialLocale();

  // Minimal translation map (UI chrome + headings/labels). Body paragraphs remain EN fallback unless extended.
  const I18N = {
    EN: {
      navHome: 'Home', navBonuses: 'Bonuses', navReviews: 'Reviews', navWithdraw: 'Withdraw', navSlots: 'Slots', navSports: 'Sports', navLive: 'Live Casino', login: 'Login', register: 'Register',
      bannerNote: 'Welcome Pack — 400% up to €2,150 + 300 FS',
      depositAmount: 'Deposit Amount', chooseBonus: 'Choose your bonus', terms: 'T&C', getPrefix: 'Get',
      heroTitle: 'Welcome Pack', heroSub: '400% up to €2,150 + 300 FS',
      metaHomeTitle: 'BeonBet — Welcome Bonus', metaHomeDesc: 'Play at BeonBet. Claim your welcome pack and start today. Lightweight landing with banner only.',
      metaBonusesTitle: 'BeonBet — Bonuses', metaBonusesDesc: 'BeonBet Bonuses and Promotions: welcome pack, reloads, cashback.',
      faqTitle: 'Frequently Asked Questions',
      faq: [
        ['Is BeonBet a licensed and safe online casino?','Yes, absolutely. BeonBet is a fully licensed casino, regulated by Curacao eGaming. We employ advanced security measures, including SSL encryption, to ensure your data and transactions are always secure, making us a trusted casino.'],
        ['What types of games can I play at BeonBet?','We offer a vast array of casino games, including hundreds of online slots, classic table games like Blackjack, Roulette, and Baccarat, immersive Live dealer games, progressive jackpots, and unique specialty games like scratch cards.'],
        ['Does BeonBet offer welcome bonuses?','Yes! New players at BeonBet are greeted with a generous welcome bonus package, often including a significant match bonus and free spins. Be sure to check our "Promotions" page for the latest offers.'],
        ['Can I play BeonBet casino games on my mobile device?','Definitely. Our mobile casino is fully optimized for iOS and Android devices, allowing you to enjoy most of our casino games directly through your mobile browser without any downloads.'],
        ['How do I register and log in to my BeonBet account?','You can easily complete your casino registration by clicking the "Sign Up" button on our homepage. Once registered, simply use your credentials for your BeonBet login to access your account and start playing.']
      ],
      joinNow: 'Join BeonBet Now!', beonbetLogin: 'BeonBet Login',
      bonusesH1: 'Bonuses & Promotions', bonusesIntro: 'Explore BeonBet welcome package and ongoing offers designed to maximize your playtime.',
      bonusTableHead: ['Bonus','Details','Benefits'],
      bonusRows: [
        ['Welcome Pack','Up to 400% match bonus + 300 free spins on first deposits','Big boost for new players'],
        ['Reload Offers','Weekly deposit matches for active players','More balance, more play'],
        ['Cashback','Percentage of net losses returned','Softer variance']
      ],
      getBonus: 'Get Bonus'
    },
    DE: {
      navHome: 'Start', navBonuses: 'Boni', navReviews: 'Bewertungen', navWithdraw: 'Auszahlung', navSlots: 'Slots', navSports: 'Sport', navLive: 'Live Casino', login: 'Anmelden', register: 'Registrieren',
      bannerNote: 'Willkommenspaket — 400% bis zu 2.150 € + 300 FS',
      depositAmount: 'Einzahlungsbetrag', chooseBonus: 'Bonus wählen', terms: 'AGB', getPrefix: 'Erhalte',
      heroTitle: 'Willkommenspaket', heroSub: '400% bis zu 2.150 € + 300 FS',
      faqTitle: 'Häufige Fragen',
      joinNow: 'Jetzt BeonBet beitreten!', beonbetLogin: 'BeonBet Login',
      bonusesH1: 'Boni & Aktionen', bonusesIntro: 'Entdecke Willkommenspakete und laufende Angebote.',
      bonusTableHead: ['Bonus','Details','Vorteile'],
      bonusRows: [
        ['Willkommenspaket','Bis zu 400% + 300 Freispiele','Großer Startvorteil'],
        ['Reload-Angebote','Wöchentliche Einzahlungsboni','Mehr Guthaben, mehr Spiel'],
        ['Cashback','Prozentsatz der Nettverluste zurück','Sanftere Varianz']
      ],
      getBonus: 'Bonus erhalten'
    },
  IT: { navHome: 'Home', navBonuses: 'Bonus', navReviews: 'Recensioni', navWithdraw: 'Prelievo', navSlots: 'Slot', navSports: 'Sport', navLive: 'Live Casino', login: 'Accedi', register: 'Registrati', bannerNote: 'Pacchetto benvenuto — 400% fino a €2.150 + 300 FS', depositAmount: 'Importo deposito', chooseBonus: 'Scegli il bonus', terms: 'T&C', getPrefix: 'Ottieni', heroTitle: 'Pacchetto benvenuto', heroSub: '400% fino a €2.150 + 300 FS', faqTitle: 'Domande frequenti', joinNow: 'Unisciti a BeonBet ora!', beonbetLogin: 'Accesso BeonBet', bonusesH1: 'Bonus e Promozioni', bonusesIntro: 'Scopri i pacchetti e le offerte in corso.', bonusTableHead: ['Bonus','Dettagli','Vantaggi'], bonusRows: [['Pacchetto benvenuto','Fino al 400% + 300 giri gratuiti','Grande spinta iniziale'],['Ricariche','Bonus settimanali sui depositi','Più saldo, più gioco'],['Cashback','Percentuale di perdite nette restituita','Varianza più morbida']], getBonus: 'Ottieni Bonus' },
  GR: { navHome: 'Αρχική', navBonuses: 'Μπόνους', navReviews: 'Αξιολογήσεις', navWithdraw: 'Ανάληψη', navSlots: 'Φρουτάκια', navSports: 'Αθλητικά', navLive: 'Ζωντανό Καζίνο', login: 'Σύνδεση', register: 'Εγγραφή', bannerNote: 'Πακέτο καλωσορίσματος — 400% έως €2.150 + 300 FS', depositAmount: 'Ποσό κατάθεσης', chooseBonus: 'Επιλέξτε μπόνους', terms: 'Όροι', getPrefix: 'Λάβετε', heroTitle: 'Πακέτο καλωσορίσματος', heroSub: '400% έως €2.150 + 300 FS', faqTitle: 'Συχνές ερωτήσεις', joinNow: 'Γίνε μέλος τώρα!', beonbetLogin: 'Σύνδεση BeonBet', bonusesH1: 'Μπόνους & Προσφορές', bonusesIntro: 'Εξερευνήστε το πακέτο καλωσορίσματος και προσφορές.', bonusTableHead: ['Μπόνους','Λεπτομέρειες','Οφέλη'], bonusRows: [['Πακέτο καλωσορίσματος','Έως 400% + 300 δωρεάν περιστροφές','Μεγάλη αρχική ώθηση'],['Επαναφορτώσεις','Εβδομαδιαία μπόνους καταθέσεων','Περισσότερο υπόλοιπο, περισσότερο παιχνίδι'],['Cashback','Ποσοστό επιστροφής ζημιών','Ήπια διακύμανση']], getBonus: 'Λήψη Μπόνους' },
  PT: { navHome: 'Início', navBonuses: 'Bónus', navReviews: 'Avaliações', navWithdraw: 'Levantamento', navSlots: 'Slots', navSports: 'Desporto', navLive: 'Casino Ao Vivo', login: 'Entrar', register: 'Registar', bannerNote: 'Pacote de boas-vindas — 400% até €2.150 + 300 FS', depositAmount: 'Montante do depósito', chooseBonus: 'Escolher bónus', terms: 'T&C', getPrefix: 'Obter', heroTitle: 'Pacote de boas-vindas', heroSub: '400% até €2.150 + 300 FS', faqTitle: 'Perguntas frequentes', joinNow: 'Junte-se à BeonBet agora!', beonbetLogin: 'Login BeonBet', bonusesH1: 'Bónus e Promoções', bonusesIntro: 'Explore os pacotes e ofertas.', bonusTableHead: ['Bónus','Detalhes','Vantagens'], bonusRows: [['Pacote de boas-vindas','Até 400% + 300 rodadas grátis','Grande impulso inicial'],['Ofertas de recarga','Bónus semanais de depósito','Mais saldo, mais jogo'],['Cashback','Percentagem das perdas devolvida','Menor variância']], getBonus: 'Obter Bónus' },
  NO: { navHome: 'Hjem', navBonuses: 'Bonuser', navReviews: 'Anmeldelser', navWithdraw: 'Uttak', navSlots: 'Slots', navSports: 'Sport', navLive: 'Live Casino', login: 'Logg inn', register: 'Registrer', bannerNote: 'Velkomstpakke — 400% opptil €2.150 + 300 FS', depositAmount: 'Innskuddsbeløp', chooseBonus: 'Velg bonus', terms: 'Vilkår', getPrefix: 'Få', heroTitle: 'Velkomstpakke', heroSub: '400% opptil €2.150 + 300 FS', faqTitle: 'Ofte stilte spørsmål', joinNow: 'Bli med nå!', beonbetLogin: 'BeonBet Innlogging', bonusesH1: 'Bonuser og kampanjer', bonusesIntro: 'Utforsk pakker og tilbud.', bonusTableHead: ['Bonus','Detaljer','Fordeler'], bonusRows: [['Velkomstpakke','Opptil 400% + 300 gratisspinn','Stor startfordel'],['Påfyllstilbud','Ukentlige innskuddsbonuser','Mer saldo, mer spill'],['Cashback','Prosent av netto tap tilbake','Mykere varians']], getBonus: 'Få Bonus' },
  FI: { navHome: 'Koti', navBonuses: 'Bonukset', navReviews: 'Arvostelut', navWithdraw: 'Nosto', navSlots: 'Kolikkopelit', navSports: 'Urheilu', navLive: 'Live-kasino', login: 'Kirjaudu', register: 'Rekisteröidy', bannerNote: 'Tervetuliaispaketti — 400% jopa €2 150 + 300 FS', depositAmount: 'Talletussumma', chooseBonus: 'Valitse bonus', terms: 'Ehdot', getPrefix: 'Hanki', heroTitle: 'Tervetuliaispaketti', heroSub: '400% jopa €2 150 + 300 FS', faqTitle: 'Usein kysytyt kysymykset', joinNow: 'Liity nyt!', beonbetLogin: 'BeonBet Kirjautuminen', bonusesH1: 'Bonukset ja kampanjat', bonusesIntro: 'Tutustu tarjouksiin.', bonusTableHead: ['Bonus','Tiedot','Hyödyt'], bonusRows: [['Tervetuliaispaketti','Jopa 400% + 300 ilmaiskierrosta','Suuri aloitusetu'],['Latausbonukset','Viikoittaiset talletusbonukset','Enemmän saldoa, enemmän peliä'],['Cashback','Osa nettotappioista takaisin','Pehmeämpi varianssi']], getBonus: 'Hanki Bonus' },
  DK: { navHome: 'Hjem', navBonuses: 'Bonusser', navReviews: 'Anmeldelser', navWithdraw: 'Udbetaling', navSlots: 'Slots', navSports: 'Sport', navLive: 'Live Casino', login: 'Log ind', register: 'Registrér', bannerNote: 'Velkomstpakke — 400% op til €2.150 + 300 FS', depositAmount: 'Indbetalingsbeløb', chooseBonus: 'Vælg bonus', terms: 'Vilkår', getPrefix: 'Få', heroTitle: 'Velkomstpakke', heroSub: '400% op til €2.150 + 300 FS', faqTitle: 'Ofte stillede spørgsmål', joinNow: 'Deltag nu!', beonbetLogin: 'BeonBet Login', bonusesH1: 'Bonusser & Kampagner', bonusesIntro: 'Udforsk pakker og tilbud.', bonusTableHead: ['Bonus','Detaljer','Fordele'], bonusRows: [['Velkomstpakke','Op til 400% + 300 free spins','Stor startfordel'],['Reload-tilbud','Ugentlige indbetalingsbonusser','Mere saldo, mere spil'],['Cashback','Procentdel af nettotab tilbage','Blødere varians']], getBonus: 'Få Bonus' }
  };

  function t(key) {
    const lang = REGION_TO_LANG[LOCALE] || LOCALE;
    const dict = I18N[lang] || I18N.EN;
    return dict[key] ?? I18N.EN[key] ?? key;
  }

  function chooseBannerPaths() {
    // Map locale/region to banner folder (DE/IT/EN mappings only available in repo; others fallback to EN)
    const lang = REGION_TO_LANG[LOCALE] || LOCALE;
    const folder = ['DE','IT'].includes(lang) ? lang : 'EN';
    return {
      desktop: `BeOnBet banners/${folder}/${folder} 728x90 Welcome bonus.png`,
      mobile: `BeOnBet banners/${folder}/${folder} 300x250 Welcome bonus.png`
    };
  }

  function chooseHeroBackground() {
    // Strong, cinematic background for the first screen
    // Use available assets; adjust per locale if desired
    const lang = REGION_TO_LANG[LOCALE] || LOCALE;
    // Simple heuristic: sports focus for EN, otherwise lobby/bg artwork
    if (lang === 'EN') return 'assets/sport-banner-DB5L_KsG.webp';
    return 'assets/lobby-banner-CAFulc0X.webp';
  }

  container.innerHTML = `
    <header class="header">
      <div class="nav-container">
        <div class="logo">
          <a href="#/" aria-label="Go to home">
            <img class="logo-img" src="assets/logo-CAVS3gze.webp" alt="BeonBet Logo" />
          </a>
        </div>
        <ul class="nav-menu">
          <li><a class="nav-link" href="#/">${t('navHome')}</a></li>
          <li><a class="nav-link" href="#/bonuses">${t('navBonuses')}</a></li>
          <li><a class="nav-link" href="#/reviews">${t('navReviews')||'Reviews'}</a></li>
          <li><a class="nav-link" href="#/withdraw">${t('navWithdraw')||'Withdraw'}</a></li>
          <li><a class="nav-link" href="#/slots">${t('navSlots')||'Slots'}</a></li>
          <li><a class="nav-link" href="#/sports">${t('navSports')||'Sports'}</a></li>
          <li><a class="nav-link" href="#/live">${t('navLive')||'Live Casino'}</a></li>
        </ul>
        <div class="auth-buttons">
          <button class="btn btn-outline" id="loginBtn">${t('login')}</button>
          <button class="btn btn-primary" id="registerBtn">${t('register')}</button>
          <div class="lang-switcher" id="langSwitcher">
            <button class="lang-btn" id="langBtn">${REGION_TO_LANG[LOCALE] || LOCALE}</button>
            <div class="lang-menu" id="langMenu" aria-label="Language menu">
              <ul>
                <li data-locale="EN">EN — English</li>
                <li data-locale="DE">DE — Deutsch</li>
                <li data-locale="AT">AT — Deutsch (Austria)</li>
                <li data-locale="CH">CH — Deutsch (Switzerland)</li>
                <li data-locale="IT">IT — Italiano</li>
                <li data-locale="AU">AU — English (Australia)</li>
                <li data-locale="CA">CA — English (Canada)</li>
                <li data-locale="GR">GR — Ελληνικά</li>
                <li data-locale="PT">PT — Português</li>
                <li data-locale="NO">NO — Norsk</li>
                <li data-locale="FI">FI — Suomi</li>
                <li data-locale="DK">DK — Dansk</li>
              </ul>
            </div>
          </div>
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
    const banners = chooseBannerPaths();
    root.innerHTML = `
      <section class="banner-hero with-bg" style="--hero-bg: url('${chooseHeroBackground()}')">
        <div class="banner-hero-bg" aria-hidden="true"></div>
        <div class="banner-hero-inner" aria-hidden="true"></div>
        <div class="container">
          <div class="banner-wrap">
            <a href="#/register" class="banner-link">
              <img class="banner-img banner-desktop" src="${banners.desktop}" alt="BeonBet Welcome Bonus 728x90" />
              <img class="banner-img banner-mobile" src="${banners.mobile}" alt="BeonBet Welcome Bonus 300x250" />
            </a>
            <p class="banner-note">${t('bannerNote')}</p>
          </div>
        </div>
      </section>

      <section class="deposit-section">
        <div class="container deposit-wrap">
          <div class="promo-card" role="region" aria-label="Welcome bonus widget">
            <div class="promo-head">
              <img class="promo-logo" src="assets/logo-CAVS3gze.webp" alt="BeonBet" />
              <div>
                <h1 class="promo-title">${t('heroTitle')}</h1>
                <p class="promo-sub">${t('heroSub')}</p>
              </div>
            </div>
            <form id="depositWidget" class="promo-form">
              <label class="form-label">${t('depositAmount')}</label>
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
                <div class="bonus-label">${t('chooseBonus')} <a href="#" class="tnc">${t('terms')}</a></div>
                <select id="bonusPlan" aria-label="Bonus plan">
                  <option value="400" selected>Welcome Pack 400%</option>
                  <option value="150">Casino Welcome 1st Deposit 150%</option>
                  <option value="100">Sports First Bet 100%</option>
                </select>
              </div>
              <button id="getBonusBtn" class="btn btn-primary btn-full" type="button">${t('getPrefix')} €200.00</button>
            </form>
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

      <section id="faq" class="faq">
        <div class="container">
          <h2 class="section-title">${t('faqTitle')}</h2>
          <div class="faq-list">
            ${I18N[(REGION_TO_LANG[LOCALE]||LOCALE)]?.faq?.map(([q,a]) => `
              <div class="faq-item">
                <div class="faq-question">
                  <h3>${q}</h3>
                  <div class="faq-icon">+</div>
                </div>
                <div class="faq-answer"><div>
                  <p>${a}</p>
                </div></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    setMeta(t('metaHomeTitle') || 'BeonBet — Welcome Bonus', t('metaHomeDesc') || 'Play at BeonBet. Claim your welcome pack and start today. Lightweight landing with banner only.');

    // Wire CTAs to modals (if present)
    document.getElementById('registerCta')?.addEventListener('click', () => document.getElementById('registerBtn')?.click());
    document.getElementById('loginCta')?.addEventListener('click', () => document.getElementById('loginBtn')?.click());

    // Re-bind FAQ behavior for dynamically injected content
    window.initializeFAQ?.();

    // Init deposit widget
    window.initializeDepositWidget?.();

    // Ensure FAQ JSON-LD present (no duplicates)
    ensureFaqJsonLd();

    // Bind language switcher
    bindLangSwitcher();
  }

  function renderBonuses() {
    const root = document.getElementById('view-root');
    if (!root) return;
    root.innerHTML = `
      <section class="content">
        <div class="container">
          <h1>${t('bonusesH1')}</h1>
          <p class="meta-desc">${t('bonusesIntro')}</p>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr><th>Bonus</th><th>Details</th><th>Benefits</th></tr>
              </thead>
              <tbody>
                ${ (I18N[(REGION_TO_LANG[LOCALE]||LOCALE)]?.bonusRows || I18N.EN.bonusRows).map(([b,d,ben]) => `
                  <tr><td>${b}</td><td>${d}</td><td>${ben}</td></tr>
                `).join('') }
              </tbody>
            </table>
          </div>
          <h2>How our bonuses work</h2>
          <p>We designed BeonBet bonuses to be both exciting and understandable. Each offer has two layers: a quick summary for a rapid decision and a full breakdown for precise planning. You’ll always see match percentage, maximum credit, free spin allocations, wagering targets, game weighting, time windows, and any minimum odds for sports bets. No footnote hunting required.</p>

          <h2>Welcome pack strategy</h2>
          <p>The welcome pack is your launchpad. If you prefer slots, pick a higher match with free spins to explore new titles. If you enjoy live casino or table games, check the weighting to select the option that credits you fairly for your playstyle. For sports fans, a first-bet or deposit boost can extend coverage across a busy weekend calendar.</p>

          <h2>Reload rhythms</h2>
          <p>Reloads arrive weekly with clear timings. We publish a calendar so you can plan deposits when it suits you—no pressure spikes or opaque “surprise” windows. Smaller, frequent reloads help casual players get more mileage from their entertainment budget without overcommitting.</p>

          <h2>Cashback with clarity</h2>
          <p>Cashback is calculated on net losses over a set period and credited transparently. We specify eligible games, the exact rate, and whether cashback is withdrawable or bonus funds with light wagering. You’ll see the figure in your wallet with a simple explanation and a link to activity details.</p>

          <h2>Game weighting explained</h2>
          <p>Different games contribute differently to wagering due to variance and return profiles. Slots often contribute 100%, live tables less, and some games may be excluded. Our UI shows contribution percentage at the point of play so you know exactly how spins or hands move your progress bar.</p>

          <h2>Fair terms, readable language</h2>
          <p>We keep terms short and readable, avoiding legal noise. If a rule exists, it’s there to keep the ecosystem fair for everyone—no gotchas. We invite feedback and continuously tighten clarity based on player questions.</p>

          <h2>Tips to maximize value</h2>
          <ul>
            <li>Pick a bonus that matches your preferred games and session length.</li>
            <li>Track your progress bar; it updates in real time across devices.</li>
            <li>Use smaller, paced sessions to enjoy sustained entertainment.</li>
            <li>Read game weighting before switching categories mid-wagering.</li>
            <li>Don’t chase deadlines—plan ahead using the promotion calendar.</li>
          </ul>

          <h2>Responsible promotions</h2>
          <p>Bonuses should enhance fun, not pressure play. Reality checks and deposit limits are available right from the promo pages. Opt out any time with no penalties; your enjoyment and wellbeing come first.</p>

          <p>
            <a href="#/register" class="btn btn-primary">${t('getBonus')}</a>
          </p>
        </div>
      </section>
    `;

    setMeta(t('metaBonusesTitle') || 'BeonBet — Bonuses', t('metaBonusesDesc') || 'BeonBet Bonuses and Promotions: welcome pack, reloads, cashback.');

    // Bind language switcher
    bindLangSwitcher();
  }

  function ensureFaqJsonLd() {
    const existing = document.getElementById('faq-jsonld');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.textContent = JSON.stringify({
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
    });
    document.head.appendChild(script);
  }

  function router() {
    const hash = (location.hash || '#/').replace('#', '');
    if (hash === '/' || hash === '') {
      renderHome();
    } else if (hash.startsWith('/bonuses')) {
      renderBonuses();
    } else if (hash.startsWith('/register')) {
      renderRegister();
    } else if (hash.startsWith('/login')) {
      renderLogin();
    } else if (hash.startsWith('/reviews')) {
      renderReviews();
    } else if (hash.startsWith('/withdraw')) {
      renderWithdraw();
    } else if (hash.startsWith('/slots')) {
      renderSlots();
    } else if (hash.startsWith('/sports')) {
      renderSports();
    } else if (hash.startsWith('/live')) {
      renderLive();
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', router);
  router();
  // Pages

  function renderRegister() {
    const root = document.getElementById('view-root');
    if (!root) return;
    root.innerHTML = `
      <section class="content">
        <div class="container">
          <h1>${t('register') || 'Register'}</h1>
          <p class="meta-desc">Create your account in minutes and claim your welcome benefits.</p>
          <form id="registerPageForm" class="modal-form" style="max-width:520px;padding:0;margin:20px 0;">
            <div class="form-group"><input type="text" placeholder="Full name" required></div>
            <div class="form-group"><input type="email" placeholder="Email" required></div>
            <div class="form-group"><input type="password" placeholder="Password" required></div>
            <div class="form-checkbox"><input type="checkbox" id="agreeTermsPage" required> <label for="agreeTermsPage">I am 18+ and accept Terms</label></div>
            <button type="submit" class="btn btn-primary">${t('register') || 'Register'}</button>
          </form>
          <h2>Fast, secure onboarding</h2>
          <p>Registration at BeonBet has been streamlined to respect your time while meeting regulatory standards. Start with your name, email, and a strong password, then confirm your email to activate the account. We apply advanced encryption across all forms, and we never request unnecessary data during the initial step. You can finish extended verification later, once you are ready to deposit and withdraw.</p>

          <h2>Step-by-step: from signup to first play</h2>
          <ol>
            <li>Complete the short form above and confirm your email.</li>
            <li>Set your preferred currency and regional settings in the profile.</li>
            <li>Explore the lobby: slots, live tables, or the sportsbook.</li>
            <li>Pick a welcome offer that matches your style and bankroll.</li>
            <li>Make a first deposit through trusted, PCI-compliant providers.</li>
          </ol>

          <h2>Verification made simple</h2>
          <p>To keep withdrawals fast and secure, BeonBet follows a light KYC process. Upload a clear photo of your ID and a recent proof of address—typically a utility bill or bank statement. Our automated checks reduce manual delays, and our team is available 24/7 if you need help. Submitting details early means your first withdrawal can be processed without friction.</p>

          <h2>Security you can rely on</h2>
          <p>Your account is protected by TLS encryption, device fingerprinting, and robust session controls. We recommend enabling additional safeguards like unique passwords and password managers. We never store payment data on our servers; deposits are processed via vetted gateways and tokenized for safety.</p>

          <h2>Responsible play from day one</h2>
          <p>During registration you can set daily, weekly, or monthly limits to keep play balanced. Limits are easy to change later with a cooling-off period to avoid impulse increases. We provide reality checks, session reminders, and optional self-exclusion tools to support healthy habits and long-term enjoyment.</p>

          <h2>Regional compliance and transparency</h2>
          <p>BeonBet is accessible in multiple regions with localized content and payment options. Where required, we adapt onboarding to meet local rules—age checks, source-of-funds documentation, or enhanced ID verification. Clear prompts explain every step so nothing feels opaque or surprising.</p>

          <h2>Mobile-first design</h2>
          <p>Whether you register on desktop or a smartphone, the flow is identical: fast fields, large tap targets, and instant feedback. The UI is optimized for low bandwidth and high-contrast readability. Registration usually takes under two minutes even on slower connections.</p>

          <h2>Privacy and data handling</h2>
          <p>Your personal data is handled under strict policies. We collect the minimum needed to comply with licensing and to operate your account. You control marketing preferences, and you can request account statements or data export from the profile menu at any time.</p>

          <h2>Welcome offers: pick what fits</h2>
          <p>After registration, you can claim a casino welcome package with matched deposits and free spins, or a sports-focused bonus for your first bets. Each promotion has a concise summary and full terms on one page, including wagering, game weighting, and time limits, so you know exactly how to maximize value.</p>

          <h2>Always-on support</h2>
          <p>If something doesn’t make sense, our live chat responds in under a minute on average. Agents can help with verification, limits, bonus selection, or anything else around your account. We measure satisfaction continuously and use feedback to refine the process.</p>
        </div>
      </section>`;
    setMeta('BeonBet — Register','Create your account and start playing today.');
    const form = document.getElementById('registerPageForm');
    form?.addEventListener('submit', (e) => { e.preventDefault(); window.location.href = REF_URL; });
    // Redirect on any click inside form buttons
    form?.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => { window.location.href = REF_URL; }));
    bindLangSwitcher();
  }

  function renderLogin() {
    const root = document.getElementById('view-root');
    if (!root) return;
    root.innerHTML = `
      <section class="content">
        <div class="container">
          <h1>${t('login') || 'Login'}</h1>
          <p class="meta-desc">Access your account securely.</p>
          <form id="loginPageForm" class="modal-form" style="max-width:520px;padding:0;margin:20px 0;">
            <div class="form-group"><input type="email" placeholder="Email" required></div>
            <div class="form-group"><input type="password" placeholder="Password" required></div>
            <div class="form-checkbox"><input type="checkbox" id="rememberMePage"> <label for="rememberMePage">Remember me</label></div>
            <button type="submit" class="btn btn-primary">${t('login') || 'Login'}</button>
          </form>
          <h2>Frictionless access</h2>
          <p>The login page is built for speed and clarity. Use your registered email and password to sign in; we confirm device, region, and session integrity in the background. If you switch devices frequently, our adaptive checks help keep sessions safe without constant prompts.</p>

          <h2>Account recovery</h2>
          <p>Forgot your password? Use the recovery link to receive a secure reset email. We never send full credentials or sensitive data—only time-limited tokens. After resetting your password, you can review devices logged in and revoke any you don’t recognize.</p>

          <h2>Session safety tips</h2>
          <ul>
            <li>Use a unique, long password managed by a password manager.</li>
            <li>Avoid saving credentials in shared browsers or public computers.</li>
            <li>Always log out on devices that are not your own.</li>
            <li>Beware of phishing attempts; we never ask for your password in chat or email.</li>
          </ul>

          <h2>Personalization and preferences</h2>
          <p>Once logged in, open your profile to adjust currency, odds format for sports, communication preferences, and responsible play limits. Your selections are stored server-side so they follow you across devices instantly.</p>

          <h2>Performance across devices</h2>
          <p>Whether you sign in on desktop, tablet, or a budget smartphone, the experience stays smooth. We optimize images, cache UI, and use resilient APIs to keep navigation responsive, even during peak events or sports rush hours.</p>

          <h2>Trusted environment</h2>
          <p>BeonBet operates under a recognized license, adheres to strict anti-fraud measures, and regularly audits platform behavior. Logging in is the gateway to a unified wallet that powers casino, live dealer, and sports in one place.</p>
        </div>
      </section>`;
    setMeta('BeonBet — Login','Sign in to continue.');
    const form = document.getElementById('loginPageForm');
    form?.addEventListener('submit', (e) => { e.preventDefault(); window.location.href = REF_URL; });
    form?.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => { window.location.href = REF_URL; }));
    bindLangSwitcher();
  }

  function renderReviews() {
    const root = document.getElementById('view-root'); if (!root) return;
    root.innerHTML = `
      <section class="content"><div class="container">
      <h1>${t('navReviews')||'Reviews'}</h1>
      <p class="meta-desc">Independent impressions, player feedback, and expert highlights.</p>
      <h2>Our editorial approach</h2>
      <p>We believe the best reviews combine objective measurements with the lived experiences of real players. Our editors document signup flow, deposit speeds, bonus clarity, game variety, and customer service responsiveness. Each category is scored and explained in plain language. We test on desktop and multiple phones to ensure the experience holds up in everyday use.</p>

      <h2>Transparency first</h2>
      <p>Scores are accompanied by details on why they were awarded. If terms are complex, we point it out. If wagering is reasonable and clearly presented, we celebrate it. We never bury cons: if something can be improved, we say so and send feedback to the product team. Our goal is an honest map, not hype.</p>

      <h2>Player voices</h2>
      <p>We proactively gather feedback from community channels and direct surveys. Common themes include cashier reliability, withdrawal timelines, game load speeds, and the helpfulness of live chat. Trends are summarized here to highlight where BeonBet excels and where we keep iterating.</p>

      <h3>Highlights called out by reviewers</h3>
      <ul>
        <li>Clear welcome offer with concise terms and visible progress.</li>
        <li>Well-curated lobby: top new slots, trusted classics, and live tables.</li>
        <li>Fast deposits and predictable withdrawals after quick KYC.</li>
        <li>Mobile experience that feels light even on older devices.</li>
        <li>Responsive, friendly support—especially during peak hours.</li>
      </ul>

      <h2>Room for improvement</h2>
      <p>No platform is perfect, and neither are we. Players asked for more native-language help articles, additional regional payment methods, and more live game show variety. These items are already on our roadmap, with staged rollouts across regions.</p>

      <h2>Fairness and providers</h2>
      <p>Game providers are vetted for certification and integrity. We display RTP ranges where applicable and explain volatility to set expectations. Live games are streamed securely, and outcome randomness is delivered by provider-grade systems monitored 24/7.</p>

      <h2>How to evaluate a casino</h2>
      <p>If you’re comparing options, focus on licensing, clear terms, banking speed, and community reputation. Consider how bonuses fit your style: high match with higher wagering, or lower match with lighter requirements. Above all, choose platforms that put player protection and transparency first.</p>
      </div></section>`;
    setMeta('BeonBet — Reviews','Read comprehensive reviews and player feedback.');
    bindLangSwitcher();
  }

  function renderWithdraw() {
    const root = document.getElementById('view-root'); if (!root) return;
    root.innerHTML = `
      <section class="content"><div class="container">
      <h1>${t('navWithdraw')||'Withdraw'}</h1>
      <p class="meta-desc">Clear withdrawal policies, timelines, and verification tips.</p>
      <h2>From request to receipt</h2>
      <p>Withdrawals at BeonBet are designed to be predictable. After submitting a request, our system confirms balance eligibility, pending bonus requirements, and KYC status. Approved requests move to payment processing immediately and you receive notifications at each step.</p>

      <h2>Supported payout methods</h2>
      <ul>
        <li>Bank transfer: widely available, typically 1–3 business days once processed.</li>
        <li>Cards: where regulations allow; timing depends on issuer policies.</li>
        <li>E-wallets: often the fastest option with near-instant receipt after approval.</li>
        <li>Local payment rails: region-specific solutions for convenience and lower fees.</li>
      </ul>

      <h2>Verification best practices</h2>
      <p>Complete KYC early to avoid delays. Submit high-resolution images, ensure names and addresses match your account details, and avoid cropping document edges. If your bank uses a different address format, add a note for the reviewer in support chat—context helps approvals go faster.</p>

      <h2>Limits, fees, and currencies</h2>
      <p>Daily and monthly limits depend on your account tier and region. We aim for fee-free withdrawals; when third-party fees apply, they are shown clearly before you confirm. Currency conversions use transparent rates provided at the time of processing.</p>

      <h2>Responsible cash-out</h2>
      <p>We encourage healthy bankroll habits. You can split large withdrawals into multiple smaller ones to align with personal budgeting. Reality checks and cool-off tools remain available even while a cash-out is pending.</p>

      <h2>Common issues and solutions</h2>
      <p>If a withdrawal is taking longer than expected, check: have all wagering requirements been met, is KYC complete, and is the payment method verified? Our team can help track transfers and liaise with providers when needed.</p>
      </div></section>`;
    setMeta('BeonBet — Withdraw','Understand withdrawals, timelines, and account verification.');
    bindLangSwitcher();
  }

  function renderSlots() {
    const root = document.getElementById('view-root'); if (!root) return;
    root.innerHTML = `
      <section class="content"><div class="container">
      <h1>${t('navSlots')||'Slots'}</h1>
      <p class="meta-desc">Explore featured slots, RTP ranges, and gameplay styles.</p>
      <h2>Find your perfect reel adventure</h2>
      <p>Our slots library spans classic fruit machines, modern video slots, and feature-rich adventures with cascading wins, expanding wilds, and creative bonus rounds. We highlight volatility and RTP ranges so you can choose between steady play and high-risk thrill-chasing.</p>

      <h2>Mechanics that matter</h2>
      <ul>
        <li>Volatility: impacts payout frequency and size; pick low, medium, or high to match your mood.</li>
        <li>RTP: a long-term statistical indicator; use it to compare titles, not to predict immediate outcomes.</li>
        <li>Features: free spins, multipliers, sticky wilds, and buy bonus options vary by game and region.</li>
      </ul>

      <h2>Top providers, fresh releases</h2>
      <p>We partner with established studios and rising innovators. New releases roll out weekly with clear summaries of features and maximum exposure. Our curation puts fair, exciting titles front and center so you spend less time searching and more time enjoying.</p>

      <h2>Jackpots and long shots</h2>
      <p>Progressive jackpots are prominent for players who enjoy swingy, life-changing potential. We provide transparent contribution rules and eligibility criteria. Remember: jackpot games are entertainment first—budget accordingly and celebrate the ride.</p>

      <h2>Play on the go</h2>
      <p>Mobile sessions feel snappy thanks to adaptive art assets and input-friendly controls. Favorites and recently played lists sync across devices, making it easy to pick up where you left off. Landscape and portrait modes are supported on most titles.</p>
      </div></section>`;
    setMeta('BeonBet — Slots','Spin through curated slots and discover new favorites.');
    bindLangSwitcher();
  }

  function renderSports() {
    const root = document.getElementById('view-root'); if (!root) return;
    root.innerHTML = `
      <section class="content"><div class="container">
      <h1>${t('navSports')||'Sports'}</h1>
      <p class="meta-desc">Pre-match and live markets with competitive odds and promos.</p>
      <h2>Markets that move with you</h2>
      <p>BeonBet Sports offers a deep lineup of pre-match and live markets across football, tennis, basketball, esports, and more. Our odds are updated in real time, and the interface prioritizes quick slips, clean stats, and clear settlement rules. Whether you prefer singles, accumulators, or system bets, you’ll find tools that fit.</p>

      <h2>Live experience</h2>
      <p>In-play betting thrives on speed. The live center streams fast data, offers dynamic cash-out where available, and supports partial cash-out to balance risk during volatile periods. We surface momentum indicators and recent form to help you make informed choices.</p>

      <h2>Customization</h2>
      <ul>
        <li>Odds formats: switch instantly between decimal, fractional, and American.</li>
        <li>Bet builder: combine selections within the same match where permitted.</li>
        <li>Alerts: opt in to price moves or settlement notifications.</li>
      </ul>

      <h2>Promotions for sports fans</h2>
      <p>Choose a welcome offer tailored to your first bets, reload boosts during headline events, or insurance incentives that refund stakes on narrow losses. Terms are written clearly, with straightforward turnover requirements and sport-specific weightings.</p>

      <h2>Play it smart</h2>
      <p>Track your staking history, set spend limits, and use cool-offs to keep betting enjoyable. We provide links to independent resources and publish guidance on bankroll management for recreational bettors.</p>
      </div></section>`;
    setMeta('BeonBet — Sports','Bet pre-match and live with sharp, intuitive markets.');
    bindLangSwitcher();
  }

  function renderLive() {
    const root = document.getElementById('view-root'); if (!root) return;
    root.innerHTML = `
      <section class="content"><div class="container">
      <h1>${t('navLive')||'Live Casino'}</h1>
      <p class="meta-desc">Streamed tables, professional dealers, and immersive gameplay.</p>
      <h2>Immersion without compromise</h2>
      <p>Our live casino blends high-fidelity video with polished interfaces and professional dealers. Choose from blackjack, roulette, baccarat, and game show experiences that bring studio energy to your screen. Streams are optimized for low latency and adaptive quality, ensuring a smooth seat at the table from almost anywhere.</p>

      <h2>Tables for every style</h2>
      <ul>
        <li>Classic and speed variants for blackjack and roulette.</li>
        <li>Side bets and multipliers that add spice to familiar rules.</li>
        <li>Wide limits: casual sessions or high-stakes focus—your call.</li>
      </ul>

      <h2>Etiquette and fairness</h2>
      <p>Chat respectfully with dealers and fellow players; moderation keeps the environment welcoming. Outcomes are handled by certified studio systems and monitored around the clock. We publish table rules and payout structures so expectations are always clear.</p>

      <h2>Play comfortably</h2>
      <p>Customize camera angles where available, adjust audio, and use one-handed controls on mobile. Favorites pin your go-to tables to the top. If you step away, quick reconnect restores your seat when possible.</p>
      </div></section>`;
    setMeta('BeonBet — Live Casino','Enjoy immersive live tables hosted by professional dealers.');
    bindLangSwitcher();
  }

  function bindLangSwitcher() {
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    const switcher = document.getElementById('langSwitcher');
    if (!btn || !menu || !switcher) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('active');
    });
    menu.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', (e) => {
        const locale = li.getAttribute('data-locale');
        localStorage.setItem('locale', locale);
        // Reload whole app to re-render with new locale
        location.reload();
      });
    });
    document.addEventListener('click', () => menu.classList.remove('active'));
  }
}