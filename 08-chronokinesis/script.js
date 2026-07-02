/* ============================================
   CHRONOKINESIS — Ayurveda Website Scripts
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // PRAKRITI COMPASS QUIZ DATA
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
      question: 'Your body's natural state is:',
      options: [
        { text: 'Lean, light, prone to dryness. My skin is cool, my appetite variable, my energy bursts then fades.', dosha: 'vata' },
        { text: 'Medium build, warm. I radiate heat, have sharp features, and my skin flushes easily.', dosha: 'pitta' },
        { text: 'Solid, grounded, prone to weight gain. My skin is thick and soft, my movements smooth and steady.', dosha: 'kapha' }
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

    quizData.forEach(function(q, qIndex) {
      const questionEl = document.createElement('div');
      questionEl.className = 'compass__question';
      questionEl.innerHTML = '<div class="compass__question-label">Question ' + (qIndex + 1) + ' of 5</div>' +
        '<div class="compass__options">' +
        q.options.map(function(opt, oIndex) {
          var isSelected = answers[qIndex] === oIndex;
          return '<button class="compass__option' + (isSelected ? ' selected' : '') + '" data-question="' + qIndex + '" data-option="' + oIndex + '">' + opt.text + '</button>';
        }).join('') +
        '</div>';
      compassQuiz.appendChild(questionEl);

      if (qIndex <= currentQuestion) {
        setTimeout(function() {
          questionEl.classList.add('visible');
        }, qIndex * 150);
      }
    });

    document.querySelectorAll('.compass__option').forEach(function(btn) {
      btn.addEventListener('click', handleAnswer);
    });
  }

  function handleAnswer(e) {
    var qIndex = parseInt(e.target.getAttribute('data-question'));
    var oIndex = parseInt(e.target.getAttribute('data-option'));
    
    answers[qIndex] = oIndex;
    currentQuestion = qIndex + 1;

    // Update visual
    var siblings = e.target.parentElement.querySelectorAll('.compass__option');
    siblings.forEach(function(s) { s.classList.remove('selected'); });
    e.target.classList.add('selected');

    saveProgress();

    // Reveal next question
    if (currentQuestion < quizData.length) {
      var questions = compassQuiz.querySelectorAll('.compass__question');
      setTimeout(function() {
        if (questions[currentQuestion]) {
          questions[currentQuestion].classList.add('visible');
          questions[currentQuestion].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }

    // Check if all answered
    var answeredCount = answers.filter(function(a) { return a !== undefined; }).length;
    if (answeredCount === quizData.length) {
      setTimeout(function() {
        calculateResult();
      }, 600);
    }
  }

  function calculateResult() {
    var scores = { vata: 0, pitta: 0, kapha: 0 };

    answers.forEach(function(optIndex, qIndex) {
      if (optIndex !== undefined) {
        var dosha = quizData[qIndex].options[optIndex].dosha;
        scores[dosha] += 1;
      }
    });

    var sorted = Object.keys(scores).sort(function(a, b) { return scores[b] - scores[a]; });
    var dominant = sorted[0];
    var secondary = sorted[1];

    // Check for dual constitution (within 1 point)
    var resultKey = dominant;
    if (scores[secondary] >= scores[dominant] - 1 && scores[secondary] > 1) {
      var pair = [dominant, secondary].sort().join('_');
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
    var result = prakritiResults[dosha] || prakritiResults.vata;
    
    document.getElementById('resultType').textContent = result.type;
    document.getElementById('resultDesc').textContent = result.desc;
    document.getElementById('resultBlend').textContent = result.blend;
    document.getElementById('resultIngredients').textContent = result.ingredients;

    compassQuiz.style.display = 'none';
    compassResult.style.display = 'block';
    compassResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', function() {
      localStorage.removeItem('chronokinesis_quiz');
      answers = [];
      currentQuestion = 0;
      renderQuiz();
    });
  }

  loadProgress();

  // ============================================
  // HERO — Parallax & Celestial
  // ============================================

  var layerBack = document.getElementById('layerBack');
  var layerMid = document.getElementById('layerMid');
  var layerFront = document.getElementById('layerFront');
  var celestial = document.getElementById('celestial');
  var hero = document.getElementById('hero');
  var mouseX = 0;
  var mouseY = 0;
  var targetX = 0;
  var targetY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  function animateParallax() {
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    var scrollY = window.scrollY;
    var heroHeight = hero.offsetHeight;

    if (scrollY < heroHeight) {
      var scrollFactor = scrollY / heroHeight;

      // Layers scroll at different speeds
      if (layerBack) layerBack.style.transform = 'translateY(' + (scrollY * 0.1) + 'px)';
      if (layerMid) layerMid.style.transform = 'translateY(' + (scrollY * 0.25) + 'px)';
      if (layerFront) layerFront.style.transform = 'translateY(' + (scrollY * 0.45) + 'px)';

      // Celestial follows cursor X
      if (celestial) {
        var celestX = 20 + targetX * 60;
        var celestY = 10 + targetY * 20 - scrollFactor * 30;
        celestial.style.left = celestX + '%';
        celestial.style.top = celestY + '%';
      }
    }

    requestAnimationFrame(animateParallax);
  }

  requestAnimationFrame(animateParallax);

  // ============================================
  // NAVIGATION — Scroll State
  // ============================================

  var nav = document.getElementById('nav');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================

  function setupReveal() {
    var elements = document.querySelectorAll('.section__heading, .section__body, .art__card, .philosophy__pillar, .journey__step, .testimonials__card, .about__detail, .about__image-frame');
    
    elements.forEach(function(el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(el) {
      observer.observe(el);
    });
  }

  setupReveal();

  // ============================================
  // SMOOTH SCROLL FOR NAV LINKS
  // ============================================

  document.querySelectorAll('.nav__links a, .hero__cta').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

})();
