// ===== WEBGL HONEY/AMBER FLUID HERO =====
const canvas = document.getElementById('hero-canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

let mouseX = 0.5;
let mouseY = 0.5;
let targetMouseX = 0.5;
let targetMouseY = 0.5;
let startTime = Date.now();

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

document.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX / window.innerWidth;
    targetMouseY = 1.0 - e.clientY / window.innerHeight;
});

if (gl) {
    const vertexShaderSource = `
        attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision highp float;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;

        // Simplex noise helpers
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                               -0.577350269189626, 0.024390243902439);
            vec2 i = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                     dot(x12.zw,x12.zw)), 0.0);
            m = m*m;
            m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        float fbm(vec2 p) {
            float f = 0.0;
            f += 0.5000 * snoise(p); p *= 2.01;
            f += 0.2500 * snoise(p); p *= 2.02;
            f += 0.1250 * snoise(p); p *= 2.03;
            f += 0.0625 * snoise(p);
            return f;
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / uResolution;
            float t = uTime * 0.15;

            vec2 p = uv * 3.0;

            // Mouse influence — fluid flows away from cursor
            vec2 mouseInfluence = (uMouse - uv) * 2.5;
            float mouseDist = length(mouseInfluence);
            float mouseForce = smoothstep(0.8, 0.0, mouseDist);

            // Flowing honey noise
            float n1 = fbm(p + vec2(t * 0.3, t * 0.1) + mouseInfluence * mouseForce * 0.6);
            float n2 = fbm(p * 1.5 + vec2(-t * 0.2, t * 0.15) + mouseInfluence * mouseForce * 0.4);
            float n3 = fbm(p * 0.8 + vec2(t * 0.1, -t * 0.25));

            float combined = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

            // Amber/honey palette
            vec3 deep = vec3(0.122, 0.102, 0.082);    // --ink
            vec3 amber = vec3(0.831, 0.639, 0.451);   // --signal
            vec3 honey = vec3(0.92, 0.78, 0.52);
            vec3 cream = vec3(0.99, 0.98, 0.97);

            // Viscous fluid coloring
            float flow = combined * 0.5 + 0.5;
            flow = smoothstep(0.2, 0.8, flow);

            vec3 color = mix(deep, amber, flow);
            color = mix(color, honey, smoothstep(0.6, 0.9, flow));
            color = mix(color, cream, smoothstep(0.85, 1.0, flow) * 0.3);

            // Viscosity — thick swirls
            float viscosity = snoise(p * 2.0 + vec2(t * 0.4, t * 0.2));
            viscosity = smoothstep(-0.2, 0.5, viscosity);
            color = mix(color, amber * 0.8, viscosity * 0.15);

            // Mouse reveal — darken around cursor like fluid parting
            float reveal = smoothstep(0.0, 0.6, mouseDist);
            color = mix(color * 0.3, color, reveal);

            // Subtle vignette
            float vignette = 1.0 - length(uv - 0.5) * 0.8;
            vignette = smoothstep(0.0, 1.0, vignette);
            color *= vignette * 0.85 + 0.15;

            gl_FragColor = vec4(color, 1.0);
        }
    `;

    function createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uMouse = gl.getUniformLocation(program, 'uMouse');

    function render() {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        const elapsed = (Date.now() - startTime) / 1000;

        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouseX, mouseY);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }

    render();
} else {
    canvas.style.background = 'linear-gradient(135deg, #1F1A15, #3a2a1a, #1F1A15)';
}


// ===== NAVIGATION =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('[data-reveal], .sacred-card, .testimonial-card, .philosophy-pillar, .journey-step');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


// ===== OLFACTORY MEMORY TEST =====
const scentMemories = {
    bergamot: `You are standing in a narrow Italian kitchen, afternoon light slicing through gingham curtains. Your grandmother is peeling an orange with a small silver knife, and the zest hits the air like a struck match — bright, bitter, impossibly alive. She turns and smiles, and for a moment the whole world smells like citrus and flour dust and love that doesn't need to be spoken.`,
    lavender: `The sheets are still warm from the line. You are six years old, face-down on a bed in a farmhouse in Provence, and the pillow smells of lavender and sunlight. Your mother is somewhere downstairs, her voice rising and falling like a hymn. You don't want to move. You don't want to ever move again. The scent is the safest place you have ever known.`,
    cedar: `It is winter. You are walking through a forest of red cedars, your boots crunching on frozen earth. The air is so cold it stings your lungs, but the trees — the trees smell of warmth, of something ancient and patient. You press your palm against the bark and feel the tree breathing. You realize you have been holding your breath for months. You exhale. The cedar breathes with you.`,
    orange: `Christmas morning. You are eight. Someone has peeled a tangerine and the scent has taken over the entire living room — bright and round and warm, tangled up with pine needles and wrapping paper and your father's laughter. You bite into a segment and the juice runs down your wrist, and the smell is everywhere, and for once, everything is exactly as it should be.`,
    sandalwood: `You enter a temple in Mysore. The floor is cool stone. A priest is burning sandalwood chips in a copper bowl, and the smoke rises in slow, deliberate spirals. The scent settles into your clothes, your hair, your skin. You sit. You close your eyes. You realize this is what peace smells like — not empty, but full. Full of centuries of whispered prayers.`,
    peppermint: `You are ten, and it is the first day of summer. You run through the garden and crush wild mint under your bare feet. The smell rises sharp and electric, like cold water on a hot day. Your sister is laughing somewhere ahead of you. You run faster. The mint follows you like a green ghost. You are unstoppable. You are infinite. You are ten years old and the whole summer stretches ahead of you like a promise.`
};

const scentBtns = document.querySelectorAll('.scent-btn');
const memoryOutput = document.getElementById('memoryOutput');
const memoryText = document.getElementById('memoryText');

scentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const scent = btn.dataset.scent;

        scentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        memoryOutput.classList.remove('visible');

        setTimeout(() => {
            memoryText.textContent = scentMemories[scent];
            memoryOutput.classList.add('visible');
        }, 400);
    });
});


// ===== FADE IN SECTIONS ON SCROLL =====
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));