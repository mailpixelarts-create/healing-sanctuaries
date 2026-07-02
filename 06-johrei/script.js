document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    initCompass();
    initNavigation();
    initScrollAnimations();
    initContactForm();
});

/* ========== HERO CANVAS — Faceted Amethyst Mesh ========== */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let vertices = [];
    let edges = [];
    let mouseX = 0, mouseY = 0;
    let isDragging = false;
    let rotation = 0;
    let shards = [];
    let fracturing = false;
    let fractureProgress = 0;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        generateMesh();
    }

    function generateMesh() {
        vertices = [];
        edges = [];
        const cols = 12;
        const rows = 8;
        const spacingX = width / (cols + 1);
        const spacingY = height / (rows + 1);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const offsetX = r % 2 === 0 ? 0 : spacingX / 2;
                vertices.push({
                    x: spacingX * (c + 1) + offsetX,
                    y: spacingY * (r + 1),
                    baseX: spacingX * (c + 1) + offsetX,
                    baseY: spacingY * (r + 1),
                    vx: 0,
                    vy: 0,
                    radius: Math.random() * 2 + 1
                });
            }
        }

        for (let i = 0; i < vertices.length; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            if (col < cols - 1) edges.push([i, i + 1]);
            if (row < rows - 1) {
                const offset = row % 2 === 0 ? 1 : 0;
                if (i + cols < vertices.length) edges.push([i, i + cols]);
                if (col + offset < cols && i + cols + offset < vertices.length) {
                    edges.push([i, i + cols + offset]);
                }
            }
        }
    }

    function generateShards() {
        shards = [];
        for (let i = 0; i < 20; i++) {
            shards.push({
                x: width / 2 + (Math.random() - 0.5) * 300,
                y: height / 2 + (Math.random() - 0.5) * 300,
                targetX: Math.random() * width,
                targetY: Math.random() * height,
                size: Math.random() * 40 + 20,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.05,
                sides: Math.floor(Math.random() * 3) + 4,
                opacity: 0,
                targetOpacity: Math.random() * 0.6 + 0.2,
                color: Math.random() > 0.5 ? '123, 63, 74' : '180, 140, 200'
            });
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        fracturing = true;
        fractureProgress = 0;
        generateShards();
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        setTimeout(() => {
            fracturing = false;
        }, 800);
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('touchstart', (e) => {
        isDragging = true;
        fracturing = true;
        fractureProgress = 0;
        generateShards();
    });

    canvas.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(() => {
            fracturing = false;
        }, 800);
    });

    canvas.addEventListener('touchmove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
    });

    function drawCrystalMesh() {
        const time = Date.now() * 0.001;
        rotation += 0.002;

        if (fracturing) {
            fractureProgress = Math.min(fractureProgress + 0.02, 1);
        } else {
            fractureProgress = Math.max(fractureProgress - 0.015, 0);
        }

        const globalOpacity = 1 - fractureProgress * 0.7;

        vertices.forEach((v, i) => {
            const distToMouse = Math.hypot(mouseX - v.baseX, mouseY - v.baseY);
            const influence = Math.max(0, 1 - distToMouse / 200);

            const pulse = Math.sin(time * 0.5 + i * 0.3) * 3;
            const wave = Math.sin(time * 0.3 + v.baseY * 0.01) * 5;

            v.x += (v.baseX + wave - v.x) * 0.05;
            v.y += (v.baseY + pulse - v.y) * 0.05;

            if (influence > 0) {
                const angle = Math.atan2(v.baseY - mouseY, v.baseX - mouseX);
                const force = influence * 40 * fractureProgress;
                v.x += Math.cos(angle) * force;
                v.y += Math.sin(angle) * force;
            }

            const distFromCenter = Math.hypot(v.x - width / 2, v.y - height / 2);
            const angle = Math.atan2(v.y - height / 2, v.x - width / 2);
            v.x += Math.cos(angle + rotation) * distFromCenter * 0.001;
            v.y += Math.sin(angle + rotation) * distFromCenter * 0.001;
        });

        edges.forEach(([a, b]) => {
            const va = vertices[a];
            const vb = vertices[b];
            const dist = Math.hypot(va.x - vb.x, va.y - vb.y);
            const maxDist = 150;
            const opacity = Math.max(0, (1 - dist / maxDist) * 0.3 * globalOpacity);

            ctx.beginPath();
            ctx.moveTo(va.x, va.y);
            ctx.lineTo(vb.x, vb.y);
            ctx.strokeStyle = `rgba(123, 63, 74, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });

        vertices.forEach((v, i) => {
            const glow = Math.sin(time + i) * 0.3 + 0.7;
            ctx.beginPath();
            ctx.arc(v.x, v.y, v.radius * glow, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 160, 220, ${0.6 * globalOpacity})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(v.x, v.y, v.radius * 3 * glow, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(123, 63, 74, ${0.1 * globalOpacity})`;
            ctx.fill();
        });
    }

    function drawShards() {
        const time = Date.now() * 0.001;

        shards.forEach((s) => {
            if (fracturing) {
                s.x += (s.targetX - s.x) * 0.02;
                s.y += (s.targetY - s.y) * 0.02;
                s.opacity += (s.targetOpacity - s.opacity) * 0.05;
            } else {
                s.x += (width / 2 - s.x) * 0.03;
                s.y += (height / 2 - s.y) * 0.03;
                s.opacity *= 0.96;
            }

            s.rotation += s.rotSpeed;

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.rotation);
            ctx.globalAlpha = s.opacity;

            ctx.beginPath();
            for (let i = 0; i < s.sides; i++) {
                const angle = (Math.PI * 2 / s.sides) * i - Math.PI / 2;
                const px = Math.cos(angle) * s.size;
                const py = Math.sin(angle) * s.size;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.strokeStyle = `rgba(${s.color}, 0.6)`;
            ctx.lineWidth = 1;
            ctx.stroke();

            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s.size);
            grad.addColorStop(0, `rgba(${s.color}, 0.15)`);
            grad.addColorStop(1, `rgba(${s.color}, 0)`);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.restore();
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const grad = ctx.createRadialGradient(
            width / 2, height / 2, 0,
            width / 2, height / 2, Math.max(width, height) * 0.6
        );
        grad.addColorStop(0, 'rgba(123, 63, 74, 0.08)');
        grad.addColorStop(0.5, 'rgba(13, 11, 10, 0.02)');
        grad.addColorStop(1, 'rgba(13, 11, 10, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        drawCrystalMesh();
        if (shards.length > 0) drawShards();

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}

/* ========== BIRTHSTONE COMPASS ========== */
function initCompass() {
    const months = [
        { name: 'Jan', full: 'January', stone: 'Garnet', formula: 'Fe\u2083Al\u2082(SiO\u2084)\u2083', properties: ['Protection', 'Vitality', 'Passion'], mantra: 'I ignite the fire within, awakening courage and devotion' },
        { name: 'Feb', full: 'February', stone: 'Amethyst', formula: 'SiO\u2082', properties: ['Clarity', 'Sobriety', 'Peace'], mantra: 'I open the third eye, inviting wisdom and calm' },
        { name: 'Mar', full: 'March', stone: 'Aquamarine', formula: 'BeAl\u2082(SiO\u2083)\u2086', properties: ['Courage', 'Communication', 'Flow'], mantra: 'I speak my truth with the clarity of ocean waves' },
        { name: 'Apr', full: 'April', stone: 'Diamond', formula: 'C', properties: ['Strength', 'Eternity', 'Light'], mantra: 'I embody unbreakable radiance and divine clarity' },
        { name: 'May', full: 'May', stone: 'Emerald', formula: 'Be\u2083Al\u2082(SiO\u2084)\u2086', properties: ['Growth', 'Love', 'Harmony'], mantra: 'I nurture abundance and align with the heart of nature' },
        { name: 'Jun', full: 'June', stone: 'Alexandrite', formula: 'BeAl\u2082O\u2084', properties: ['Balance', 'Joy', 'Intuition'], mantra: 'I embrace transformation and trust my inner sight' },
        { name: 'Jul', full: 'July', stone: 'Ruby', formula: 'Al\u2082O\u2083', properties: ['Passion', 'Life Force', 'Courage'], mantra: 'I burn with vitality and embrace my divine purpose' },
        { name: 'Aug', full: 'August', stone: 'Peridot', formula: '(Mg,Fe)\u2082SiO\u2084', properties: ['Abundance', 'Healing', 'Growth'], mantra: 'I attract prosperity and welcome healing light' },
        { name: 'Sep', full: 'September', stone: 'Sapphire', formula: 'Al\u2082O\u2083', properties: ['Wisdom', 'Loyalty', 'Truth'], mantra: 'I anchor myself in truth and divine insight' },
        { name: 'Oct', full: 'October', stone: 'Opal', formula: 'SiO\u2082\u00B7nH\u2082O', properties: ['Creativity', 'Hope', 'Inspiration'], mantra: 'I channel the spectrum of my creative spirit' },
        { name: 'Nov', full: 'November', stone: 'Topaz', formula: 'Al\u2082SiO\u2084(F,OH)\u2082', properties: ['Manifestation', 'Strength', 'Purpose'], mantra: 'I crystallize my visions into radiant reality' },
        { name: 'Dec', full: 'December', stone: 'Tanzanite', formula: 'Ca\u2082Al\u2083(SiO\u2084)\u2083(OH)', properties: ['Transformation', 'Spirit', 'Vision'], mantra: 'I transcend ordinary sight and touch the infinite' }
    ];

    const compassMonths = document.getElementById('compassMonths');
    const radius = 170;

    months.forEach((month, i) => {
        const angle = (Math.PI * 2 / 12) * i - Math.PI / 2;
        const x = Math.cos(angle) * radius + 200 - 30;
        const y = Math.sin(angle) * radius + 200 - 30;

        const el = document.createElement('div');
        el.className = 'compass-month';
        el.textContent = month.name;
        el.style.left = x + 'px';
        el.style.top = y + 'px';

        el.addEventListener('mouseenter', () => {
            document.getElementById('infoMonth').textContent = month.full;
            document.getElementById('infoStone').textContent = month.stone;
            document.getElementById('infoFormula').textContent = month.formula;

            const propsEl = document.getElementById('infoProperties');
            propsEl.innerHTML = month.properties.map(p => `<span>${p}</span>`).join('');

            document.querySelectorAll('.compass-month').forEach(m => m.classList.remove('active'));
            el.classList.add('active');

            typewriteMantra(month.mantra);
        });

        compassMonths.appendChild(el);
    });

    function typewriteMantra(text) {
        const el = document.getElementById('mantraText');
        el.innerHTML = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                el.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(type, 50 + Math.random() * 30);
            } else {
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                el.appendChild(cursor);
                setTimeout(() => cursor.remove(), 2000);
            }
        }
        type();
    }

    const defaultMonth = months[0];
    document.getElementById('infoMonth').textContent = defaultMonth.full;
    document.getElementById('infoStone').textContent = defaultMonth.stone;
    document.getElementById('infoFormula').textContent = defaultMonth.formula;
    document.getElementById('infoProperties').innerHTML = defaultMonth.properties.map(p => `<span>${p}</span>`).join('');
}

/* ========== NAVIGATION ========== */
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function updateActive() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 200;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActive);
    updateActive();

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ========== SCROLL ANIMATIONS ========== */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .philosophy-pillar, .timeline-item, .about-grid > *, .contact-grid > *'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

/* ========== CONTACT FORM ========== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.textContent = 'Sent!';
        btn.style.background = 'var(--signal)';
        setTimeout(() => {
            btn.textContent = 'Send Message';
            btn.style.background = '';
            form.reset();
        }, 2000);
    });
}