export class Responsable {
    constructor(apellido, mail, nombre, telefono) {
        this.apellido = apellido;
        this.mail = mail;
        this.nombre = nombre;
        this.telefono = telefono;
    }

    getNombre() {
        return this.nombre;
    }
}
