// ARQUIVO: slides/slide-02-o-problema/script.js

function initSlide02OProblema() {
    console.log('Slide 02 - O Problema inicializado');
    
    // Garantir que o slide está visível
    const slide = document.querySelector('.slide-02');
    if (slide) {
        slide.style.opacity = '1';
        slide.style.display = 'flex';
        console.log('Slide 02 visível e configurado');
    }
}