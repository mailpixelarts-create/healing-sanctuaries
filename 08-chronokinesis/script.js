document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCosmicCanvas();
    initCounter();
    initClock();
    initFooterClock();
    initFooterTime();
    initNavigation();
    initScrollAnimations();
});

function initPreloader() {
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCounter');
    let count = 0;

    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 5) + 1;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        }
        const minutes = String(Math.floor(count / 60)).padStart(2, '0');
        const seconds = String(count % 60).padStart(2, '0');
        const ms = String(Math.floor(Math.random() * 99)).padStart(2, '0');
        counter.textContent = `${minutes}:${seconds}:${ms}`;
    }, 50);
}

function initCosmicCanvas() {
    const canvas = document.getElementById('cosmicCanvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    function initStars() {
        stars = [];
        const numStars = Math.floor((canvas.width * canvas.height) / 3000);
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.02 + 0.01,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    function drawStar(star, time) {
        const twinkle = Math.sin(time * star.speed + star.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 240, 232, ${star.opacity * twinkle})`;
        ctx.fill();
    }

    function addShootingStar() {
        if (Math.random() < 0.005) {
            shootingStars.push({
                x: Math.random() * canvas.width,
                y: 0,
                length: Math.random() * 100 + 50,
                speed: Math.random() * 8 + 4,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
                opacity: 1
            });
        }
    }

    function drawShootingStar(star) {
        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 107, 53, ${star.opacity})`);
        gradient.addColorStop(1, `rgba(255, 107, 53, 0)`);

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    function drawOrbit Rings(time) {
        const centerX = canvas.width * 0.7;
        const centerY = canvas.height * 0.3;

        for (let i = 1; i <= 3; i++) {
            const radius = 100 + i * 60;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 107, 53, ${0.1 - i * 0.02})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            const orbitX = centerX + Math.cos(time * 0.001 * (4 - i)) * radius;
            const orbitY = centerY + Math.sin(time * 0.001 * (4 - i)) * radius;

            ctx.beginPath();
            ctx.arc(orbitX, orbitY, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 107, 53, ${0.5 - i * 0.1})`;
            ctx.fill();
        }
    }

    function animate(time) {
        ctx.fillStyle = 'rgba(42, 42, 42, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => drawStar(star, time));
        drawOrbitRings(time);

        addShootingStar();
        shootingStars = shootingStars.filter(star => {
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.opacity -= 0.015;

            if (star.opacity > 0) {
                drawShootingStar(star);
                return true;
            }
            return false;
        });

        animationId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    animate(0);
}

function initCounter() {
    const targetYears = 15;
    const targetMonths = 7;
    const targetDays = 23;

    const yearsEl = document.getElementById('counterYears');
    const monthsEl = document.getElementById('counterMonths');
    const daysEl = document.getElementById('counterDays');

    let currentYears = 0;
    let currentMonths = 0;
    let currentDays = 0;

    const totalDuration = 3000;
    const frameInterval = 30;
    const totalFrames = totalDuration / frameInterval;

    const yearsPerFrame = targetYears / totalFrames;
    const monthsPerFrame = targetMonths / totalFrames;
    const daysPerFrame = targetDays / totalFrames;

    const interval = setInterval(() => {
        currentYears += yearsPerFrame;
        currentMonths += monthsPerFrame;
        currentDays += daysPerFrame;

        if (currentYears >= targetYears && currentMonths >= targetMonths && currentDays >= targetDays) {
            currentYears = targetYears;
            currentMonths = targetMonths;
            currentDays = targetDays;
            clearInterval(interval);
        }

        yearsEl.textContent = String(Math.floor(currentYears)).padStart(2, '0');
        monthsEl.textContent = String(Math.floor(currentMonths)).padStart(2, '0');
        daysEl.textContent = String(Math.floor(currentDays)).padStart(2, '0');
    }, frameInterval);
}

function initClock() {
    function updateClock() {
        const now = new Date();

        const hourHand = document.querySelector('.hand-hour');
        const minuteHand = document.querySelector('.hand-minute');
        const secondHand = document.querySelector('.hand-second');

        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();

        const hourDegrees = (hours * 30) + (minutes * 0.5);
        const minuteDegrees = (minutes * 6) + (seconds * 0.1);
        const secondDegrees = (seconds * 6) + (milliseconds * 0.006);

        if (hourHand) hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        if (minuteHand) minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        if (secondHand) secondHand.style.transform = `rotate(${secondDegrees}deg)`;

        requestAnimationFrame(updateClock);
    }

    updateClock();
}

function initFooterClock() {
    function updateFooterClock() {
        const now = new Date();

        const hourHand = document.querySelector('.footer-hand-hour');
        const minuteHand = document.querySelector('.footer-hand-minute');
        const secondHand = document.querySelector('.footer-hand-second');

        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();

        const hourDegrees = (hours * 30) + (minutes * 0.5);
        const minuteDegrees = (minutes * 6) + (seconds * 0.1);
        const secondDegrees = (seconds * 6) + (milliseconds * 0.006);

        if (hourHand) hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        if (minuteHand) minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        if (secondHand) secondHand.style.transform = `rotate(${secondDegrees}deg)`;

        requestAnimationFrame(updateFooterClock);
    }

    updateFooterClock();
}

function initFooterTime() {
    const timeEl = document.getElementById('footerTime');

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeEl.textContent = `${hours}:${minutes}:${seconds} GMT`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    const nav = document.querySelector('.data-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(42, 42, 42, 0.98)';
        } else {
            nav.style.background = 'rgba(42, 42, 42, 0.95)';
        }

        lastScroll = currentScroll;
    });
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.section-label, .section-title, .temporal-intro, .temporal-text, ' +
        '.temporal-stats, .timeline-item, .quote-container, .coord-card, ' +
        '.address-card, .cta-container'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    const coordCards = document.querySelectorAll('.coord-card');
    coordCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}