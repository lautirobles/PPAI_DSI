export class ClasificacionSismo {
    constructor(kmProfundidadDesde, kmProfundidadHasta, nombre){
        this.kmProfundidadDesde = kmProfundidadDesde,
        this.kmProfundidadHasta = kmProfundidadHasta,
        this.nombre = nombre
    }

    getNombre(){
        return this.nombre;
    }
}

