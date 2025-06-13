// Lista de slides em ordem
const slidesList = [
    'slide-01-titulo',
    'slide-02-cartao-3d',
    'slide-03-problema',
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

// Função para carregar slides
async function loadSlides() {
    const container = document.getElementById('slides-container');
    
    for (const slideName of slidesList) {
        try {
            // Carregar HTML do slide
            const response = await fetch(`slides/${slideName}/index.html`);
            const html = await response.text();
            
            // Criar section e inserir conteúdo
            const section = document.createElement('section');
            section.innerHTML = html;
            section.dataset.slideName = slideName;
            
            // Carregar CSS do slide
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `slides/${slideName}/style.css`;
            document.head.appendChild(link);
            
            // Adicionar ao container
            container.appendChild(section);
            
            // Carregar JS do slide
            const script = document.createElement('script');
            script.src = `slides/${slideName}/script.js`;
            script.defer = true;
            document.body.appendChild(script);
            
        } catch (error) {
            console.error(`Erro ao carregar slide ${slideName}:`, error);
        }
    }
    
    // Inicializar Reveal.js após carregar todos os slides
    initializeReveal();
}

// Carregar slides quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', loadSlides);