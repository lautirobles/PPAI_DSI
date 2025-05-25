import { eventosEjemplo } from './eventos'

class GestorRevision{
    constructor(estados, estadoBloq, sesion, eventos, eventoSelec){
        this.estados = null;
        this.estadoBloq = null;
        this.sesion = null;
        this.eventos = eventosEjemplo || [];
        this.eventoSelec = null
    }

    buscarEventosNoRevisados(){
        return this.eventos
        .filter(evento => evento.esAutoDetectado())
        .map(evento => evento.obtenerDatosEvento());
    }

    ordenarEventos(){
        const eventosNoRevisados = gestor.buscarEventosNoRevisados();
        return eventosNoRevisados.sort((a, b) => {
            const fechaA = new Date(a.fechaHoraOcurrencia);
            const fechaB = new Date(b.fechaHoraOcurrencia);
            return fechaA - fechaB; // Ascendente
        });
    }

    tomarSelecEvento(evento){
        this.eventoSelec = evento;
    }

    buscarEstadoBloqEnRev(){
        this.estadoBloq = this.estados.filter(e => {
            e.esAmbitoEvSismico();
            e.esBloqEnRevision();
        })
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
            fechaHoraOcurrencia: this.getFechaHoraOcurrencia(),
            latitudEpicentro: this.getLatEpi(),
            longitudEpicentro: this.getLonEpi(),
            latitudHipocentro: this.getLatHipo(),
            longitudHipocentro: this.getLonHipo(),
            valorMagnitud: this.getValorMagnitud()
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


class AlcanceSismo{
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

    transicionaDeBloqEnRev() {
        return this.nombre === "BloqEnRevision";
    }

    getNombre() {
        return this.nombre;
    }
}

class CambioEstado {
    constructor(fechaHoraInicio, fechaHoraFin) {
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
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
    return this.usuario;
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
        return this.responsable;
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
    constructor(muestrasSismicas = []) {
        this.muestrasSismicas = muestrasSismicas; // array de MuestraSismica
    }

    obtenerMuestras() {
        return this.muestrasSismicas.map(muestra => muestra.obtenerDatos());
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
    constructor(fechaAdquisicion, identificadorSismografo, nroSerie) {
        this.fechaAdquisicion = fechaAdquisicion;
        this.identificadorSismografo = identificadorSismografo;
        this.nroSerie = nroSerie;
    }

    sosDeSerieTemporal() {
        return true; 
    }
}


export { GestorRevision, EventoSismico, Estado, CambioEstado, Sismografo, EstacionSismologica, SerieTemporal, MuestraSismica, DetalleMuestraSismica, TipoDeDato, Responsable, Usuario, Sesion, AlcanceSismo, OrigenDeGeneracion, ClasificacionSismo}