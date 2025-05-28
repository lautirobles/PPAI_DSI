
class GestorRevision{
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




class EventoSismico {
    constructor(fechaHoraFin, fechaHoraOcurrencia, latitudEpicentro, longitudEpicentro, latitudHipocentro, longitudHipocentro, valorMagnitud, serieTemporal, clasificacion, magnitud, origenGeneracion, alcance, estadoActual, cambioEstado){
        this.fechaHoraFin = fechaHoraFin,
        this.fechaHoraOcurrencia = fechaHoraOcurrencia,
        this.latitudEpicentro = latitudEpicentro,
        this.longitudEpicentro = longitudEpicentro,
        this.latitudHipocentro = latitudHipocentro,
        this.longitudHipocentro = longitudHipocentro,
        this.valorMagnitud = valorMagnitud,
        this.serieTemporal = serieTemporal,
        this.clasificacion = clasificacion,
        this.magnitud = magnitud,
        this.origenGeneracion = origenGeneracion,
        this.alcance = alcance,
        this.estadoActual = estadoActual,
        this.cambioEstado = cambioEstado
    }

    esAutoDetectado(){    
        return this.estadoActual.getNombre() === 'AutoDetectado';
    }

    obtenerDatosEvento(){
        return {
            id: this.fechaHoraOcurrencia,
            fechaHoraOcurrencia: this.getFechaHoraOcurrencia(),
            latitudEpicentro: this.getLatEpi(),
            longitudEpicentro: this.getLonEpi(),
            latitudHipocentro: this.getLatHipo(),
            longitudHipocentro: this.getLonHipo(),
            valorMagnitud: this.getValorMagnitud(),
            alcance: this.alcance,
            clasificacion: this.clasificacion,
            origenGeneracion: this.origenGeneracion
        };
    }

    getFechaHoraOcurrencia(){
        return this.fechaHoraOcurrencia;
    }

    getLatEpi(){
        return this.latitudEpicentro;
    }

    getLonEpi(){
        return this.longitudEpicentro;
    }

    getLatHipo(){
        return this.latitudHipocentro;
    }

    getLonHipo(){
        return this.longitudHipocentro;
    }

    getValorMagnitud(){
        return this.valorMagnitud;
    }

    bloquearEvSismico(estadoBloq, fecha){
        this.setEstadoActual(estadoBloq);
        this.buscarCEAct(fecha);
        this.crearCE(estadoBloq, fecha);

    }
    
    setEstadoActual(estado){
        this.estadoActual = new Estado(estado);
    }

    buscarCEAct(fechaFin){
        // busca si cambio estado es un array para ver si hay que recorrer o no
        if (Array.isArray(this.cambioEstado)) {
            const ceActual = this.cambioEstado.find(ce => {ce.sosActual()});
            if (ceActual) {
                ceActual.setFechaHoraFin(fechaFin);
            }
            return ceActual || null;
        }else if(this.cambioEstado && this.cambioEstado.sosActual){
            if (this.cambioEstado.sosActual()) {
                this.cambioEstado.setFechaHoraFin(fechaFin);
                return this.cambioEstado;
            }
            return null;
        }
        return null;
    }

    crearCE(estado, fecha){
        const nuevoEstado = new CambioEstado(fecha, null, estado);
        // Si el evento ya tiene un array de cambioEstado, lo agregás:
        if (Array.isArray(this.cambioEstado)) {
            this.cambioEstado.push(nuevoEstado);
        } else if (this.cambioEstado) {
            // Si solo tiene uno, lo convertís en array
            this.cambioEstado = [this.cambioEstado, nuevoEstado];
        } else {
            // Si no tiene ninguno, creás el array
            this.cambioEstado = [nuevoEstado];
        }
    }

    buscarDatosSismicos() {
        return this.serieTemporal
        ? this.serieTemporal.obtenerMuestras()
        : { muestras: [], fechaHoraRegistro: null, codigoEstacion: null };
    }

    rechazarEvento(estadoRechazado, fecha){
        this.setEstadoActual(estadoRechazado);
        this.buscarCEAct(fecha);
        this.crearCE(estadoRechazado, fecha);
        console.log(`El estado actual es ${this.estadoActual}`);
    }

    // FLUJO ALTERNATIVO 1
    confirmarEvento(estadoConfirmado, fecha){
        this.setEstadoActual(estadoConfirmado);
        this.buscarCEAct(fecha);
        this.crearCE(estadoConfirmado, fecha);
        console.log(`El estado actual es ${this.estadoActual}`);
    }

    // FLUJO ALTERNATIVO 2
    revisionExperto(estadoRevision, fecha){
        this.setEstadoActual(estadoRevision);
        this.buscarCEAct(fecha);
        this.crearCE(estadoRevision, fecha);
        console.log(`El estado actual es ${this.estadoActual}`);
    }

}

class ClasificacionSismo {
    constructor(kmProfundidadDesde, kmProfundidadHasta, nombre){
        this.kmProfundidadDesde = kmProfundidadDesde,
        this.kmProfundidadHasta = kmProfundidadHasta,
        this.nombre = nombre
    }

    getNombre(){
        return this.nombre;
    }
}

class OrigenDeGeneracion {
    constructor(descripcion, nombre){
        this.descripcion = descripcion,
        this.nombre = nombre
    }

    getNombre(){
        return this.nombre;
    }
}


class AlcanceSismico{
    constructor(descripcion, nombre){
        this.descripcion = descripcion,
        this.nombre = nombre
    }

    getNombre(){
        return this.nombre;
    }
}


class Estado {
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

class CambioEstado {
    constructor(fechaHoraInicio, fechaHoraFin, estado) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
        this.estado = estado;
    }

    sosActual() {
        return this.fechaHoraFin == null;
    }

    setFechaHoraFin(fecha) {
        this.fechaHoraFin = fecha;
    }
}


class Sesion {
  constructor(fechaHoraAlta, fechaHoraBaja, usuario) {
    this.fechaHoraAlta = fechaHoraAlta;
    this.fechaHoraBaja = fechaHoraBaja;
    this.usuario = usuario;
  }
  conocerUsuario() {
    return this.usuario.conocerResponsable();
  }
}

class Usuario {
    constructor(nombre, contrasenia, mail, responsable) {
        this.nombre = nombre;
        this.contrasenia = contrasenia; 
        this.mail = mail;
        this.responsable = responsable;
    }

    conocerResponsable() {
        return this.responsable.getNombre();
    }
}

class Responsable {
    constructor(apellido, mail, nombre, telefono) {
        this.apellido = apellido;
        this.mail = mail;
        this.nombre = nombre;
        this.telefono = telefono;
    }

    getNombre() {
        return this.nombre;
    }
}

class TipoDeDato {
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

class DetalleMuestraSismica {
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

class MuestraSismica {
    constructor(fechaHoraMuestra, detallesMuestraSismica = []) {
        this.fechaHoraMuestra = fechaHoraMuestra;
        this.detallesMuestraSismica = detallesMuestraSismica; // array de DetalleMuestraSismica
    }

    obtenerDetalleMuestra() {
        return this.detallesMuestraSismica.map(detalle => detalle.getDatos());
    }

    obtenerDatos() {
        return {
            fechaHoraMuestra: this.fechaHoraMuestra,
            detalles: this.obtenerDetalleMuestra()
        };
    }
}

class SerieTemporal {
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


class EstacionSismologica {
    constructor(codigoEstacion, documentoCertificadoAdq, fechaSolicitudCertificacion, latitud, longitud, nombre, nroCertificacionAdquisicion) {
        this.codigoEstacion = codigoEstacion;
        this.documentoCertificadoAdq = documentoCertificadoAdq;
        this.fechaSolicitudCertificacion = fechaSolicitudCertificacion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.nombre = nombre;
        this.nroCertificacionAdquisicion = nroCertificacionAdquisicion;

    }

    obtenerCodigoEstacion() {
        return this.codigoEstacion;
    }
}

class Sismografo {
    constructor(fechaAdquisicion, identificadorSismografo, nroSerie, EstacionSismologica) {
        this.fechaAdquisicion = fechaAdquisicion;
        this.identificadorSismografo = identificadorSismografo;
        this.nroSerie = nroSerie;
        this.EstacionSismologica = EstacionSismologica;
    }

    sosDeSerieTemporal() {
        return this.EstacionSismologica.obtenerCodigoEstacion();
    }
}


export { GestorRevision, EventoSismico, Estado, CambioEstado, Sismografo, EstacionSismologica, SerieTemporal, MuestraSismica, DetalleMuestraSismica, TipoDeDato, Responsable, Usuario, Sesion, AlcanceSismico as AlcanceSismo, OrigenDeGeneracion, ClasificacionSismo}