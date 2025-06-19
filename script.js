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