/* ==========================================
   LABYRINTH WALKING — SCRIPTS
   Film Noir Digital Aesthetic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            initAnimations();
        }, 2500);
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.classList.add('hidden');
            initAnimations();
        }, 2500);
    }

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // Smooth scroll for navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Active navigation on scroll
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 300) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');

    function parallaxHero() {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const speed = 0.3;
            heroContent.style.transform = `translateY(${scrolled * speed}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight);
            heroBg.style.transform = `translateY(${scrolled * speed * 0.5}px)`;
        }
    }

    window.addEventListener('scroll', parallaxHero);

    // Intersection Observer for animations
    function initAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('practice-card')) {
                        animatePracticeCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        // Add animation classes to elements
        addAnimationClasses();
    }

    function addAnimationClasses() {
        // About section
        const aboutTitle = document.querySelector('.about-title');
        const aboutDescription = document.querySelector('.about-description');
        const aboutStats = document.querySelector('.about-stats');
        
        if (aboutTitle) aboutTitle.classList.add('fade-in');
        if (aboutDescription) aboutDescription.classList.add('fade-in');
        if (aboutStats) aboutStats.classList.add('fade-in');

        // Practices
        document.querySelectorAll('.practice-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.2}s`;
            card.classList.add('fade-in');
        });

        // Quote
        const quoteText = document.querySelector('.quote-text');
        if (quoteText) quoteText.classList.add('fade-in');

        // Arrival
        const arrivalTitle = document.querySelector('.arrival-title');
        const arrivalDetails = document.querySelector('.arrival-details');
        
        if (arrivalTitle) arrivalTitle.classList.add('fade-in');
        if (arrivalDetails) arrivalDetails.classList.add('fade-in');
    }

    function animatePracticeCard(card) {
        const path = card.querySelector('.practice-path');
        if (path) {
            path.style.strokeDashoffset = '0';
        }
    }

    // Cursor effect for portal feel
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
    document.body.appendChild(cursor);

    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorRing = cursor.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add cursor styles
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .custom-cursor {
            position: fixed;
            pointer-events: none;
            z-index: 10001;
            mix-blend-mode: difference;
        }
        
        .cursor-dot {
            position: fixed;
            width: 8px;
            height: 8px;
            background: #6b5b95;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
        
        .cursor-ring {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 1px solid rgba(107, 91, 149, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
        }
        
        a:hover ~ .custom-cursor .cursor-ring,
        .cta-button:hover ~ .custom-cursor .cursor-ring {
            width: 60px;
            height: 60px;
            border-color: #6b5b95;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(cursorStyles);

    // Labyrinth path drawing on scroll
    const labyrinthPaths = document.querySelectorAll('.labyrinth-hero-path, .walking-path, .practice-path, .footer-path');
    
    function animatePathsOnScroll() {
        labyrinthPaths.forEach(path => {
            const rect = path.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
                const drawLength = path.getTotalLength ? path.getTotalLength() : 2000;
                path.style.strokeDashoffset = drawLength * (1 - Math.min(scrollPercent * 2, 1));
            }
        });
    }

    window.addEventListener('scroll', animatePathsOnScroll);

    // Coordinate display update
    const coordElements = document.querySelectorAll('.coord-value, .coord-float, .coord-stone');
    
    function updateCoordinates() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        coordElements.forEach((el, index) => {
            const baseLat = 48.4474;
            const baseLng = 1.4888;
            const variation = scrollPercent * 0.001 * (index + 1);
            
            el.textContent = `${(baseLat + variation).toFixed(4)}°N, ${(baseLng - variation).toFixed(4)}°E`;
        });
    }

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateCoordinates();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Practice card distance counter
    const distanceMarkers = document.querySelectorAll('.distance-number');
    
    function animateDistance() {
        distanceMarkers.forEach(marker => {
            const target = marker.textContent;
            
            if (target !== '∞') {
                const targetNum = parseInt(target);
                let current = 0;
                const increment = targetNum / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetNum) {
                        current = targetNum;
                        clearInterval(timer);
                    }
                    marker.textContent = Math.floor(current);
                }, 30);
            }
        });
    }

    // Trigger distance animation when practices section is visible
    const practicesSection = document.getElementById('practices');
    const distanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateDistance();
                distanceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (practicesSection) {
        distanceObserver.observe(practicesSection);
    }

    // Stone placement animation for creation ceremony
    const stones = document.querySelectorAll('.stone');
    
    function animateStones() {
        stones.forEach((stone, index) => {
            setTimeout(() => {
                stone.style.opacity = '1';
                stone.style.transform = 'scale(1)';
            }, index * 100);
        });
    }

    // Observe creation ceremony card
    const creationCard = document.querySelectorAll('.practice-card')[2];
    if (creationCard) {
        const stoneObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStones();
                    stoneObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stoneObserver.observe(creationCard);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            navigateSection(1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateSection(-1);
        }
    });

    function navigateSection(direction) {
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.round(currentScroll / windowHeight);
        const targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
        
        sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
    }

    // CTA button ripple effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ctaButton.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Add ripple styles
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        .ripple {
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(107, 91, 149, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: translate(-50%, -50%) scale(10);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);

    // Ambient floating particles
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        document.body.appendChild(particleContainer);

        const particleStyles = document.createElement('style');
        particleStyles.textContent = `
            .particle-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                overflow: hidden;
            }
            
            .particle {
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(107, 91, 149, 0.3);
                border-radius: 50%;
                animation: floatParticle linear infinite;
            }
            
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyles);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.width = (Math.random() * 2 + 1) + 'px';
            particle.style.height = particle.style.width;
            particleContainer.appendChild(particle);
        }
    }

    createParticles();

    // Scroll progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress';
    document.body.appendChild(progressIndicator);

    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, #6b5b95, #8a8a8a);
            z-index: 10000;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyles);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressIndicator.style.width = scrollPercent + '%';
    });

    console.log('%c🔮 Labyrinth Walking — The Path In Is the Path Out', 
        'color: #6b5b95; font-size: 16px; font-weight: bold;');
    console.log('%cSacred Geometry / Meditation', 
        'color: #8a8a8a; font-size: 12px;');
});
