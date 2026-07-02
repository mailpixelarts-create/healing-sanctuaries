// DOM Elements
const heroWords = document.querySelectorAll('.hero-word');
const bellButton = document.getElementById('bellButton');
const timerDisplay = document.getElementById('timerDisplay');
const timerCircle = document.getElementById('timerCircle');
const timerText = document.getElementById('timerText');
const sections = document.querySelectorAll('.section');

// Kinetic Typography - Mouse Movement
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateHero() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    heroWords.forEach((word, index) => {
        const rect = word.getBoundingClientRect();
        const wordCenterX = rect.left + rect.width / 2;
        const wordCenterY = rect.top + rect.height / 2;
        
        const deltaX = (currentX - window.innerWidth / 2) * 0.1 * (index + 1);
        const deltaY = (currentY - window.innerHeight / 2) * 0.1 * (index + 1);
        
        word.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    requestAnimationFrame(animateHero);
}

animateHero();

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Web Audio API - Gong Sound
let audioContext = null;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playGong() {
    const ctx = initAudio();
    const now = ctx.currentTime;
    
    // Create oscillator for gong sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(110, now);
    oscillator.frequency.exponentialRampToValueAtTime(55, now + 2);
    
    gainNode.gain.setValueAtTime(0.8, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 4);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 4);
    
    // Add harmonics for richer sound
    const oscillator2 = ctx.createOscillator();
    const gainNode2 = ctx.createGain();
    
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(220, now);
    oscillator2.frequency.exponentialRampToValueAtTime(110, now + 2);
    
    gainNode2.gain.setValueAtTime(0.3, now);
    gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 3);
    
    oscillator2.connect(gainNode2);
    gainNode2.connect(ctx.destination);
    
    oscillator2.start(now);
    oscillator2.stop(now + 3);
    
    // Add resonance
    const oscillator3 = ctx.createOscillator();
    const gainNode3 = ctx.createGain();
    
    oscillator3.type = 'sine';
    oscillator3.frequency.setValueAtTime(55, now);
    oscillator3.frequency.exponentialRampToValueAtTime(27.5, now + 3);
    
    gainNode3.gain.setValueAtTime(0.5, now);
    gainNode3.gain.exponentialRampToValueAtTime(0.001, now + 5);
    
    oscillator3.connect(gainNode3);
    gainNode3.connect(ctx.destination);
    
    oscillator3.start(now);
    oscillator3.stop(now + 5);
}

// 60-Second Timer
let timerInterval = null;
let timeLeft = 60;
let isTimerActive = false;

function startTimer() {
    if (isTimerActive) {
        stopTimer();
        return;
    }
    
    // Play initial gong
    playGong();
    
    isTimerActive = true;
    timeLeft = 60;
    
    // Update UI
    bellButton.classList.add('ringing');
    timerDisplay.classList.add('active');
    timerCircle.classList.add('active');
    timerText.classList.add('active');
    
    // Start countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            stopTimer();
            // Play final gong
            setTimeout(playGong, 500);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    isTimerActive = false;
    
    // Reset UI
    bellButton.classList.remove('ringing');
    timerDisplay.classList.remove('active');
    timerCircle.classList.remove('active');
    timerText.classList.remove('active');
    
    // Reset timer
    setTimeout(() => {
        timerText.textContent = '60';
        timeLeft = 60;
    }, 1800);
}

bellButton.addEventListener('click', startTimer);

// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // Show success message
            alert('Thank you for your message. We will respond within 24 hours.');
            contactForm.reset();
        }
    });
}

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    
    if (hero) {
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / heroHeight);
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add visible class to first section
    setTimeout(() => {
        sections[0].classList.add('visible');
    }, 100);
});