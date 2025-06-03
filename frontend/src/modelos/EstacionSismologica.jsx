export class EstacionSismologica {
    constructor(codigoEstacion, documentoCertificadoAdq, fechaSolicitudCertificacion, latitud, longitud, nombre, nroCertificacionAdquisicion) {
        this.codigoEstacion = codigoEstacion;
        this.documentoCertificadoAdq = documentoCertificadoAdq;
        this.fechaSolicitudCertificacion = fechaSolicitudCertificacion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.nombre = nombre;
        this.nroCertificacionAdquisicion = nroCertificacionAdquisicion;

    }

    obtenerCodigoEstacion() {
        return this.codigoEstacion;
    }
}

