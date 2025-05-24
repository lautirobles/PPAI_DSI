
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

    static esAutoDetectado(){
        let eventos = []
        let estado = this.estadoActual
        if(estado.esAutoDetectado()){
            eventos.push(this);
        }
        return eventos;
    }

    obtenerDatosEvento(){
        getFechaHoraOcurrencia();
        getLatEpi();
        getLonEpi();
        getLatHipo();
        getLonHipo();
        getValorMagnitud();
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


class Estado {
    new(nombre,ambito){
        this.nombre = nombre,
        this.ambito = ambito
    }
}
class CambioEstado {
    new(fechaHoraInicio,fechaHoraFin){
        this.fechaHoraInicio = fechaHoraInicio
        this.fechaHoraFin = fechaHoraFin
    }
}

class Sismografo {
    new(fechaAdquisicion, identificadorSismografo, nroSerie) {
        this.fechaAdquisicion = fechaAdquisicion,
        this.identificadorSismografo = identificadorSismografo,
        this.nroSerie = nroSerie
    }
}


class EstacionSismologica {
    new(codigoEstacion, documentoCertificadoAdq, fechaSolicitudCertificacion, latitud, longitud, nombre, nroCertificacionAdquisicion){
        this.codigoEstacion = codigoEstacion,
        this.documentoCertificadoAdq = documentoCertificadoAdq, 
        this.fechaSolucitudCertificacion = fechaSolicitudCerticacion, 
        this.latitud = latitud, 
        this.longitud = longitud,
        this.nombre = nombre,
        this.nroCertificacionAdquisicion = nroCertificacionAdquisicion
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

class GestionRevision {
    new(eventoSismico, datosSismico) {
        this.eventoSismico = eventoSismico,
        this.datosSismico
    }
}



