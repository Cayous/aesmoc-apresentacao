// ARQUIVO: js/loader.js - CORRIGIDO V2
// Lista de slides em ordem
const slidesList = [
    'slide-01-titulo',
    'slide-02-o-problema',
    'slide-03-solução-cartao3d',
    'slide-04-cartao-destaque',
    'slide-05-como-funciona',
    'slide-06-demonstracao',
    'slide-07-comparativo-titulo',
    'slide-08-tabela-comparativa',
    'slide-09-mapa-parceiros',
    'slide-10-timeline',
    'slide-11-parceiros-confirmados',
    'slide-12-especial-sindicos',
    'slide-13-case-sucesso',
    'slide-14-visao-futuro',
    'slide-15-depoimento-video',
    'slide-16-como-participar',
    'slide-17-beneficios-embaixadores',
    'slide-18-contatos-qr',
    'slide-19-agradecimento'
];

// Flag para controlar a inicialização
let revealInitialized = false;

// Função para carregar CSS com Promise
function loadCSS(href) {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        
        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
        
        document.head.appendChild(link);
    });
}

// Função para carregar JS com Promise
function loadJS(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load JS: ${src}`));
        
        document.body.appendChild(script);
    });
}

// Função para carregar HTML
async function loadHTML(slideName) {
    try {
        const response = await fetch(`slides/${slideName}/index.html`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Failed to load HTML for ${slideName}:`, error);
        return `<div class="slide-error">Erro ao carregar ${slideName}</div>`;
    }
}

// Função para carregar um slide completo
async function loadSlide(slideName) {
    console.log(`📦 Loading slide: ${slideName}`);
    
    try {
        // 1. Carregar recursos em paralelo
        const [html, cssLoaded, jsLoaded] = await Promise.all([
            loadHTML(slideName),
            loadCSS(`slides/${slideName}/style.css`).catch(err => {
                console.warn(`⚠️ CSS not found for ${slideName}:`, err.message);
                return null;
            }),
            loadJS(`slides/${slideName}/script.js`).catch(err => {
                console.warn(`⚠️ JS not found for ${slideName}:`, err.message);
                return null;
            })
        ]);
        
        // 2. Aguardar um tick para garantir que CSS foi aplicado
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // 3. Criar section e inserir conteúdo
        const section = document.createElement('section');
        section.innerHTML = html;
        section.dataset.slideName = slideName;
        section.dataset.loaded = 'true';
        
        // 4. Adicionar ao container
        const container = document.getElementById('slides-container');
        container.appendChild(section);
        
        console.log(`✅ Slide loaded: ${slideName}`);
        return section;
        
    } catch (error) {
        console.error(`❌ Error loading slide ${slideName}:`, error);
        
        // Fallback: criar slide de erro
        const section = document.createElement('section');
        section.innerHTML = `
            <div class="slide-error">
                <h2>Erro ao carregar ${slideName}</h2>
                <p>${error.message}</p>
            </div>
        `;
        section.dataset.slideName = slideName;
        section.dataset.error = 'true';
        
        const container = document.getElementById('slides-container');
        container.appendChild(section);
        
        return section;
    }
}

// NOVA FUNÇÃO: Limpar URL de parâmetros de hash que podem causar problemas
function clearURLHash() {
    if (window.location.hash) {
        console.log('🧹 Limpando hash da URL...');
        // Usar pushState para limpar sem reload
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
}

// Função principal para carregar todos os slides
async function loadSlides() {
    console.log('🚀 Iniciando carregamento dos slides...');
    
    // Limpar hash da URL que pode causar navegação indesejada
    clearURLHash();
    
    const container = document.getElementById('slides-container');
    if (!container) {
        console.error('❌ Container de slides não encontrado!');
        return;
    }
    
    // Limpar container e mostrar loading
    container.innerHTML = '<section><div class="loading">Carregando apresentação...</div></section>';
    
    try {
        // Carregar slides sequencialmente para manter ordem
        const loadedSlides = [];
        for (const slideName of slidesList) {
            const slide = await loadSlide(slideName);
            loadedSlides.push(slide);
        }
        
        console.log(`✅ Todos os ${loadedSlides.length} slides carregados!`);
        
        // Remover loading
        const loadingSlide = container.querySelector('.loading');
        if (loadingSlide) {
            loadingSlide.closest('section').remove();
        }
        
        // Aguardar renderização completa antes de inicializar Reveal
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Verificar se Reveal.js está disponível
        if (typeof Reveal === 'undefined') {
            console.error('❌ Reveal.js não foi carregado!');
            return;
        }
        
        // Inicializar Reveal.js apenas uma vez
        if (!revealInitialized) {
            console.log('🎬 Inicializando Reveal.js...');
            revealInitialized = true;
            initializeReveal();
        }
        
    } catch (error) {
        console.error('❌ Erro fatal no carregamento:', error);
        container.innerHTML = `
            <section>
                <div class="slide-error">
                    <h1>Erro Fatal</h1>
                    <p>Não foi possível carregar a apresentação.</p>
                    <p>${error.message}</p>
                </div>
            </section>
        `;
    }
}

// MELHOR Event listener para aguardar DOM
function initializeLoader() {
    // Aguardar que todos os scripts essenciais estejam carregados
    if (typeof initializeReveal === 'undefined') {
        console.log('⏳ Aguardando scripts essenciais...');
        setTimeout(initializeLoader, 100);
        return;
    }
    
    console.log('🎯 Iniciando loader...');
    loadSlides();
}

// Event listener para aguardar DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoader);
} else {
    initializeLoader();
}