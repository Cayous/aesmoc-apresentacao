// ARQUIVO: slides/slide-04/script.js

// Função principal de inicialização
function initSlide04ComoFunciona() {
    console.log('🎯 Inicializando Slide 04 - Como Funciona');
    
    // Verificar se elementos existem
    const slide = document.querySelector('.slide-04');
    if (!slide) {
        console.warn('Slide 04 não encontrado');
        return;
    }
    
    // Garantir visibilidade do slide
    slide.style.opacity = '1';
    slide.style.display = 'flex';
    
    // Inicializar animações
    initializeAnimations();
    
    // Adicionar interatividade aos cards
    addStepInteractions();
    
    // Iniciar animações contínuas
    startContinuousAnimations();
    
    console.log('✅ Slide 04 inicializado com sucesso');
}

// Função para inicializar animações de entrada
function initializeAnimations() {
    const slide = document.querySelector('.slide-04');
    if (!slide) return;
    
    // Resetar animações se necessário
    const animatedElements = slide.querySelectorAll('.header, .step-card, .cartao-container');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Force reflow
        el.style.animation = null; // Restore original animation
    });
    
    // Animar progresso da timeline
    const timelineProgress = slide.querySelector('.timeline-progress');
    if (timelineProgress) {
        setTimeout(() => {
            timelineProgress.style.width = '100%';
        }, 1000);
    }
}

// Função para adicionar interatividade aos cards
function addStepInteractions() {
    const stepCards = document.querySelectorAll('.slide-04 .step-card');
    
    stepCards.forEach((card, index) => {
        // Efeito hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            
            // Destacar número do passo
            const stepNumber = card.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'translateX(-50%) scale(1.2)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
            
            const stepNumber = card.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.style.transform = 'translateX(-50%) scale(1)';
            }
        });
        
        // Efeito de clique (opcional)
        card.addEventListener('click', () => {
            showStepDetails(index + 1);
        });
    });
}

// Função para mostrar detalhes do passo (opcional)
function showStepDetails(stepNumber) {
    const details = {
        1: {
            title: "Você já é associado AESMOC",
            content: "Como associado da AESMOC, você já tem direito a solicitar seu cartão de benefícios."
        },
        2: {
            title: "Adquira seu cartão",
            content: "Contrate pelo site oficial ou WhatsApp por apenas R$ 25/mês. Processo 100% online e rápido."
        },
        3: {
            title: "Receba em casa",
            content: "Cartão físico enviado pelos Correios em até 7 dias + acesso digital imediato em 24h."
        },
        4: {
            title: "Apresente e economize",
            content: "Use em qualquer estabelecimento credenciado e receba até 30% de desconto na hora."
        }
    };
    
    const detail = details[stepNumber];
    if (detail) {
        console.log(`Detalhes do Passo ${stepNumber}:`, detail);
        
        // Efeito visual no card clicado
        const card = document.querySelector(`.slide-04 .step-card[data-step="${stepNumber}"]`);
        if (card) {
            card.style.animation = 'stepFlash 0.6s ease-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        }
    }
}

// Função para animações contínuas
function startContinuousAnimations() {
    const slide = document.querySelector('.slide-04');
    if (!slide) return;
    
    // Usar TimerManager para gerenciar os timers
    const slideId = 'slide-04';
    
    // Limpar timers anteriores se existirem
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide(slideId);
    }
    
    // Pulsar o badge "Ativo em 24h"
    const badge = slide.querySelector('.step-badge');
    if (badge) {
        if (window.Utils && window.Utils.TimerManager) {
            window.Utils.TimerManager.setInterval(slideId, 'badgePulse', () => {
                badge.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                }, 300);
            }, 3000);
        }
    }
    
    // Animar glow do cartão
    const cartaoGlow = slide.querySelector('.cartao-glow');
    if (cartaoGlow) {
        if (window.Utils && window.Utils.TimerManager) {
            window.Utils.TimerManager.setInterval(slideId, 'cartaoGlow', () => {
                cartaoGlow.style.opacity = '0.9';
                cartaoGlow.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    cartaoGlow.style.opacity = '0.6';
                    cartaoGlow.style.transform = 'scale(1)';
                }, 500);
            }, 4000);
        }
    }
    
    // Destacar valor R$ 25/mês ocasionalmente
    const badge25 = slide.querySelector('.subtitle-badge');
    if (badge25) {
        if (window.Utils && window.Utils.TimerManager) {
            window.Utils.TimerManager.setInterval(slideId, 'valorDestaque', () => {
                badge25.style.transform = 'scale(1.1)';
                badge25.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5)';
                setTimeout(() => {
                    badge25.style.transform = 'scale(1)';
                    badge25.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
                }, 400);
            }, 5000);
        }
    }
}

// Função para reiniciar animações
function restartSlide04Animations() {
    const slide = document.querySelector('.slide-04');
    if (!slide) return;
    
    console.log('🔄 Reiniciando animações do Slide 04');
    
    // Resetar timeline progress
    const timelineProgress = slide.querySelector('.timeline-progress');
    if (timelineProgress) {
        timelineProgress.style.width = '0';
        setTimeout(() => {
            timelineProgress.style.width = '100%';
        }, 500);
    }
    
    // Reinicializar outras animações
    initializeAnimations();
}

// Função de limpeza
function cleanupSlide04() {
    console.log('🧹 Limpando Slide 04');
    
    // Usar TimerManager para limpar todos os timers do slide 4
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide('slide-04');
    }
    
    // Remover event listeners dos cards (clonando para remover listeners)
    const cards = document.querySelectorAll('.slide-04 .step-card');
    cards.forEach(card => {
        const newCard = card.cloneNode(true);
        if (card.parentNode) {
            card.parentNode.replaceChild(newCard, card);
        }
    });
}

// Função utilitária para animar números (se necessário)
function animateNumber(element, start, end, duration = 1000, formatter = null) {
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

// Função para criar efeito de flash no card
function createCardFlash(card) {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
        border-radius: 20px;
        pointer-events: none;
        z-index: 10;
    `;
    
    card.style.position = 'relative';
    card.appendChild(flash);
    
    flash.animate([
        { transform: 'translateX(-100%)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
        { transform: 'translateX(100%)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    });
    
    setTimeout(() => flash.remove(), 600);
}

// Função para destacar benefícios
function highlightBenefits() {
    const slide = document.querySelector('.slide-04');
    if (!slide) return;
    
    const benefits = slide.querySelectorAll('.info-list li');
    
    benefits.forEach((benefit, index) => {
        if (window.Utils && window.Utils.TimerManager) {
            window.Utils.TimerManager.setTimeout('slide-04', `highlight_${index}`, () => {
                benefit.style.color = 'var(--aesmoc-verde)';
                benefit.style.fontWeight = 'bold';
                benefit.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    benefit.style.color = '';
                    benefit.style.fontWeight = '';
                    benefit.style.transform = '';
                }, 1000);
            }, 3000 + (index * 500));
        }
    });
}

// Função para verificar visibilidade e reiniciar animações se necessário
function checkSlideVisibility() {
    const slide = document.querySelector('.slide-04');
    if (!slide) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Slide está visível, garantir que animações estão rodando
                setTimeout(() => {
                    startContinuousAnimations();
                    highlightBenefits();
                }, 1000);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(slide);
}

// Adicionar CSS personalizado para animações
function addCustomCSS() {
    if (document.getElementById('slide-04-custom-css')) return;
    
    const css = `
        @keyframes stepFlash {
            0% { 
                transform: translateY(0) scale(1); 
                box-shadow: 0 8px 30px rgba(0,0,0,0.1); 
            }
            50% { 
                transform: translateY(-5px) scale(1.02); 
                box-shadow: 0 15px 40px rgba(0,0,0,0.2); 
            }
            100% { 
                transform: translateY(0) scale(1); 
                box-shadow: 0 8px 30px rgba(0,0,0,0.1); 
            }
        }
        
        .step-card.flash {
            animation: stepFlash 0.6s ease-out;
        }
        
        .slide-04 .step-number {
            transition: all 0.3s ease;
        }
        
        .slide-04 .cartao-wrapper {
            cursor: pointer;
        }
        
        .slide-04 .info-list li {
            transition: all 0.3s ease;
        }
        
        .slide-04 .subtitle-badge {
            transition: all 0.3s ease;
        }
    `;
    
    const style = document.createElement('style');
    style.id = 'slide-04-custom-css';
    style.textContent = css;
    document.head.appendChild(style);
}

// Registrar funções globalmente para o Reveal.js
window.initslide04 = initSlide04ComoFunciona;
window.initSlide04 = initSlide04ComoFunciona;
window.cleanupSlide04 = cleanupSlide04;
window.restartSlide04Animations = restartSlide04Animations;

// Adicionar CSS personalizado quando o script carrega
addCustomCSS();

// Log de inicialização
if (window.Utils && window.Utils.Logger) {
    Utils.Logger.info('Slide 04 script loaded');
} else {
    console.log('[AESMOC] Slide 04 script loaded');
}