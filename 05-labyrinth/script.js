const breathCounter = document.getElementById('breathCounter');
const pacerShape = document.getElementById('pacerShape');
const pacerTimer = document.getElementById('pacerTimer');
const pacerToggle = document.getElementById('pacerToggle');
const pacerInstruction = document.getElementById('pacerInstruction');
const glowBar = document.getElementById('glowBar');
const glowOverlay = document.getElementById('glowOverlay');
const countInhale = document.querySelector('.count-inhale');
const countHold = document.querySelector('.count-hold');
const countExhale = document.querySelector('.count-exhale');

let counter = 0;
let target = 21000;
let counterInterval;
let isPacerRunning = false;
let pacerInterval;
let glowLevel = 0;
let pacerTimeouts = [];

function startCounter() {
    const duration = 4000;
    const steps = 100;
    const increment = target / steps;
    const stepDuration = duration / steps;

    counterInterval = setInterval(() => {
        counter += increment;
        if (counter >= target) {
            counter = target;
            clearInterval(counterInterval);
            breathCounter.style.color = 'var(--signal)';
        }
        breathCounter.textContent = Math.floor(counter).toLocaleString();
    }, stepDuration);
}

function initCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(breathCounter);
}

function resetPacerClasses() {
    pacerShape.classList.remove('inhale', 'hold', 'exhale');
    countInhale.classList.remove('active');
    countHold.classList.remove('active');
    countExhale.classList.remove('active');
}

function startPacer() {
    if (isPacerRunning) return;
    isPacerRunning = true;
    pacerToggle.textContent = 'STOP';
    pacerInstruction.textContent = 'FOLLOW THE SHAPE';

    function runCycle() {
        if (!isPacerRunning) return;

        resetPacerClasses();
        pacerShape.classList.add('inhale');
        countInhale.classList.add('active');
        pacerInstruction.textContent = 'INHALE';

        let inhaleTime = 0;
        const inhaleTimer = setInterval(() => {
            inhaleTime += 0.1;
            pacerTimer.textContent = inhaleTime.toFixed(1);
        }, 100);

        pacerTimeouts.push(setTimeout(() => {
            clearInterval(inhaleTimer);
            resetPacerClasses();
            pacerShape.classList.add('hold');
            countHold.classList.add('active');
            pacerInstruction.textContent = 'HOLD';

            let holdTime = 0;
            const holdTimer = setInterval(() => {
                holdTime += 0.1;
                pacerTimer.textContent = holdTime.toFixed(1);
            }, 100);

            pacerTimeouts.push(setTimeout(() => {
                clearInterval(holdTimer);
                resetPacerClasses();
                pacerShape.classList.add('exhale');
                countExhale.classList.add('active');
                pacerInstruction.textContent = 'EXHALE';

                let exhaleTime = 0;
                const exhaleTimer = setInterval(() => {
                    exhaleTime += 0.1;
                    pacerTimer.textContent = exhaleTime.toFixed(1);
                }, 100);

                pacerTimeouts.push(setTimeout(() => {
                    clearInterval(exhaleTimer);
                    increaseGlow();
                    if (isPacerRunning) {
                        pacerTimeouts.push(setTimeout(runCycle, 500));
                    }
                }, 8000));

            }, 7000));

        }, 4000));
    }

    runCycle();
}

function stopPacer() {
    isPacerRunning = false;
    pacerToggle.textContent = 'START';
    pacerInstruction.textContent = 'TAP TO BEGIN';
    pacerShape.classList.remove('inhale', 'hold', 'exhale');
    countInhale.classList.remove('active');
    countHold.classList.remove('active');
    countExhale.classList.remove('active');
    pacerTimer.textContent = '0.0';

    pacerTimeouts.forEach(timeout => clearTimeout(timeout));
    pacerTimeouts = [];
}

function increaseGlow() {
    glowLevel = Math.min(glowLevel + 10, 100);
    glowBar.style.width = glowLevel + '%';
    glowOverlay.style.opacity = glowLevel / 500;

    if (glowLevel >= 100) {
        glowOverlay.style.opacity = 0.2;
    }
}

pacerToggle.addEventListener('click', () => {
    if (isPacerRunning) {
        stopPacer();
    } else {
        startPacer();
    }
});

initCounter();

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 1.0s ease-out';
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});
