/**
 * CleanSA - Script para formulario de registro
 * Validaciones en tiempo real y mejoras de UX
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Script de registro CleanSA cargado');

    // Referencias a elementos del formulario
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const apellidoInput = document.getElementById('apellido');
    const dniInput = document.getElementById('dni');
    const direccionInput = document.getElementById('direccion');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const termsCheckbox = document.getElementById('terms');
    const submitButton = document.querySelector('button[type="submit"]');

    // ==========================================
    // VALIDACIONES EN TIEMPO REAL
    // ==========================================

    // Validar nombre de usuario
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            validateUsername(this);
        });
    }

    // Validar DNI
    if (dniInput) {
        dniInput.addEventListener('input', function() {
            validateDNI(this);
        });
    }

    // Validar contraseña
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this);
            if (confirmPasswordInput.value) {
                validatePasswordMatch();
            }
        });
    }

    // Validar confirmación de contraseña
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            validatePasswordMatch();
        });
    }

    // ==========================================
    // FUNCIONES DE VALIDACIÓN
    // ==========================================

    function validateUsername(input) {
        const value = input.value.trim();
        const isValid = value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
        
        if (value.length === 0) {
            setFieldState(input, 'neutral');
        } else if (isValid) {
            setFieldState(input, 'success', 'Nombre de usuario válido');
        } else {
            setFieldState(input, 'error', 'Mínimo 3 caracteres, solo letras, números y guión bajo');
        }
        
        return isValid;
    }

    function validateDNI(input) {
        const value = input.value.trim();
        const dniNumber = parseInt(value);
        const isValid = value.length >= 7 && value.length <= 8 && !isNaN(dniNumber) && dniNumber >= 1000000 && dniNumber <= 99999999;
        
        if (value.length === 0) {
            setFieldState(input, 'neutral');
        } else if (isValid) {
            setFieldState(input, 'success', 'DNI válido');
        } else {
            setFieldState(input, 'error', 'DNI debe tener entre 7 y 8 dígitos');
        }
        
        return isValid;
    }

    function validatePassword(input) {
        const value = input.value;
        const isValid = value.length >= 4;
        
        if (value.length === 0) {
            setFieldState(input, 'neutral');
        } else if (isValid) {
            setFieldState(input, 'success', 'Contraseña válida');
        } else {
            setFieldState(input, 'error', 'La contraseña debe tener al menos 4 caracteres');
        }
        
        return isValid;
    }

    function validatePasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword.length === 0) {
            setFieldState(confirmPasswordInput, 'neutral');
            return false;
        }
        
        const isValid = password === confirmPassword;
        
        if (isValid) {
            setFieldState(confirmPasswordInput, 'success', 'Las contraseñas coinciden');
        } else {
            setFieldState(confirmPasswordInput, 'error', 'Las contraseñas no coinciden');
        }
        
        return isValid;
    }

    function setFieldState(input, state, message = '') {
        // Remover clases anteriores
        input.classList.remove('border-red-500', 'border-green-500', 'border-gray-200');
        
        // Buscar o crear elemento de mensaje
        let messageElement = input.parentNode.querySelector('.field-message');
        if (!messageElement) {
            messageElement = document.createElement('p');
            messageElement.className = 'field-message text-xs mt-1 transition-all duration-200';
            input.parentNode.appendChild(messageElement);
        }
        
        // Aplicar estilos según el estado
        switch (state) {
            case 'success':
                input.classList.add('border-green-500');
                messageElement.className = 'field-message text-xs mt-1 text-green-600';
                messageElement.textContent = message;
                break;
            case 'error':
                input.classList.add('border-red-500');
                messageElement.className = 'field-message text-xs mt-1 text-red-600';
                messageElement.textContent = message;
                break;
            default:
                input.classList.add('border-gray-200');
                messageElement.textContent = '';
        }
    }

    // ==========================================
    // VALIDACIÓN DEL FORMULARIO COMPLETO
    // ==========================================

    if (form) {
        form.addEventListener('submit', function(e) {
            let isFormValid = true;
            
            // Validar todos los campos
            if (!validateUsername(usernameInput)) isFormValid = false;
            if (!validateDNI(dniInput)) isFormValid = false;
            if (!validatePassword(passwordInput)) isFormValid = false;
            if (!validatePasswordMatch()) isFormValid = false;
            
            // Validar campos requeridos básicos
            if (!apellidoInput.value.trim()) {
                setFieldState(apellidoInput, 'error', 'El apellido es obligatorio');
                isFormValid = false;
            }
            
            if (!direccionInput.value.trim()) {
                setFieldState(direccionInput, 'error', 'La dirección es obligatoria');
                isFormValid = false;
            }
            
            if (!termsCheckbox.checked) {
                alert('Debes aceptar los términos y condiciones para continuar');
                isFormValid = false;
            }
            
            if (!isFormValid) {
                e.preventDefault();
                console.log('❌ Formulario inválido, no se enviará');
            } else {
                console.log('✅ Formulario válido, enviando...');
            }
        });
    }

    // ==========================================
    // ANIMACIONES Y EFECTOS VISUALES
    // ==========================================

    // Animación del logo
    const logoRing = document.getElementById('logo-ring');
    if (logoRing) {
        // Efecto de rotación más suave
        logoRing.style.animationDuration = '12s';
    }

    // Animación de los textos del logo
    const cleanText = document.getElementById('clean-text');
    const saText = document.getElementById('sa-text');
    
    if (cleanText && saText) {
        setTimeout(() => {
            cleanText.style.transform = 'translateX(0)';
            cleanText.style.opacity = '1';
        }, 500);
        
        setTimeout(() => {
            saText.style.transform = 'translateX(0)';
            saText.style.opacity = '1';
        }, 800);
    }

    // Efectos hover para iconos flotantes
    const floatingIcons = document.querySelectorAll('[id^="floating-icon"]');
    floatingIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            const rotation = index % 2 === 0 ? '12deg' : '-12deg';
            this.style.transform = `rotate(${rotation}) scale(1)`;
        });
    });

    console.log('✅ Validaciones y animaciones inicializadas correctamente');
});