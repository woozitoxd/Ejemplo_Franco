document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener el elemento del logo
    const logoElement = document.getElementById('logo');
    
   
    
    // Animación inicial de entrada del logo
    anime({
        targets: logoElement,
        scale: [0, 1],
        opacity: [0, 1],
        rotate: [720, 0],
        duration: 2000,
        easing: 'easeOutElastic(1, .8)',
   
    });



    ////API Google Maps
    function initMap() {
        const location = { lat: -34.6037, lng: -58.3816 }; // Coordenadas de Buenos Aires
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: location,
        });
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Nuestra Ubicación",
        });
    }
    window.initMap = initMap;

   // Cargar el mapa al iniciar la página
   initMap();

});
