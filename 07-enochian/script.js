document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Breathing timer
    const timerBtn = document.getElementById('timerBtn');
    const timerText = document.getElementById('timerText');
    const timerCircle = document.querySelector('.timer-circle');
    
    if (timerBtn && timerText && timerCircle) {
        let isBreathing = false;
        let breathingInterval;

        timerBtn.addEventListener('click', () => {
            if (!isBreathing) {
                startBreathing();
            } else {
                stopBreathing();
            }
        });

        function startBreathing() {
            isBreathing = true;
            timerBtn.textContent = 'Stop';
            breatheCycle();
        }

        function stopBreathing() {
            isBreathing = false;
            timerBtn.textContent = 'Start Breathing';
            timerText.textContent = 'Begin';
            timerCircle.classList.remove('breathing-in', 'breathing-out');
            clearTimeout(breathingInterval);
        }

        function breatheCycle() {
            if (!isBreathing) return;

            // Inhale
            timerCircle.classList.remove('breathing-out');
            timerCircle.classList.add('breathing-in');
            timerText.textContent = 'Inhale';

            breathingInterval = setTimeout(() => {
                if (!isBreathing) return;

                // Hold
                timerText.textContent = 'Hold';

                breathingInterval = setTimeout(() => {
                    if (!isBreathing) return;

                    // Exhale
                    timerCircle.classList.remove('breathing-in');
                    timerCircle.classList.add('breathing-out');
                    timerText.textContent = 'Exhale';

                    breathingInterval = setTimeout(() => {
                        if (!isBreathing) return;
                        breatheCycle();
                    }, 5000);
                }, 2000);
            }, 5000);
        }
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Scent memory buttons
    const scentBtns = document.querySelectorAll('.scent-btn');
    const memoryText = document.getElementById('memoryText');
    const memoryOutput = document.getElementById('memoryOutput');

    const scentMemories = {
        bergamot: 'You remember a sunlit morning. Perhaps a garden, perhaps a kitchen. The warmth of citrus on skin, the sound of laughter you had forgotten.',
        lavender: 'A field stretches before you. The color of calm. You were safe here, once. Your body remembers what your mind has filed away.',
        cedar: 'Wood and earth. A cabin, perhaps. Or a childhood closet where forbidden things were kept. The scent of shelter.',
        orange: 'Brightness. Joy without reason. A holiday, a birthday, a moment when everything was exactly as it should be.',
        sandalwood: 'Deep time. Something ancient stirs. A meditation you never knew you had. A temple you visited in a dream.',
        peppermint: 'Clarity. A sudden awake-ness. The moment you understood something important, or the moment before you did.'
    };

    scentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const scent = btn.dataset.scent;
            
            // Remove active class from all buttons
            scentBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show memory text
            if (memoryText && memoryOutput) {
                memoryText.textContent = scentMemories[scent] || '';
                memoryOutput.classList.add('visible');
            }
        });
    });
});