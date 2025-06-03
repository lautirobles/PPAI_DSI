export class Sesion {
  constructor(fechaHoraAlta, fechaHoraBaja, usuario) {
    this.fechaHoraAlta = fechaHoraAlta;
    this.fechaHoraBaja = fechaHoraBaja;
    this.usuario = usuario;
  }
  conocerUsuario() {
    return this.usuario.conocerResponsable();
  }
}

