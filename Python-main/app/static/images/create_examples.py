# Script para crear imágenes de ejemplo para productos
# Ejecutar en el directorio de imágenes de productos

import os
from PIL import Image, ImageDraw, ImageFont
import random

def create_product_placeholder(name, size=(400, 300)):
    """Crea una imagen placeholder para un producto"""
    # Colores corporativos de CleanSA
    colors = [
        '#2C7A7B',  # dark-teal
        '#319795',  # light-teal  
        '#4299E1',  # pro-blue
        '#38B2AC',  # light-blue
        '#48BB78',  # warm-green
    ]
    
    # Crear imagen con color de fondo aleatorio
    bg_color = random.choice(colors)
    img = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Intentar cargar una fuente
    try:
        font = ImageFont.truetype("arial.ttf", 24)
        small_font = ImageFont.truetype("arial.ttf", 16)
    except:
        font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Dibujar texto centrado
    text = name.upper()
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2 - 20
    
    # Fondo semi-transparente para el texto
    padding = 20
    draw.rectangle([x - padding, y - padding, x + text_width + padding, y + text_height + padding], 
                   fill=(255, 255, 255, 100))
    
    # Texto principal
    draw.text((x, y), text, fill='white', font=font)
    
    # Subtexto
    subtitle = "CleanSA Product"
    bbox2 = draw.textbbox((0, 0), subtitle, font=small_font)
    subtitle_width = bbox2[2] - bbox2[0]
    x2 = (size[0] - subtitle_width) // 2
    y2 = y + text_height + 10
    
    draw.text((x2, y2), subtitle, fill='white', font=small_font)
    
    return img

# Lista de productos de ejemplo
productos_ejemplo = [
    'detergente_liquido',
    'jabon_en_polvo', 
    'limpiador_multiusos',
    'desinfectante',
    'suavizante_ropa',
    'limpia_vidrios',
    'quitamanchas',
    'ambientador'
]

# Crear directorio si no existe
os.makedirs('productos', exist_ok=True)

# Generar imágenes
for producto in productos_ejemplo:
    img = create_product_placeholder(producto.replace('_', ' '))
    img.save(f'productos/{producto}.jpg', 'JPEG', quality=85)
    print(f'✅ Creada imagen: {producto}.jpg')

print(f'\n🎉 Se crearon {len(productos_ejemplo)} imágenes de ejemplo para testing')
print('📁 Ubicación: ./productos/')
print('💡 Estas imágenes son solo para demostración del sistema de flip cards')