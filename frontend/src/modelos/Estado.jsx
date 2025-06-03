export class Estado {
    constructor(nombre, ambito) {
        this.nombre = nombre;
        this.ambito = ambito;
    }

    esAutoDetectado() {
        return this.nombre === "AutoDetectado";
    }

    esAmbitoEvSismico() {
        return this.ambito === "EvSismico";
    }

    esBloqEnRevision() {
        return this.nombre === "BloqEnRevision";
    }

    esOpcionSeleccionada(op){
        return this.nombre === op;
    }

    getNombre() {
        return this.nombre;
    }
}

