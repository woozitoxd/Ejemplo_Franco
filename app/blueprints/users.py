"""
CleanSA - Blueprint de Usuarios
Gestión de usuarios y clientes del sistema
"""

from flask import Blueprint, render_template, request, redirect, url_for
from app.models import Usuario, database

# ===================================
# BLUEPRINT DE USUARIOS
# ===================================

users_bp = Blueprint('users', __name__, url_prefix='/admin/users')

# ===================================
# RUTAS DE USUARIOS
# ===================================

@users_bp.route('/')
def index():
    """Listar usuarios del sistema"""
    # Consultar todos los usuarios de la base de datos
    usuarios = Usuario.query.all()
    return render_template('usuarios.html', usuarios=usuarios)

@users_bp.route('/add', methods=['GET', 'POST'])
def add_user():
    """Agregar nuevo usuario al sistema"""
    if request.method == 'POST':
        # TODO: Implementar lógica para agregar usuario real a la base de datos
        pass
    
    # TODO: Implementar formulario GET
    return "Formulario para agregar usuario (por implementar)"

@users_bp.route('/<int:user_id>')
def view_user(user_id):
    """Ver detalles de un usuario específico"""
    # Buscar el usuario en la base de datos
    usuario = Usuario.query.get_or_404(user_id)
    return render_template('detalle_usuario.html', usuario=usuario)

@users_bp.route('/<int:user_id>/edit')
def edit_user(user_id):
    """Formulario para editar usuario existente"""
    # Buscar el usuario en la base de datos
    usuario = Usuario.query.get_or_404(user_id)
    return render_template('editar_usuario.html', usuario=usuario)

@users_bp.route('/panel')
def panel():
    """Panel administrativo de usuarios con funcionalidades CRUD"""
    # Consultar todos los usuarios de la base de datos
    usuarios = Usuario.query.all()
    return render_template('panel_usuarios.html', usuarios=usuarios)

@users_bp.route('/perfil')
def perfil():
    """Vista de perfil personal del usuario logueado"""
    return render_template('perfil_usuarios.html')


@users_bp.route('/carrito')
def carrito():
    """Vista del carrito de compras del usuario"""
    return render_template('carrito.html')