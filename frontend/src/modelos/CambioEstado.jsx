export class CambioEstado {
    constructor(fechaHoraInicio, fechaHoraFin, empleado, estado) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
        this.empleado = empleado;
        this.estado = estado;
    }

    sosActual() {
        return this.fechaHoraFin == null;
    }

    setFechaHoraFin(fecha) {
        this.fechaHoraFin = fecha;
    }
}
