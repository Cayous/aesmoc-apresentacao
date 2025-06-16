// ARQUIVO: slides/slide-01-titulo/script.js

// Criar partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return; // Guard clause
    
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

// Efeito de digitação persistente
function typeWriter() {
    const texts = [
        "Economia garantida.",
        "Qualidade de vida.",
        "Comunidade unida."
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let typeSpeed = 100;
    
    const typewriterElement = document.getElementById('typewriter');
    const persistentLinesElement = document.getElementById('persistent-lines');
    if (!typewriterElement || !persistentLinesElement) return; // Guard clause
    
    function type() {
        const currentText = texts[textIndex];
        
        // Digitando a linha atual
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            // Linha completa - mover para linhas persistentes
            setTimeout(() => {
                // Criar nova linha persistente
                const newLine = document.createElement('div');
                newLine.className = 'persistent-line';
                newLine.textContent = currentText;
                persistentLinesElement.appendChild(newLine);
                
                // Limpar linha atual apenas se não for a última
                textIndex++;
                if (textIndex < texts.length) {
                    typewriterElement.textContent = '';
                    charIndex = 0;
                    setTimeout(() => type(), 1000); // Pausa antes da próxima linha
                } else {
                    // É a última linha - remover cursor e texto atual
                    typewriterElement.textContent = '';
                    const cursor = document.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.display = 'none';
                    }
                }
            }, 1500); // Pausa após completar a linha
            return;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Efeito parallax no movimento do mouse
function initParallax() {
    const wrapper = document.querySelector('.content-wrapper');
    if (!wrapper) return; // Guard clause
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 100;
        const y = (e.clientY - window.innerHeight / 2) / 100;
        
        wrapper.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Animação do botão CTA
function initCTAButton() {
    const button = document.querySelector('.cta-button');
    
    if (!button) return; // Guard clause - botão não existe neste slide
    
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

// Função para limpar as animações quando sair do slide - MELHORADA
function cleanupSlide01() {
    console.log('🧹 Limpando Slide 01');
    
    // Limpar event listeners se necessário
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
    
    // Limpar linhas persistentes e texto atual
    const persistentLinesElement = document.getElementById('persistent-lines');
    const typewriterElement = document.getElementById('typewriter');
    const cursor = document.querySelector('.cursor');
    
    if (persistentLinesElement) {
        persistentLinesElement.innerHTML = '';
    }
    if (typewriterElement) {
        typewriterElement.textContent = '';
    }
    if (cursor) {
        cursor.style.display = 'inline-block';
    }
    
    // Remover event listeners de parallax se existirem
    // (não há remoção específica necessária pois não há listeners globais persistentes)
}

// Inicializar todas as animações
function initSlide01() {
    console.log('🎬 Inicializando Slide 01 - Título');
    
    // Limpar animações anteriores
    cleanupSlide01();
    
    // Iniciar novas animações
    createParticles();
    typeWriter();
    initParallax();
    initCTAButton();
}

// Registrar funções globalmente para o Reveal.js
window.initslide01titulo = initSlide01;
window.cleanupSlide01 = cleanupSlide01;

// REMOVIDO: Auto-execução que causava conflitos
// O slide agora só será inicializado quando chamado pelo Reveal.js