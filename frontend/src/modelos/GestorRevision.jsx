export class GestorRevision{
    constructor(estados, eventos, sesion){
        this.estados = estados;
        this.estadoBloq = null;
        this.sesion = sesion;
        this.eventos = eventos;
        this.eventoSelec = null;
        this.fechaHoraAct = null;
        this.datosSismicosEventoSelec = null;
        this.opciones = ['Confirmar', 'Rechazar', 'Revision Experto'];
        this.modifSeleccionada = null;
        this.accionSeleccionada = null;
        this.responsable = null;
        this.visualizarMapa = null;
    }

    buscarEventosNoRevisados(){
        let eventosNoRev = this.eventos
        .filter(evento => evento.esAutoDetectado())
        .map(evento => evento.obtenerDatosEvento());
        return this.ordenarEventos(eventosNoRev);
    }

    ordenarEventos(eventosNoRevisados){
        return [...eventosNoRevisados].sort((a, b) => {
            const fechaA = new Date(a.fechaHoraOcurrencia);
            const fechaB = new Date(b.fechaHoraOcurrencia);
            return fechaA - fechaB; // Ascendente
        });
    }

    tomarSelecEvento(evento){
        this.eventoSelec = evento;
    }

    obtenerFechaYHoraActual() {
        // Devuelve la fecha y hora actual del sistema según el reloj de la computadora
        this.fechaHoraAct = new Date();
    }

    buscarEstadoBloqEnRev(){
        this.estadoBloq = this.estados.find(e => {
            e.esAmbitoEvSismico();
            e.esBloqEnRevision();
        })
        this.bloquearEvento();
    }


    bloquearEvento(){
        this.obtenerFechaYHoraActual();
        this.eventoSelec.bloquearEvSismico(this.estadoBloq, this.fechaHoraAct);
        this.buscarDatosSismicos();
    }


    buscarDatosSismicos() {
        // Llama a buscarDatosSismicos de EventoSismico usando el evento seleccionado
        if (!this.eventoSelec) {
            throw new Error("No hay evento seleccionado");
        }
        // Obtiene los datos sismicos del evento seleccionado
        this.datosSismicosEventoSelec = this.eventoSelec.buscarDatosSismicos();

        // Formatea las muestras para que sean legibles
        const muestrasLegibles = (this.datosSismicosEventoSelec.muestras || []).map(muestra => {
            return {
                fechaHoraMuestra: muestra.fechaHoraMuestra,
                detalles: (muestra.detalles || []).map(detalle => 
                    `${detalle.denominacion}: ${detalle.valor}`
                ).join(', ')
            };
        });

        // Devuelve los datos sismicos con las muestras legibles
        return {
            ...this.datosSismicosEventoSelec,
            muestras: muestrasLegibles
        };
    }

    clasificarPorEstacion() {
        // Asegura que haya datos y que sean un array
        const series = Array.isArray(this.datosSismicosEventoSelec.muestras)
            ? this.datosSismicosEventoSelec.muestras
            : [this.datosSismicosEventoSelec.muestras];

        // Agrupa por codigoEstacion
        const agrupadas = {};
        series.forEach(serie => {
            const codigo = serie.codigoEstacion;
            if (!agrupadas[codigo]) {
                agrupadas[codigo] = [];
            }
            agrupadas[codigo].push(serie);
        });

        // Asigna el array de objetos agrupados al atributo
        this.datosSismicosXEstacion = Object.entries(agrupadas).map(([codigoEstacion, series]) => ({
        codigoEstacion,
        series
        }));
    }

    habilitarOpcionVisualizarMapa(){
        return true;
    }

    tomarSolicitud(op){
        this.visualizarMapa = op;
    }

    habilitarModificacionEvento(){
        return true;
    }

    tomarModificacion(modif){
        if(modif){
            this.modifSeleccionada = true;
        }else{
            this.modifSeleccionada = false;
        }
    }


    crearOpciones(){
        return this.opciones;
    }


    tomarAccion(opcion){
        this.opSeleccionada = opcion;
    }

    buscarOPSeleccionada(op){
        this.accionSeleccionada = this.estados.find(e => {
            e.esAmbitoEvSismico();
            e.esOpcionSeleccionada(op);
        })
    }

    validarDatosEv() {
        const alcance = this.eventoSelec.alcance.getNombre();
        const origen = this.eventoSelec.origenGeneracion.getNombre();
        const accion = this.accionSeleccionada;

        if (!this.eventoSelec) return false;
        const tieneMagnitud = this.eventoSelec.valorMagnitud !== undefined && this.eventoSelec.valorMagnitud !== null && this.eventoSelec.valorMagnitud !== '';
        const tieneAlcance = alcance !== undefined && alcance !== null && alcance !== '';
        const tieneOrigen = origen !== undefined && origen !== null && origen !== '';
        const accionValida = accion !== undefined && accion !== null && accion !== '';

        return tieneMagnitud && tieneAlcance && tieneOrigen && accionValida;
    }

    buscarResponsable(){
        this.responsable = this.sesion.conocerUsuario();
    }

    actualizarEstado(opcion){
        let fecha = this.fechaHoraAct;
        console.log(`el evento selec es: ${this.eventoSelec}`)
        if(opcion === 'Confirmar'){
            this.eventoSelec.confirmarEvento(opcion, fecha);
        }else if (opcion === 'Rechazar'){
            this.eventoSelec.rechazarEvento(opcion, fecha);
        }else if (opcion === 'Solicitar revision a experto'){
            this.eventoSelec.revisionExperto(opcion, fecha);
        }
    }


    finCU() {
        // Aquí podrías limpiar datos, resetear estados, etc.
        // Por ejemplo:
        this.eventoSelec = null;
        this.datosSismicosEventoSelec = null;
        // Retorna true para indicar que terminó el CU
        return true;
    }
}
