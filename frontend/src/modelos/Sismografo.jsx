export class Sismografo {
    constructor(fechaAdquisicion, identificadorSismografo, nroSerie, EstacionSismologica) {
        this.fechaAdquisicion = fechaAdquisicion;
        this.identificadorSismografo = identificadorSismografo;
        this.nroSerie = nroSerie;
        this.EstacionSismologica = EstacionSismologica;
    }

    sosDeSerieTemporal() {
        return this.EstacionSismologica.obtenerCodigoEstacion();
    }
}

