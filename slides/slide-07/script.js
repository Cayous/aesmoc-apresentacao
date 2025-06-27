// ARQUIVO: slides/slide-07-beneficios-sindicos/script.js

// Função para criar partículas flutuantes
function createFloatingParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    // Limpar partículas existentes
    container.innerHTML = '';
    
    const particleCount = 25;
    const colors = ['#0d9488', '#3b82f6', '#8b5cf6', '#f59e0b'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Propriedades aleatórias
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 6 + 2;
        const delay = Math.random() * 6;
        const duration = Math.random() * 4 + 4;
        
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${size * 3}px ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        container.appendChild(particle);
    }
}

// Função para animar números das estatísticas
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(element => {
        const target = parseInt(element.dataset.target);
        const duration = 2000; // 2 segundos
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easedProgress);
            
            element.textContent = currentValue;
            
            // Adicionar efeito visual durante a animação
            if (progress < 1) {
                element.style.color = '#f59e0b';
                element.style.transform = 'scale(1.1)';
                requestAnimationFrame(updateNumber);
            } else {
                element.style.color = '';
                element.style.transform = 'scale(1)';
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

// Função para adicionar interatividade aos cards
function addCardInteractivity() {
    const cards = document.querySelectorAll('.benefit-card');
    
    cards.forEach(card => {
        // Hover effect melhorado
        card.addEventListener('mouseenter', () => {
            // Pausar outras animações e destacar este card
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
            
            // Efeito de brilho no card ativo
            card.style.background = 'rgba(255, 255, 255, 1)';
            card.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 50px rgba(13, 148, 136, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Restaurar todos os cards
            cards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            });
            
            card.style.background = 'rgba(255, 255, 255, 0.95)';
            card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        });
        
        // Click effect
        card.addEventListener('click', () => {
            // Efeito de click com animação
            card.style.animation = 'cardPulse 0.6s ease-out';
            
            // Mostrar detalhes específicos do benefício
            showBenefitDetails(card.dataset.benefit);
            
            // Remover animação após completar
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
    });
}

// Função para mostrar detalhes do benefício
function showBenefitDetails(benefitType) {
    const details = {
        condominium: {
            title: "Descontos Condominiais",
            benefits: [
                "Manutenção predial com 15-25% desconto",
                "Serviços de limpeza com 10-20% desconto",
                "Segurança e portaria com 12-18% desconto",
                "Jardinagem e paisagismo com 15-30% desconto",
                "Consultoria especializada gratuita"
            ]
        },
        special: {
            title: "Privilégios VIP",
            benefits: [
                "Linha direta de atendimento",
                "Relatórios mensais de economia",
                "Consultoria em gestão condominial",
                "Certificado oficial de parceria",
                "Eventos exclusivos para síndicos"
            ]
        }
    };
    
    const detail = details[benefitType];
    if (detail) {
        console.log(`Benefício Selecionado: ${detail.title}`);
        console.log('Vantagens:', detail.benefits);
        
        // Aqui você pode implementar um modal ou tooltip
        // Por enquanto, vamos apenas destacar o card
        showBenefitTooltip(detail);
    }
}

// Função para mostrar tooltip com detalhes
function showBenefitTooltip(detail) {
    // Remover tooltip existente
    const existingTooltip = document.querySelector('.benefit-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // Criar novo tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'benefit-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 400px;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    tooltip.innerHTML = `
        <h3 style="margin: 0 0 1rem 0; color: #0d9488;">${detail.title}</h3>
        <ul style="margin: 0; padding-left: 1.5rem;">
            ${detail.benefits.map(benefit => `<li style="margin-bottom: 0.5rem;">${benefit}</li>`).join('')}
        </ul>
        <button onclick="this.parentElement.remove()" style="
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        ">×</button>
    `;
    
    document.body.appendChild(tooltip);
    
    // Animar entrada
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 100);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (tooltip.parentElement) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }
    }, 5000);
}

// Função para criar efeitos de hover nos ícones flutuantes
function animateFloatingElements() {
    const elements = document.querySelectorAll('.float-element');
    
    elements.forEach((element, index) => {
        // Adicionar movimento aleatório
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.5) rotate(360deg)';
            element.style.filter = 'drop-shadow(0 0 20px currentColor)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) rotate(0deg)';
            element.style.filter = 'none';
        });
        
        // Animação periódica aleatória
        const slideId = 'slide-07';
        if (window.Utils && window.Utils.TimerManager) {
            window.Utils.TimerManager.setInterval(slideId, `floatElement${index}`, () => {
                if (Math.random() > 0.7) { // 30% chance
                    element.style.animation = 'none';
                    element.style.transform = 'scale(1.2) rotate(180deg)';
                    element.style.filter = 'drop-shadow(0 0 15px currentColor)';
                    
                    setTimeout(() => {
                        element.style.animation = '';
                        element.style.transform = '';
                        element.style.filter = '';
                    }, 1000);
                }
            }, 3000 + Math.random() * 2000);
        }
    });
}

// Função para destacar benefícios periodicamente
function highlightBenefitsSequentially() {
    const cards = document.querySelectorAll('.benefit-card');
    let currentIndex = 0;
    const slideId = 'slide-07';
    
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.setInterval(slideId, 'benefitHighlight', () => {
            // Remover destaque anterior
            cards.forEach(card => {
                card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                card.style.transform = 'scale(1)';
            });
            
            // Destacar card atual
            const currentCard = cards[currentIndex];
            if (currentCard) {
                currentCard.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 50px rgba(13, 148, 136, 0.5)';
                currentCard.style.transform = 'scale(1.02)';
            }
            
            currentIndex = (currentIndex + 1) % cards.length;
        }, 4000);
    }
}

// Função para animar entrada dos elementos
function animateElementsEntry() {
    // Animar speaker intro
    setTimeout(() => {
        const speakerIntro = document.querySelector('.speaker-intro');
        if (speakerIntro) {
            speakerIntro.style.opacity = '1';
            speakerIntro.style.transform = 'translateY(0)';
        }
    }, 800);
    
    // Animar cards em sequência
    const cards = document.querySelectorAll('.benefit-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 2500 + (index * 300));
    });
    
    // Animar estatísticas após cards
    setTimeout(() => {
        animateStatNumbers();
    }, 4000);
}

// Função para adicionar efeitos sonoros (opcional)
function addSoundEffects() {
    // Apenas se Web Audio API estiver disponível
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const cards = document.querySelectorAll('.benefit-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Simular som de hover (usando Web Audio API seria melhor)
                console.log('🔊 Sound: Card hover');
            });
            
            card.addEventListener('click', () => {
                console.log('🔊 Sound: Card click');
            });
        });
    }
}

// Função para otimização de performance
function optimizePerformance() {
    // Usar Intersection Observer para animar apenas quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slide = entry.target;
                if (slide.classList.contains('slide-07')) {
                    // Slide está visível, iniciar animações
                    animateElementsEntry();
                    observer.unobserve(slide);
                }
            }
        });
    }, { threshold: 0.5 });
    
    const slide = document.querySelector('.slide-07');
    if (slide) {
        observer.observe(slide);
    }
}

// Função principal de inicialização
function initSlide07Beneficios() {
    console.log('🎁 Inicializando Slide 07 - Benefícios para Síndicos');
    
    const slide = document.querySelector('.slide-07');
    if (!slide) {
        console.warn('Slide 07 não encontrado');
        return;
    }
    
    // Garantir visibilidade do slide
    slide.style.opacity = '1';
    slide.style.display = 'flex';
    
    // Inicializar efeitos visuais
    createFloatingParticles();
    
    // Adicionar interatividade
    addCardInteractivity();
    animateFloatingElements();
    
    // Iniciar efeitos contínuos
    setTimeout(() => {
        highlightBenefitsSequentially();
    }, 5000);
    
    // Otimizações
    optimizePerformance();
    addSoundEffects();
    
    console.log('✅ Slide 07 inicializado com sucesso');
}

// Função de limpeza
function cleanupSlide07() {
    console.log('🧹 Limpando Slide 07');
    
    // Limpar timers usando TimerManager
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide('slide-07');
    }
    
    // Remover tooltips
    const tooltips = document.querySelectorAll('.benefit-tooltip');
    tooltips.forEach(tooltip => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    });
    
    // Limpar partículas
    const particlesContainer = document.getElementById('particlesContainer');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
    
    // Remover event listeners clonando elementos
    const interactiveElements = document.querySelectorAll('.slide-07 .benefit-card, .slide-07 .float-element');
    interactiveElements.forEach(element => {
        const newElement = element.cloneNode(true);
        if (element.parentNode) {
            element.parentNode.replaceChild(newElement, element);
        }
    });
}

// Adicionar CSS para animações dinâmicas
function injectDynamicCSS() {
    const css = `
        @keyframes cardPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4), 0 0 50px rgba(13, 148, 136, 0.5); }
            100% { transform: scale(1); }
        }
        
        .benefit-tooltip {
            animation: tooltipFadeIn 0.3s ease-out;
        }
        
        @keyframes tooltipFadeIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// Registrar funções globalmente para o Reveal.js
window.initslide07 = initSlide07Beneficios;
window.cleanupSlide07 = cleanupSlide07;

// Injetar CSS dinâmico
injectDynamicCSS();

// Log de inicialização
if (window.Utils && window.Utils.Logger) {
    Utils.Logger.info('Slide 07 script loaded');
} else {
    console.log('[AESMOC] Slide 07 script loaded');
}