
"""
CleanSA - Aplicación Flask Principal
Sistema de gestión para empresa de productos higiénicos
"""

from flask import Flask, request, redirect, url_for, render_template
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_sqlalchemy import SQLAlchemy

# Importar la instancia de database desde models
from app.models import database, bcrypt

def create_app():
    # ===================================
    # CONFIGURACIÓN BÁSICA
    # ===================================
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'supersecretkey'
    
    # Inicializamos Bcrypt y LoginManager con las instancias de models.py
    bcrypt.init_app(app) # Usar la instancia global de bcrypt
    login_manager = LoginManager()
    login_manager.init_app(app) # Integrando login con la app Flask
    
    # ===================================
    # CONFIGURACIÓN DE LOGIN MANAGER
    # ===================================
    login_manager.login_view = 'auth.login'  # Ruta de login por defecto
    login_manager.login_message = 'Por favor inicia sesión para acceder a esta página.'
    login_manager.login_message_category = 'info'

    # ===================================
    # CONTEXT PROCESSOR PARA TEMPLATES
    # ===================================
    
    @app.context_processor
    def inject_user():
        """Hacer current_user disponible en todos los templates"""
        from flask_login import current_user
        return {'current_user': current_user}

    # ===================================
    # CONFIGURACIÓN BÁSICA DE BASE DE DATOS
    # ===================================
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pruebabbdd.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False    
    database.init_app(app)

    
    # ===================================
    # USER LOADER PARA FLASK-LOGIN
    # ===================================
    
    @login_manager.user_loader
    def load_user(user_id):
        # Importar aquí para evitar circular imports
        try:
            from app.models import Usuario
            return Usuario.query.get(int(user_id))
        except Exception as e:
            print(f"Error en user_loader: {e}")
            return None
    
    # ===================================
    # CREACIÓN DE TABLAS DE BASE DE DATOS
    # ===================================
    
    with app.app_context():
        try:
            # Importar modelos para crear las tablas
            from app.models import Usuario, Categoria, Producto, Carrito, Carrito_detalle, cargarAdmin, cargarTipoUsuario, cargarCliente, cargarCategoriaProductos, cargarProductos
            
            database.create_all()
            print("Tablas de base de datos creadas correctamente")
            
            #primero se carga los tipos y categorias para evitar errores de llave foranea
            cargarTipoUsuario()
            cargarCategoriaProductos()

            # Cargar productos
            cargarProductos()
            # Cargar usuario administrador después de crear las tablas
            cargarAdmin()
            
            # Cargar usuario cliente de prueba
            cargarCliente()

            
        except Exception as e:
            print(f"Error creando tablas: {e}")
    
    # ===================================
    # REGISTRO DE BLUEPRINTS
    # ===================================
    
    # Importar todos los blueprints
    from .blueprints import ALL_BLUEPRINTS
    
    # Registrar cada blueprint en la aplicación
    for blueprint in ALL_BLUEPRINTS:
        app.register_blueprint(blueprint)
    
    # ===================================
    # MANEJADORES DE ERRORES
    # ===================================
    
    @app.errorhandler(404)
    def not_found(error):
        return "Página no encontrada - CleanSA", 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return "Error interno del servidor - CleanSA", 500
    
    return app














