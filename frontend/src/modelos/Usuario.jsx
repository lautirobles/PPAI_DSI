export class Usuario {
    constructor(nombre, contrasenia, mail, empleado) {
        this.nombre = nombre;
        this.contrasenia = contrasenia; 
        this.mail = mail;
        this.empleado = empleado;
    }

    conocerEmpleado() {
        return this.empleado.getNombre();
    }
}

