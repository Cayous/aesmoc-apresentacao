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
        
        // Configurações de navegação - CORRIGIDAS
        hash: false, // DESABILITADO para evitar navegação baseada em URL
        controls: true,
        progress: true,
        history: false, // DESABILITADO para evitar problemas de histórico
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
        
        // FORÇAR INÍCIO NO PRIMEIRO SLIDE
        navigationMode: 'default',
        
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
    
    // NOVO: Garantir que sempre inicie no primeiro slide
    setTimeout(() => {
        console.log('🔧 Forçando navegação para o primeiro slide...');
        Reveal.slide(0, 0, 0); // Vai para slide 0, sem fragmento
        Reveal.sync();
        Reveal.layout();
    }, 200);
    
    // Event listeners globais
    Reveal.on('ready', event => {
        console.log('📋 Apresentação AESMOC carregada!');
        console.log('🎮 Pressione F para tela cheia, ESC para visão geral');
        
        // GARANTIR que estamos no primeiro slide
        Reveal.slide(0, 0, 0);
        
        // Aguardar um momento antes de inicializar o primeiro slide
        setTimeout(() => {
            // Inicializar animações do primeiro slide
            const firstSlide = document.querySelector('.slide-01');
            if (firstSlide && window.initSlide01) {
                console.log('🎬 Inicializando primeiro slide...');
                window.initSlide01();
            }
        }, 300);
    });
    
    Reveal.on('slidechanged', event => {
        console.log('📍 Slide mudou para:', event.indexh);
        
        // NOVO: Chamar limpeza do slide anterior se existir
        const previousSlide = event.previousSlide;
        if (previousSlide && previousSlide.dataset.slideName) {
            const previousSlideName = previousSlide.dataset.slideName;
            let cleanupFunction = '';
            
            // Mapear nomes de slides para suas funções de limpeza
            if (previousSlideName === 'slide-01') {
                cleanupFunction = 'cleanupSlide01';
            } else if (previousSlideName === 'slide-02') {
                cleanupFunction = 'cleanupSlide02';
            } else if (previousSlideName === 'slide-03') {
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
            if (slideName === 'slide-01') {
                initFunction = 'initSlide01';
            } else if (slideName === 'slide-02') {
                initFunction = 'initSlide02';
            } else if (slideName === 'slide-03') {
                initFunction = 'initSlide03';
            } else {
                // Fallback para outros slides
                initFunction = `init${slideName.replace(/-/g, '')}`;
            }
            
            console.log(`🎯 Tentando chamar função: ${initFunction}`);
            if (window[initFunction]) {
                window[initFunction]();
            } else {
                console.warn(`⚠️ Função ${initFunction} não encontrada para slide ${slideName}`);
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