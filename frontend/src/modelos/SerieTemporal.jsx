export class SerieTemporal {
    constructor(muestrasSismicas = [],fechaHoraRegistro , Sismografo) {
        this.muestrasSismicas = muestrasSismicas; // array de MuestraSismica
        this.fechaHoraRegistro = fechaHoraRegistro;
        this.Sismografo = Sismografo;
    }

    obtenerMuestras() {
        return {
            muestras: this.muestrasSismicas.map(muestra => muestra.obtenerDatos()),
            fechaHoraRegistro: this.fechaHoraRegistro,
            codigoEstacion: this.Sismografo.sosDeSerieTemporal()
        };
    }
}

