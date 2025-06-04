export class SerieTemporal {
    constructor(muestrasSismicas = [],fechaHoraRegistro) {
        this.muestrasSismicas = muestrasSismicas; // array de MuestraSismica
        this.fechaHoraRegistro = fechaHoraRegistro;
    }

    obtenerMuestras() {
        return {
            muestras: this.muestrasSismicas.map(muestra => muestra.obtenerDatos()),
            fechaHoraRegistro: this.fechaHoraRegistro,
            codigoEstacion: null
        };
    }
}

