
// Animação do Título
let docTitle = document.title;
let blinkInterval;

function startTitleAnimation() {
    blinkInterval = setInterval(() => {
        document.title = document.title === docTitle ? "✧ Uh... ✧" : docTitle;
    }, 800);
}

// Remove Preloader
document.getElementById('preloader').addEventListener('click', function() {
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        startTitleAnimation();
    }, 500);
});

// ===== EFEITO AURORA =====
document.body.insertAdjacentHTML('afterbegin', '<div class="aurora"></div>');

// ===== CURSOR PERSONALIZADO =====
const cursor = document.querySelector('.cursor');

// Remove cursor padrão completamente
document.body.style.cursor = 'none';

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Cria partículas que seguem o mouse
    if (e.movementX > 5 || e.movementY > 5) { // Só cria se o mouse se mover rápido
        createParticle(e.clientX, e.clientY);
    }
});

// ===== PARTÍCULAS DINÂMICAS =====
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 8 + 3;
    const lifespan = Math.random() * 1000 + 500;
    
    particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: hsl(${Math.random() * 20 + 330}, 100%, 70%);
        opacity: ${Math.random() * 0.6 + 0.4};
    `;
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.2)`, opacity: 0 }
    ], { duration: lifespan });
    
    animation.onfinish = () => particle.remove();
}

// ===== INICIALIZAÇÃO =====
document.getElementById('preloader').addEventListener('click', function() {
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        startTitleAnimation();
    }, 500);
});

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    createParticle(e.clientX, e.clientY);
});

document.querySelectorAll('a, .profile-pic').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Partículas que Seguem o Mouse
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: rgba(255, 102, 178, ${Math.random() * 0.6 + 0.2});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(particle);

    const animation = particle.animate(
        [
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0 }
        ],
        { duration: Math.random() * 1000 + 500 }
    );

    animation.onfinish = () => particle.remove();
}

// Partículas Flutuantes
particlesJS('particles-js', {
    particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: '#ff66b2' },
        shape: { type: 'circle' },
        opacity: { random: true, value: 0.5 },
        size: { random: true, value: 3 },
        line_linked: { enable: false },
        move: {
            enable: true,
            speed: 1,
            direction: 'top',
            out_mode: 'out'
        }
    },
    interactivity: {
        events: {
            onhover: { enable: false }
        }
    }
});

// Efeito 3D no Card
const card = document.querySelector('.profile-card');
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    card.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg)`;
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'translate(-50%, -50%) perspective(1000px) rotateX(0) rotateY(0)';
});

