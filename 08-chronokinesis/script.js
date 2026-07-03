// ============================================
// 08-CHRONOKINESIS — AYurveda: Raw Earth Academic
// Signature: Prakriti Compass — 6-question dosha quiz
// Hero: Magazine Cover — typography overlays
// ============================================

import { gsap, ScrollTrigger, initSectionReveals, refreshScrollTrigger } from '../src/utils/motion.js';

// ============================================
// PRAKRITI COMPASS — Quiz Data (6 Questions)
// ============================================

const quizData = [
  {
    question: 'When you wake in the morning, your body feels:',
    options: [
      { text: 'Light, restless — I rarely sleep deeply. My mind is already racing before my feet touch the floor.', dosha: 'vata' },
      { text: 'Warm, energized — I wake with purpose and a clear agenda for the day ahead.', dosha: 'pitta' },
      { text: 'Heavy, slow — I need time to emerge. The bed holds me and I resist the transition to waking.', dosha: 'kapha' }
    ]
  },
  {
    question: 'In moments of stress, your instinct is to:',
    options: [
      { text: 'Withdraw into anxious thought. I overthink, loop on possibilities, and my body tenses — especially my jaw and shoulders.', dosha: 'vata' },
      { text: 'Take decisive action. I become sharp, focused, even confrontational. Heat rises in my chest and face.', dosha: 'pitta' },
      { text: 'Become still. I shut down, avoid conflict, and seek comfort — food, sleep, familiar routines.', dosha: 'kapha' }
    ]
  },
  {
    question: 'Your relationship with food is best described as:',
    options: [
      { text: 'Irregular. I forget to eat, then eat quickly. My digestion is sensitive — bloating, gas, inconsistency.', dosha: 'vata' },
      { text: 'Strong. I eat with appetite, digest efficiently, and become irritable when meals are delayed.', dosha: 'pitta' },
      { text: 'Steady. I eat slowly, enjoy rich flavors, and feel heavy if I eat too much or too quickly.', dosha: 'kapha' }
    ]
  },
  {
    question: 'Your mental landscape is dominated by:',
    options: [
      { text: 'Movement and imagination. Ideas arrive in flashes, but follow-through requires effort. I am creative but scattered.', dosha: 'vata' },
      { text: 'Focus and discernment. I analyze, categorize, and pursue goals with intensity. Perfectionism is my shadow.', dosha: 'pitta' },
      { text: 'Patience and memory. I absorb information slowly but retain it deeply. Loyalty and routine anchor my mind.', dosha: 'kapha' }
    ]
  },
  {
    question: 'Your body\'s natural state is:',
    options: [
      { text: 'Lean, light, prone to dryness. My skin is cool, my appetite variable, my energy bursts then fades.', dosha: 'vata' },
      { text: 'Medium build, warm. I radiate heat, have sharp features, and my skin flushes easily.', dosha: 'pitta' },
      { text: 'Solid, grounded, prone to weight gain. My skin is thick and soft, my movements smooth and steady.', dosha: 'kapha' }
    ]
  },
  {
    question: 'Your ideal evening looks like:',
    options: [
      { text: 'A late-night creative project or stimulating conversation. I lose track of time and forget to wind down.', dosha: 'vata' },
      { text: 'A structured wind-down — skincare, journaling, light reading. I need order to release the day.', dosha: 'pitta' },
      { text: 'A warm bath, comfort food, and early sleep. I recharge through rest and familiar comfort.', dosha: 'kapha' }
    ]
  }
];

const prakritiResults = {
  vata: {
    type: 'Vata Constitution',
    desc: 'Your dosha profile is predominantly Vata — the force of air and ether. You are quick-thinking, creative, and sensitive to your environment. Your healing requires grounding warmth, routine, and nourishing oils.',
    blend: 'Vata Balancing Tea',
    ingredients: 'Ginger · Cinnamon · Cardamom · Licorice root · Warm almond milk'
  },
  pitta: {
    type: 'Pitta Constitution',
    desc: 'Your dosha profile is predominantly Pitta — the force of fire and water. You are driven, intelligent, and passionate. Your healing requires cooling herbs, moderate activity, and emotional spaciousness.',
    blend: 'Pitta Cooling Tea',
    ingredients: 'Rose petals · Fennel · Coriander · Mint · A touch of raw honey'
  },
  kapha: {
    type: 'Kapha Constitution',
    desc: 'Your dosha profile is predominantly Kapha — the force of earth and water. You are steady, loyal, and deeply grounded. Your healing requires stimulating spices, movement, and light, warm foods.',
    blend: 'Kapha Awakening Tea',
    ingredients: 'Tulsi · Black pepper · Ginger · Clove · Lemon peel'
  },
  vata_pitta: {
    type: 'Vata-Pitta Constitution',
    desc: 'You carry a dual constitution of Vata and Pitta — a dynamic interplay of air and fire. You are both creative and driven, sensitive and passionate. Your healing requires balancing stimulation with grounding.',
    blend: 'Dual Balance Tea',
    ingredients: 'Chamomile · Cinnamon · Fennel · Cardamom · Raw honey'
  },
  pitta_kapha: {
    type: 'Pitta-Kapha Constitution',
    desc: 'You carry a dual constitution of Pitta and Kapha — fire tempered by earth. You are steady and determined, with deep reserves of strength. Your healing requires lightness, movement, and cooling practices.',
    blend: 'Fire & Earth Tea',
    ingredients: 'Rose · Coriander · Tulsi · Ginger · Lemon'
  },
  vata_kapha: {
    type: 'Vata-Kapha Constitution',
    desc: 'You carry a dual constitution of Vata and Kapha — air grounded by earth. You are thoughtful and steady, with a rich inner world. Your healing requires warmth, gentle movement, and nourishing routine.',
    blend: 'Grounding Air Tea',
    ingredients: 'Ginger · Cinnamon · Licorice root · Ashwagandha · Warm milk'
  }
};

// ============================================
// PRAKRITI COMPASS — Quiz Logic
// ============================================

const compassQuiz = document.getElementById('compassQuiz');
const compassResult = document.getElementById('compassResult');
const restartBtn = document.getElementById('restartQuiz');
let currentQuestion = 0;
let answers = [];

function loadProgress() {
  const saved = localStorage.getItem('chronokinesis_quiz');
  if (saved) {
    const data = JSON.parse(saved);
    if (data.answers) {
      answers = data.answers;
      currentQuestion = data.currentQuestion || 0;
      if (data.completed) {
        showResult(data.dominantDosha);
        return;
      }
    }
  }
  renderQuiz();
}

function saveProgress() {
  localStorage.setItem('chronokinesis_quiz', JSON.stringify({
    answers: answers,
    currentQuestion: currentQuestion,
    completed: false
  }));
}

function renderQuiz() {
  compassQuiz.innerHTML = '';
  compassResult.style.display = 'none';
  compassQuiz.style.display = 'block';

  quizData.forEach((q, qIndex) => {
    const questionEl = document.createElement('div');
    questionEl.className = 'compass__question';
    questionEl.innerHTML = `<div class="compass__question-label">Question ${qIndex + 1} of 6</div>` +
      `<div class="compass__options">` +
      q.options.map((opt, oIndex) => {
        const isSelected = answers[qIndex] === oIndex;
        return `<button class="compass__option${isSelected ? ' selected' : ''}" data-question="${qIndex}" data-option="${oIndex}">${opt.text}</button>`;
      }).join('') +
      `</div>`;
    compassQuiz.appendChild(questionEl);

    if (qIndex <= currentQuestion) {
      setTimeout(() => {
        questionEl.classList.add('visible');
      }, qIndex * 150);
    }
  });

  document.querySelectorAll('.compass__option').forEach((btn) => {
    btn.addEventListener('click', handleAnswer);
  });
}

function handleAnswer(e) {
  const qIndex = parseInt(e.target.getAttribute('data-question'));
  const oIndex = parseInt(e.target.getAttribute('data-option'));
  
  answers[qIndex] = oIndex;
  currentQuestion = qIndex + 1;

  const siblings = e.target.parentElement.querySelectorAll('.compass__option');
  siblings.forEach((s) => { s.classList.remove('selected'); });
  e.target.classList.add('selected');

  saveProgress();

  if (currentQuestion < quizData.length) {
    const questions = compassQuiz.querySelectorAll('.compass__question');
    setTimeout(() => {
      if (questions[currentQuestion]) {
        questions[currentQuestion].classList.add('visible');
        questions[currentQuestion].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 400);
  }

  const answeredCount = answers.filter((a) => a !== undefined).length;
  if (answeredCount === quizData.length) {
    setTimeout(() => {
      calculateResult();
    }, 600);
  }
}

function calculateResult() {
  const scores = { vata: 0, pitta: 0, kapha: 0 };

  answers.forEach((optIndex, qIndex) => {
    if (optIndex !== undefined) {
      const dosha = quizData[qIndex].options[optIndex].dosha;
      scores[dosha] += 1;
    }
  });

  const sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const dominant = sorted[0];
  const secondary = sorted[1];

  let resultKey = dominant;
  if (scores[secondary] >= scores[dominant] - 1 && scores[secondary] > 1) {
    const pair = [dominant, secondary].sort().join('_');
    if (prakritiResults[pair]) {
      resultKey = pair;
    }
  }

  localStorage.setItem('chronokinesis_quiz', JSON.stringify({
    answers: answers,
    currentQuestion: currentQuestion,
    completed: true,
    dominantDosha: resultKey
  }));

  showResult(resultKey);
}

function showResult(dosha) {
  const result = prakritiResults[dosha] || prakritiResults.vata;
  
  document.getElementById('resultType').textContent = result.type;
  document.getElementById('resultDesc').textContent = result.desc;
  document.getElementById('resultBlend').textContent = result.blend;
  document.getElementById('resultIngredients').textContent = result.ingredients;

  compassQuiz.style.display = 'none';
  compassResult.style.display = 'block';

  gsap.from(compassResult, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'expo.out'
  });

  compassResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

if (restartBtn) {
  restartBtn.addEventListener('click', () => {
    localStorage.removeItem('chronokinesis_quiz');
    answers = [];
    currentQuestion = 0;
    renderQuiz();
  });
}

loadProgress();

// ============================================
// LOADING SCREEN
// ============================================

// ============================================
// NAVIGATION — Scroll State
// ============================================

function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -100',
    onUpdate: (self) => {
      if (self.scroll() > 100) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }
  });
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('.nav__links a, .hero-cta, .dynamic-cta__btn, .gift__btn').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// ============================================
// HERO — Magazine Cover Parallax
// ============================================

function initHeroParallax() {
  const heroContent = document.querySelector('.hero-cover');
  if (!heroContent) return;

  gsap.to(heroContent, {
    y: 80,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

// ============================================
// SECTION REVEALS
// ============================================

function initScrollReveals() {
  const elements = document.querySelectorAll(
    '.section__heading, .section__body, .service-card, .journey__step, .testimonials__card, .about__detail, .about__image-frame, .faq__item, .event-card, .compass__intro, .vow__inner, .gift__inner'
  );

  elements.forEach((el) => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

// ============================================
// GSAP SECTION ENTRANCE
// ============================================

function initSectionEntrance() {
  document.querySelectorAll('.section').forEach((section) => {
    const heading = section.querySelector('.section__heading');
    if (heading) {
      gsap.from(heading, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });
    }
  });
}

// ============================================
// MECHANISM DIAGRAM — Animate on Scroll
// ============================================

function initMechanismAnimation() {
  const nodes = document.querySelectorAll('.mechanism__node');
  const lines = document.querySelectorAll('.mechanism__line');

  gsap.from(nodes, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.15,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.mechanism__diagram',
      start: 'top 80%',
      once: true,
    },
  });

  gsap.from(lines, {
    scaleY: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.mechanism__diagram',
      start: 'top 80%',
      once: true,
    },
  });
}

// ============================================
// SERVICE CARDS — Hover Tilt
// ============================================

function initServiceCardTilt() {
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        rotationY: 2,
        rotationX: -1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

// ============================================
// INITIALIZE
// ============================================

function init() {
  initNavScroll();
  initSmoothScroll();
  initHeroParallax();
  initScrollReveals();
  initSectionEntrance();
  initMechanismAnimation();
  initServiceCardTilt();
  initSectionReveals();

  window.addEventListener('load', () => {
    setTimeout(refreshScrollTrigger, 100);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
