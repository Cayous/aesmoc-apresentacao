// ARQUIVO: slides/slide-02/script.js

// Função para animar o contador da calculadora
function animateCalculator() {
    const calcResult = document.getElementById('calcResult');
    if (!calcResult) return;
    
    const values = [250, 300, 200, 150];
    const totalValue = values.reduce((sum, val) => sum + val, 0);
    
    let currentSum = 0;
    let index = 0;
    
    // Função para animar cada número sendo adicionado
    function addNextValue() {
        if (index < values.length) {
            currentSum += values[index];
            
            // Animar contador de 0 até o valor atual
            animateNumber(calcResult, currentSum - values[index], currentSum, 800, (value) => {
                return `R$ ${value.toLocaleString('pt-BR')}`;
            });
            
            index++;
            
            // Agendar próxima adição
            setTimeout(addNextValue, 1000);
        }
    }
    
    // Iniciar a sequência após um delay
    setTimeout(addNextValue, 500);
}

// Função para animar números (reutilizada do utils.js)
function animateNumber(element, start, end, duration = 1000, formatter = null) {
    if (!element) return;
    
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
        }
    }
    
    requestAnimationFrame(update);
}

// Função para animar a barra de impacto anual
function animateImpactBar() {
    const impactBar = document.getElementById('impactBar');
    if (!impactBar) return;
    
    // A animação já está definida no CSS, mas podemos adicionar efeitos extras
    setTimeout(() => {
        // Adicionar efeito de brilho quando a barra estiver cheia
        impactBar.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.8)';
        
        setTimeout(() => {
            impactBar.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.5)';
        }, 500);
    }, 4100); // Timing baseado na animação CSS
}

// Função para adicionar interatividade aos cards
function initCardInteractivity() {
    const cards = document.querySelectorAll('.cost-card');
    
    cards.forEach(card => {
        // Efeito hover suave
        card.addEventListener('mouseenter', () => {
            // Destacar o valor correspondente na calculadora
            const value = card.dataset.value;
            highlightCalculatorValue(value);
        });
        
        card.addEventListener('mouseleave', () => {
            // Remover destaque
            removeCalculatorHighlight();
        });
        
        // Efeito de clique sutil
        card.addEventListener('click', () => {
            // Pulsar o card
            card.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            }, 150);
        });
    });
}

// Função para destacar valor na calculadora
function highlightCalculatorValue(value) {
    const calcNumbers = document.querySelectorAll('.calc-number');
    
    calcNumbers.forEach(number => {
        if (number.textContent === value) {
            number.style.color = '#EA580C';
            number.style.textShadow = '0 0 10px #EA580C';
            number.style.transform = 'scale(1.1)';
        }
    });
}

// Função para remover destaque da calculadora
function removeCalculatorHighlight() {
    const calcNumbers = document.querySelectorAll('.calc-number');
    
    calcNumbers.forEach(number => {
        number.style.color = '';
        number.style.textShadow = '';
        number.style.transform = '';
    });
}

// Função para mostrar fatos interessantes periodicamente - REFATORADA
function showPeriodicFacts() {
    // Usar o TimerManager para gerenciar os timers
    const slideId = 'slide-02';
    
    // Limpar timers anteriores do slide 2 se existirem
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide(slideId);
    }
    
    const facts = [
        "💡 O gasto médio anual é bastante significativo para o orçamento familiar.",
        "⏰ Em 10 anos, o valor acumulado pode ultrapassar os R$ 280.000.",
        "🏠 Esse montante poderia ser usado em metas maiores, como a compra de um imóvel.",
        "📊 Representa uma fatia relevante da renda mensal da maioria das famílias."
    ];
    
    let currentFact = 0;
    
    function showNextFact() {
        // Verificar se ainda estamos no slide 2
        const currentSlide = document.querySelector('.slide-02');
        if (!currentSlide || !currentSlide.closest('.present')) {
            return; // Parar se não estivermos no slide 2
        }
        
        // Criar elemento para mostrar fatos
        const factElement = document.createElement('div');
        factElement.className = 'periodic-fact';
        factElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(220, 38, 38, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            font-size: 0.9rem;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.5s ease;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        
        factElement.textContent = facts[currentFact];
        document.body.appendChild(factElement);
        
        // Animar entrada
        setTimeout(() => {
            factElement.style.opacity = '1';
            factElement.style.transform = 'translateX(0)';
        }, 100);
        
        // Animar saída
        setTimeout(() => {
            factElement.style.opacity = '0';
            factElement.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (factElement.parentNode) {
                    factElement.parentNode.removeChild(factElement);
                }
            }, 500);
        }, 4000);
        
        currentFact = (currentFact + 1) % facts.length;
    }
    
    // Usar TimerManager para gerenciar os timers
    if (window.Utils && window.Utils.TimerManager) {
        // Mostrar primeiro fato após 8 segundos
        window.Utils.TimerManager.setTimeout(slideId, 'firstFact', showNextFact, 8000);
        
        // Depois mostrar a cada 12 segundos
        window.Utils.TimerManager.setInterval(slideId, 'periodicFacts', () => {
            // Verificar se ainda estamos no slide 2 antes de executar
            const currentSlide = document.querySelector('.slide-02');
            if (!currentSlide || !currentSlide.closest('.present')) {
                // Se não estivermos no slide 2, parar
                return;
            }
            showNextFact();
        }, 12000);
    } else {
        // Fallback para o sistema antigo se TimerManager não estiver disponível
        setTimeout(showNextFact, 8000);
        setInterval(() => {
            const currentSlide = document.querySelector('.slide-02');
            if (!currentSlide || !currentSlide.closest('.present')) {
                return;
            }
            showNextFact();
        }, 12000);
    }
}

// Função para adicionar efeitos sonoros (opcional)
function addSoundEffects() {
    // Criar contexto de áudio simples para feedback
    let audioContext;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Áudio não suportado');
        return;
    }
    
    function playTone(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Tocar som quando a calculadora finaliza
    setTimeout(() => {
        playTone(440, 0.2); // Nota A
    }, 4500);
}

// Função para verificar visibilidade e reiniciar animações
function checkSlideVisibility() {
    const slide = document.querySelector('.slide-02');
    if (!slide) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Slide está visível, iniciar animações
                setTimeout(() => {
                    animateCalculator();
                    animateImpactBar();
                }, 1000);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(slide);
}

// Função principal de inicialização
function initSlide02OProblema() {
    console.log('🎯 Inicializando Slide 02 - O Problema');
    
    // Verificar se elementos existem
    const slide = document.querySelector('.slide-02');
    if (!slide) {
        console.warn('Slide 02 não encontrado');
        return;
    }
    
    // Garantir visibilidade do slide
    slide.style.opacity = '1';
    slide.style.display = 'flex';
    
    // Inicializar interatividade dos cards
    initCardInteractivity();
    
    // Iniciar animação da calculadora após as animações iniciais
    setTimeout(() => {
        animateCalculator();
        animateImpactBar();
    }, 2000);
    
    // Mostrar fatos interessantes (opcional)
    showPeriodicFacts();
    
    // Adicionar efeitos sonoros sutis (opcional)
    // addSoundEffects();
    
    // Configurar observer para reanimação se necessário
    checkSlideVisibility();
    
    console.log('✅ Slide 02 inicializado com sucesso');
}

// Função de limpeza - SIMPLIFICADA
function cleanupSlide02() {
    console.log('🧹 Limpando Slide 02');
    
    // Usar TimerManager para limpar todos os timers do slide 2
    if (window.Utils && window.Utils.TimerManager) {
        window.Utils.TimerManager.clearSlide('slide-02');
    }
    
    // Remover fatos periódicos do DOM
    const facts = document.querySelectorAll('.periodic-fact');
    facts.forEach(fact => {
        if (fact.parentNode) {
            fact.parentNode.removeChild(fact);
        }
    });
    
    // Remover event listeners dos cards
    const cards = document.querySelectorAll('.cost-card');
    cards.forEach(card => {
        card.replaceWith(card.cloneNode(true));
    });
}

// Registrar função de limpeza globalmente
window.cleanupSlide02 = cleanupSlide02;

// Registrar função globalmente para o Reveal.js
window.initSlide02 = initSlide02OProblema;

// REMOVIDO: Auto-execução que causava conflitos
// O slide agora só será inicializado quando chamado pelo Reveal.js