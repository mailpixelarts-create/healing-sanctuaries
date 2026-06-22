// Daode Xin Xi — Interactive Mandala & Flowing Animations

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initParticles();
    initMandala();
    initNavigation();
    initQuoteAnimation();
    initPracticeInteractions();
    initPhilosophyAnimations();
    initJourneyAnimations();
    initTestimonialAnimations();
});

// Particles System — Flowing Mist
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;

            if (this.life <= 0 || this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            const fadeRatio = this.life / this.maxLife;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 124, 89, ${this.opacity * fadeRatio})`;
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Mandala Interaction
function initMandala() {
    const mandala = document.querySelector('.mandala-svg');
    const petals = document.getElementById('mandala-petals');
    const triangles = document.getElementById('mandala-triangles');
    const rings = document.querySelectorAll('.mandala-ring');

    let mouseX = 0;
    let mouseY = 0;
    let targetRotation = 0;
    let currentRotation = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
        targetRotation = angle * (180 / Math.PI);
    });

    function animateMandala() {
        currentRotation += (targetRotation - currentRotation) * 0.02;

        if (petals) {
            petals.style.transform = `rotate(${currentRotation * 0.1}deg)`;
            petals.style.transformOrigin = '300px 300px';
        }

        if (triangles) {
            triangles.style.transform = `rotate(${-currentRotation * 0.05}deg)`;
            triangles.style.transformOrigin = '300px 300px';
        }

        rings.forEach((ring, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            ring.style.transform = `rotate(${currentRotation * 0.02 * direction}deg)`;
            ring.style.transformOrigin = '300px 300px';
        });

        requestAnimationFrame(animateMandala);
    }

    animateMandala();
}

// Navigation System
function initNavigation() {
    const navPoints = document.querySelectorAll('.nav-point');
    const labels = document.querySelectorAll('.mandala-label');
    const sections = document.querySelectorAll('.section');
    const homeSection = document.getElementById('home');

    let currentSection = 'home';

    function setActiveSection(sectionId) {
        // Remove active from all
        sections.forEach(s => s.classList.remove('active'));
        navPoints.forEach(p => p.classList.remove('active'));

        // Add active to target
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update nav points
        navPoints.forEach(p => {
            if (p.dataset.section === sectionId) {
                p.classList.add('active');
            }
        });

        currentSection = sectionId;
    }

    // Start with home
    homeSection.classList.add('active');

    // Click handlers for nav points
    navPoints.forEach(point => {
        point.addEventListener('click', () => {
            const sectionId = point.dataset.section;
            setActiveSection(sectionId);
        });
    });

    // Click handlers for labels
    labels.forEach(label => {
        label.addEventListener('click', () => {
            const sectionId = label.dataset.section;
            setActiveSection(sectionId);
        });
    });

    // Click on center to go home
    const centerEmblem = document.querySelector('.center-emblem');
    if (centerEmblem) {
        centerEmblem.addEventListener('click', () => {
            setActiveSection('home');
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const sectionOrder = ['home', 'about', 'practices', 'philosophy', 'testimonials', 'journey', 'quote', 'arrival'];
        const currentIndex = sectionOrder.indexOf(currentSection);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % sectionOrder.length;
            setActiveSection(sectionOrder[nextIndex]);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + sectionOrder.length) % sectionOrder.length;
            setActiveSection(sectionOrder[prevIndex]);
        } else if (e.key === 'Escape') {
            setActiveSection('home');
        }
    });

    // Scroll navigation
    let scrollTimeout;
    document.addEventListener('wheel', (e) => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const sectionOrder = ['home', 'about', 'practices', 'philosophy', 'testimonials', 'journey', 'quote', 'arrival'];
            const currentIndex = sectionOrder.indexOf(currentSection);

            if (e.deltaY > 0) {
                const nextIndex = (currentIndex + 1) % sectionOrder.length;
                setActiveSection(sectionOrder[nextIndex]);
            } else {
                const prevIndex = (currentIndex - 1 + sectionOrder.length) % sectionOrder.length;
                setActiveSection(sectionOrder[prevIndex]);
            }
        }, 50);
    });
}

// Quote Animation — Letter by Letter
function initQuoteAnimation() {
    const quoteSection = document.getElementById('quote');
    const quoteLines = document.querySelectorAll('.quote-line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                quoteLines.forEach((line, index) => {
                    setTimeout(() => {
                        animateLetters(line);
                    }, index * 400);
                });
            }
        });
    }, { threshold: 0.5 });

    if (quoteSection) {
        observer.observe(quoteSection);
    }
}

function animateLetters(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';

    [...text].forEach((letter, index) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(10px)';
            span.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            element.appendChild(span);

            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
}

// Practice Circle Interactions
function initPracticeInteractions() {
    const practiceCircles = document.querySelectorAll('.practice-circle');

    practiceCircles.forEach(circle => {
        circle.addEventListener('mouseenter', () => {
            const ring = circle.querySelector('.practice-ring');
            if (ring) {
                ring.style.animation = 'none';
                ring.style.transform = 'scale(1.15)';
                ring.style.borderColor = 'var(--gold)';
                ring.style.opacity = '0.8';
            }
        });

        circle.addEventListener('mouseleave', () => {
            const ring = circle.querySelector('.practice-ring');
            if (ring) {
                ring.style.animation = '';
                ring.style.transform = '';
                ring.style.borderColor = '';
                ring.style.opacity = '';
            }
        });
    });
}

// Philosophy Section — Virtue Card Hover Effects
function initPhilosophyAnimations() {
    const virtueCards = document.querySelectorAll('.virtue-card');

    virtueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const symbol = card.querySelector('.virtue-symbol');
            if (symbol) {
                symbol.style.transform = 'scale(1.15) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const symbol = card.querySelector('.virtue-symbol');
            if (symbol) {
                symbol.style.transform = '';
            }
        });
    });
}

// Journey Section — Step Hover Effects
function initJourneyAnimations() {
    const journeySteps = document.querySelectorAll('.journey-step');

    journeySteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            const marker = step.querySelector('.step-number');
            if (marker) {
                marker.style.background = 'rgba(74, 124, 89, 0.2)';
                marker.style.borderColor = 'var(--gold)';
            }
        });

        step.addEventListener('mouseleave', () => {
            const marker = step.querySelector('.step-number');
            if (marker) {
                marker.style.background = '';
                marker.style.borderColor = '';
            }
        });
    });
}

// Testimonials Section — Card Hover Effects
function initTestimonialAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderLeftColor = 'var(--gold)';
            card.style.background = 'rgba(26, 26, 26, 0.6)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.borderLeftColor = '';
            card.style.background = '';
        });
    });
}

// Smooth scroll helper (for potential future use)
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: '1.6s cubic-bezier(0.23, 1, 0.32, 1)',
        block: 'start'
    });
}
