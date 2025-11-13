# Imágenes de Productos - CleanSA

Este directorio está destinado a almacenar las imágenes de los productos que se mostrarán en la **cara frontal** de las cards con efecto flip.

## 🔄 **Nueva Estructura de Cards**

### **Cara Frontal:**
- **Imagen del producto** (área principal)
- **Nombre del producto**
- **Precio** (badge sobre la imagen)
- **Categoría** (badge sobre la imagen) 
- **Stock disponible**
- **Botón de agregar al carrito**

### **Cara Trasera:**
- **Información detallada** del producto
- **Descripción completa**
- **Información de inventario**
- **Alertas de seguridad** (si aplica)
- **Categoría detallada**

## 📁 Estructura de Archivos

Las imágenes deben seguir la siguiente convención de nombres:

```
nombre_del_producto.jpg
```

**Ejemplo:**
- Si el producto se llama "Detergente Líquido" → `detergente_liquido.jpg`
- Si el producto se llama "Jabón en Polvo" → `jabon_en_polvo.jpg`

## 🛠 Reglas de Conversión

El sistema automáticamente convierte el nombre del producto:
1. Cambia todo a minúsculas
2. Reemplaza espacios con guiones bajos
3. Agrega la extensión `.jpg`

## 📐 Especificaciones Técnicas

- **Formato recomendado:** JPG (.jpg)
- **Formato alternativo:** PNG (.png)
- **Tamaño recomendado:** 400x300px (relación 4:3)
- **Tamaño mínimo:** 300x225px
- **Peso máximo:** 150KB
- **Calidad:** Alta resolución para visualización clara

## ✨ Funcionalidad

### **Cara Frontal:**
- ✅ Imagen se muestra prominentemente
- ✅ Hover effect con zoom suave
- ✅ Badges informativos superpuestos
- ✅ Placeholder elegante si no existe imagen

### **Cara Trasera:**
- ✅ Información detallada organizada en secciones
- ✅ Diseño con gradiente corporativo
- ✅ Cards informativas con backdrop blur
- ✅ Alertas de seguridad destacadas

## 🎨 Ejemplo de Imágenes para Testing

Para probar la funcionalidad, ejecuta el script generador:

```bash
cd static/images/
python create_examples.py
```

Esto creará imágenes de ejemplo para:

```
productos/
├── detergente_liquido.jpg
├── jabon_en_polvo.jpg
├── limpiador_multiusos.jpg
├── desinfectante.jpg
├── suavizante_ropa.jpg
├── limpia_vidrios.jpg
├── quitamanchas.jpg
└── ambientador.jpg
```

## 🚀 Implementación Técnica

El sistema utiliza:
- **JavaScript** para detección de errores de carga
- **CSS3** para transiciones y animaciones 3D
- **Intersection Observer** para lazy loading
- **Fallback automático** a placeholder en caso de error
- **Responsive design** para todos los dispositivos

## 💡 Consejos de Uso

1. **Imágenes claras:** Usa fotos con fondo limpio y buena iluminación
2. **Consistencia:** Mantén un estilo similar en todas las imágenes
3. **Optimización:** Comprime las imágenes para mejor rendimiento
4. **Naming:** Sigue estrictamente la convención de nombres

---

**🔄 Nueva UX:** Los usuarios ven la imagen del producto de inmediato en la cara frontal, y pueden hacer flip para obtener información detallada en la cara trasera.