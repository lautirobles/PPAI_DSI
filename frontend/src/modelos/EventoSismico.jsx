import { Estado } from './Estado';
import { CambioEstado } from './CambioEstado';

export class EventoSismico {
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
            // cambiar lo del id
            id: this.fechaHoraOcurrencia, 
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
        const datosSerie = this.serieTemporal
        ? this.serieTemporal.obtenerMuestras()
        : { muestras: [], fechaHoraRegistro: null, codigoEstacion: null }
        return{
            ...datosSerie,
            alcanceNombre: this.alcance.getNombre(),
            origenNombre: this.origenGeneracion.getNombre(),
            clasificacionNombre: this.clasificacion.getNombre()
        };
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
