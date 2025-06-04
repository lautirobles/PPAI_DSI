export class SerieTemporal {
    constructor(muestrasSismicas = [],fechaHoraRegistro) {
        this.muestrasSismicas = muestrasSismicas; // array de MuestraSismica
        this.fechaHoraRegistro = fechaHoraRegistro;
    }

    // DEPENDENCIA CON SISMOGRAFO
    obtenerMuestras(sismografos) {
        const muestras = this.muestrasSismicas.map(muestra => muestra.obtenerDatos());
        
        const codigo = sismografos.find(sismografo => 
            sismografo.sosDeSerieTemporal(this) !== null
        )?.sosDeSerieTemporal(this) || null;


        return {
            muestras: muestras,
            fechaHoraRegistro: this.fechaHoraRegistro,
            codigoEstacion: codigo
        };
    }
}

