
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


// Sistema de Mensagens Hover
class HoverMessageSystem {
    constructor() {
        this.messages = [
            "Boo! Did I scare you?~ 👻",
            "I see you staring... 👀",
            "The dark princess approves your presence 💖",
            "Patience... I'll reveal my secrets soon 🌙",
            "1.5 seconds is all I need to haunt you 😈",
            "Loading cuteness... please wait ✨",
            "You passed the vibe check 💀",
            "Why so serious? Let's play! >_<",
            "Secret unlocked: You're persistent! 🍪",
            "System message: You're adorable 💥"
        ];
        this.timer = null;
        this.currentMessage = null;
        this.init();
    }

    init() {
        const profilePic = document.querySelector('.profile-pic');
        if (!profilePic) {
            console.warn('Profile picture element not found');
            return;
        }

        profilePic.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        profilePic.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        profilePic.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    handleMouseEnter(e) {
        this.startTimer(e.target);
    }

    handleMouseLeave() {
        this.clearTimer();
    }

    handleMouseMove() {
        this.clearTimer();
        this.startTimer();
    }

    startTimer(element) {
        if (this.timer) return;
        
        this.timer = setTimeout(() => {
            this.showMessage(element);
            this.timer = null;
        }, 1500);
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    showMessage(element) {
        if (this.currentMessage) return;

        const messageBox = document.createElement('div');
        const randomMsg = this.messages[Math.floor(Math.random() * this.messages.length)];
        
        messageBox.textContent = randomMsg;
        messageBox.style.cssText = `
            position: absolute;
            bottom: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: #ff66b2;
            padding: 8px 15px;
            border-radius: 15px;
            border: 1px solid #ff66b2;
            font-size: 14px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;

        const container = document.getElementById('message-container') || document.body;
        container.appendChild(messageBox);

        // Posiciona corretamente
        const rect = element.getBoundingClientRect();
        messageBox.style.left = `${rect.left + rect.width / 2}px`;
        messageBox.style.bottom = `${window.innerHeight - rect.top + 10}px`;

        // Animação de entrada
        setTimeout(() => {
            messageBox.style.opacity = '1';
            messageBox.style.transform = 'translateX(-50%) translateY(-5px)';
        }, 10);

        this.currentMessage = messageBox;

        // Remove após 3 segundos
        setTimeout(() => {
            this.removeMessage();
        }, 3000);
    }

    removeMessage() {
        if (!this.currentMessage) return;

        this.currentMessage.style.opacity = '0';
        this.currentMessage.style.transform = 'translateX(-50%) translateY(-15px)';
        
        setTimeout(() => {
            if (this.currentMessage && this.currentMessage.parentNode) {
                this.currentMessage.parentNode.removeChild(this.currentMessage);
            }
            this.currentMessage = null;
        }, 300);
    }
}

// Inicialização segura
document.addEventListener('DOMContentLoaded', () => {
    new HoverMessageSystem();
});

// Mystic Eye Interaction
const mysticEye = document.getElementById('mysticEye');
const eyeRevelation = document.getElementById('eyeRevelation');
let eyeOpen = false;

mysticEye.addEventListener('click', function(e) {
  e.stopPropagation();
  
  // Toggle eye state
  eyeOpen = !eyeOpen;
  
  if (eyeOpen) {
    mysticEye.classList.add('eye-open');
    
    // Create magical particles
    for (let i = 0; i < 30; i++) {
      createParticle(
        e.clientX || mysticEye.getBoundingClientRect().left + 30,
        e.clientY || mysticEye.getBoundingClientRect().top + 30,
        false
      );
    }
    
    // Play sound effect (opcional)
    const sound = new Audio();
    sound.src = "https://assets.mixkit.co/sfx/preview/mixkit-magical-sparkle-902.mp3";
    sound.volume = 0.3;
    sound.play();
    
    // Show revelation
    setTimeout(() => {
      eyeRevelation.classList.add('active');
    }, 500);
    
  } else {
    mysticEye.classList.remove('eye-open');
    eyeRevelation.classList.remove('active');
  }
});

// Close when clicking outside
document.addEventListener('click', function(e) {
  if (eyeOpen && !mysticEye.contains(e.target) && !eyeRevelation.contains(e.target)) {
    mysticEye.classList.remove('eye-open');
    eyeRevelation.classList.remove('active');
    eyeOpen = false;
  }
});