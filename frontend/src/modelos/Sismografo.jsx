export class Sismografo {
    constructor(fechaAdquisicion, identificadorSismografo, nroSerie, EstacionSismologica, series) {
        this.fechaAdquisicion = fechaAdquisicion;
        this.identificadorSismografo = identificadorSismografo;
        this.nroSerie = nroSerie;
        this.EstacionSismologica = EstacionSismologica;
        this.seriesTemporales = series;
    }

    sosDeSerieTemporal(serieTemporal) {
        if(this.seriesTemporales.includes(serieTemporal)){
            return this.EstacionSismologica.obtenerCodigoEstacion();
        }
        return null;
    }
}

