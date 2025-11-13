/**
 * producto.js - Manejo de funcionalidad de las cards de producto
 * Incluye efecto flip y gestión de imágenes
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Script producto.js cargado correctamente');
    
    // Inicializar todas las cards de producto
    initializeProductCards();
    
    // Configurar manejo de imágenes
    setupImageHandling();
});

/**
 * Inicializa todas las funcionalidades de las cards de producto
 */
function initializeProductCards() {
    const productCards = document.querySelectorAll('.flip-card');
    
    productCards.forEach(card => {
        setupFlipCardEvents(card);
        setupImageLoader(card);
    });
    
    console.log(`✅ Inicializadas ${productCards.length} cards de producto`);
}

/**
 * Configura los eventos de flip para una card
 * @param {HTMLElement} card - Elemento de la card
 */
function setupFlipCardEvents(card) {
    let isFlipped = false;
    
    // Evento de click en la card
    card.addEventListener('click', function(e) {
        // Evitar flip si se hace click en botones
        if (e.target.closest('button') || e.target.closest('a')) {
            return;
        }
        
        // Toggle del estado flip
        isFlipped = !isFlipped;
        card.classList.toggle('flipped', isFlipped);
        
        // Animación del ícono
        const flipIcon = card.querySelector('.flip-icon');
        if (flipIcon) {
            flipIcon.style.transform = isFlipped ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        
        console.log(`🔄 Card ${card.dataset.productoId || 'sin-id'} ${isFlipped ? 'volteada' : 'normal'}`);
    });
    
    // Eventos hover para mejor UX
    card.addEventListener('mouseenter', function() {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    });
}

/**
 * Configura el cargador de imágenes para una card
 * @param {HTMLElement} card - Elemento de la card
 */
function setupImageLoader(card) {
    const img = card.querySelector('.producto-image');
    const placeholder = card.querySelector('.placeholder-content');
    
    if (!img || !placeholder) return;
    
    // Intentar cargar la imagen
    img.addEventListener('load', function() {
        // Imagen cargada exitosamente
        placeholder.style.display = 'none';
        img.style.display = 'block';
        img.classList.add('fade-in');
        
        console.log(`🖼️ Imagen cargada para producto ${card.dataset.productoId || 'sin-id'}`);
    });
    
    img.addEventListener('error', function() {
        // Error al cargar imagen, mantener placeholder
        placeholder.style.display = 'block';
        img.style.display = 'none';
        
        console.log(`❌ Error cargando imagen para producto ${card.dataset.productoId || 'sin-id'}`);
    });
}

/**
 * Configuración general para el manejo de imágenes
 */
function setupImageHandling() {
    // Crear observer para lazy loading de imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observar todas las imágenes con data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Función para agregar producto al carrito
 * @param {number} productoId - ID del producto
 * @param {HTMLElement} button - Botón que disparó la acción
 */
function addToCart(productoId, button) {
    // Prevenir propagación para evitar flip
    event.stopPropagation();
    
    const originalText = button.innerHTML;
    
    // Animación de loading
    button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Agregando...
    `;
    
    button.disabled = true;
    
    // Simulación de petición AJAX (reemplazar con implementación real)
    setTimeout(() => {
        button.innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            ¡Agregado!
        `;
        
        // Restaurar botón después de 2 segundos
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
        
        console.log(`🛒 Producto ${productoId} agregado al carrito`);
    }, 1000);
}

/**
 * Animaciones y transiciones CSS adicionales
 */
const additionalStyles = `
<style>
    .fade-in {
        animation: fadeInImage 0.5s ease-in;
    }
    
    @keyframes fadeInImage {
        from { opacity: 0; transform: scale(1.1); }
        to { opacity: 1; transform: scale(1); }
    }
    
    .flip-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .flip-card-inner {
        transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
    
    .flip-icon {
        transition: transform 0.3s ease;
    }
    
    .add-to-cart-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .add-to-cart-btn:active {
        transform: translateY(0);
    }
    
    .placeholder-content {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
</style>
`;

// Inyectar estilos adicionales
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Exponer funciones globales si es necesario
window.addToCart = addToCart;

console.log('🎯 Funcionalidad completa de producto.js cargada');