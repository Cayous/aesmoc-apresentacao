// ARQUIVO: js/utils.js
// Funções utilitárias para a apresentação AESMOC

/**
 * Debounce function - evita execução excessiva de funções
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Throttle function - limita execução de funções
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Verifica se elemento está visível na viewport
 */
function isElementVisible(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= windowWidth
    );
}

/**
 * Aguarda elemento aparecer no DOM
 */
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }
        
        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Timeout
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

/**
 * Carrega imagem com Promise
 */
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
}

/**
 * Preload de múltiplas imagens
 */
async function preloadImages(urls) {
    const promises = urls.map(url => loadImage(url));
    try {
        return await Promise.all(promises);
    } catch (error) {
        console.warn('Some images failed to preload:', error);
        return [];
    }
}

/**
 * Animação de números (contador)
 */
function animateNumber(element, start, end, duration = 1000, easing = 'easeOutCubic') {
    if (!element) return;
    
    const startTime = performance.now();
    const easingFunctions = {
        linear: t => t,
        easeOutCubic: t => 1 - Math.pow(1 - t, 3),
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    };
    
    const easingFunc = easingFunctions[easing] || easingFunctions.linear;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFunc(progress);
        
        const currentValue = start + (end - start) * easedProgress;
        
        // Formatação de números
        if (end > 1000) {
            element.textContent = Math.floor(currentValue).toLocaleString('pt-BR');
        } else {
            element.textContent = Math.floor(currentValue);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Detecta dispositivo móvel
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detecta se está em modo fullscreen
 */
function isFullscreen() {
    return !!(document.fullscreenElement || 
              document.webkitFullscreenElement || 
              document.mozFullScreenElement || 
              document.msFullscreenElement);
}

/**
 * Toggle fullscreen
 */
function toggleFullscreen() {
    if (isFullscreen()) {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        // Enter fullscreen
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}

/**
 * Formata números para moeda brasileira
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata percentual
 */
function formatPercent(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    }).format(value / 100);
}

/**
 * Cria elemento com atributos
 */
function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'innerHTML') {
            element.innerHTML = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    
    return element;
}

/**
 * Logger com níveis
 */
const Logger = {
    debug: (...args) => {
        if (window.DEBUG_MODE) {
            console.debug('[AESMOC]', ...args);
        }
    },
    info: (...args) => console.info('[AESMOC]', ...args),
    warn: (...args) => console.warn('[AESMOC]', ...args),
    error: (...args) => console.error('[AESMOC]', ...args)
};

/**
 * Storage helper (com fallback)
 */
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(`aesmoc_${key}`, JSON.stringify(value));
            return true;
        } catch (e) {
            Logger.warn('LocalStorage not available:', e);
            return false;
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(`aesmoc_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            Logger.warn('Failed to get from storage:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(`aesmoc_${key}`);
            return true;
        } catch (e) {
            Logger.warn('Failed to remove from storage:', e);
            return false;
        }
    }
};

// Exportar para uso global
window.Utils = {
    debounce,
    throttle,
    isElementVisible,
    waitForElement,
    loadImage,
    preloadImages,
    animateNumber,
    isMobile,
    isFullscreen,
    toggleFullscreen,
    formatCurrency,
    formatPercent,
    createElement,
    Logger,
    Storage
};

// Ativar modo debug em desenvolvimento
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    window.DEBUG_MODE = true;
    Utils.Logger.info('Debug mode ativado');
}