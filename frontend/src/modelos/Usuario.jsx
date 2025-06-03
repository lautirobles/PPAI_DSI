export class Usuario {
    constructor(nombre, contrasenia, mail, responsable) {
        this.nombre = nombre;
        this.contrasenia = contrasenia; 
        this.mail = mail;
        this.responsable = responsable;
    }

    conocerEmpleado() {
        return this.responsable.getNombre();
    }
}

