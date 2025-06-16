// ARQUIVO: config/reveal-config.js

// Configurações globais do Reveal.js
function initializeReveal() {
    Reveal.initialize({
        // Configurações de visualização
        width: '100%',
        height: '100%',
        margin: 0,
        minScale: 1,
        maxScale: 1,
        
        // Desabilitar centralização para ter controle total
        center: false,
        
        // Configurações de navegação
        hash: true,
        controls: true,
        progress: true,
        history: true,
        keyboard: true,
        overview: true,
        touch: true,
        loop: false,
        rtl: false,
        shuffle: false,
        fragments: true,
        fragmentInURL: false,
        embedded: false,
        help: true,
        showNotes: false,
        autoSlide: 0,
        autoSlideStoppable: true,
        mouseWheel: false,
        hideInactiveCursor: true,
        hideCursorTime: 3000,
        
        // Transições
        transition: 'slide',
        transitionSpeed: 'default',
        backgroundTransition: 'fade',
        
        // Número de slides para pré-carregar
        viewDistance: 3,
        
        // Parallax background
        parallaxBackgroundImage: '',
        parallaxBackgroundSize: '',
        parallaxBackgroundHorizontal: null,
        parallaxBackgroundVertical: null,
        
        // Configuração de plugins
        plugins: [ RevealNotes, RevealHighlight ],
        
        // Configurações customizadas de teclado
        keyboard: {
            27: () => { // ESC - Toggle overview
                Reveal.toggleOverview();
            },
            70: () => { // F - Fullscreen
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            },
            72: () => { // H - Toggle help
                Reveal.toggleHelp();
            },
            83: () => { // S - Speaker notes
                // Abrir speaker notes em nova janela
                Reveal.getPlugin('notes').open();
            }
        }
    });
    
    // Corrigir tamanho após inicialização
    setTimeout(() => {
        Reveal.sync();
        Reveal.layout();
    }, 100);
    
    // Event listeners globais
    Reveal.on('ready', event => {
        console.log('Apresentação AESMOC carregada!');
        console.log('Pressione F para tela cheia, ESC para visão geral');
        
        // Inicializar animações do primeiro slide
        const firstSlide = document.querySelector('.slide-01');
        if (firstSlide && window.initslide01titulo) {
            window.initslide01titulo();
        }
    });
    
    Reveal.on('slidechanged', event => {
        console.log('Slide mudou para:', event.indexh);
        
        // NOVO: Chamar limpeza do slide anterior se existir
        const previousSlide = event.previousSlide;
        if (previousSlide && previousSlide.dataset.slideName) {
            const previousSlideName = previousSlide.dataset.slideName;
            let cleanupFunction = '';
            
            // Mapear nomes de slides para suas funções de limpeza
            if (previousSlideName === 'slide-01-titulo') {
                cleanupFunction = 'cleanupSlide01';
            } else if (previousSlideName === 'slide-02-o-problema') {
                cleanupFunction = 'cleanupSlide02';
            } else if (previousSlideName === 'slide-03-solução-cartao3d') {
                cleanupFunction = 'cleanupSlide03';
            } else {
                // Fallback para outros slides
                const slideNumber = previousSlideName.match(/slide-(\d+)/)?.[1];
                if (slideNumber) {
                    cleanupFunction = `cleanupSlide${slideNumber.padStart(2, '0')}`;
                }
            }
            
            if (cleanupFunction && window[cleanupFunction]) {
                console.log(`🧹 Executando limpeza: ${cleanupFunction}`);
                window[cleanupFunction]();
            }
        }
        
        // Chamar função de inicialização do slide atual
        const slideName = event.currentSlide.dataset.slideName;
        if (slideName) {
            // Converter nome do slide para nome da função
            // slide-01-titulo -> initSlide01
            // slide-02-o-problema -> initSlide02OProblema
            let initFunction = '';
            if (slideName === 'slide-01-titulo') {
                initFunction = 'initSlide01';
            } else if (slideName === 'slide-02-o-problema') {
                initFunction = 'initSlide02OProblema';
            } else if (slideName === 'slide-03-solução-cartao3d') {
                initFunction = 'initSlide03SolucaoCartao3d';
            } else {
                // Fallback para outros slides
                initFunction = `init${slideName.replace(/-/g, '')}`;
            }
            
            console.log(`Tentando chamar função: ${initFunction}`);
            if (window[initFunction]) {
                window[initFunction]();
            } else {
                console.warn(`Função ${initFunction} não encontrada para slide ${slideName}`);
            }
        }
    });
    
    // Redimensionar quando a janela mudar
    window.addEventListener('resize', () => {
        Reveal.layout();
    });
    
    // Garantir tela cheia adequada
    document.addEventListener('fullscreenchange', () => {
        setTimeout(() => {
            Reveal.layout();
        }, 100);
    });
}

// Função auxiliar para debug
function revealDebug() {
    console.log('Reveal.js Debug Info:');
    console.log('- Total slides:', Reveal.getTotalSlides());
    console.log('- Current slide:', Reveal.getIndices());
    console.log('- Progress:', Reveal.getProgress());
    console.log('- Available routes:', Reveal.availableRoutes());
}

// Exportar para uso global
window.initializeReveal = initializeReveal;
window.revealDebug = revealDebug;