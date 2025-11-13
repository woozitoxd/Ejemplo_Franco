# CleanSA - Nuevas URLs después de Modularización

## 🏗️ Estructura de URLs Actualizada

### 📍 **Rutas Principales (main_bp)**
- `GET /` → `main.home` - Página principal
- `GET /about` → `main.about` - Información de la empresa

### 👥 **Gestión de Usuarios (users_bp)**
- `GET /admin/users/` → `users.list_users` - Listar usuarios
- `POST /admin/users/add` → `users.add_user` - Agregar usuario
- `GET /admin/users/<id>` → `users.view_user` - Ver usuario específico
- `GET /admin/users/<id>/edit` → `users.edit_user` - Editar usuario

### 👔 **Gestión de Empleados (employees_bp)**
- `GET /admin/employees/` → `employees.list_employees` - Listar empleados
- `GET /admin/employees/add` → `employees.add_employee` - Agregar empleado
- `GET /admin/employees/<id>` → `employees.view_employee` - Ver empleado específico
- `GET /admin/employees/<id>/edit` → `employees.edit_employee` - Editar empleado

### 🧴 **Gestión de Productos (products_bp)**
- `GET /admin/products/` → `products.list_products` - Listar productos
- `GET /admin/products/add` → `products.add_product` - Agregar producto
- `GET /admin/products/<id>` → `products.view_product` - Ver producto específico
- `GET /admin/products/<id>/edit` → `products.edit_product` - Editar producto

### 🔧 **Panel de Administración (admin_bp)**
- `GET /admin/` → `admin.dashboard` - Dashboard principal
- `GET /admin/dashboard` → `admin.dashboard` - Dashboard principal
- `GET /admin/stats` → `admin.stats` - Estadísticas
- `GET /admin/reports` → `admin.reports` - Reportes
- `GET /admin/settings` → `admin.settings` - Configuraciones

## 📁 **Archivos Creados**

```
app/
├── blueprints/
│   ├── __init__.py         # Registro centralizado
│   ├── main.py            # Rutas principales
│   ├── admin.py           # Panel administrativo
│   ├── products.py        # Gestión de productos
│   ├── employees.py       # Gestión de empleados
│   └── users.py           # Gestión de usuarios
├── database.py            # Funciones de DB centralizadas
├── __init__.py            # Aplicación Flask actualizada
└── routes.py              # ARCHIVO ORIGINAL (mantener como backup)
```

## 🔄 **Cambios en Templates**

### Actualizaciones realizadas:
- `index.html`: URLs actualizadas para usuarios, empleados y productos
- `usuarios.html`: Formulario de agregar usuario actualizado

### URLs que cambiaron:
- `main.user` → `users.list_users`
- `main.empleados` → `employees.list_employees`
- `main.productos` → `products.list_products`
- `main.add_user` → `users.add_user`

## 🚀 **Próximos Pasos para E-commerce**

### Blueprints futuros recomendados:
1. **auth.py** - Login, registro, logout
2. **catalog.py** - Catálogo público de productos
3. **cart.py** - Carrito de compras y checkout
4. **orders.py** - Gestión de pedidos
5. **api.py** - Endpoints para AJAX

### Funcionalidades preparadas:
- ✅ Estructura modular escalable
- ✅ Base de datos centralizada
- ✅ Manejo de errores básico
- ✅ Templates actualizados
- ✅ Documentación completa

## 📝 **Notas Importantes**

1. **El archivo `routes.py` original** se mantiene como backup
2. **Todas las funcionalidades** siguen trabajando igual
3. **URLs con prefijos** `/admin/` para mejor organización
4. **Base de datos centralizada** en `database.py`
5. **Preparado para crecimiento** hacia e-commerce completo