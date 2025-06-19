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

// ===== PLAYER DE MÚSICA AVANÇADO =====
const musicPlayer = document.getElementById('musicPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeBtn = document.getElementById('volumeBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const visualizer = document.getElementById('visualizer');

// Lista de músicas (adicione seus arquivos aqui)
const songs = [
    {
        title: "Minha Música Favorita",
        file: "assets/Music.mp3"
    },
    {
        title: "Outra Música Legal",
        file: "assets/Music2.mp3"
    }
];

let currentSong = 0;
let isPlaying = false;
let lastVolume = 0.7;
let audioContext, analyser, dataArray;

const audio = new Audio();

// Carrega a música
function loadSong(songIndex) {
    const song = songs[songIndex];
    audio.src = song.file;
    document.querySelector('.music-title').textContent = `Tocando: ${song.title}`;
    
    audio.addEventListener('loadedmetadata', () => {
        updateSongInfo();
    });
}

// Atualiza informações da música
function updateSongInfo() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

// Toca a música
function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    musicPlayer.style.transform = 'translateY(0)';
    
    audio.addEventListener('timeupdate', updateSongInfo);
}

// Pausa a música
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Música anterior
function prevSong() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
    if (isPlaying) playSong();
}

// Próxima música
function nextSong() {
    currentSong++;
    if (currentSong > songs.length - 1) {
        currentSong = 0;
    }
    loadSong(currentSong);
    if (isPlaying) playSong();
}

// Configura o visualizador de áudio
function setupAudioAnalyzer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;
    
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    if (visualizer) {
        const ctx = visualizer.getContext('2d');
        visualizer.width = 300;
        visualizer.height = 60;
        
        function draw() {
            requestAnimationFrame(draw);
            
            analyser.getByteFrequencyData(dataArray);
            
            ctx.clearRect(0, 0, visualizer.width, visualizer.height);
            
            const barWidth = (visualizer.width / dataArray.length) * 2.5;
            let x = 0;
            
            for(let i = 0; i < dataArray.length; i++) {
                const barHeight = dataArray[i] / 2;
                
                ctx.fillStyle = `hsl(${330 + i * 2}, 100%, 70%)`;
                ctx.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 2;
            }
        }
        
        draw();
    }
}

// Event Listeners
playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Barra de progresso clicável
document.querySelector('.music-progress').addEventListener('click', (e) => {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Controle de volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    
    if (audio.volume == 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (audio.volume < 0.5) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    
    lastVolume = audio.volume;
});

volumeBtn.addEventListener('click', () => {
    if (audio.volume > 0) {
        lastVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        audio.volume = lastVolume;
        volumeSlider.value = lastVolume;
        if (lastVolume < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
});

// Quando a música termina, toca a próxima
audio.addEventListener('ended', nextSong);

// Mostra/esconde o player
let hideTimeout;
musicPlayer.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    musicPlayer.style.transform = 'translateY(0)';
});

musicPlayer.addEventListener('mouseleave', () => {
    if (!isPlaying) {
        hideTimeout = setTimeout(() => {
            musicPlayer.style.transform = 'translateY(100px)';
        }, 2000);
    }
});

// Configura o visualizador quando a música começa
audio.addEventListener('play', () => {
    if (!audioContext) {
        setupAudioAnalyzer();
    }
});

// Carrega a primeira música
loadSong(currentSong);
audio.volume = 0.7;

// Frases aleatórias em inglês
const randomClickMessages = [  
    "Oh? Clicking me won’t save you, cutie~ 💀✨",  
    "You found me! Now... do you dare click again? 👀",  
    "I *could* curse you... but you’re too cute for that. 😈💖",  
    "Three more clicks and I steal your snacks. Promise. 🍬",  
    "Psst... wanna hear a secret? (It’s probably a trap.)",  
    "I’d haunt you, but you seem fun. Let’s be partners in crime! 🔪🌸",  
    "Warning: I bite. (Just kidding... unless?)",  
    "If I vanish, check the shadow realm. I left snacks there. 🖤",  
    "Do you believe in ghosts? Good. One’s behind you. (Kidding! ...Maybe.)",  
    "Click me again and I’ll tell you your future… or a lie. 50/50! 🔮",  
    "I was napping in the void, but your click woke me. Pay up with memes.",  
    "You’ve activated my *silly mode*. No refunds. 💫",  
    "I’d summon demons, but they’re all busy. Wanna chat instead?"  
];

// Função para mostrar balão de fala
function showSpeechBubble() {
    const profilePic = document.querySelector('.profile-pic');
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    
    // Seleciona uma frase aleatória
    const randomIndex = Math.floor(Math.random() * randomPhrases.length);
    bubble.textContent = randomPhrases[randomIndex];
    
    // Adiciona o balão
    profilePic.appendChild(bubble);
    
    // Mostra o balão
    setTimeout(() => {
        bubble.style.opacity = '1';
        bubble.style.visibility = 'visible';
    }, 10);
    
    // Remove o balão após 3 segundos
    setTimeout(() => {
        bubble.style.opacity = '0';
        bubble.style.visibility = 'hidden';
        setTimeout(() => bubble.remove(), 300);
    }, 3000);
}

// Adiciona o evento de clique na foto de perfil
document.querySelector('.profile-pic').addEventListener('click', function() {
    // Adiciona a classe de pulo
    this.classList.add('jumping');
    
    // Mostra o balão de fala
    showSpeechBubble();
    
    // Remove a classe de pulo após a animação
    setTimeout(() => {
        this.classList.remove('jumping');
    }, 500);
});