/* ============================================
   ZERO POINT — Interactive Engine
   ============================================ */

// Pressure Point Data
const pressurePoints = {
    LI4: {
        nameCn: '合谷',
        nameEn: 'Hegu — Large Intestine 4',
        anatomy: 'First dorsal interosseous muscle',
        description: 'The "Command Point of the Face." Master point for all conditions affecting the head, face, and jaw. Strongly analgesic, regulates immune response, and clears external pathogens. Often used for headaches, toothaches, and sinus issues.'
    },
    PC6: {
        nameCn: '内关',
        nameEn: 'Neiguan — Pericardium 6',
        anatomy: 'Between palmaris longus and flexor carpi radialis tendons',
        description: 'The "Inner Pass." Key point for calming the mind and regulating the heart. Treats anxiety, insomnia, chest tightness, and nausea. Used extensively for motion sickness and morning sickness during pregnancy.'
    },
    ST36: {
        nameCn: '足三里',
        nameEn: 'Zusanli — Stomach 36',
        anatomy: 'Tibialis anterior, 3 cun below the knee',
        description: 'The "Leg Three Miles." Supreme point for strengthening the body. Boosts immunity, improves digestion, and increases vitality. The most studied acupuncture point in clinical research. Used for fatigue, digestive disorders, and general weakness.'
    },
    LV3: {
        nameCn: '太冲',
        nameEn: 'Taichong — Liver 3',
        anatomy: 'Between first and second metatarsal bones',
        description: 'The "Great Surge." Primary point for moving stuck Liver qi. Treats emotional stagnation, irritability, and anger. Regulates menstrual cycle and alleviates headaches caused by Liver yang rising.'
    },
    KI3: {
        nameCn: '太溪',
        nameEn: 'Taixi — Kidney 3',
        anatomy: 'Between medial malleolus and Achilles tendon',
        description: 'The "Great Ravine." Source point of the Kidney channel. Nourishes Kidney yin and yang, strengthens bones and hearing. Used for chronic fatigue, low back pain, and reproductive issues.'
    }
};

// Matrix Rain Effect
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 26, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#00FF41';
        this.ctx.font = `${this.fontSize}px "IBM Plex Mono", monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Varying brightness
            const brightness = Math.random();
            if (brightness > 0.95) {
                this.ctx.fillStyle = '#FFFFFF';
            } else if (brightness > 0.8) {
                this.ctx.fillStyle = '#00FF41';
            } else {
                this.ctx.fillStyle = 'rgba(0, 255, 65, 0.7)';
            }

            this.ctx.fillText(char, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.init();
    }
}

// Pressure Point Explorer
class PressurePointExplorer {
    constructor() {
        this.points = document.querySelectorAll('.pressure-point');
        this.infoContent = document.querySelector('.info-content');
        this.infoHeader = document.querySelector('.info-header');
        this.init();
    }

    init() {
        this.points.forEach(point => {
            point.addEventListener('mouseenter', (e) => this.showInfo(e));
            point.addEventListener('mouseleave', () => this.hideInfo());
        });
    }

    showInfo(e) {
        const pointId = e.currentTarget.dataset.point;
        const data = pressurePoints[pointId];

        if (!data) return;

        this.infoHeader.textContent = `[POINT.ACTIVE]`;
        document.querySelector('.info-name-cn').textContent = data.nameCn;
        document.querySelector('.info-name-en').textContent = data.nameEn;
        document.querySelector('.info-anatomy').textContent = data.anatomy;
        document.querySelector('.info-description').textContent = data.description;

        this.infoContent.classList.add('active');
    }

    hideInfo() {
        this.infoContent.classList.remove('active');
        setTimeout(() => {
            this.infoHeader.textContent = 'SELECT A PRESSURE POINT';
            document.querySelector('.info-name-cn').textContent = '—';
            document.querySelector('.info-name-en').textContent = '—';
            document.querySelector('.info-anatomy').textContent = '—';
            document.querySelector('.info-description').textContent = 'Hover over a point on the wireframe to explore its properties.';
        }, 300);
    }
}

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Add reveal class to elements
        const selectors = [
            '.about-text h2', '.about-text p', '.about-stats',
            '.art-card', '.pillar', '.testimonial',
            '.journey-step', '.footer-grid > div'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('reveal');
                this.elements.push(el);
            });
        });

        this.check();
        window.addEventListener('scroll', () => this.check());
    }

    check() {
        const windowHeight = window.innerHeight;

        this.elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('visible');
            }
        });
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Matrix Rain
    const canvas = document.getElementById('matrix-rain');
    const matrix = new MatrixRain(canvas);
    matrix.animate();

    // After 2 seconds, fade matrix and show meridian map
    setTimeout(() => {
        canvas.classList.add('fade');
        document.getElementById('meridian-overlay').classList.add('visible');
    }, 2000);

    // Pressure Point Explorer
    new PressurePointExplorer();

    // Scroll Reveal
    new ScrollReveal();

    // Resize handler
    window.addEventListener('resize', () => matrix.resize());

    // Smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add cursor trail effect
    let trail = [];
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: var(--paper);
            pointer-events: none;
            z-index: 9999;
            transition: all 0.5s ease;
            opacity: 0.5;
        `;
        document.body.appendChild(dot);

        setTimeout(() => {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0)';
        }, 10);

        setTimeout(() => dot.remove(), 500);
    });
});
