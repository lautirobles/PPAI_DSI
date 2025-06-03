export class DetalleMuestraSismica {
    constructor(valor, tipoDeDato) {
        this.valor = valor;
        this.tipoDeDato = tipoDeDato;
    }

    getDatos() {
        return {
            valor: this.valor,
            denominacion: this.tipoDeDato.getDenominacion()
        };
    }
}

