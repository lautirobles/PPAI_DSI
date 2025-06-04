export class SerieTemporal {
    constructor(muestrasSismicas = [],fechaHoraRegistro) {
        this.muestrasSismicas = muestrasSismicas; // array de MuestraSismica
        this.fechaHoraRegistro = fechaHoraRegistro;
    }

    obtenerMuestras(sismografos) {
        const muestras = this.muestrasSismicas.map(muestra => muestra.obtenerDatos());

        const codigo = sismografos.map(sismografo =>{
            return sismografo.sosDeSerieTemporal(this);
        })

        return {
            muestras: muestras,
            fechaHoraRegistro: this.fechaHoraRegistro,
            codigoEstacion: codigo
        };
    }
}

