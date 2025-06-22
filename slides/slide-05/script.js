// ARQUIVO: slides/slide-05/script.js

// Função para criar rede de conexões da comunidade
function createCommunityNetwork() {
    const nodesContainer = document.getElementById('networkNodes');
    const linesContainer = document.getElementById('connectionLines');
    
    if (!nodesContainer || !linesContainer) return;
    
    // Limpar containers
    nodesContainer.innerHTML = '';
    linesContainer.innerHTML = '';
    
    const nodeCount = 12;
    const nodes = [];
    
    // Criar nós da rede
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        
        // Posição em círculo
        const angle = (i / nodeCount) * 2 * Math.PI;
        const radius = 200 + Math.random() * 100;
        const x = 50 + Math.cos(angle) * (radius / window.innerWidth * 50);
        const y = 50 + Math.sin(angle) * (radius / window.innerHeight * 50);
        
        node.style.left = Math.max(5, Math.min(95, x)) + '%';
        node.style.top = Math.max(5, Math.min(95, y)) + '%';
        
        // Tamanho e cor aleatórios
        const size = Math.random() * 8 + 4;
        node.style.width = size + 'px';
        node.style.height = size + 'px';
        
        // Animação de delay aleatório
        node.style.animationDelay = Math.random() * 3 + 's';
        
        nodesContainer.appendChild(node);
        nodes.push({ element: node, x, y });
    }
    
    // Criar linhas de conexão
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.7) { // 30% chance de conexão
                createConnectionLine(nodes[i], nodes[j], linesContainer);
            }
        }
    }
}

// Função para criar linha de conexão entre dois nós
function createConnectionLine(node1, node2, container) {
    const line = document.createElement('div');
    line.className = 'connection-line';
    
    const deltaX = node2.x - node1.x;
    const deltaY = node2.y - node1.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    line.style.width = distance + '%';
    line.style.left = node1.x + '%';
    line.style.top = node1.y + '%';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 50%';
    line.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(line);
}

// Função para criar ícones flutuantes da comunidade
function createFloatingIcons() {
    const container = document.getElementById('floatingIcons');
    if (!container) return;
    
    container.innerHTML = '';
    
    const icons = ['🏘️', '🤝', '💪', '🛡️', '❤️', '⭐'];
    const iconCount = 8;
    
    for (let i = 0; i < iconCount; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-icon';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        
        // Posição aleatória
        icon.style.left = Math.random() * 100 + '%';
        icon.style.animationDelay = Math.random() * 5 + 's';
        icon.style.animationDuration = (Math.random() * 10 + 8) + 's';
        
        container.appendChild(icon);
    }
}

// Função para animar os valores do comparativo
function animateValueComparison() {
    const valueWithout = document.getElementById('valueWithout');
    const valueWith = document.getElementById('valueWith');
    const savingsValue = document.getElementById('savingsValue');
    
    if (!valueWithout || !valueWith || !savingsValue) return;
    
    // Valores base
    const withoutCardPrice = 300;
    const withCardPrice = 180;
    const savingsAmount = withoutCardPrice - withCardPrice;
    
    // Sequência de animações
    setTimeout(() => {
        // Primeiro valor - sem cartão
        animateNumber(valueWithout, 0, withoutCardPrice, 1000, (value) => {
            return `R$ ${value}`;
        });
        
        // Destacar card "sem cartão"
        const withoutCard = document.querySelector('.without-card');
        if (withoutCard) {
            withoutCard.classList.add('highlighted');
        }
    }, 500);
    
    setTimeout(() => {
        // Segundo valor - com cartão
        animateNumber(valueWith, withoutCardPrice, withCardPrice, 1200, (value) => {
            return `R$ ${value}`;
        });
        
        // Remover destaque do primeiro e destacar segundo
        const withoutCard = document.querySelector('.without-card');
        const withCard = document.querySelector('.with-card');
        
        if (withoutCard) withoutCard.classList.remove('highlighted');
        if (withCard) withCard.classList.add('highlighted');
        
    }, 2000);
    
    setTimeout(() => {
        // Mostrar economia
        const savingsContainer = document.getElementById('savingsResult');
        if (savingsContainer) {
            savingsContainer.style.opacity = '1';
            savingsContainer.style.transform = 'translateY(0) scale(1)';
        }
        
        animateNumber(savingsValue, 0, savingsAmount, 1500, (value) => {
            return `R$ ${value}`;
        });
        
        // Remover destaque dos cards
        const withCard = document.querySelector('.with-card');
        if (withCard) withCard.classList.remove('highlighted');
        
        // Destacar economia
        setTimeout(() => {
            if (savingsContainer) {
                savingsContainer.classList.add('highlighted');
            }
        }, 800);
        
    }, 4000);
}

// Função para animar números (reutilizada)
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


// Função para adicionar interatividade aos cards
function addCardInteractivity() {
    const valueCards = document.querySelectorAll('.value-card');
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Interatividade dos cards de valor
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', () => {
            card.style.animation = 'cardPulse 0.6s ease-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
    });
    
    // Interatividade dos itens da comunidade
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.background = 'rgba(255, 255, 255, 0.15)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.background = 'rgba(255, 255, 255, 0.08)';
        });
    });
}

// Função para destacar a frase principal
function highlightMainQuote() {
    const quote = document.querySelector('.cta-highlight');
    if (!quote) return;
    
    // Usar TimerManager para controlar o timer
    const slideId = 'slide-05';
    
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.setInterval(slideId, 'quoteHighlight', () => {
            quote.style.transform = 'scale(1.05)';
            quote.style.textShadow = '0 0 30px rgba(245, 158, 11, 0.8)';
            
            setTimeout(() => {
                quote.style.transform = 'scale(1)';
                quote.style.textShadow = '0 0 20px rgba(245, 158, 11, 0.5)';
            }, 800);
        }, 7000);
    }
}

// Função para criar efeitos especiais
function createSpecialEffects() {
    const slide = document.querySelector('.slide-05');
    if (!slide) return;
    
    // Usar TimerManager para controlar os timers
    const slideId = 'slide-05';
    
    if (window.Utils && window.Utils.TimerManager) {
        // Efeito de brilho no logo AESMOC
        window.Utils.TimerManager.setInterval(slideId, 'logoGlow', () => {
            const logoGlow = document.querySelector('.logo-glow');
            if (logoGlow) {
                logoGlow.style.opacity = '0.8';
                logoGlow.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    logoGlow.style.opacity = '0.4';
                    logoGlow.style.transform = 'scale(1)';
                }, 600);
            }
        }, 5000);
        
        // Pulsar selo de confiança
        window.Utils.TimerManager.setInterval(slideId, 'trustSeal', () => {
            const seal = document.querySelector('.trust-seal');
            if (seal) {
                seal.style.transform = 'translateY(-5px) scale(1.02)';
                
                setTimeout(() => {
                    seal.style.transform = 'translateY(0) scale(1)';
                }, 400);
            }
        }, 8000);
    }
}

// Função para mostrar fatos sobre a comunidade
function showCommunityFacts() {
    const facts = [
        "💡 Única associação de Valparaíso com cartão próprio",
        "🏆 Mais de 10 anos defendendo os moradores",
        "🤝 Parcerias locais que você conhece e confia",
        "📈 Desconto garantido em toda rede credenciada"
    ];
    
    let currentFact = 0;
    const slideId = 'slide-05';
    
    function showNextFact() {
        // Verificar se ainda estamos no slide 5
        const currentSlide = document.querySelector('.slide-05');
        if (!currentSlide || !currentSlide.closest('.present')) {
            return;
        }
        
        // Criar elemento para mostrar fato
        const factElement = document.createElement('div');
        factElement.className = 'community-fact';
        factElement.style.cssText = `
            position: fixed;
            top: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(13, 148, 136, 0.95);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            max-width: 500px;
            text-align: center;
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
            transition: all 0.5s ease;
            z-index: 1000;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(13, 148, 136, 0.3);
        `;
        
        factElement.textContent = facts[currentFact];
        document.body.appendChild(factElement);
        
        // Animar entrada
        setTimeout(() => {
            factElement.style.opacity = '1';
            factElement.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // Animar saída
        setTimeout(() => {
            factElement.style.opacity = '0';
            factElement.style.transform = 'translateX(-50%) translateY(-20px)';
            
            setTimeout(() => {
                if (factElement.parentNode) {
                    factElement.parentNode.removeChild(factElement);
                }
            }, 500);
        }, 4000);
        
        currentFact = (currentFact + 1) % facts.length;
    }
    
    // Usar TimerManager
    if (window.Utils && window.Utils.TimerManager) {
        // Mostrar primeiro fato após 10 segundos
        window.Utils.TimerManager.setTimeout(slideId, 'firstFact', showNextFact, 10000);
        
        // Depois mostrar a cada 15 segundos
        window.Utils.TimerManager.setInterval(slideId, 'periodicFacts', () => {
            const currentSlide = document.querySelector('.slide-05');
            if (!currentSlide || !currentSlide.closest('.present')) {
                return;
            }
            showNextFact();
        }, 15000);
    }
}

// Função principal de inicialização
function initSlide05Comunidade() {
    console.log('🏘️ Inicializando Slide 05 - Comunidade');
    
    // Verificar se elementos existem
    const slide = document.querySelector('.slide-05');
    if (!slide) {
        console.warn('Slide 05 não encontrado');
        return;
    }
    
    // Garantir visibilidade do slide
    slide.style.opacity = '1';
    slide.style.display = 'flex';
    
    // Inicializar efeitos visuais
    createCommunityNetwork();
    createFloatingIcons();
    
    // Adicionar interatividade
    addCardInteractivity();
    
    // Iniciar animações sequenciais
    setTimeout(() => {
        animateValueComparison();
    }, 1000);
    
    
    // Iniciar efeitos contínuos
    setTimeout(() => {
        highlightMainQuote();
        createSpecialEffects();
        showCommunityFacts();
    }, 3000);
    
    console.log('✅ Slide 05 inicializado com sucesso');
}

// Função de limpeza
function cleanupSlide05() {
    console.log('🧹 Limpando Slide 05');
    
    // Usar TimerManager para limpar todos os timers do slide 5
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide('slide-05');
    }
    
    // Remover fatos da comunidade do DOM
    const facts = document.querySelectorAll('.community-fact');
    facts.forEach(fact => {
        if (fact.parentNode) {
            fact.parentNode.removeChild(fact);
        }
    });
    
    // Limpar rede de conexões
    const nodesContainer = document.getElementById('networkNodes');
    const linesContainer = document.getElementById('connectionLines');
    const iconsContainer = document.getElementById('floatingIcons');
    
    if (nodesContainer) nodesContainer.innerHTML = '';
    if (linesContainer) linesContainer.innerHTML = '';
    if (iconsContainer) iconsContainer.innerHTML = '';
    
    // Remover event listeners clonando elementos
    const interactiveElements = document.querySelectorAll('.slide-05 .value-card, .slide-05 .feature-item');
    interactiveElements.forEach(element => {
        const newElement = element.cloneNode(true);
        if (element.parentNode) {
            element.parentNode.replaceChild(newElement, element);
        }
    });
}

// Registrar funções globalmente para o Reveal.js
window.initslide05 = initSlide05Comunidade;
window.cleanupSlide05 = cleanupSlide05;

// Log de inicialização
if (window.Utils && window.Utils.Logger) {
    Utils.Logger.info('Slide 05 script loaded');
} else {
    console.log('[AESMOC] Slide 05 script loaded');
}