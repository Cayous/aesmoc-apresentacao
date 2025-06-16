// ARQUIVO: js/animations.js
// Animações reutilizáveis para apresentação AESMOC

/**
 * Gerenciador de animações globais
 */
class AnimationManager {
    constructor() {
        this.activeAnimations = new Map();
        this.observers = new Map();
    }
    
    /**
     * Registra uma animação ativa
     */
    register(id, animation) {
        this.activeAnimations.set(id, animation);
    }
    
    /**
     * Para e remove uma animação
     */
    stop(id) {
        const animation = this.activeAnimations.get(id);
        if (animation) {
            if (typeof animation.stop === 'function') {
                animation.stop();
            } else if (typeof animation === 'number') {
                clearInterval(animation);
            }
            this.activeAnimations.delete(id);
        }
    }
    
    /**
     * Para todas as animações
     */
    stopAll() {
        this.activeAnimations.forEach((animation, id) => {
            this.stop(id);
        });
    }
    
    /**
     * Cria observer para intersection
     */
    createIntersectionObserver(callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };
        
        return new IntersectionObserver(callback, { ...defaultOptions, ...options });
    }
}

// Instância global do gerenciador
window.AnimationManager = new AnimationManager();

/**
 * Animação de fade in
 */
function fadeIn(element, duration = 500, delay = 0) {
    if (!element) return Promise.resolve();
    
    return new Promise(resolve => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease-in-out`;
            element.style.display = element.style.display || 'block';
            
            // Force reflow
            element.offsetHeight;
            
            element.style.opacity = '1';
            
            setTimeout(resolve, duration);
        }, delay);
    });
}

/**
 * Animação de fade out
 */
function fadeOut(element, duration = 500, delay = 0) {
    if (!element) return Promise.resolve();
    
    return new Promise(resolve => {
        setTimeout(() => {
            element.style.transition = `opacity ${duration}ms ease-in-out`;
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        }, delay);
    });
}

/**
 * Animação de slide up
 */
function slideUp(element, duration = 500, delay = 0) {
    if (!element) return Promise.resolve();
    
    return new Promise(resolve => {
        setTimeout(() => {
            element.style.transform = 'translateY(30px)';
            element.style.opacity = '0';
            element.style.transition = `all ${duration}ms ease-out`;
            element.style.display = element.style.display || 'block';
            
            // Force reflow
            element.offsetHeight;
            
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
            
            setTimeout(resolve, duration);
        }, delay);
    });
}

/**
 * Animação de typewriter
 */
function typewriter(element, text, speed = 100, cursor = true) {
    if (!element) return Promise.resolve();
    
    return new Promise(resolve => {
        element.innerHTML = '';
        let index = 0;
        
        // Adicionar cursor se solicitado
        if (cursor) {
            const cursorSpan = document.createElement('span');
            cursorSpan.className = 'typewriter-cursor';
            cursorSpan.textContent = '|';
            cursorSpan.style.animation = 'blink 1s infinite';
            element.appendChild(cursorSpan);
        }
        
        const interval = setInterval(() => {
            if (index < text.length) {
                if (cursor) {
                    element.firstChild.textContent = text.substring(0, index + 1);
                } else {
                    element.textContent = text.substring(0, index + 1);
                }
                index++;
            } else {
                clearInterval(interval);
                
                // Remover cursor após terminar
                if (cursor) {
                    setTimeout(() => {
                        const cursorEl = element.querySelector('.typewriter-cursor');
                        if (cursorEl) cursorEl.remove();
                        resolve();
                    }, 1000);
                } else {
                    resolve();
                }
            }
        }, speed);
        
        // Registrar animação para poder parar
        AnimationManager.register(`typewriter_${Date.now()}`, interval);
    });
}

/**
 * Animação de contador numérico
 */
function animateCounter(element, start, end, duration = 2000, formatter = null) {
    if (!element) return Promise.resolve();
    
    return new Promise(resolve => {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (end - start) * easedProgress;
            
            // Aplicar formatação se fornecida
            if (formatter) {
                element.textContent = formatter(Math.floor(currentValue));
            } else {
                element.textContent = Math.floor(currentValue);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                resolve();
            }
        }
        
        requestAnimationFrame(update);
    });
}

/**
 * Cria partículas flutuantes
 */
function createFloatingParticles(container, count = 20, options = {}) {
    if (!container) return;
    
    const defaultOptions = {
        colors: ['#00FFFF', '#39FF14', '#8A2BE2'],
        size: { min: 2, max: 6 },
        speed: { min: 5, max: 15 },
        opacity: { min: 0.3, max: 0.8 }
    };
    
    const config = { ...defaultOptions, ...options };
    const particles = [];
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Propriedades aleatórias
        const size = Math.random() * (config.size.max - config.size.min) + config.size.min;
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const speed = Math.random() * (config.speed.max - config.speed.min) + config.speed.min;
        const opacity = Math.random() * (config.opacity.max - config.opacity.min) + config.opacity.min;
        
        // Estilos
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            opacity: ${opacity};
            left: ${Math.random() * 100}%;
            animation: floatUp ${speed}s infinite linear;
            animation-delay: ${Math.random() * speed}s;
        `;
        
        container.appendChild(particle);
        particles.push(particle);
    }
    
    // Retornar função de limpeza
    return () => {
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
    };
}

/**
 * Animação de progresso em barra
 */
function animateProgressBar(element, percentage, duration = 1500, delay = 0) {
    if (!element) return Promise.resolve();
    
    return new Promise(resolve => {
        setTimeout(() => {
            element.style.width = '0%';
            element.style.transition = `width ${duration}ms ease-out`;
            
            // Force reflow
            element.offsetWidth;
            
            element.style.width = `${percentage}%`;
            
            setTimeout(resolve, duration);
        }, delay);
    });
}

/**
 * Animação de shake (tremor)
 */
function shake(element, intensity = 10, duration = 500) {
    if (!element) return Promise.resolve();
    
    return new Promise(resolve => {
        const originalTransform = element.style.transform;
        let startTime = null;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const offset = Math.sin(progress * Math.PI * 10) * intensity * (1 - progress);
                element.style.transform = `${originalTransform} translateX(${offset}px)`;
                requestAnimationFrame(animate);
            } else {
                element.style.transform = originalTransform;
                resolve();
            }
        }
        
        requestAnimationFrame(animate);
    });
}

/**
 * Animação de pulse (pulsação)
 */
function pulse(element, scale = 1.1, duration = 1000, iterations = 'infinite') {
    if (!element) return;
    
    const keyframes = `
        @keyframes pulse-${Date.now()} {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(${scale}); }
        }
    `;
    
    // Adicionar keyframes ao documento
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    const animationName = keyframes.match(/@keyframes ([\w-]+)/)[1];
    element.style.animation = `${animationName} ${duration}ms ease-in-out ${iterations}`;
    
    // Retornar função para parar
    return () => {
        element.style.animation = '';
        style.remove();
    };
}

/**
 * Animação reveal on scroll
 */
function revealOnScroll(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    
    const defaultOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
        animation: 'slideUp'
    };
    
    const config = { ...defaultOptions, ...options };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                switch (config.animation) {
                    case 'fadeIn':
                        fadeIn(element);
                        break;
                    case 'slideUp':
                        slideUp(element);
                        break;
                    default:
                        element.classList.add('revealed');
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: config.threshold,
        rootMargin: config.rootMargin
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
    
    return observer;
}

/**
 * Animação de confetti
 */
function createConfetti(container, options = {}) {
    if (!container) return;
    
    const defaultOptions = {
        count: 50,
        colors: ['#00FFFF', '#39FF14', '#8A2BE2', '#FF6B6B', '#4ECDC4'],
        shapes: ['circle', 'square'],
        duration: 3000
    };
    
    const config = { ...defaultOptions, ...options };
    const confettiElements = [];
    
    for (let i = 0; i < config.count; i++) {
        const confetti = document.createElement('div');
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const shape = config.shapes[Math.floor(Math.random() * config.shapes.length)];
        const size = Math.random() * 8 + 4;
        
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${shape === 'circle' ? '50%' : '0'};
            left: ${Math.random() * 100}%;
            top: -10px;
            animation: confettiFall ${config.duration}ms ease-out forwards;
            animation-delay: ${Math.random() * 1000}ms;
        `;
        
        container.appendChild(confetti);
        confettiElements.push(confetti);
    }
    
    // Limpeza automática
    setTimeout(() => {
        confettiElements.forEach(el => {
            if (el.parentNode) el.parentNode.removeChild(el);
        });
    }, config.duration + 1000);
}

/**
 * CSS para animações básicas
 */
function injectAnimationCSS() {
    if (document.getElementById('aesmoc-animations-css')) return;
    
    const css = `
        @keyframes floatUp {
            0% { 
                transform: translateY(100vh) rotate(0deg); 
                opacity: 0; 
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(-100vh) rotate(720deg); 
                opacity: 0; 
            }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes glow {
            0%, 100% { 
                box-shadow: 0 0 5px currentColor; 
            }
            50% { 
                box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; 
            }
        }
        
        @keyframes slideInLeft {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideInDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes zoomIn {
            from {
                transform: scale(0);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes zoomOut {
            from {
                transform: scale(1);
                opacity: 1;
            }
            to {
                transform: scale(0);
                opacity: 0;
            }
        }
        
        @keyframes rotateIn {
            from {
                transform: rotate(-180deg) scale(0);
                opacity: 0;
            }
            to {
                transform: rotate(0deg) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes bounceIn {
            0% {
                transform: scale(0.3);
                opacity: 0;
            }
            50% {
                transform: scale(1.05);
                opacity: 0.8;
            }
            70% {
                transform: scale(0.9);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        /* Classes utilitárias */
        .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        .animate-slideUp {
            animation: slideInUp 0.6s ease-out;
        }
        
        .animate-slideDown {
            animation: slideInDown 0.6s ease-out;
        }
        
        .animate-slideLeft {
            animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-slideRight {
            animation: slideInRight 0.6s ease-out;
        }
        
        .animate-zoomIn {
            animation: zoomIn 0.5s ease-out;
        }
        
        .animate-bounceIn {
            animation: bounceIn 0.8s ease-out;
        }
        
        .animate-rotateIn {
            animation: rotateIn 0.6s ease-out;
        }
        
        .animate-glow {
            animation: glow 2s ease-in-out infinite;
        }
        
        .floating-particle {
            pointer-events: none;
        }
        
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    
    const style = document.createElement('style');
    style.id = 'aesmoc-animations-css';
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * Stagger animation - anima elementos em sequência
 */
function staggerAnimation(elements, animationFunc, delay = 100) {
    if (!elements || !elements.length) return Promise.resolve();
    
    const promises = [];
    
    elements.forEach((element, index) => {
        const promise = new Promise(resolve => {
            setTimeout(() => {
                animationFunc(element).then(resolve);
            }, index * delay);
        });
        promises.push(promise);
    });
    
    return Promise.all(promises);
}

/**
 * Texto com efeito de máquina de escrever sequencial
 */
function sequentialTypewriter(elements, texts, speed = 100) {
    if (!elements || !texts || elements.length !== texts.length) {
        return Promise.resolve();
    }
    
    return elements.reduce((promise, element, index) => {
        return promise.then(() => typewriter(element, texts[index], speed));
    }, Promise.resolve());
}

// Injetar CSS automaticamente quando o script carrega
injectAnimationCSS();

// Exportar todas as funções para uso global
window.Animations = {
    fadeIn,
    fadeOut,
    slideUp,
    typewriter,
    animateCounter,
    createFloatingParticles,
    animateProgressBar,
    shake,
    pulse,
    revealOnScroll,
    createConfetti,
    staggerAnimation,
    sequentialTypewriter,
    
    // Gerenciador
    Manager: AnimationManager
};

// Log de inicialização
if (window.Utils && window.Utils.Logger) {
    Utils.Logger.info('Animations module loaded');
} else {
    console.log('[AESMOC] Animations module loaded');
}