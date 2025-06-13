// ARQUIVO: slides/slide-01-titulo/script.js

// Criar partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        
        // Tamanho aleatório
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Cor aleatória entre as cores do tema
        const colors = ['rgba(5, 242, 219, 0.8)', 'rgba(92, 219, 149, 0.8)', 'rgba(255, 107, 107, 0.6)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Animação aleatória
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 20;
        particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
        
        particlesContainer.appendChild(particle);
    }
}

// Efeito de digitação
function typeWriter() {
    const texts = [
        "O futuro chegou.",
        "Economia garantida.",
        "Qualidade de vida.",
        "Comunidade unida."
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    const typewriterElement = document.getElementById('typewriter');
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pausa no final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pausa antes de começar novo texto
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Efeito parallax no movimento do mouse
function initParallax() {
    const wrapper = document.querySelector('.content-wrapper');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 100;
        const y = (e.clientY - window.innerHeight / 2) / 100;
        
        wrapper.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Animação do botão CTA
function initCTAButton() {
    const button = document.querySelector('.cta-button');
    
    button.addEventListener('click', () => {
        // Efeito de ripple
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        
        ripple.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(4)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => ripple.remove(), 600);
        
        // Avançar para próximo slide no Reveal.js
        if (window.Reveal) {
            window.Reveal.next();
        }
    });
}

// Função para limpar as animações quando sair do slide
function cleanupSlide01() {
    // Limpar event listeners se necessário
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
}

// Inicializar todas as animações
function initSlide01() {
    console.log('Inicializando Slide 01 - Título');
    
    // Limpar animações anteriores
    cleanupSlide01();
    
    // Iniciar novas animações
    createParticles();
    typeWriter();
    initParallax();
    initCTAButton();
}

// Registrar função globalmente para o Reveal.js
window.initslide01titulo = initSlide01;

// Executar quando o slide for o primeiro a carregar
if (document.querySelector('.slide-01')) {
    // Verificar se é o slide ativo
    const checkIfActive = setInterval(() => {
        const slide = document.querySelector('.slide-01');
        if (slide && slide.closest('.present')) {
            clearInterval(checkIfActive);
            initSlide01();
        }
    }, 100);
}