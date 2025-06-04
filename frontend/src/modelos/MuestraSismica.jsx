export  class MuestraSismica {
    constructor(fechaHoraMuestra, detallesMuestraSismica = []) {
        this.fechaHoraMuestra = fechaHoraMuestra;
        this.detallesMuestraSismica = detallesMuestraSismica; // array de DetalleMuestraSismica
    }

    obtenerDetalleMuestra() {
        return this.detallesMuestraSismica.map(detalle => detalle.getDatos());
    }

    obtenerDatos() {
        return {
            fechaHoraMuestra: this.fechaHoraMuestra,
            detalles: this.obtenerDetalleMuestra()
        };
    }
}

