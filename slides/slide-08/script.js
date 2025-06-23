// ARQUIVO: slides/slide-08-proximos-passos/script.js

// Função para criar partículas de conectividade
function createConnectionParticles() {
    const container = document.getElementById('connectionParticles');
    if (!container) return;
    
    // Limpar partículas existentes
    container.innerHTML = '';
    
    const particleCount = 30;
    const colors = ['#0d9488', '#3b82f6', '#22c55e', '#8b5cf6'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'connection-particle';
        
        // Propriedades aleatórias
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        const delay = Math.random() * 8;
        const duration = Math.random() * 3 + 6;
        const startX = Math.random() * 100;
        
        particle.style.cssText = `
            left: ${startX}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${size * 4}px ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        container.appendChild(particle);
    }
}

// Função para adicionar interatividade ao CTA do próximo slide
function addNextSlideCTAInteractivity() {
    const ctaButton = document.querySelector('.slide-08 .cta-arrow');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Efeito visual de click
            ctaButton.style.animation = 'ctaPulse 0.6s ease-out';
            
            // Mostrar feedback
            showNextSlideMessage();
            
            // Ir para próximo slide após feedback
            setTimeout(() => {
                if (window.Reveal) {
                    Reveal.next();
                }
            }, 1000);
            
            // Remover animação após completar
            setTimeout(() => {
                ctaButton.style.animation = '';
            }, 600);
        });
        
        // Efeito hover adicional
        ctaButton.addEventListener('mouseenter', () => {
            const icon = document.querySelector('.slide-08 .cta-icon');
            if (icon) {
                icon.style.transform = 'translateY(-10px) rotate(10deg) scale(1.1)';
            }
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            const icon = document.querySelector('.slide-08 .cta-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    }
}

// Função para mostrar mensagem do próximo slide
function showNextSlideMessage() {
    // Remover feedback existente
    const existingFeedback = document.querySelector('.next-slide-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Criar feedback
    const feedback = document.createElement('div');
    feedback.className = 'next-slide-feedback';
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 2.5rem;
        border-radius: 25px;
        text-align: center;
        z-index: 1000;
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        min-width: 350px;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
        transition: all 0.4s ease;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
    `;
    
    feedback.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1.5rem; animation: iconSpin 1s ease-in-out;">🚀</div>
        <h3 style="margin: 0 0 1rem 0; color: #0d9488; font-size: 1.5rem;">Próximo Slide</h3>
        <p style="margin: 0; opacity: 0.9; font-size: 1.1rem;">Vamos ver os contatos e informações de encerramento!</p>
    `;
    
    document.body.appendChild(feedback);
    
    // Animar entrada
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
    
    // Auto-remover
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

// Função para adicionar interatividade aos steps
function addStepInteractivity() {
    const steps = document.querySelectorAll('.step-item');
    
    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Destacar step clicado
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            
            // Mostrar detalhes do step
            showStepDetails(parseInt(step.dataset.step));
            
            // Efeito visual
            step.style.animation = 'stepHighlight 0.8s ease-out';
            setTimeout(() => {
                step.style.animation = '';
            }, 800);
        });
        
        // Hover effect melhorado
        step.addEventListener('mouseenter', () => {
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1.1) rotate(5deg)';
                number.style.boxShadow = '0 12px 35px rgba(13, 148, 136, 0.6)';
            }
        });
        
        step.addEventListener('mouseleave', () => {
            const number = step.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1) rotate(0deg)';
                number.style.boxShadow = '0 8px 25px rgba(13, 148, 136, 0.4)';
            }
        });
    });
}

// Função para mostrar detalhes do step
function showStepDetails(stepNumber) {
    const details = {
        1: {
            title: "Divulgação aos Moradores",
            actions: [
                "Compartilhe em grupos de WhatsApp do condomínio",
                "Coloque avisos nos murais e elevadores", 
                "Apresente em assembleias e reuniões",
                "Destaque os benefícios exclusivos para moradores"
            ]
        },
        2: {
            title: "Indicação de Parceiros",
            actions: [
                "Identifique estabelecimentos frequentados pelos moradores",
                "Apresente a proposta de parceria",
                "Conecte-nos com decisores dos estabelecimentos",
                "Acompanhe o processo de credenciamento"
            ]
        },
        3: {
            title: "Embaixador do Programa",
            actions: [
                "Torne-se referência do programa no seu condomínio",
                "Ajude novos síndicos a aderir",
                "Compartilhe resultados e benefícios obtidos",
                "Participe de eventos e capacitações AESMOC"
            ]
        }
    };
    
    const detail = details[stepNumber];
    if (detail) {
        console.log(`Step ${stepNumber} - ${detail.title}:`);
        detail.actions.forEach((action, index) => {
            console.log(`  ${index + 1}. ${action}`);
        });
        
        // Aqui você pode implementar um modal ou expandir o step
        highlightStepActions(stepNumber, detail);
    }
}

// Função para destacar ações do step
function highlightStepActions(stepNumber, detail) {
    // Criar tooltip com ações
    const tooltip = document.createElement('div');
    tooltip.className = 'step-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        z-index: 1000;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
        transition: all 0.3s ease;
    `;
    
    tooltip.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎯</div>
            <h3 style="color: #1e293b; margin: 0;">${detail.title}</h3>
        </div>
        <ul style="list-style: none; padding: 0; margin: 0;">
            ${detail.actions.map((action, index) => `
                <li style="
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.8rem;
                    margin-bottom: 0.5rem;
                    background: rgba(13, 148, 136, 0.1);
                    border-radius: 10px;
                    border-left: 4px solid #0d9488;
                ">
                    <span style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 25px;
                        height: 25px;
                        background: #0d9488;
                        color: white;
                        border-radius: 50%;
                        font-size: 0.8rem;
                        font-weight: bold;
                    ">${index + 1}</span>
                    <span style="color: #374151; font-weight: 500;">${action}</span>
                </li>
            `).join('')}
        </ul>
        <button onclick="this.parentElement.remove()" style="
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #64748b;
            cursor: pointer;
        ">×</button>
    `;
    
    document.body.appendChild(tooltip);
    
    // Animar entrada
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
    
    // Auto-remover após 8 segundos
    setTimeout(() => {
        if (tooltip.parentElement) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => tooltip.remove(), 300);
        }
    }, 8000);
}


// Função para destacar informações periodicamente
function highlightInformationPeriodically() {
    const slideId = 'slide-08';
    let currentHighlight = 0;
    const highlightTargets = [
        '.step-item',
        '.need-card',
        '.next-slide-cta'
    ];
    
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.setInterval(slideId, 'infoHighlight', () => {
            // Remover destaque anterior
            highlightTargets.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.boxShadow = '';
                    element.style.transform = '';
                }
            });
            
            // Destacar elemento atual
            const currentSelector = highlightTargets[currentHighlight];
            const currentElement = document.querySelector(currentSelector);
            
            if (currentElement) {
                currentElement.style.boxShadow = '0 0 30px rgba(13, 148, 136, 0.6)';
                currentElement.style.transform = 'scale(1.02)';
                
                // Restaurar após 2 segundos
                setTimeout(() => {
                    if (currentElement) {
                        currentElement.style.boxShadow = '';
                        currentElement.style.transform = '';
                    }
                }, 2000);
            }
            
            currentHighlight = (currentHighlight + 1) % highlightTargets.length;
        }, 5000);
    }
}

// Função para animar progresso dos indicadores
function animateProgressIndicators() {
    const dots = document.querySelectorAll('.progress-dot');
    let currentDot = 0;
    const slideId = 'slide-08';
    
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.setInterval(slideId, 'progressDots', () => {
            // Remover classe active de todos
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Adicionar ao atual
            if (dots[currentDot]) {
                dots[currentDot].classList.add('active');
            }
            
            currentDot = (currentDot + 1) % dots.length;
        }, 3000);
    }
}

// Função para adicionar efeitos de hover nos needs cards
function addNeedsInteractivity() {
    const needCards = document.querySelectorAll('.need-card');
    
    needCards.forEach(card => {
        card.addEventListener('click', () => {
            const needType = card.dataset.need;
            showNeedDetails(needType);
            
            // Efeito visual
            card.style.animation = 'needPulse 0.6s ease-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
        
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.need-icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.filter = 'drop-shadow(0 5px 15px rgba(59, 130, 246, 0.5))';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.need-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))';
            }
        });
    });
}

// Função para mostrar detalhes das necessidades
function showNeedDetails(needType) {
    const details = {
        feedback: {
            title: "Seu Feedback é Valioso",
            content: [
                "Que tipos de estabelecimentos você frequenta?",
                "Quais serviços seu condomínio mais utiliza?",
                "Que parceiros você gostaria de ver no programa?",
                "Qual seria o desconto ideal para motivar o uso?"
            ],
            action: "Entre em contato e nos conte suas necessidades!"
        },
        divulgacao: {
            title: "Ajude-nos a Crescer",
            content: [
                "Compartilhe com outros síndicos conhecidos",
                "Publique sobre o programa em redes sociais",
                "Recomende para administradoras parceiras",
                "Participe de eventos do setor imobiliário"
            ],
            action: "Juntos chegamos mais longe!"
        },
        conexao: {
            title: "Conecte-nos aos Comerciantes",
            content: [
                "Apresente-nos aos estabelecimentos que você conhece",
                "Facilite reuniões com proprietários/gerentes",
                "Compartilhe os benefícios da parceria",
                "Ajude-nos a entender as necessidades locais"
            ],
            action: "Sua rede de contatos é fundamental!"
        }
    };
    
    const detail = details[needType];
    if (detail) {
        console.log(`Need: ${detail.title}`);
        detail.content.forEach(item => console.log(`- ${item}`));
        console.log(`Action: ${detail.action}`);
        
        // Mostrar modal com detalhes
        showNeedModal(detail);
    }
}

// Função para mostrar modal de necessidades
function showNeedModal(detail) {
    const modal = document.createElement('div');
    modal.className = 'need-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 25px;
        padding: 2.5rem;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🤝</div>
            <h2 style="color: #1e293b; margin: 0;">${detail.title}</h2>
        </div>
        
        <div style="margin-bottom: 2rem;">
            ${detail.content.map(item => `
                <div style="
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: 12px;
                    border-left: 4px solid #3b82f6;
                ">
                    <span style="color: #3b82f6; font-size: 1.2rem;">✓</span>
                    <span style="color: #374151; font-weight: 500;">${item}</span>
                </div>
            `).join('')}
        </div>
        
        <div style="
            text-align: center;
            padding: 1.5rem;
            background: linear-gradient(135deg, #0d9488, #22c55e);
            border-radius: 15px;
            color: white;
            margin-bottom: 1.5rem;
        ">
            <strong>${detail.action}</strong>
        </div>
        
        <div style="text-align: center;">
            <button class="close-modal" style="
                background: #64748b;
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Fechar</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 100);
    
    // Event listeners
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    modalContent.querySelector('.close-modal').addEventListener('click', closeModal);
    
    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    }
    
    // Auto-fechar após 10 segundos
    setTimeout(() => {
        if (modal.parentElement) {
            closeModal();
        }
    }, 10000);
}

// Função para adicionar CSS dinâmico
function injectDynamicCSS() {
    const css = `
        @keyframes ctaPulse {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3px) scale(1.05); box-shadow: 0 15px 40px rgba(13, 148, 136, 0.5); }
            100% { transform: translateY(0) scale(1); }
        }
        
        @keyframes iconSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes stepHighlight {
            0% { background: rgba(255, 255, 255, 0.1); }
            50% { background: rgba(13, 148, 136, 0.2); transform: scale(1.02); }
            100% { background: rgba(255, 255, 255, 0.1); transform: scale(1); }
        }
        
        @keyframes needPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4); }
            100% { transform: scale(1); }
        }
        
        @keyframes qrFlash {
            0% { filter: brightness(1); }
            50% { filter: brightness(1.3) saturate(1.2); }
            100% { filter: brightness(1); }
        }
        
        @keyframes loadingBar {
            0% { width: 0; }
            50% { width: 100%; }
            100% { width: 0; }
        }
        
        .step-item.active {
            background: rgba(13, 148, 136, 0.2) !important;
            border-color: #0d9488 !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// Função para criar alertas de urgência
function createUrgencyAlerts() {
    const alerts = [
        "⏰ Seja um dos primeiros síndicos parceiros!",
        "🎯 Vagas limitadas para embaixadores",
        "🚀 Benefícios exclusivos disponíveis agora",
        "💎 Oportunidade única de participar desde o início"
    ];
    
    let currentAlert = 0;
    const slideId = 'slide-08';
    
    function showAlert() {
        const currentSlide = document.querySelector('.slide-08');
        if (!currentSlide || !currentSlide.closest('.present')) {
            return;
        }
        
        const alert = document.createElement('div');
        alert.className = 'urgency-alert';
        alert.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.5s ease;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        alert.textContent = alerts[currentAlert];
        document.body.appendChild(alert);
        
        // Animar entrada
        setTimeout(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translateX(0)';
        }, 100);
        
        // Animar saída
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 500);
        }, 4000);
        
        currentAlert = (currentAlert + 1) % alerts.length;
    }
    
    if (window.Utils && window.Utils.TimerManager) {
        // Primeiro alerta após 5 segundos
        window.Utils.TimerManager.setTimeout(slideId, 'firstUrgency', showAlert, 5000);
        
        // Depois a cada 15 segundos
        window.Utils.TimerManager.setInterval(slideId, 'urgencyAlerts', () => {
            const currentSlide = document.querySelector('.slide-08');
            if (!currentSlide || !currentSlide.closest('.present')) {
                return;
            }
            showAlert();
        }, 15000);
    }
}

// Função principal de inicialização
function initSlide08ProximosPassos() {
    console.log('🚀 Inicializando Slide 08 - Próximos Passos');
    
    const slide = document.querySelector('.slide-08');
    if (!slide) {
        console.warn('Slide 08 não encontrado');
        return;
    }
    
    // Garantir visibilidade do slide
    slide.style.opacity = '1';
    slide.style.display = 'flex';
    
    // Inicializar efeitos visuais
    createConnectionParticles();
    
    // Adicionar interatividade
    addNextSlideCTAInteractivity();
    addStepInteractivity();
    addNeedsInteractivity();
    
    // Iniciar efeitos contínuos
    setTimeout(() => {
        highlightInformationPeriodically();
        animateProgressIndicators();
        createUrgencyAlerts();
    }, 3000);
    
    // Injetar CSS dinâmico
    injectDynamicCSS();
    
    console.log('✅ Slide 08 inicializado com sucesso');
}

// Função de limpeza
function cleanupSlide08() {
    console.log('🧹 Limpando Slide 08');
    
    // Limpar timers usando TimerManager
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide('slide-08');
    }
    
    // Remover elementos criados dinamicamente
    const dynamicElements = [
        '.next-slide-feedback',
        '.step-tooltip',
        '.need-modal',
        '.urgency-alert'
    ];
    
    dynamicElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    });
    
    // Limpar partículas
    const particlesContainer = document.getElementById('connectionParticles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
    
    // Remover event listeners clonando elementos
    const interactiveElements = document.querySelectorAll('.slide-08 .cta-arrow, .slide-08 .step-item, .slide-08 .need-card');
    interactiveElements.forEach(element => {
        const newElement = element.cloneNode(true);
        if (element.parentNode) {
            element.parentNode.replaceChild(newElement, element);
        }
    });
}

// Registrar funções globalmente para o Reveal.js
window.initslide08 = initSlide08ProximosPassos;
window.cleanupSlide08 = cleanupSlide08;

// Log de inicialização
if (window.Utils && window.Utils.Logger) {
    Utils.Logger.info('Slide 08 script loaded');
} else {
    console.log('[AESMOC] Slide 08 script loaded');
}