// ARQUIVO: slides/slide-06/script.js

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
    const lineCount = 15;
    
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
        const colors = ['#0d9488', '#3b82f6', '#8b5cf6'];
        line.style.background = colors[Math.floor(Math.random() * colors.length)];
        line.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(line);
    }
}

// Função para criar partículas de progresso
function createProgressParticles(container) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'progress-particle';
        
        // Posição e propriedades aleatórias
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Tamanho aleatório
        const size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }
}

// Função para criar fluxo de dados
function createDataFlow(container) {
    const flowCount = 8;
    
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

// Função para animar barra de progresso geral
function animateOverallProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (!progressBar || !progressPercentage) return;
    
    const targetProgress = 75; // 75% concluído
    
    setTimeout(() => {
        // Animar barra de progresso
        progressBar.style.width = targetProgress + '%';
        
        // Animar número da porcentagem
        animateNumber(progressPercentage, 0, targetProgress, 2000, (value) => {
            return value + '%';
        });
        
        // Destacar segmentos ativos
        const segments = document.querySelectorAll('.segment');
        segments.forEach((segment, index) => {
            setTimeout(() => {
                if (index <= 2) { // Primeiros 3 segmentos
                    segment.classList.add('animated');
                }
            }, index * 300);
        });
        
    }, 800);
}

// Função para animar lista de status
function animateStatusList() {
    const statusItems = document.querySelectorAll('.status-item');
    
    statusItems.forEach((item, index) => {
        setTimeout(() => {
            // Remover animação inicial e aplicar animação de entrada
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            
            // Efeito especial para item ativo
            if (item.classList.contains('active')) {
                setTimeout(() => {
                    item.classList.add('pulse-active');
                }, 500);
            }
            
        }, 1000 + (index * 400));
    });
}

// Função para animar benefícios dos parceiros
function animatePartnerBenefits() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    setTimeout(() => {
        benefitItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }, 2000);
}




// Função para adicionar interatividade
function addInteractivity() {
    // Interatividade nos itens de status
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
            item.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            item.style.background = 'rgba(255, 255, 255, 0.08)';
        });
        
        item.addEventListener('click', () => {
            showStatusDetails(item.dataset.step);
        });
    });
    
    
    // Interatividade no banner de ação
    const actionBanner = document.querySelector('.action-banner');
    if (actionBanner) {
        actionBanner.addEventListener('mouseenter', () => {
            actionBanner.style.transform = 'translateY(-5px)';
            actionBanner.style.boxShadow = '0 15px 40px rgba(13, 148, 136, 0.3)';
        });
        
        actionBanner.addEventListener('mouseleave', () => {
            actionBanner.style.transform = 'translateY(0)';
            actionBanner.style.boxShadow = '0 10px 30px rgba(13, 148, 136, 0.2)';
        });
    }
}

// Função para mostrar detalhes do status
function showStatusDetails(stepNumber) {
    const details = {
        1: {
            title: "Parceria AESMOC Firmada",
            content: "✅ Contrato assinado\n✅ Termos definidos\n✅ Responsabilidades estabelecidas"
        },
        2: {
            title: "Sistema em Desenvolvimento",
            content: "✅ Backend 80% pronto\n✅ App mobile 65% pronto\n🔄 Dashboard de gestão 60%"
        },
        3: {
            title: "Credenciamento de Parceiros",
            content: "🔄 Visitando estabelecimentos\n🔄 Negociando condições\n🔄 Definindo categorias"
        },
        4: {
            title: "Preparação para Lançamento",
            content: "📅 Campanha de marketing\n📅 Material promocional\n📅 Treinamento de equipes"
        }
    };
    
    const detail = details[stepNumber];
    if (detail) {
        console.log(`Status Detalhado - Etapa ${stepNumber}:`, detail);
        
        // Destacar visualmente o item clicado
        const clickedItem = document.querySelector(`.status-item[data-step="${stepNumber}"]`);
        if (clickedItem) {
            clickedItem.style.animation = 'statusFlash 0.8s ease-out';
            setTimeout(() => {
                clickedItem.style.animation = '';
            }, 800);
        }
    }
}

// Função para destacar oportunidades periodicamente
function highlightOpportunities() {
    const slideId = 'slide-06';
    
    if (window.Utils && window.Utils.TimerManager) {
        // Destacar benefícios periodicamente
        window.Utils.TimerManager.setInterval(slideId, 'benefitsHighlight', () => {
            const benefits = document.querySelectorAll('.benefit-item');
            const randomBenefit = benefits[Math.floor(Math.random() * benefits.length)];
            
            if (randomBenefit) {
                randomBenefit.style.transform = 'translateX(10px) scale(1.02)';
                randomBenefit.style.background = 'rgba(255, 255, 255, 0.08)';
                
                setTimeout(() => {
                    randomBenefit.style.transform = 'translateX(0) scale(1)';
                    randomBenefit.style.background = 'rgba(255, 255, 255, 0.03)';
                }, 1000);
            }
        }, 5000);
    }
}

// Função para criar alertas de oportunidade
function createOpportunityAlerts() {
    const alerts = [
        "🚀 Vagas limitadas para parceiros fundadores!",
        "💎 Exclusividade por categoria garantida",
        "📈 Marketing de lançamento incluído",
        "🎯 Acesso direto aos associados AESMOC"
    ];
    
    let currentAlert = 0;
    const slideId = 'slide-06';
    
    function showNextAlert() {
        const currentSlide = document.querySelector('.slide-06');
        if (!currentSlide || !currentSlide.closest('.present')) {
            return;
        }
        
        const alertElement = document.createElement('div');
        alertElement.className = 'opportunity-alert';
        alertElement.style.cssText = `
            position: fixed;
            top: 50px;
            right: 30px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            font-size: 0.9rem;
            font-weight: 600;
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.5s ease;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        `;
        
        alertElement.textContent = alerts[currentAlert];
        document.body.appendChild(alertElement);
        
        // Animar entrada
        setTimeout(() => {
            alertElement.style.opacity = '1';
            alertElement.style.transform = 'translateX(0)';
        }, 100);
        
        // Animar saída
        setTimeout(() => {
            alertElement.style.opacity = '0';
            alertElement.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (alertElement.parentNode) {
                    alertElement.parentNode.removeChild(alertElement);
                }
            }, 500);
        }, 4000);
        
        currentAlert = (currentAlert + 1) % alerts.length;
    }
    
    // Usar TimerManager
    if (window.Utils && window.Utils.TimerManager) {
        // Primeiro alerta após 8 segundos
        window.Utils.TimerManager.setTimeout(slideId, 'firstAlert', showNextAlert, 8000);
        
        // Depois a cada 12 segundos
        window.Utils.TimerManager.setInterval(slideId, 'periodicAlerts', () => {
            const currentSlide = document.querySelector('.slide-06');
            if (!currentSlide || !currentSlide.closest('.present')) {
                return;
            }
            showNextAlert();
        }, 12000);
    }
}

// Função utilitária para animar números
function animateNumber(element, start, end, duration = 1000, formatter = null) {
    if (!element) return Promise.resolve();
    
    return new Promise(resolve => {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (end - start) * easedProgress;
            
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

// Função principal de inicialização
function initSlide06Status() {
    console.log('📊 Inicializando Slide 06 - Status do Projeto');
    
    const slide = document.querySelector('.slide-06');
    if (!slide) {
        console.warn('Slide 06 não encontrado');
        return;
    }
    
    // Garantir visibilidade do slide
    slide.style.opacity = '1';
    slide.style.display = 'flex';
    
    // Inicializar efeitos visuais
    createTechBackground();
    
    // Iniciar animações sequenciais
    setTimeout(() => {
        animateOverallProgress();
    }, 500);
    
    setTimeout(() => {
        animateStatusList();
    }, 1000);
    
    setTimeout(() => {
        animatePartnerBenefits();
    }, 1500);
    
    
    // Adicionar interatividade
    addInteractivity();
    
    // Iniciar efeitos contínuos
    setTimeout(() => {
        highlightOpportunities();
        createOpportunityAlerts();
    }, 3000);
    
    console.log('✅ Slide 06 inicializado com sucesso');
}

// Função de limpeza
function cleanupSlide06() {
    console.log('🧹 Limpando Slide 06');
    
    // Usar TimerManager para limpar todos os timers do slide 6
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide('slide-06');
    }
    
    // Remover alertas de oportunidade do DOM
    const alerts = document.querySelectorAll('.opportunity-alert');
    alerts.forEach(alert => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    });
    
    // Limpar elementos do background
    const bgContainers = ['circuitLines', 'progressParticles', 'dataFlow'];
    bgContainers.forEach(id => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = '';
    });
    
    // Remover event listeners clonando elementos
    const interactiveElements = document.querySelectorAll('.slide-06 .status-item, .slide-06 .benefit-item, .slide-06 .action-banner');
    interactiveElements.forEach(element => {
        const newElement = element.cloneNode(true);
        if (element.parentNode) {
            element.parentNode.replaceChild(newElement, element);
        }
    });
}

// Registrar funções globalmente para o Reveal.js
window.initslide06 = initSlide06Status;
window.cleanupSlide06 = cleanupSlide06;

// Log de inicialização
if (window.Utils && window.Utils.Logger) {
    Utils.Logger.info('Slide 06 script loaded');
} else {
    console.log('[AESMOC] Slide 06 script loaded');
}