export class TipoDeDato {
    constructor(denominacion, nombreUnidadMedida, valorUmbral) {
        this.denominacion = denominacion;
        this.nombreUnidadMedida = nombreUnidadMedida;
        this.valorUmbral = valorUmbral;
    }

    getDenominacion() {
        return this.denominacion;
    }

    obtenerDatos() {
        return {
            denominacion: this.getDenominacion(),
            nombreUnidadMedida: this.nombreUnidadMedida,
            valorUmbral: this.valorUmbral
        };
    }
}
