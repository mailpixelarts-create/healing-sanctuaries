document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        initPhysics();
    }, 2000);

    // Navigation
    const navToggle = document.getElementById('navToggle');
    const navRing = document.querySelector('.nav-ring');
    const navItems = document.querySelectorAll('.nav-item');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navRing.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navRing.classList.remove('active');
        });
    });

    // Matter.js Physics
    function initPhysics() {
        const canvas = document.getElementById('physicsCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const Engine = Matter.Engine,
              Render = Matter.Render,
              Runner = Matter.Runner,
              Composites = Matter.Composites,
              MouseConstraint = Matter.MouseConstraint,
              Mouse = Matter.Mouse,
              World = Matter.World,
              Bodies = Matter.Bodies,
              Body = Matter.Body,
              Events = Matter.Events;

        const engine = Engine.create();
        const world = engine.world;

        const render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: canvas.width,
                height: canvas.height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Create walls
        const wallOptions = { 
            isStatic: true, 
            render: { visible: false },
            friction: 0.8,
            restitution: 0.5
        };
        
        World.add(world, [
            Bodies.rectangle(canvas.width / 2, canvas.height + 50, canvas.width, 100, wallOptions),
            Bodies.rectangle(canvas.width / 2, -50, canvas.width, 100, wallOptions),
            Bodies.rectangle(-50, canvas.height / 2, 100, canvas.height, wallOptions),
            Bodies.rectangle(canvas.width + 50, canvas.height / 2, 100, canvas.height, wallOptions)
        ]);

        // Central sun
        const sun = Bodies.circle(canvas.width / 2, canvas.height / 2, 60, {
            isStatic: true,
            render: {
                fillStyle: '#4A7C59',
                opacity: 0.3
            }
        });
        World.add(world, sun);

        // QI letters
        const letters = [];
        const qiChars = ['Q', 'I'];
        
        for (let i = 0; i < 15; i++) {
            const char = qiChars[i % 2];
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            
            const letter = Bodies.circle(x, y, 20 + Math.random() * 15, {
                restitution: 0.7,
                friction: 0.3,
                density: 0.001,
                render: {
                    fillStyle: 'rgba(38, 34, 28, 0.6)',
                    opacity: 0.6
                }
            });
            
            letter.char = char;
            letter.render.text = {
                content: char,
                color: '#ECE3D5',
                size: 16,
                family: 'Archivo'
            };
            
            letters.push(letter);
            World.add(world, letter);
        }

        // Mouse interaction
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        World.add(world, mouseConstraint);
        render.mouse = mouse;

        // Attract letters to sun
        Events.on(engine, 'beforeUpdate', () => {
            letters.forEach(letter => {
                const dx = sun.position.x - letter.position.x;
                const dy = sun.position.y - letter.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 80) {
                    const force = 0.00002;
                    Body.applyForce(letter, letter.position, {
                        x: (dx / distance) * force,
                        y: (dy / distance) * force
                    });
                }
            });
        });

        // Custom rendering for text
        Events.on(render, 'afterRender', () => {
            letters.forEach(letter => {
                ctx.save();
                ctx.translate(letter.position.x, letter.position.y);
                ctx.rotate(letter.angle);
                ctx.font = '600 20px Archivo';
                ctx.fillStyle = '#ECE3D5';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(letter.char, 0, 0);
                ctx.restore();
            });

            // Sun glow
            const gradient = ctx.createRadialGradient(
                sun.position.x, sun.position.y, 0,
                sun.position.x, sun.position.y, 100
            );
            gradient.addColorStop(0, 'rgba(74, 124, 89, 0.3)');
            gradient.addColorStop(1, 'rgba(74, 124, 89, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(sun.position.x, sun.position.y, 100, 0, Math.PI * 2);
            ctx.fill();
        });

        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            render.options.width = canvas.width;
            render.options.height = canvas.height;
            Render.setSize(render, canvas.width, canvas.height);
        });
    }

    // 8 Brocades interactive
    const brocadeItems = document.querySelectorAll('.brocade-item');
    let activeBrocade = null;

    brocadeItems.forEach(item => {
        item.addEventListener('click', () => {
            const silhouette = item.querySelector('.brocade-silhouette');
            
            if (activeBrocade && activeBrocade !== item) {
                activeBrocade.classList.remove('active');
                const prevSilhouette = activeBrocade.querySelector('.brocade-silhouette');
                prevSilhouette.classList.remove('animate');
            }
            
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                silhouette.classList.add('animate');
                activeBrocade = item;
            } else {
                silhouette.classList.remove('animate');
                activeBrocade = null;
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-label, .section-title, .body-text, .about-stats, .visual-frame, .sacred-card, .pillar, .testimonial-card, .journey-step, .contact-block, .cta-button').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Make elements visible when in view
    const visibleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-label, .section-title, .body-text, .about-stats, .visual-frame, .sacred-card, .pillar, .testimonial-card, .journey-step, .contact-block, .cta-button').forEach(el => {
        visibleObserver.observe(el);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero-content');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                    hero.style.opacity = 1 - (scrolled / window.innerHeight);
                }
                ticking = false;
            });
            ticking = true;
        }
    });
});