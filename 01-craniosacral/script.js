document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('aura-canvas');
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('aura-overlay');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let isMouseActive = false;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class AuraParticle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
        }
        
        update() {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 200 && isMouseActive) {
                const force = (200 - dist) / 200;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
                this.opacity = Math.min(0.8, this.opacity + 0.02);
                this.size = Math.min(4, this.size + 0.05);
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            
            if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            const lifeRatio = this.life / this.maxLife;
            const currentOpacity = this.opacity * lifeRatio;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(201, 169, 110, ${currentOpacity})`;
            ctx.fill();
        }
    }
    
    const particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push(new AuraParticle());
    }
    
    class EnergyField {
        constructor() {
            this.points = [];
            this.numPoints = 8;
            this.radius = 150;
            this.angleStep = (Math.PI * 2) / this.numPoints;
            
            for (let i = 0; i < this.numPoints; i++) {
                this.points.push({
                    angle: this.angleStep * i,
                    radius: this.radius,
                    speed: 0.005 + Math.random() * 0.01,
                    wobble: Math.random() * 20
                });
            }
        }
        
        update() {
            this.points.forEach(point => {
                point.angle += point.speed;
                const dist = Math.sqrt(
                    Math.pow(mouseX - canvas.width / 2, 2) + 
                    Math.pow(mouseY - canvas.height / 2, 2)
                );
                point.radius = this.radius + Math.sin(dist * 0.01) * 30 + point.wobble;
            });
        }
        
        draw() {
            ctx.beginPath();
            
            for (let i = 0; i <= this.numPoints; i++) {
                const point = this.points[i % this.numPoints];
                const x = canvas.width / 2 + Math.cos(point.angle) * point.radius;
                const y = canvas.height / 2 + Math.sin(point.angle) * point.radius;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    const prevPoint = this.points[(i - 1) % this.numPoints];
                    const prevX = canvas.width / 2 + Math.cos(prevPoint.angle) * prevPoint.radius;
                    const prevY = canvas.height / 2 + Math.sin(prevPoint.angle) * prevPoint.radius;
                    
                    const cpX = (prevX + x) / 2;
                    const cpY = (prevY + y) / 2;
                    ctx.quadraticCurveTo(prevX, prevY, cpX, cpY);
                }
            }
            
            ctx.closePath();
            ctx.strokeStyle = 'rgba(201, 169, 110, 0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    
    const energyField = new EnergyField();
    
    function animate() {
        ctx.fillStyle = 'rgba(18, 15, 14, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;
        
        energyField.update();
        energyField.draw();
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        isMouseActive = true;
        
        overlay.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
        overlay.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
        overlay.classList.add('active');
        
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        }
    });
    
    window.addEventListener('mouseleave', () => {
        isMouseActive = false;
        overlay.classList.remove('active');
    });
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const hoverElements = document.querySelectorAll('a, button, .art-card, .philosophy-pillar, .journey-step, .testimonial-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    const revealElements = document.querySelectorAll('.section-header, .about-text, .about-visual, .art-card, .philosophy-pillar, .testimonial-card, .journey-step, .contact-info, .contact-form-wrapper');
    
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        if (index % 5 === 0) el.classList.add('reveal-delay-1');
        if (index % 5 === 1) el.classList.add('reveal-delay-2');
        if (index % 5 === 2) el.classList.add('reveal-delay-3');
        if (index % 5 === 3) el.classList.add('reveal-delay-4');
        if (index % 5 === 4) el.classList.add('reveal-delay-5');
    });
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    const journeySteps = document.querySelectorAll('.journey-step');
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    
    journeySteps.forEach(step => stepObserver.observe(step));
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function activateTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
    }
    
    testimonialCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            currentTestimonial = index;
            activateTestimonial(index);
        });
    });
    
    activateTestimonial(0);
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Received ✦</span>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const scrollDelta = currentScrollY - lastScrollY;
                
                document.documentElement.style.setProperty(
                    '--scroll-progress',
                    `${(currentScrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`
                );
                
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    document.documentElement.style.setProperty(
        '--scroll-progress',
        '0%'
    );
    
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const progress = scrolled / heroHeight;
                hero.style.opacity = 1 - progress;
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    const sacredGeometry = document.querySelector('.sacred-geometry');
    if (sacredGeometry) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            sacredGeometry.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.05}deg)`;
        });
    }
});
