"""
CleanSA - Blueprint de Autenticación
Rutas para gestionar login y autenticación del sistema
"""
from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from app.models import Usuario, database, bcrypt

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


# ===================================
# RUTAS DE AUTENTICACIÓN
# ===================================



@auth_bp.route('/')
def index():
    return render_template('login.html')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Página de login"""
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        
        # Buscar el usuario en la base de datos
        user = Usuario.query.filter_by(nombre=username).first()
        
        if user:
            print(f"DEBUG: Usuario encontrado - ID: {user.id}, Nombre: {user.nombre}")
            # Verificar la contraseña
            password_check = bcrypt.check_password_hash(user.password, password)
            print(f"DEBUG: Verificación de contraseña: {password_check}")
            
            if password_check:
                login_user(user)
                print(f"DEBUG: Login exitoso para usuario {user.nombre}")
                return redirect(url_for('main.home'))
            else:
                print(f"DEBUG: Contraseña incorrecta para usuario {user.nombre}")
                return render_template('login.html', error="Contraseña incorrecta")
        else:
            print(f"DEBUG: Usuario no encontrado: {username}")
            return render_template('login.html', error="Usuario no encontrado")
    return render_template('login.html')


@auth_bp.route('/singin', methods=['GET', 'POST'])
def singin():
    """Página de registro de nuevo usuario"""
    if request.method == "POST":
        # Obtener datos del formulario
        username = request.form.get('username')
        apellido = request.form.get('apellido')
        dni = request.form.get('dni')
        direccion = request.form.get('direccion')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        terms = request.form.get('terms')
        tipo_usuario = request.form.get('tipo_usuario')  # 'particular' o 'empresa'
        
        # Validaciones
        if not all([username, apellido, dni, direccion, password, confirm_password]):
            return render_template('singin.html', error="Todos los campos son obligatorios")
        
        if password != confirm_password:
            return render_template('singin.html', error="Las contraseñas no coinciden")
        
        if not terms:
            return render_template('singin.html', error="Debes aceptar los términos y condiciones")
        
        if not tipo_usuario:
            return render_template('singin.html', error="Debes seleccionar el tipo de usuario")
        
        # Validar DNI
        try:
            dni_int = int(dni)
            if dni_int < 1000000 or dni_int > 99999999:
                return render_template('singin.html', error="El DNI debe tener entre 7 y 8 dígitos")
        except ValueError:
            return render_template('singin.html', error="El DNI debe ser un número válido")
        
        # Verificar si el usuario ya existe
        existing_user = Usuario.query.filter_by(nombre=username).first()
        if existing_user:
            return render_template('singin.html', error="El nombre de usuario ya existe")
        
        # Verificar si el DNI ya existe
        existing_dni = Usuario.query.filter_by(dni=dni_int).first()
        if existing_dni:
            return render_template('singin.html', error="Ya existe un usuario registrado con este DNI")
        
        # Hash de la contraseña
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        
        # Determinar el tipo de usuario (True = Empresa, False = Particular)
        es_empresa = True if tipo_usuario == 'empresa' else False
        
        # Crear nuevo usuario tipo cliente
        new_user = Usuario(
            nombre=username,
            apellido=apellido,
            password=hashed_password,
            dni=dni_int,
            direccion=direccion,
            fk_tipousuario=2,  # 2 = Cliente (1=Admin, 2=Cliente)
            tipo=es_empresa  # True para empresa, False para particular
        )
        
        try:
            database.session.add(new_user)
            database.session.flush()  # Forzar la escritura a la base de datos
            database.session.commit()
            
            print(f"DEBUG: Usuario registrado exitosamente - ID: {new_user.id}, Nombre: {new_user.nombre}")
            
            # Mensaje de éxito y redirección al login
            return render_template('login.html', success="Registro exitoso. Ya puedes iniciar sesión con tu cuenta.")
            
        except Exception as e:
            database.session.rollback()
            print(f"ERROR al registrar usuario: {e}")  # Para debugging
            return render_template('singin.html', error="Error al registrar usuario. Inténtalo de nuevo.")
    
    return render_template('singin.html')





@auth_bp.route('/logout')
@login_required
def logout():
    """Cerrar sesión del usuario"""
    logout_user()
    return redirect(url_for('main.home'))



