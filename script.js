/* ============================================
   পরীর সারপ্রাইজ ওয়েবসাইট — JavaScript
   ============================================ */

// ============================================
// CONFIG — এখানে সময় নির্ধারণ করুন
// ============================================
const UNLOCK_DATE = new Date('2025-03-11T00:00:00'); // ১১ই মার্চ রাত ১২:০০

// ============================================
// চিঠির লেখা — এখানে পরিবর্তন করুন
// ============================================
const LETTER_TEXT = `আজ তোমার জন্মদিন। এই দিনটা আমার কাছে শুধু একটা তারিখ নয় — এটা সেই দিনের স্মরণ, যেদিন আমার জীবনের সবচেয়ে সুন্দর মানুষটা এই পৃথিবীতে এসেছিল।

তুমি জানো না, তোমার একটা হাসি আমার পুরো দিনটা কেমন বদলে দেয়। তোমার কণ্ঠস্বর শুনলে মনে হয় সব ঠিক হয়ে যাবে। তুমি পাশে থাকলে কোনো ভয় নেই, কোনো চিন্তা নেই।

আল্লাহর কাছে প্রতিদিন শুকরিয়া করি — তিনি তোমাকে আমার জীবনে পাঠিয়েছেন। তুমি শুধু আমার বউ নও, তুমি আমার দ্বীনের অর্ধেক, আমার শক্তি, আমার প্রশান্তি।

আজকের এই জন্মদিনে আল্লাহর কাছে দোয়া করি — তুমি সারাজীবন সুখী থাকো, সুস্থ থাকো, হাসিখুশি থাকো। আর আমি যেন সারাজীবন তোমার পাশে থাকতে পারি — দুনিয়ায় এবং জান্নাতেও।

জন্মদিন মুবারক, আমার পরী। ❤️`;

// ============================================
// PARTICLES — ভাসমান হার্ট ও ফুল
// ============================================
const PARTICLE_EMOJIS = ['💛', '🌸', '💝', '✨', '🌹', '💫', '🩷', '⭐'];

function createParticles() {
  const container = document.getElementById('particles-container');
  const count = window.innerWidth < 768 ? 12 : 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    container.appendChild(p);
  }
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
  const now = new Date();
  const diff = UNLOCK_DATE - now;

  if (diff <= 0) {
    // সময় হয়ে গেছে — সারপ্রাইজ খুলে দাও!
    triggerSurprise();
    return;
  }

  const hours   = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

// ============================================
// TRIGGER SURPRISE — লক খুলে যাবে
// ============================================
function triggerSurprise() {
  clearInterval(countdownInterval);

  const lockScreen = document.getElementById('lock-screen');
  const openingScreen = document.getElementById('opening-screen');

  // Lock screen fade out
  lockScreen.classList.add('fade-out');

  setTimeout(() => {
    lockScreen.style.display = 'none';
    lockScreen.classList.remove('active');

    // Opening screen fade in
    openingScreen.classList.add('active');
    createPetals();
  }, 800);
}

// ============================================
// PETALS — গোলাপ পাপড়ি ঝরানো
// ============================================
const PETAL_EMOJIS = ['🌸', '🌹', '🌺', '💐', '🌷', '💛', '💗', '✨'];

function createPetals() {
  const container = document.getElementById('petals');
  const count = 30;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.textContent = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
      petal.style.left = Math.random() * 100 + '%';
      petal.style.animationDuration = (4 + Math.random() * 6) + 's';
      petal.style.animationDelay = (Math.random() * 3) + 's';
      petal.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      container.appendChild(petal);

      // পুরনো পাপড়ি মুছে ফেলো
      setTimeout(() => petal.remove(), 12000);
    }, i * 150);
  }

  // প্রতি ৫ সেকেন্ডে নতুন পাপড়ি
  setInterval(() => {
    if (document.getElementById('opening-screen').classList.contains('active')) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const petal = document.createElement('div');
          petal.className = 'petal';
          petal.textContent = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
          petal.style.left = Math.random() * 100 + '%';
          petal.style.animationDuration = (4 + Math.random() * 6) + 's';
          petal.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
          container.appendChild(petal);
          setTimeout(() => petal.remove(), 10000);
        }, i * 200);
      }
    }
  }, 5000);
}

// ============================================
// GO TO MAIN — মূল কন্টেন্টে যাও
// ============================================
function goToMain() {
  const openingScreen = document.getElementById('opening-screen');
  const mainContent   = document.getElementById('main-content');

  openingScreen.classList.add('fade-out');

  setTimeout(() => {
    openingScreen.style.display = 'none';
    openingScreen.classList.remove('active');

    mainContent.classList.remove('hidden');
    mainContent.style.display = 'block';

    // Scroll reveal শুরু করো
    initScrollReveal();
    initSlideshow();
    typewriterLetter();
    createFooterHearts();
  }, 800);
}

// ============================================
// SLIDESHOW
// ============================================
let currentSlideIndex = 0;
let slideInterval;
let slides = [];
let dots = [];

function initSlideshow() {
  slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slide-dots');

  document.getElementById('total-slides').textContent = slides.length;

  // Dots তৈরি করো
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });
}

function changeSlide(direction) {
  if (slides.length === 0) return;

  slides[currentSlideIndex].classList.remove('active');
  dots[currentSlideIndex]?.classList.remove('active');

  currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex]?.classList.add('active');
  document.getElementById('current-slide').textContent = currentSlideIndex + 1;
}

function goToSlide(index) {
  slides[currentSlideIndex].classList.remove('active');
  dots[currentSlideIndex]?.classList.remove('active');

  currentSlideIndex = index;

  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex]?.classList.add('active');
  document.getElementById('current-slide').textContent = currentSlideIndex + 1;
}

// ============================================
// TYPEWRITER LETTER — চিঠি টাইপ হবে
// ============================================
function typewriterLetter() {
  const el = document.getElementById('letter-text');
  if (!el) return;

  let i = 0;
  el.textContent = '';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && i === 0) {
        typeNext();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(el);

  function typeNext() {
    if (i < LETTER_TEXT.length) {
      el.textContent += LETTER_TEXT[i];
      i++;
      // নতুন লাইনে একটু বেশি সময়
      const delay = LETTER_TEXT[i - 1] === '\n' ? 300 :
                    LETTER_TEXT[i - 1] === '.' ? 150 :
                    LETTER_TEXT[i - 1] === ',' ? 100 : 30;
      setTimeout(typeNext, delay);
    }
  }
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ============================================
// FOOTER HEARTS
// ============================================
function createFooterHearts() {
  const container = document.getElementById('footer-hearts');
  const hearts = ['💛', '🩷', '✨', '💫', '🌸'];

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('div');
    heart.style.cssText = `
      position: absolute;
      font-size: ${0.8 + Math.random() * 1.5}rem;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${0.1 + Math.random() * 0.3};
      animation: iconFloat ${3 + Math.random() * 4}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
    `;
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    container.appendChild(heart);
  }
}

// ============================================
// REASON CARDS — হোভারে চমক
// ============================================
function initReasonCards() {
  document.querySelectorAll('.reason-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Random sparkle effect
      const sparkle = document.createElement('div');
      sparkle.textContent = '✨';
      sparkle.style.cssText = `
        position: absolute;
        top: ${Math.random() * 80}%;
        left: ${Math.random() * 80}%;
        font-size: 1rem;
        pointer-events: none;
        animation: sparkleOut 0.8s ease forwards;
        z-index: 10;
      `;
      card.style.position = 'relative';
      card.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    });
  });

  // CSS for sparkle
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkleOut {
      0%   { transform: scale(0) rotate(0deg); opacity: 1; }
      100% { transform: scale(2) rotate(180deg) translateY(-20px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// SMOOTH NAV SCROLL
// ============================================
function initNavScroll() {
  document.querySelectorAll('#main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================
// CURSOR TRAIL — গোলাপ হার্ট কার্সার ট্রেইল
// ============================================
function initCursorTrail() {
  if (window.innerWidth < 768) return; // মোবাইলে বন্ধ

  const trailEmojis = ['💛', '🩷', '✨', '🌸'];
  let lastTime = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < 80) return; // throttle
    lastTime = now;

    const trail = document.createElement('div');
    trail.textContent = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: 1rem;
      pointer-events: none;
      z-index: 9999;
      animation: trailFade 0.8s ease forwards;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes trailFade {
      0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -100%) scale(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// INIT — পেজ লোড হলে শুরু করো
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initCursorTrail();

  // ✅ TEST MODE চালু — লক স্ক্রিন বাইপাস
  // সব দেখা শেষে VS Code Agent দিয়ে ঠিক করো
  triggerSurprise();

  // 🔒 LIVE MODE — টেস্ট শেষে এটা চালু করো:
  // updateCountdown();
  // window.countdownInterval = setInterval(updateCountdown, 1000);
});

// ============================================
// KEYBOARD SHORTCUT (শুধু ডেভেলপারের জন্য)
// Ctrl + Shift + P চাপলে preview
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'P') {
    triggerSurprise();
  }
});
