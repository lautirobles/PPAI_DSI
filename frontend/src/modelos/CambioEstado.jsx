export class CambioEstado {
    constructor(fechaHoraInicio, fechaHoraFin, estado) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
        this.estado = estado;
    }

    sosActual() {
        return this.fechaHoraFin == null;
    }

    setFechaHoraFin(fecha) {
        this.fechaHoraFin = fecha;
    }
}
