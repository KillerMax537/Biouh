// Remove a tela de "Click..." e mostra o conteúdo principal
document.getElementById('preloader').addEventListener('click', function() {
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 500);
});

// Efeito 3D no card (perspectiva ao mover o mouse)
const card = document.querySelector('.profile-card');
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    card.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg)`;
});

// Reseta a posição quando o mouse sai do card
card.addEventListener('mouseleave', () => {
    card.style.transform = 'translate(-50%, -50%) perspective(1000px) rotateX(0) rotateY(0)';
});

// ===== ANIMAÇÃO DO TÍTULO DA ABA =====
let docTitle = document.title;
let isBlinking = false;

function toggleTitle() {
    if (!isBlinking) {
        isBlinking = true;
        let blinkInterval = setInterval(() => {
            document.title = document.title === docTitle ? "✧ Uh... ✧" : docTitle;
        }, 800);
    }
}

toggleTitle(); // Inicia a animação

// ===== CURSOR PERSONALIZADO =====
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    // Cria partículas que seguem o mouse
    createParticle(e.clientX, e.clientY);
});

// Efeito ao passar em links/buttons
document.querySelectorAll("a, button, .profile-pic").forEach((el) => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovered");
    });
});

// ===== PARTÍCULAS QUE SEGUEM O MOUSE =====
function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "particle";
    document.body.appendChild(particle);
    
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    
    const size = Math.random() * 10 + 5;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    
    particle.style.background = `rgba(255, 102, 178, ${Math.random() * 0.6 + 0.2})`;
    particle.style.borderRadius = "50%";
    particle.style.position = "absolute";
    particle.style.pointerEvents = "none";
    
    const animation = particle.animate(
        [
            { transform: "translate(0, 0)", opacity: 1 },
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0 }
        ],
        { duration: Math.random() * 1000 + 500 }
    );
    
    animation.onfinish = () => particle.remove();
}

// ===== PARTÍCULAS FLUTUANTES NO FUNDO =====
particlesJS("particles", {
    particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: "#ff66b2" },
        shape: { type: "circle" },
        opacity: { random: true, value: 0.5 },
        size: { random: true, value: 3 },
        line_linked: { enable: false },
        move: {
            enable: true,
            speed: 1,
            direction: "top",
            out_mode: "out"
        }
    },
    interactivity: {
        events: {
            onhover: { enable: false }
        }
    }
});