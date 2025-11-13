"""
CleanSA Blueprints Package
Centraliza la importación de todos los blueprints de la aplicación
"""

from .main import main_bp
from .admin import admin_bp
from .products import products_bp
from .employees import employees_bp
from .users import users_bp
from .auth import auth_bp

# Lista de todos los blueprints para registrar en la app
ALL_BLUEPRINTS = [
    main_bp,
    admin_bp,
    products_bp,
    employees_bp,
    users_bp,
    auth_bp
]

__all__ = [
    'main_bp',
    'admin_bp', 
    'products_bp',
    'employees_bp',
    'users_bp',
    'ALL_BLUEPRINTS'
]