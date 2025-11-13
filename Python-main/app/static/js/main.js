// JavaScript moderno para CleanSA - Animaciones de entrada
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('🧼 CleanSA - Sistema cargado');

    // Configurar Observer para animaciones en scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas para animaciones
    document.querySelectorAll('.card-left, .card-right, .card-up, .info-card').forEach(card => {
        observer.observe(card);
    });

    // Animación del título principal con Anime.js
    anime({
        targets: '#main-title',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutElastic(1, .8)',
        delay: 200
    });

    // Animación del hero section
    anime({
        targets: '.nav-card:first-child',
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1000,
        easing: 'easeOutCubic',
        delay: 400
    });

    // Animación secuencial de tarjetas principales
    anime({
        targets: '.modern-card',
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(300, {start: 600}),
        easing: 'easeOutCubic'
    });

    // Animación de iconos con pulso suave
    anime({
        targets: '.pulse-icon',
        scale: [1, 1.05, 1],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
    });

    // Efectos hover mejorados para tarjetas de información
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -8,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });

    

    // Efecto para elemento con ID 'first' (el efecto de escritura original)
    const firstElement = document.getElementById('first');
    if (firstElement) {
        // Crear efecto de texto animado letra por letra
        const text = firstElement.textContent;
        firstElement.innerHTML = '';
        
        // Dividir el texto en spans individuales para cada letra
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Preservar espacios
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            firstElement.appendChild(span);
        }
        
        // Animar cada letra (exactamente como era antes)
        anime({
            targets: '#first span',
            opacity: [0, 1],
            y: [ { to: '-2.75rem', ease: 'outExpo', duration: 400 },
            { to: 0, ease: 'outBounce', duration: 300, delay: 100 },
            ],  
            rotateZ: [-180, 1],
            duration: 250,
            delay: anime.stagger(80),
            easing: 'easeOutElastic(1, .8)',
            loop: true,
            direction: 'alternate',
            loopDelay: 1000
        });
    }

    // Parallax deshabilitado temporalmente para mejor rendimiento

    // Animación de carga completada
    setTimeout(() => {
        console.log('✨ Animaciones CleanSA iniciadas');
    }, 1500);

});