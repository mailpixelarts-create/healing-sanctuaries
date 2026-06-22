/* ============================================
   SUFI DHIKR HEALING — Cinematic Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }, 1800);
    });

    // Fallback if load already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
            initAnimations();
        }, 1800);
    }

    function initAnimations() {
        generateWaveform();
        initMandalaNav();
        initScrollReveal();
        initParallax();
        initSmoothScroll();
    }

    // --- Audio Waveform Generation ---
    function generateWaveform() {
        const waveContainer = document.querySelector('.wave-bars');
        if (!waveContainer) return;

        const barCount = 80;
        const svgNS = 'http://www.w3.org/2000/svg';

        for (let i = 0; i < barCount; i++) {
            const rect = document.createElementNS(svgNS, 'rect');
            const x = (i / barCount) * 1200;
            const maxHeight = 20 + Math.random() * 80;
            const width = 8;
            const gap = (1200 / barCount) - width;

            rect.setAttribute('x', x + gap / 2);
            rect.setAttribute('y', 150 - maxHeight / 2);
            rect.setAttribute('width', width);
            rect.setAttribute('height', maxHeight);
            rect.setAttribute('rx', 2);
            rect.setAttribute('class', 'wave-bar');
            rect.style.setProperty('--duration', (1.5 + Math.random() * 2) + 's');
            rect.style.setProperty('--delay', (Math.random() * 2) + 's');

            waveContainer.appendChild(rect);
        }
    }

    // --- Circular Mandala Navigation ---
    function initMandalaNav() {
        const nav = document.getElementById('mandalaNav');
        const mandalaSvg = document.querySelector('.mandala-svg');
        const mandalaPattern = document.querySelector('.mandala-pattern');
        const navDots = document.querySelectorAll('.nav-dot');
        const sections = ['hero', 'about', 'sacred-art', 'philosophy', 'testimonials', 'journey', 'quote'];

        if (!nav || !mandalaSvg) return;

        let lastScrollY = 0;
        let ticking = false;

        // Show nav after scrolling past hero
        function updateNavVisibility() {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            if (scrollY > heroHeight * 0.5) {
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
            }
        }

        // Rotate mandala with scroll
        function updateMandalaRotation() {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollY / maxScroll;
            const rotation = scrollPercent * 360;

            mandalaSvg.style.transform = `rotate(${rotation * 0.3}deg)`;
            if (mandalaPattern) {
                mandalaPattern.style.transform = `rotate(${-rotation * 0.1}deg)`;
            }
        }

        // Highlight active section dot
        function updateActiveDot() {
            const scrollY = window.scrollY + window.innerHeight / 3;

            sections.forEach((sectionId, index) => {
                const section = document.getElementById(sectionId);
                if (!section) return;

                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (scrollY >= top && scrollY < bottom) {
                    navDots.forEach(dot => dot.classList.remove('active'));
                    navDots[index]?.classList.add('active');
                }
            });
        }

        function onScroll() {
            lastScrollY = window.scrollY;
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateNavVisibility();
                    updateMandalaRotation();
                    updateActiveDot();
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });

        // Nav dot click navigation
        navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sectionId = dot.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Mobile nav toggle
        const navToggle = document.getElementById('navToggle');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                nav.classList.toggle('mobile-open');
            });
        }

        // Initial check
        updateNavVisibility();
    }

    // --- Scroll Reveal ---
    function initScrollReveal() {
        const revealElements = [
            { selector: '.about-manuscript', delay: 0 },
            { selector: '.sacred-header', delay: 0 },
            { selector: '.practice-card', delay: 0, stagger: true },
            { selector: '.philosophy-header', delay: 0 },
            { selector: '.pillar-card', delay: 0, stagger: true },
            { selector: '.testimonials-header', delay: 0 },
            { selector: '.testimonial-card', delay: 0, stagger: true },
            { selector: '.journey-header', delay: 0 },
            { selector: '.journey-step', delay: 0, stagger: true },
            { selector: '.rumi-quote', delay: 0 },
            { selector: '.quote-secondary', delay: 0.2 },
            { selector: '.arrival-content', delay: 0 },
        ];

        revealElements.forEach(({ selector, delay, stagger }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, i) => {
                el.classList.add('reveal');
                if (stagger) {
                    el.style.transitionDelay = `${delay + i * 0.2}s`;
                } else if (delay > 0) {
                    el.style.transitionDelay = `${delay}s`;
                }
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // --- Parallax Effects ---
    function initParallax() {
        const heroDervish = document.querySelector('.hero-dervish');
        const waveformContainer = document.querySelector('.waveform-container');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            if (scrollY < heroHeight) {
                const progress = scrollY / heroHeight;

                if (heroDervish) {
                    heroDervish.style.transform = `translateY(${scrollY * 0.15}px) rotate(${progress * 5}deg)`;
                }

                if (waveformContainer) {
                    waveformContainer.style.transform = `translateX(-50%) translateY(${scrollY * 0.1}px)`;
                    waveformContainer.style.opacity = 0.15 - progress * 0.1;
                }
            }
        }, { passive: true });
    }

    // --- Smooth Scroll for Internal Links ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // --- Dynamic Waveform Animation (continuous subtle movement) ---
    let waveFrame;
    function animateWaveform() {
        const bars = document.querySelectorAll('.wave-bar');
        const time = Date.now() * 0.001;

        bars.forEach((bar, i) => {
            const baseHeight = parseFloat(bar.getAttribute('height'));
            const phase = i * 0.15;
            const wave = Math.sin(time * 0.8 + phase) * 0.15 + 1;
            bar.style.transform = `scaleY(${wave})`;
        });

        waveFrame = requestAnimationFrame(animateWaveform);
    }

    // Start waveform animation when visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateWaveform();
            } else {
                cancelAnimationFrame(waveFrame);
            }
        });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // --- Practice Circle Hover Interaction ---
    document.querySelectorAll('.practice-card').forEach(card => {
        const circle = card.querySelector('.practice-circle');
        if (!circle) return;

        card.addEventListener('mouseenter', () => {
            circle.style.animationDuration = '8s';
        });

        card.addEventListener('mouseleave', () => {
            circle.style.animationDuration = '';
        });
    });

    // --- Quote Section Ambient Glow ---
    const quoteSection = document.querySelector('.quote-section');
    if (quoteSection) {
        quoteSection.addEventListener('mousemove', (e) => {
            const rect = quoteSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            quoteSection.style.setProperty('--glow-x', `${x}%`);
            quoteSection.style.setProperty('--glow-y', `${y}%`);
        });
    }

    // --- Manuscript Texture Effect ---
    const manuscript = document.querySelector('.about-manuscript');
    if (manuscript) {
        manuscript.addEventListener('mousemove', (e) => {
            const rect = manuscript.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            manuscript.style.background = `
                radial-gradient(
                    circle at ${x * 100}% ${y * 100}%,
                    rgba(212,196,168,0.15) 0%,
                    transparent 50%
                ),
                var(--paper)
            `;
        });

        manuscript.addEventListener('mouseleave', () => {
            manuscript.style.background = 'var(--paper)';
        });
    }

    // --- CTA Button Ripple Effect ---
    const cta = document.querySelector('.arrival-cta');
    if (cta) {
        cta.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                left: ${e.clientX - rect.left}px;
                top: ${e.clientY - rect.top}px;
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out forwards;
                pointer-events: none;
                z-index: 2;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        // Add ripple keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});