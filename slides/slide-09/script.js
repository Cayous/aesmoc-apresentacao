// ARQUIVO: slides/slide-09-encerramento/script.js

// Função para criar efeitos de circuito tecnológico
function createTechBackground() {
    const circuitContainer = document.getElementById('circuitLines');
    const particlesContainer = document.getElementById('progressParticles');
    const dataFlowContainer = document.getElementById('dataFlow');
    
    if (!circuitContainer || !particlesContainer || !dataFlowContainer) return;
    
    // Limpar containers
    circuitContainer.innerHTML = '';
    particlesContainer.innerHTML = '';
    dataFlowContainer.innerHTML = '';
    
    // Criar linhas de circuito
    createCircuitLines(circuitContainer);
    
    // Criar partículas de progresso
    createProgressParticles(particlesContainer);
    
    // Criar fluxo de dados
    createDataFlow(dataFlowContainer);
}

// Função para criar linhas de circuito
function createCircuitLines(container) {
    const lineCount = 12;
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        
        // Posição aleatória
        if (Math.random() > 0.5) {
            // Linha horizontal
            line.style.width = Math.random() * 200 + 100 + 'px';
            line.style.height = '2px';
            line.style.left = Math.random() * 80 + '%';
            line.style.top = Math.random() * 100 + '%';
        } else {
            // Linha vertical
            line.style.width = '2px';
            line.style.height = Math.random() * 200 + 100 + 'px';
            line.style.left = Math.random() * 100 + '%';
            line.style.top = Math.random() * 80 + '%';
        }
        
        // Cor e animação aleatórias
        const colors = ['#0d9488', '#3b82f6', '#22c55e'];
        line.style.background = colors[Math.floor(Math.random() * colors.length)];
        line.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(line);
    }
}

// Função para criar partículas de progresso
function createProgressParticles(container) {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'progress-particle';
        
        // Posição e propriedades aleatórias
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Tamanho aleatório
        const size = Math.random() * 5 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }
}

// Função para criar fluxo de dados
function createDataFlow(container) {
    const flowCount = 6;
    
    for (let i = 0; i < flowCount; i++) {
        const flow = document.createElement('div');
        flow.className = 'data-stream';
        
        // Posição vertical aleatória
        flow.style.top = Math.random() * 100 + '%';
        flow.style.animationDelay = Math.random() * 4 + 's';
        flow.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        container.appendChild(flow);
    }
}

// Função para adicionar interatividade aos contatos
function addContactInteractivity() {
    const contactCards = document.querySelectorAll('.slide-09 .contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', () => {
            const contactType = card.dataset.contact;
            handleContactClick(contactType, card);
        });
        
        // Efeito hover melhorado
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.03)';
            
            // Adicionar efeito de brilho no ícone
            const icon = card.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.filter = 'drop-shadow(0 8px 20px rgba(13, 148, 136, 0.6))';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            const icon = card.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))';
            }
        });
    });
}

// Função para lidar com cliques nos contatos
function handleContactClick(contactType, element) {
    // Efeito visual de click
    element.style.animation = 'contactPulse 0.6s ease-out';
    
    // Ações baseadas no tipo de contato
    switch (contactType) {
        case 'whatsapp':
            const whatsappNumber = '5561996798902';
            const whatsappMessage = encodeURIComponent('Olá! Vim pela apresentação do Cartão de Benefícios AESMOC e gostaria de mais informações sobre como participar como síndico.');
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            showContactFeedback('WhatsApp', 'Redirecionando para conversa...', '📱');
            
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1500);
            break;
            
        case 'email':
            const emailAddress = 'escrivabeneficios@gmail.com';
            const emailSubject = encodeURIComponent('Interesse no Cartão de Benefícios AESMOC');
            const emailBody = encodeURIComponent(`Olá!

Vim pela apresentação do Cartão de Benefícios AESMOC e gostaria de mais informações sobre:

□ Como participar como síndico
□ Benefícios exclusivos 
□ Processo de credenciamento
□ Próximos passos

Aguardo retorno.

Atenciosamente,
[Seu nome]
[Seu condomínio]`);
            
            const emailUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;
            
            showContactFeedback('E-mail', 'Abrindo cliente de e-mail...', '✉️');
            
            setTimeout(() => {
                window.location.href = emailUrl;
            }, 1500);
            break;
            
        case 'website':
            showContactFeedback('Website', 'Redirecionando para AESMOC...', '🌐');
            
            setTimeout(() => {
                window.open('https://www.aesmoc.com.br', '_blank');
            }, 1500);
            break;
            
        case 'email-aesmoc':
            const aesmocEmailAddress = 'contato@aesmoc.com.br';
            const aesmocEmailSubject = encodeURIComponent('Interesse no Programa de Benefícios para Síndicos');
            const aesmocEmailBody = encodeURIComponent(`Prezados,

Após a apresentação do Cartão de Benefícios AESMOC, gostaria de obter mais informações sobre a participação como síndico no programa.

Estou interessado em conhecer melhor:
- Os benefícios exclusivos para síndicos
- O processo de adesão
- Como funciona a parceria

Aguardo contato.

Cordialmente,
[Seu nome]
[Condomínio que administra]
[Telefone para contato]`);
            
            const aesmocEmailUrl = `mailto:${aesmocEmailAddress}?subject=${aesmocEmailSubject}&body=${aesmocEmailBody}`;
            
            showContactFeedback('E-mail AESMOC', 'Abrindo cliente de e-mail...', '📧');
            
            setTimeout(() => {
                window.location.href = aesmocEmailUrl;
            }, 1500);
            break;
    }
    
    // Remover animação após completar
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// Função para mostrar feedback de contato
function showContactFeedback(title, message, icon) {
    // Remover feedback existente
    const existingFeedback = document.querySelector('.contact-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Criar feedback
    const feedback = document.createElement('div');
    feedback.className = 'contact-feedback';
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
        <div style="font-size: 4rem; margin-bottom: 1.5rem; animation: iconPulse 1.5s ease-in-out infinite;">${icon}</div>
        <h3 style="margin: 0 0 1rem 0; color: #0d9488; font-size: 1.5rem;">${title}</h3>
        <p style="margin: 0; opacity: 0.9; font-size: 1.1rem; line-height: 1.5;">${message}</p>
        <div style="margin-top: 1.5rem;">
            <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #0d9488, #22c55e); border-radius: 2px; margin: 0 auto; animation: loadingBar 1.5s ease-in-out infinite;"></div>
        </div>
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
        setTimeout(() => feedback.remove(), 400);
    }, 3500);
}

// Função para animar QR Code principal
function animateMainQRCode() {
    const qrImage = document.getElementById('qrCodeMain');
    if (!qrImage) return;
    
    // Efeito hover especial
    qrImage.addEventListener('mouseenter', () => {
        qrImage.style.transform = 'scale(1.1) rotate(3deg)';
        
        // Destacar instruções
        const instructions = document.querySelector('.slide-09 .qr-instructions');
        if (instructions) {
            instructions.style.transform = 'scale(1.05)';
        }
    });
    
    qrImage.addEventListener('mouseleave', () => {
        qrImage.style.transform = 'scale(1) rotate(0deg)';
        
        const instructions = document.querySelector('.slide-09 .qr-instructions');
        if (instructions) {
            instructions.style.transform = 'scale(1)';
        }
    });
    
    // Click no QR Code
    qrImage.addEventListener('click', () => {
        qrImage.style.animation = 'qrCodeFlash 0.8s ease-out';
        
        showContactFeedback('QR Code', 'Escaneie com a câmera do seu celular para acesso direto aos contatos!', '📱');
        
        setTimeout(() => {
            qrImage.style.animation = '';
        }, 800);
    });
}

// Função para destacar elementos em sequência
function highlightElementsSequentially() {
    const slideId = 'slide-09';
    let currentHighlight = 0;
    const highlightTargets = [
        '.slide-09 .contact-card.primary-contact',
        '.slide-09 .qr-container',
        '.slide-09 .final-message',
        '.slide-09 .contact-card:not(.primary-contact)'
    ];
    
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.setInterval(slideId, 'elementHighlight', () => {
            // Remover destaque anterior
            highlightTargets.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (element) {
                        element.style.boxShadow = '';
                        element.style.transform = '';
                    }
                });
            });
            
            // Destacar elemento atual
            const currentSelector = highlightTargets[currentHighlight];
            const currentElements = document.querySelectorAll(currentSelector);
            
            currentElements.forEach(element => {
                if (element) {
                    if (element.classList.contains('qr-container')) {
                        element.style.boxShadow = '0 25px 80px rgba(13, 148, 136, 0.6)';
                        element.style.transform = 'scale(1.05)';
                    } else {
                        element.style.boxShadow = '0 20px 60px rgba(13, 148, 136, 0.5)';
                        element.style.transform = 'scale(1.02)';
                    }
                    
                    // Restaurar após 2.5 segundos
                    setTimeout(() => {
                        if (element) {
                            element.style.boxShadow = '';
                            element.style.transform = '';
                        }
                    }, 2500);
                }
            });
            
            currentHighlight = (currentHighlight + 1) % highlightTargets.length;
        }, 6000);
    }
}

// Função para animar elementos flutuantes
function animateFloatingElements() {
    const elements = document.querySelectorAll('.slide-09 .float-element');
    
    elements.forEach((element, index) => {
        // Hover effect
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.8) rotate(720deg)';
            element.style.filter = 'drop-shadow(0 0 25px currentColor)';
            element.style.zIndex = '20';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            element.style.filter = '';
            element.style.zIndex = '';
        });
        
        // Animação periódica aleatória
        const slideId = 'slide-09';
        if (window.Utils && window.Utils.TimerManager) {
            window.Utils.TimerManager.setInterval(slideId, `floatElement${index}`, () => {
                if (Math.random() > 0.6) { // 40% chance
                    element.style.animation = 'none';
                    element.style.transform = 'scale(1.5) rotate(360deg)';
                    element.style.filter = 'drop-shadow(0 0 20px currentColor)';
                    
                    setTimeout(() => {
                        element.style.animation = '';
                        element.style.transform = '';
                        element.style.filter = '';
                    }, 1500);
                }
            }, 4000 + Math.random() * 3000);
        }
    });
}

// Função para criar efeito de confetti no encerramento
function createConfettiEffect() {
    const slideId = 'slide-09';
    
    // Aguardar 3 segundos após inicialização para criar confetti
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.setTimeout(slideId, 'confettiDelay', () => {
            // Verificar se o slide ainda está ativo
            const currentSlide = document.querySelector('.slide-09');
            if (!currentSlide || !currentSlide.closest('.present')) {
                return;
            }
            
            createConfettiParticles();
        }, 3000);
        
        // Repetir confetti a cada 15 segundos
        window.Utils.TimerManager.setInterval(slideId, 'confettiInterval', () => {
            const currentSlide = document.querySelector('.slide-09');
            if (!currentSlide || !currentSlide.closest('.present')) {
                return;
            }
            
            createConfettiParticles();
        }, 15000);
    }
}

// Função para criar partículas de confetti
function createConfettiParticles() {
    const container = document.querySelector('.slide-09');
    if (!container) return;
    
    const colors = ['#0d9488', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];
    const confettiCount = 25;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 3;
        const startX = Math.random() * 100;
        
        confetti.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${startX}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${duration}s linear;
            animation-delay: ${delay}s;
            z-index: 100;
            pointer-events: none;
        `;
        
        container.appendChild(confetti);
        
        // Remover após animação
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, (duration + delay) * 1000);
    }
}

// Função para adicionar CSS dinâmico
function injectDynamicCSS() {
    const css = `
        @keyframes contactPulse {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-5px) scale(1.05); box-shadow: 0 25px 60px rgba(13, 148, 136, 0.5); }
            100% { transform: translateY(0) scale(1); }
        }
        
        @keyframes qrCodeFlash {
            0% { filter: brightness(1) saturate(1); }
            50% { filter: brightness(1.4) saturate(1.3); transform: scale(1.1); }
            100% { filter: brightness(1) saturate(1); transform: scale(1); }
        }
        
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes loadingBar {
            0% { width: 0; opacity: 0.5; }
            50% { width: 100%; opacity: 1; }
            100% { width: 0; opacity: 0.5; }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-20px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

// Função para criar alertas de despedida
function createFarewellAlerts() {
    const alerts = [
        "🎉 Obrigado por assistir nossa apresentação!",
        "🤝 Esperamos você como parceiro AESMOC",
        "📱 Entre em contato quando quiser!",
        "🏆 Juntos, vamos transformar Valparaíso!"
    ];
    
    let currentAlert = 0;
    const slideId = 'slide-09';
    
    function showAlert() {
        const currentSlide = document.querySelector('.slide-09');
        if (!currentSlide || !currentSlide.closest('.present')) {
            return;
        }
        
        const alert = document.createElement('div');
        alert.className = 'farewell-alert';
        alert.style.cssText = `
            position: fixed;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #0d9488, #22c55e);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            max-width: 400px;
            text-align: center;
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
            transition: all 0.5s ease;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(13, 148, 136, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        alert.textContent = alerts[currentAlert];
        document.body.appendChild(alert);
        
        // Animar entrada
        setTimeout(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // Animar saída
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(-50%) translateY(-20px)';
            
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
        window.Utils.TimerManager.setTimeout(slideId, 'firstFarewell', showAlert, 5000);
        
        // Depois a cada 12 segundos
        window.Utils.TimerManager.setInterval(slideId, 'farewellAlerts', () => {
            const currentSlide = document.querySelector('.slide-09');
            if (!currentSlide || !currentSlide.closest('.present')) {
                return;
            }
            showAlert();
        }, 12000);
    }
}

// Função para otimização de performance
function optimizePerformance() {
    // Usar Intersection Observer para animar apenas quando visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slide = entry.target;
                if (slide.classList.contains('slide-09')) {
                    // Slide está visível, iniciar efeitos especiais
                    setTimeout(() => {
                        createConfettiEffect();
                        createFarewellAlerts();
                    }, 2000);
                    observer.unobserve(slide);
                }
            }
        });
    }, { threshold: 0.7 });
    
    const slide = document.querySelector('.slide-09');
    if (slide) {
        observer.observe(slide);
    }
}

// Função principal de inicialização
function initSlide09Encerramento() {
    console.log('🎉 Inicializando Slide 09 - Encerramento');
    
    const slide = document.querySelector('.slide-09');
    if (!slide) {
        console.warn('Slide 09 não encontrado');
        return;
    }
    
    // Garantir visibilidade do slide
    slide.style.opacity = '1';
    slide.style.display = 'flex';
    
    // Inicializar efeitos visuais
    createTechBackground();
    
    // Adicionar interatividade
    addContactInteractivity();
    animateMainQRCode();
    animateFloatingElements();
    
    // Iniciar efeitos contínuos
    setTimeout(() => {
        highlightElementsSequentially();
    }, 4000);
    
    // Otimizações e efeitos especiais
    optimizePerformance();
    injectDynamicCSS();
    
    console.log('✅ Slide 09 inicializado com sucesso - Pronto para encerrar com estilo!');
}

// Função de limpeza
function cleanupSlide09() {
    console.log('🧹 Limpando Slide 09');
    
    // Limpar timers usando TimerManager
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide('slide-09');
    }
    
    // Remover elementos criados dinamicamente
    const dynamicElements = [
        '.contact-feedback',
        '.confetti-particle',
        '.farewell-alert'
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
    const bgContainers = ['circuitLines', 'progressParticles', 'dataFlow'];
    bgContainers.forEach(id => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = '';
    });
    
    // Remover event listeners clonando elementos
    const interactiveElements = document.querySelectorAll('.slide-09 .contact-card, .slide-09 .float-element, .slide-09 #qrCodeMain');
    interactiveElements.forEach(element => {
        const newElement = element.cloneNode(true);
        if (element.parentNode) {
            element.parentNode.replaceChild(newElement, element);
        }
    });
    
    console.log('✅ Slide 09 limpo - Até a próxima apresentação!');
}

// Registrar funções globalmente para o Reveal.js
window.initSlide09 = initSlide09Encerramento;
window.cleanupSlide09 = cleanupSlide09;

// Log de inicialização
if (window.Utils && window.Utils.Logger) {
    Utils.Logger.info('Slide 09 script loaded');
} else {
    console.log('[AESMOC] Slide 09 script loaded - Encerramento ready!');
}