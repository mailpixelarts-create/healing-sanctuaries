/* ============================================
   CHAKRA BALANCING — Cinematic Interactions
   Afrofuturist × Sacred Geometry
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Chakra Data ---
    const chakras = [
        {
            name: 'Root',
            sanskrit: 'Muladhara',
            color: '#FF0000',
            frequency: '396 Hz',
            solfeggio: 396,
            angle: 0,
            affirmation: 'I am grounded, safe, and deeply rooted in the present moment.',
            description: 'Foundation, survival, security'
        },
        {
            name: 'Sacral',
            sanskrit: 'Svadhisthana',
            color: '#FF7F00',
            frequency: '417 Hz',
            solfeggio: 417,
            angle: 51.4,
            affirmation: 'I embrace pleasure, creativity, and the flow of life with open arms.',
            description: 'Creativity, emotion, pleasure'
        },
        {
            name: 'Solar Plexus',
            sanskrit: 'Manipura',
            color: '#FFFF00',
            frequency: '528 Hz',
            solfeggio: 528,
            angle: 102.8,
            affirmation: 'I am powerful, confident, and worthy of all my desires.',
            description: 'Power, confidence, will'
        },
        {
            name: 'Heart',
            sanskrit: 'Anahata',
            color: '#00FF00',
            frequency: '639 Hz',
            solfeggio: 639,
            angle: 154.3,
            affirmation: 'I give and receive love freely. My heart is open and healing.',
            description: 'Love, compassion, healing'
        },
        {
            name: 'Throat',
            sanskrit: 'Vishuddha',
            color: '#00BFFF',
            frequency: '741 Hz',
            solfeggio: 741,
            angle: 205.7,
            affirmation: 'I speak my truth with clarity, confidence, and compassion.',
            description: 'Communication, truth, expression'
        },
        {
            name: 'Third Eye',
            sanskrit: 'Ajna',
            color: '#4B0082',
            frequency: '852 Hz',
            solfeggio: 852,
            angle: 257.1,
            affirmation: 'I trust my intuition. My inner vision sees beyond the veil.',
            description: 'Intuition, wisdom, insight'
        },
        {
            name: 'Crown',
            sanskrit: 'Sahasrara',
            color: '#9400D3',
            frequency: '963 Hz',
            solfeggio: 963,
            angle: 308.6,
            affirmation: 'I am connected to the infinite. Divine wisdom flows through me.',
            description: 'Spirituality, consciousness, unity'
        }
    ];

    // --- Audio Context for Solfeggio Tones ---
    let audioCtx = null;
    let currentOscillator = null;
    let currentGainNode = null;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSolfeggioTone(frequency, duration = 4) {
        initAudio();
        stopCurrentTone();

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        // Soft sine wave for solfeggio
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        // Gentle low-pass filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioCtx.currentTime);
        filter.Q.setValueAtTime(1, audioCtx.currentTime);

        // Fade in and out
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.5);
        gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + duration - 1);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration);

        currentOscillator = oscillator;
        currentGainNode = gainNode;
    }

    function stopCurrentTone() {
        if (currentOscillator) {
            try {
                currentGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
                setTimeout(() => {
                    try { currentOscillator.stop(); } catch(e) {}
                }, 150);
            } catch(e) {}
        }
    }

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }, 1500);
    });

    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }, 1500);
    }

    function initAnimations() {
        initHeroSplit();
        initChakraNav();
        initChakraWheel();
        initChakraList();
        initScrollReveal();
        initParallax();
        initSmoothScroll();
    }

    // --- Hero Split Screen Effect ---
    function initHeroSplit() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        let ticking = false;

        function updateHero() {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;
            const progress = Math.min(scrollY / heroHeight, 1);

            if (progress > 0.1) {
                hero.classList.add('scrolled');
            } else {
                hero.classList.remove('scrolled');
            }

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHero);
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Chakra Wheel Navigation ---
    function initChakraNav() {
        const navToggle = document.getElementById('navToggle');
        const navInner = document.getElementById('chakraNavInner');
        const navSvg = document.getElementById('chakraNavSvg');

        if (!navToggle || !navInner || !navSvg) return;

        // Render nav wheel
        const navSegments = chakras.map((chakra, i) => {
            const startAngle = (i * 360 / 7) - 90;
            const endAngle = startAngle + 360 / 7;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = 150 + 120 * Math.cos(startRad);
            const y1 = 150 + 120 * Math.sin(startRad);
            const x2 = 150 + 120 * Math.cos(endRad);
            const y2 = 150 + 120 * Math.sin(endRad);

            const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
            const labelX = 150 + 100 * Math.cos(midAngle);
            const labelY = 150 + 100 * Math.sin(midAngle);

            return `
                <path d="M150,150 L${x1},${y1} A120,120 0 0,1 ${x2},${y2} Z"
                      fill="${chakra.color}" fill-opacity="0.15"
                      stroke="${chakra.color}" stroke-width="0.5"
                      class="nav-segment" data-chakra="${i}"
                      style="cursor: pointer; transition: fill-opacity 0.3s ease;"/>
                <text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle"
                      fill="${chakra.color}" font-size="6" font-family="'Space Grotesk', sans-serif"
                      opacity="0.7" pointer-events="none">${chakra.name}</text>
            `;
        }).join('');

        navSvg.innerHTML = `
            <circle cx="150" cy="150" r="130" fill="none" stroke="var(--signal)" stroke-width="0.3" stroke-dasharray="4 4"/>
            <circle cx="150" cy="150" r="120" fill="none" stroke="var(--ghost)" stroke-width="0.3"/>
            ${navSegments}
            <circle cx="150" cy="150" r="30" fill="var(--ink)" stroke="var(--signal)" stroke-width="0.5"/>
            <text x="150" y="153" text-anchor="middle" fill="var(--signal)" font-size="5" font-family="'Space Grotesk', sans-serif" letter-spacing="0.1em">CHAKRA</text>
        `;

        // Nav segment clicks
        navSvg.querySelectorAll('.nav-segment').forEach(seg => {
            seg.addEventListener('mouseenter', () => {
                seg.setAttribute('fill-opacity', '0.35');
            });
            seg.addEventListener('mouseleave', () => {
                seg.setAttribute('fill-opacity', '0.15');
            });
            seg.addEventListener('click', () => {
                const idx = parseInt(seg.dataset.chakra);
                selectChakra(idx);
                navInner.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        navToggle.addEventListener('click', () => {
            navInner.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.chakra-nav')) {
                navInner.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // --- Interactive Chakra Wheel ---
    let currentChakraIndex = -1;
    let wheelRotation = 0;
    let wheelSpinSpeed = 0.3;
    let wheelAnimFrame = null;

    function initChakraWheel() {
        const wheelSvg = document.getElementById('chakraWheelSvg');
        const segmentsGroup = document.getElementById('chakraSegments');

        if (!wheelSvg || !segmentsGroup) return;

        // Render wheel segments
        const segments = chakras.map((chakra, i) => {
            const startAngle = (i * 360 / 7) - 90;
            const endAngle = startAngle + 360 / 7;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = 250 + 180 * Math.cos(startRad);
            const y1 = 250 + 180 * Math.sin(startRad);
            const x2 = 250 + 180 * Math.cos(endRad);
            const y2 = 250 + 180 * Math.sin(endRad);

            const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
            const labelX = 250 + 155 * Math.cos(midAngle);
            const labelY = 250 + 155 * Math.sin(midAngle);
            const iconX = 250 + 130 * Math.cos(midAngle);
            const iconY = 250 + 130 * Math.sin(midAngle);

            // Lotus petal shapes for each chakra
            const petalPath = createPetalPath(250, 250, 100, 140, midAngle, 0.15);

            return `
                <path d="M250,250 L${x1},${y1} A180,180 0 0,1 ${x2},${y2} Z"
                      fill="${chakra.color}" fill-opacity="0.08"
                      stroke="${chakra.color}" stroke-width="0.5"
                      class="wheel-segment" data-chakra="${i}"
                      style="cursor: pointer; transition: all 0.3s ease;"/>
                ${petalPath}
                <circle cx="${iconX}" cy="${iconY}" r="12" fill="${chakra.color}" opacity="0.3"/>
                <text x="${labelX}" y="${labelY - 5}" text-anchor="middle" fill="${chakra.color}" font-size="8" font-family="'Space Grotesk', sans-serif" font-weight="500">${chakra.name}</text>
                <text x="${labelX}" y="${labelY + 8}" text-anchor="middle" fill="var(--paper)" font-size="5" font-family="'DM Sans', sans-serif" opacity="0.5">${chakra.frequency}</text>
            `;
        }).join('');

        segmentsGroup.innerHTML = segments;

        // Segment interactions
        segmentsGroup.querySelectorAll('.wheel-segment').forEach(seg => {
            seg.addEventListener('mouseenter', () => {
                seg.setAttribute('fill-opacity', '0.2');
            });
            seg.addEventListener('mouseleave', () => {
                seg.setAttribute('fill-opacity', '0.08');
            });
            seg.addEventListener('click', () => {
                const idx = parseInt(seg.dataset.chakra);
                selectChakra(idx);
                // Spin wheel faster on click
                wheelSpinSpeed = 2;
                setTimeout(() => { wheelSpinSpeed = 0.3; }, 2000);
            });
        });

        // Animate wheel rotation
        function animateWheel() {
            wheelRotation += wheelSpinSpeed;
            segmentsGroup.style.transform = `rotate(${wheelRotation}deg)`;
            segmentsGroup.style.transformOrigin = '250px 250px';
            wheelAnimFrame = requestAnimationFrame(animateWheel);
        }
        animateWheel();
    }

    function createPetalPath(cx, cy, innerR, outerR, angle, spread) {
        const a1 = angle - spread;
        const a2 = angle + spread;

        const ix1 = cx + innerR * Math.cos(a1);
        const iy1 = cy + innerR * Math.sin(a1);
        const ix2 = cx + innerR * Math.cos(a2);
        const iy2 = cy + innerR * Math.sin(a2);

        const ox = cx + outerR * Math.cos(angle);
        const oy = cy + outerR * Math.sin(angle);

        return `<path d="M${ix1},${iy1} Q${ox},${oy} ${ix2},${iy2}"
                      fill="none" stroke="var(--signal)" stroke-width="0.3" opacity="0.2"/>`;
    }

    // --- Select Chakra ---
    function selectChakra(index) {
        if (index < 0 || index >= chakras.length) return;

        currentChakraIndex = index;
        const chakra = chakras[index];

        // Update affirmation display
        const affirmationText = document.getElementById('affirmationText');
        const affirmationFrequency = document.getElementById('affirmationFrequency');
        const affirmationDisplay = document.getElementById('affirmationDisplay');

        if (affirmationText) {
            affirmationText.style.opacity = '0';
            setTimeout(() => {
                affirmationText.textContent = chakra.affirmation;
                affirmationText.style.opacity = '1';
                affirmationText.style.transition = 'opacity 0.5s ease';
            }, 200);
        }

        if (affirmationFrequency) {
            affirmationFrequency.textContent = `${chakra.sanskrit} · ${chakra.frequency}`;
        }

        if (affirmationDisplay) {
            affirmationDisplay.classList.add('active');
            affirmationDisplay.style.borderColor = chakra.color;
            affirmationDisplay.style.boxShadow = `0 0 40px ${chakra.color}33`;
        }

        // Update chakra list
        document.querySelectorAll('.chakra-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Play solfeggio tone
        playSolfeggioTone(chakra.solfeggio, 4);

        // Scroll to wheel section if not visible
        const wheelSection = document.getElementById('wheel');
        if (wheelSection) {
            const rect = wheelSection.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) {
                wheelSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // --- Chakra List ---
    function initChakraList() {
        const listContainer = document.getElementById('chakraList');
        if (!listContainer) return;

        listContainer.innerHTML = chakras.map((chakra, i) => `
            <div class="chakra-item" data-chakra="${i}">
                <div class="chakra-dot" style="background: ${chakra.color}; color: ${chakra.color}"></div>
                <div class="chakra-info">
                    <span class="chakra-name">${chakra.name}</span>
                    <span class="chakra-sanskrit">${chakra.sanskrit}</span>
                </div>
                <span class="chakra-frequency">${chakra.frequency}</span>
            </div>
        `).join('');

        listContainer.querySelectorAll('.chakra-item').forEach(item => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.dataset.chakra);
                selectChakra(idx);
            });
        });
    }

    // --- Scroll Reveal ---
    function initScrollReveal() {
        const revealElements = [
            '.about-grid',
            '.wheel-header',
            '.wheel-layout',
            '.sacred-header',
            '.practice-card',
            '.philosophy-header',
            '.pillar-card',
            '.testimonials-header',
            '.testimonial-card',
            '.journey-header',
            '.journey-step',
            '.wisdom-quote',
            '.contact-content'
        ];

        revealElements.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add('reveal');
                el.style.transitionDelay = `${i * 0.1}s`;
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // --- Parallax ---
    function initParallax() {
        const geometry = document.getElementById('heroGeometry');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

            if (scrollY < heroHeight && geometry) {
                geometry.style.transform = `rotate(${scrollY * 0.05}deg) scale(${1 + scrollY * 0.0002})`;
                geometry.style.opacity = Math.max(0, 0.08 - scrollY * 0.0001);
            }
        }, { passive: true });
    }

    // --- Smooth Scroll ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});
