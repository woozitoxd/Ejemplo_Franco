from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
# Necesitas importar Bcrypt
from flask_bcrypt import Bcrypt

# Esta instancia será inicializada desde __init__.py
database = SQLAlchemy()
bcrypt = Bcrypt()

class Usuario (database.Model, UserMixin):
    __tablename__ = 'usuarios'  
    id = database.Column(database.Integer, primary_key=True)
    nombre = database.Column(database.String(100), nullable=False)
    apellido = database.Column(database.String(100), nullable=False)
    password = database.Column(database.String(200), nullable=False)
    dni = database.Column(database.Integer, nullable=False)
    direccion = database.Column(database.String(100), nullable=False)
    fk_tipousuario = database.Column(database.Integer,database.ForeignKey('tipousuarios.id'), nullable=False)
    tipo = database.Column(database.Boolean, nullable=False)

    # Relación con TipoUsuario
    tipo_usuario = database.relationship('TipoUsuario', backref='usuarios')
    


    """"Verificación de tipo de usuario"""
    @property
    def es_admin(self):
        """Propiedad para verificar si el usuario es administrador"""
        return self.fk_tipousuario == 1


    @property
    def es_cliente(self):
        """Propiedad para verificar si el usuario es cliente"""
        return self.fk_tipousuario == 2

    @property
    def es_empresa(self):
        """Propiedad para verificar si el usuario es empresa"""
        return self.tipo == True

    @property
    def es_particular(self):
        """Propiedad para verificar si el usuario es particular"""
        return self.tipo == False

    # Métodos requeridos por Flask-Login (aunque UserMixin los proporciona, es bueno tenerlos explícitos)
    def get_id(self):
        """Método requerido por Flask-Login para obtener el ID del usuario"""
        return str(self.id)
    
    def is_authenticated(self):
        """Método requerido por Flask-Login"""
        return True
    
    def is_active(self):
        """Método requerido por Flask-Login"""
        return True
    
    def is_anonymous(self):
        """Método requerido por Flask-Login"""
        return False

    def __repr__(self):
        return f'<Usuario {self.nombre} {self.apellido}>'


class TipoUsuario (database.Model):
    __tablename__ = 'tipousuarios'  
    id = database.Column(database.Integer, primary_key=True)
    nombre = database.Column(database.String(100), nullable=False)

class Categoria (database.Model):
    __tablename__ = 'categorias'  
    id = database.Column(database.Integer, primary_key=True)
    nombre = database.Column(database.String(100), nullable=False)

class Producto (database.Model):
    __tablename__ = 'productos'  
    id = database.Column(database.Integer, primary_key=True)
    nombre = database.Column(database.String(100), nullable=False)
    precio = database.Column(database.Float, nullable=False)
    stock = database.Column(database.Integer, nullable=False)
    fk_categoria = database.Column(database.Integer,database.ForeignKey('categorias.id'), nullable=False)
    peligroso = database.Column(database.Boolean, nullable=False)

class Carrito (database.Model):
    __tablename__ = 'carritos'  
    id = database.Column(database.Integer, primary_key=True)
    fecha = database.Column(database.Date, nullable=False)
    estado = database.Column(database.String(100), nullable=False)
    total = database.Column(database.Float, nullable=False)
    codigo_envio = database.Column(database.Integer, nullable=False)
    fk_cliente = database.Column(database.Integer,database.ForeignKey('usuarios.id'), nullable=False)


class Carrito_detalle (database.Model):
    __tablename__ = 'carrito_detalles'  
    id = database.Column(database.Integer, primary_key=True)
    fk_carrito = database.Column(database.Integer,database.ForeignKey('carritos.id'), nullable=False)
    fk_producto = database.Column(database.Integer, database.ForeignKey('productos.id'), nullable=False)
    total_producto = database.Column(database.Float,nullable=False)
    cantidad = database.Column(database.Integer,nullable=False)



class Envio (database.Model):
    __tablename__ = 'envios'  
    id = database.Column(database.Integer, primary_key=True)
    fk_carrito = database.Column(database.Integer,database.ForeignKey('carritos.id'), nullable=False)
    fecha_entrega = database.Column(database.Date, nullable=False)
    direccion = database.Column(database.String(100), nullable=False)




def cargarTipoUsuario():
    ###### 1 PARA TIPO ADMINISTRADOR Y 2 PARA TIPO CLIENTE
    tipo_admin = TipoUsuario.query.filter_by(nombre='Administrador').first()
    if not tipo_admin:
        tipo_admin = TipoUsuario(
            nombre='Administrador'
        )
        try:
            database.session.add(tipo_admin) 
            database.session.commit()
        except Exception as e:
            database.session.rollback()
    
    tipo_cliente = TipoUsuario.query.filter_by(nombre='Cliente').first()
    if not tipo_cliente:
        tipo_cliente = TipoUsuario(
            nombre='Cliente'
        )
        try:
            database.session.add(tipo_cliente) 
            database.session.commit()
        except Exception as e:
            database.session.rollback()



def cargarAdmin():
    admin = Usuario.query.filter_by(nombre='franco').first()
    if not admin:
        hashed_password = Bcrypt().generate_password_hash('admin').decode('utf-8')
        admin_user = Usuario(
            nombre='franco',
            apellido='gaggero',
            password=hashed_password,
            dni=43920434,
            direccion='Francia 2461',
            fk_tipousuario=1,  # 1 = ID del tipo Administrador
            tipo=True
        )

        try:
            database.session.add(admin_user) 
            database.session.commit()
            print("✅ Usuario administrador creado: franco")
        except Exception as e:
            ## Rollback en caso de error
            database.session.rollback()
            print(f"❌ Error creando admin: {e}")


def cargarCliente():
    """Crear un usuario cliente de prueba"""
    cliente = Usuario.query.filter_by(nombre='gero').first()
    if not cliente:
        hashed_password = Bcrypt().generate_password_hash('1234').decode('utf-8')
        cliente_user = Usuario(
            nombre='gero',
            apellido='test',
            password=hashed_password,
            dni=12345678,
            direccion='Calle Falsa 123',
            fk_tipousuario=2,  # 2 = ID del tipo Cliente
            tipo=False
        )

        try:
            database.session.add(cliente_user) 
            database.session.commit()
            
        except Exception as e:
            ## Rollback en caso de error
            database.session.rollback()
            


### Carga de Productos del sistema
def cargarCategoriaProductos():
    """Crear categorías de productos de prueba"""
    categorias = ['Limpieza', 'Higiene', 'Cocina']
    categoria_ids = {}
    
    for cat_nombre in categorias:
        categoria = Categoria.query.filter_by(nombre=cat_nombre).first()
        if not categoria:
            categoria = Categoria(nombre=cat_nombre)
            try:
                database.session.add(categoria)
                database.session.commit()
                categoria_ids[cat_nombre] = categoria.id
            except Exception as e:
                print(f"❌ Error al crear categoría {cat_nombre}: {e}")
                database.session.rollback()
        else:
            categoria_ids[cat_nombre] = categoria.id
    
    return categoria_ids


def cargarProductos():
    """Crear productos de prueba para CleanSA"""
    # Obtener IDs de categorías dinámicamente
    limpieza_cat = Categoria.query.filter_by(nombre='Limpieza').first()
    higiene_cat = Categoria.query.filter_by(nombre='Higiene').first()
    
    if not limpieza_cat or not higiene_cat:
        print("❌ Error: Las categorías deben crearse antes que los productos")
        return
    
    productos = [
        {
            'nombre': 'Detergente Multiuso CleanSA', 
            'precio': 15.99, 
            'stock': 50,
            'fk_categoria': limpieza_cat.id,
            'peligroso': False
        },
        {
            'nombre': 'Desinfectante de Pisos', 
            'precio': 18.50, 
            'stock': 30,
            'fk_categoria': limpieza_cat.id,
            'peligroso': True
        },
        {
            'nombre': 'Jabón Antibacterial', 
            'precio': 8.75, 
            'stock': 100,
            'fk_categoria': higiene_cat.id,
            'peligroso': False
        },
        {
            'nombre': 'Papel Higiénico Premium', 
            'precio': 12.00, 
            'stock': 75,
            'fk_categoria': higiene_cat.id,
            'peligroso': False
        },
        {
            'nombre': 'Limpiador de Vidrios', 
            'precio': 9.99, 
            'stock': 40,
            'fk_categoria': limpieza_cat.id,
            'peligroso': False
        },
        {
            'nombre': 'Toallas de Papel', 
            'precio': 6.50, 
            'stock': 60,
            'fk_categoria': higiene_cat.id,
            'peligroso': False
        }
    ]
    
    for prod_info in productos:
        producto = Producto.query.filter_by(nombre=prod_info['nombre']).first()
        if not producto:
            producto = Producto(
                nombre=prod_info['nombre'],
                precio=prod_info['precio'],
                stock=prod_info['stock'],
                fk_categoria=prod_info['fk_categoria'],
                peligroso=prod_info['peligroso']
            )
            try:
                database.session.add(producto)
                database.session.commit()
            except Exception as e:
                print(f"❌ Error al crear producto {prod_info['nombre']}: {e}")
                database.session.rollback()
                
