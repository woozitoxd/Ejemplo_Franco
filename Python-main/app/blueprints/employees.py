"""
CleanSA - Blueprint de Empleados
Gestión del personal de CleanSA
"""

from flask import Blueprint, render_template
# from ..database import get_all_employees, get_employee_by_id

# ===================================
# BLUEPRINT DE EMPLEADOS
# ===================================

employees_bp = Blueprint('employees', __name__, url_prefix='/admin/employees')

# ===================================
# RUTAS DE EMPLEADOS
# ===================================

@employees_bp.route('/')
def list_employees():
    """Listar todos los empleados de CleanSA"""
    # empleados = get_all_employees() or []
    empleados = []  # Temporal hasta implementar database
    return render_template('empleados.html', empleados=empleados)


#agregar las rutas necesarias para gestionar empleados















