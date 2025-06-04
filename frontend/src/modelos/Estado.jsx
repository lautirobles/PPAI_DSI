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
        if(op === "Confirmar"){
            console.log(this.nombre === "Confirmado")
            return this.nombre === "Confirmado";
        } else if(op === "Rechazar"){
            return this.nombre === "Rechazado";
        }else if(op === "Solicitar revision a experto"){
            return this.nombre === "Revision Experto"
        }
    }

    getNombre() {
        return this.nombre;
    }
}

