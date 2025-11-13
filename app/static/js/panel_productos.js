
/**
 * CleanSA - Panel de Productos JavaScript
 * Gestión de productos con modal dinámico y validaciones
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Panel de Productos CleanSA iniciado');

    // ==========================================
    // REFERENCIAS A ELEMENTOS DOM
    // ==========================================
    
    const modal = document.getElementById('productoModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const modalTitle = modal.querySelector('h3');
    const modalForm = modal.querySelector('form');

    // Inputs del formulario
    const nombreInput = modalForm.querySelector('input[placeholder="Ej: Detergente Premium"]');
    const descripcionInput = modalForm.querySelector('textarea');
    const precioInput = modalForm.querySelector('input[type="number"][step="0.01"]');
    const stockInput = modalForm.querySelector('input[type="number"]:not([step])');

    // ==========================================
    // GESTIÓN DEL MODAL
    // ==========================================

    // Abrir modal para agregar producto
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            openModal('add');
        });
    }

    // Cerrar modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeModal);
    }

    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ==========================================
    // FUNCIONES DEL MODAL
    // ==========================================

    function openModal(mode = 'add', productData = null) {
        // Configurar modal según el modo
        if (mode === 'add') {
            modalTitle.textContent = 'Agregar Producto';
            modalForm.action = '/products/add';
            modalForm.method = 'POST';
            clearForm();
        } else if (mode === 'edit') {
            modalTitle.textContent = 'Editar Producto';
            modalForm.action = `/products/edit/${productData.id}`;
            modalForm.method = 'POST';
            fillForm(productData);
        }

        // Mostrar modal
        modal.classList.remove('hidden');

        // Focus en el primer input
        if (nombreInput) {
            setTimeout(() => nombreInput.focus(), 100);
        }
    }

    function closeModal() {
        modal.classList.add('hidden');
        clearForm();
    }

    function clearForm() {
        modalForm.reset();
        
        // Limpiar clases de validación
        const inputs = modalForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('border-red-500', 'border-green-500');
            
            // Remover mensajes de error
            const errorMsg = input.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    }

    function fillForm(productData) {
        if (nombreInput) nombreInput.value = productData.nombre || '';
        if (descripcionInput) descripcionInput.value = ''; // Limpiar ya que no se guarda
        if (precioInput) precioInput.value = productData.precio || '';
        if (stockInput) stockInput.value = productData.stock || '';
        
        // Manejar checkbox de peligroso
        const peligrosoCheckbox = modalForm.querySelector('input[name="peligroso"]');
        if (peligrosoCheckbox) {
            peligrosoCheckbox.checked = productData.peligroso || false;
        }
    }

    // ==========================================
    // VALIDACIONES EN TIEMPO REAL
    // ==========================================

    // Validar nombre
    if (nombreInput) {
        nombreInput.addEventListener('input', function() {
            validateField(this, value => value.trim().length >= 3, 
                'El nombre debe tener al menos 3 caracteres');
        });
    }

    // Validar precio
    if (precioInput) {
        precioInput.addEventListener('input', function() {
            validateField(this, value => parseFloat(value) > 0, 
                'El precio debe ser mayor a 0');
        });
    }

    // Validar stock
    if (stockInput) {
        stockInput.addEventListener('input', function() {
            validateField(this, value => parseInt(value) >= 0, 
                'El stock no puede ser negativo');
        });
    }

    function validateField(input, validationFn, errorMessage) {
        const value = input.value;
        const isValid = validationFn(value);
        
        // Remover mensaje de error anterior
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Aplicar estilos según validación
        if (value.length === 0) {
            input.classList.remove('border-red-500', 'border-green-500');
        } else if (isValid) {
            input.classList.remove('border-red-500');
            input.classList.add('border-green-500');
        } else {
            input.classList.remove('border-green-500');
            input.classList.add('border-red-500');
            
            // Agregar mensaje de error
            const errorDiv = document.createElement('p');
            errorDiv.className = 'error-message text-red-600 text-xs mt-1';
            errorDiv.textContent = errorMessage;
            input.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // ==========================================
    // ENVÍO DEL FORMULARIO
    // ==========================================

    modalForm.addEventListener('submit', function(e) {
        // Validar todos los campos antes del envío
        let isFormValid = true;
        
        if (nombreInput && !validateField(nombreInput, value => value.trim().length >= 3, 
            'El nombre debe tener al menos 3 caracteres')) {
            isFormValid = false;
        }
        
        if (precioInput && !validateField(precioInput, value => parseFloat(value) > 0, 
            'El precio debe ser mayor a 0')) {
            isFormValid = false;
        }
        
        if (stockInput && !validateField(stockInput, value => parseInt(value) >= 0, 
            'El stock no puede ser negativo')) {
            isFormValid = false;
        }

        if (!isFormValid) {
            e.preventDefault();
            showNotification('Por favor corrige los errores antes de continuar', 'error');
            return;
        }

        // Mostrar loading en el botón
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Guardando...';
        submitBtn.disabled = true;

        // El formulario se enviará normalmente
        // El loading se mantendrá hasta la recarga de página
    });

    // ==========================================
    // ACCIONES DE LA TABLA
    // ==========================================

    // Botones de editar
    document.querySelectorAll('[title="Editar"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener datos del producto desde la fila de la tabla
            const row = this.closest('tr');
            const productData = extractProductDataFromRow(row);
            
            openModal('edit', productData);
        });
    });

    // Botones de eliminar
    document.querySelectorAll('[title="Eliminar"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const row = this.closest('tr');
            const productName = row.querySelector('td:nth-child(2) .text-sm.font-medium').textContent;
            const productId = row.querySelector('td:first-child .text-sm').textContent.replace('#', '');
            
            if (confirm(`¿Estás seguro de que deseas eliminar "${productName}"?\n\nEsta acción no se puede deshacer.`)) {
                deleteProduct(productId, productName);
            }
        });
    });

    function extractProductDataFromRow(row) {
        const cells = row.querySelectorAll('td');
        
        return {
            id: cells[0].textContent.replace('#', '').trim(),
            nombre: cells[1].querySelector('.text-sm.font-medium').textContent.trim(),
            precio: cells[3].textContent.replace('$', '').replace(',', '').trim(),
            stock: cells[4].textContent.split(' ')[0].trim()
        };
    }

    function deleteProduct(productId, productName) {
        // Crear un formulario temporal para la eliminación
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/products/delete/${productId}`;
        document.body.appendChild(form);
        
        showNotification(`Eliminando producto "${productName}"...`, 'info');
        form.submit();
    }

    // ==========================================
    // SISTEMA DE NOTIFICACIONES
    // ==========================================

    function showNotification(message, type = 'info') {
        // Remover notificación anterior si existe
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = `custom-notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        // Estilos según el tipo
        switch (type) {
            case 'success':
                notification.classList.add('bg-warm-green', 'text-white');
                break;
            case 'error':
                notification.classList.add('bg-red-500', 'text-white');
                break;
            default:
                notification.classList.add('bg-pro-blue', 'text-white');
        }

        notification.innerHTML = `
            <div class="flex items-center">
                <span class="mr-3">${getIconForType(type)}</span>
                <span class="font-medium">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animación de entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto-remove después de 4 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    function getIconForType(type) {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            default:
                return 'ℹ️';
        }
    }

    console.log('✅ Panel de Productos CleanSA completamente inicializado');
});