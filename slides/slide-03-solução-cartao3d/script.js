// ARQUIVO: slides/slide-02-cartao-3d/script.js

// Criar partículas flutuantes
function createFloatingParticles() {
    const container = document.getElementById('floatingParticles');
    if (!container) return; // Guard clause
    
    const particleCount = 25;
    
    // Limpar partículas existentes
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        
        // Tamanho aleatório
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Cores holográficas aleatórias
        const colors = ['#00FFFF', '#39FF14', '#8A2BE2', '#0d9488'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 15px ${color}`;
        
        // Velocidade e delay aleatórios
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;
        particle.style.animation = `floatUp ${duration}s ${delay}s infinite linear`;
        
        container.appendChild(particle);
    }
}

// Interatividade do cartão
function initCardInteractivity() {
    const cardWrapper = document.getElementById('cardWrapper');
    const cardImage = document.getElementById('cardImage');
    
    if (!cardWrapper || !cardImage) return; // Guard clauses
    
    // Parallax suave baseado no mouse
    cardWrapper.addEventListener('mousemove', (e) => {
        const rect = cardWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const rotateX = (e.clientY - centerY) / 20;
        const rotateY = (e.clientX - centerX) / 20;
        
        cardWrapper.style.transform = `
            perspective(1000px) 
            rotateX(${-rotateX + 2}deg) 
            rotateY(${rotateY - 5}deg)
            translateY(${Math.abs(rotateX) < 5 ? 0 : -5}px)
        `;
    });
    
    // Reset ao sair
    cardWrapper.addEventListener('mouseleave', () => {
        cardWrapper.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg)';
    });
    
    // Efeito de clique
    cardImage.addEventListener('click', (e) => {
        cardImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            cardImage.style.transform = 'scale(1)';
        }, 150);
        
        // Criar efeito de ondas
        createRippleEffect(cardImage, e);
    });
}

// Criar efeito de ondas ao clicar
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(0, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 100;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
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
}

// Animar itens de benefícios em sequência
function animateBenefitItems() {
    const benefits = document.querySelectorAll('.benefit-item');
    
    benefits.forEach((benefit, index) => {
        // Resetar animação
        benefit.style.animation = 'none';
        benefit.offsetHeight; // Force reflow
        benefit.style.animation = null;
    });
}

// Efeito parallax global
function initGlobalParallax() {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 100;
        const y = (e.clientY - window.innerHeight / 2) / 100;
        
        // Parallax nos elementos decorativos
        const rings = document.querySelectorAll('.deco-ring');
        rings.forEach((ring, index) => {
            const speed = (index + 1) * 0.5;
            ring.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${index * 120}deg)`;
        });
        
        // Parallax nas partículas de fundo
        const gradientOrbs = document.querySelector('.gradient-orbs');
        if (gradientOrbs) {
            gradientOrbs.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        }
        
        // Parallax nas linhas de energia
        const energyLines = document.querySelectorAll('.energy-line');
        energyLines.forEach((line, index) => {
            const speed = 0.2 + (index * 0.1);
            line.style.transform = `translateX(${x * speed}px)`;
        });
    });
}

// Animar texto principal com efeito typewriter
function animateMainText() {
    const titleLines = document.querySelectorAll('.title-line');
    const subtitle = document.querySelector('.main-subtitle');
    
    // Resetar animações
    titleLines.forEach(line => {
        line.style.animation = 'none';
        line.offsetHeight; // Force reflow
        line.style.animation = null;
    });
    
    if (subtitle) {
        subtitle.style.animation = 'none';
        subtitle.offsetHeight;
        subtitle.style.animation = null;
    }
}

// Launch Info interatividade
function initLaunchInfo() {
    const launchInfo = document.querySelector('.launch-info');
    const launchMain = document.querySelector('.launch-main');
    
    if (!launchInfo || !launchMain) return; // Guard clauses
    
    // Efeito hover sutil
    launchInfo.addEventListener('mouseenter', () => {
        launchInfo.style.transform = 'translateY(-2px)';
        launchInfo.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.2)';
    });
    
    launchInfo.addEventListener('mouseleave', () => {
        launchInfo.style.transform = 'translateY(0)';
        launchInfo.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.1)';
    });
    
    // Pulsar o texto "Em breve" ocasionalmente
    setInterval(() => {
        launchMain.style.transform = 'scale(1.1)';
        launchMain.style.textShadow = '0 0 30px var(--neon-green)';
        
        setTimeout(() => {
            launchMain.style.transform = 'scale(1)';
            launchMain.style.textShadow = '0 0 20px var(--neon-green)';
        }, 300);
    }, 5000);
}

// Função para criar efeitos especiais periodicamente
function createSpecialEffects() {
    setInterval(() => {
        // Criar um flash de luz ocasional
        createLightFlash();
    }, 8000);
    
    setInterval(() => {
        // Pulsar o anel do cartão
        const glowRing = document.querySelector('.card-glow-ring');
        if (glowRing) {
            glowRing.style.transform = 'scale(1.1)';
            glowRing.style.opacity = '1';
            
            setTimeout(() => {
                glowRing.style.transform = 'scale(1)';
                glowRing.style.opacity = '0.6';
            }, 300);
        }
    }, 5000);
}

// Criar flash de luz
function createLightFlash() {
    const slide = document.querySelector('.slide-03');
    if (!slide) return;
    
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 20;
        opacity: 0;
    `;
    
    slide.appendChild(flash);
    
    flash.animate([
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    });
    
    setTimeout(() => flash.remove(), 800);
}

// Cleanup function - RENOMEADA E MELHORADA
function cleanupSlide03() {
    console.log('🧹 Limpando Slide 03');
    
    // Limpar partículas
    const particlesContainer = document.getElementById('floatingParticles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
    
    // Limpar event listeners se necessário
    document.removeEventListener('mousemove', initGlobalParallax);
}

// Função principal de inicialização
function initSlide03SolucaoCartao3d() {
    console.log('🎨 Inicializando Slide 03 - Solução Cartao 3D');
    
    // Limpar slide atual se necessário (a limpeza do slide anterior agora é automática)
    cleanupSlide03();
    
    // Aguardar um momento para garantir que DOM está pronto
    setTimeout(() => {
        // Inicializar todos os efeitos
        createFloatingParticles();
        initCardInteractivity();
        initGlobalParallax();
        animateBenefitItems();
        animateMainText();
        initLaunchInfo();
        
        // Iniciar efeitos especiais
        setTimeout(() => {
            createSpecialEffects();
        }, 3000);
        
        console.log('✨ Slide 03 carregado com sucesso!');
    }, 100);
}

// Registrar função de limpeza globalmente
window.cleanupSlide03 = cleanupSlide03;

// Registrar função globalmente para o Reveal.js
window.initSlide03SolucaoCartao3d = initSlide03SolucaoCartao3d;

// Auto-inicializar se o slide estiver presente
if (document.querySelector('.slide-03')) {
    const checkIfActive = setInterval(() => {
        const slide = document.querySelector('.slide-03');
        if (slide && (slide.closest('.present') || slide.closest('.future'))) {
            clearInterval(checkIfActive);
            initSlide03SolucaoCartao3d();
        }
    }, 100);
}