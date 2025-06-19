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

// Função para criar partículas
function createParticle(x, y) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 3;
    const lifespan = Math.random() * 1000 + 500;
    
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: hsl(${Math.random() * 20 + 330}, 100%, 70%);
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.6 + 0.4};
        z-index: 9998;
    `;
    
    document.body.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.2)`, opacity: 0 }
    ], { 
        duration: lifespan,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    animation.onfinish = () => particle.remove();
}

// Movimento do mouse
document.addEventListener('mousemove', (e) => {
    // Atualiza posição do cursor
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Cria partículas com menos restrição de movimento
    if (Math.random() > 0.3) { // 70% de chance de criar partícula
        createParticle(e.clientX, e.clientY);
    }
});

// Efeito hover nos elementos interativos
document.querySelectorAll('a, .profile-pic, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        // Cria mais partículas ao entrar em elementos interativos
        for (let i = 0; i < 5; i++) {
            const rect = el.getBoundingClientRect();
            createParticle(
                rect.left + Math.random() * rect.width,
                rect.top + Math.random() * rect.height
            );
        }
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// ===== PARTÍCULAS FLUTUANTES =====
// Verifica se o container existe antes de inicializar
const particlesContainer = document.getElementById('particles-js');
if (particlesContainer) {
    particlesJS('particles-js', {
        particles: {
            number: { 
                value: 30, 
                density: { 
                    enable: true, 
                    value_area: 800 
                } 
            },
            color: { 
                value: '#ff66b2' 
            },
            shape: { 
                type: 'circle' 
            },
            opacity: { 
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: { 
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: { 
                enable: false 
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'top',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: { 
                    enable: true,
                    mode: 'repulse' 
                },
                onclick: { 
                    enable: true,
                    mode: 'push' 
                }
            }
        },
        retina_detect: true
    });
}

// ===== EFEITO 3D NO CARD =====
const card = document.querySelector('.profile-card');
if (card) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        card.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate(-50%, -50%) perspective(1000px) rotateX(0) rotateY(0)';
    });
}