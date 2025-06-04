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
        return this.estadoActual.esAutoDetectado();
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

    bloquearEvSismico(estadoBloq, fecha){
        this.setEstadoActual(estadoBloq);
        this.buscarCEAct(fecha);
        this.crearCE(estadoBloq, fecha, null);

    }
    
    setEstadoActual(estado){
        this.estadoActual = estado;
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

    crearCE(estado, fecha, empleado){
        const nuevoEstado = new CambioEstado(fecha, null, empleado, estado);
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

    buscarDatosSismicos(sismografos) {
        let alcance = this.alcance.getNombre();
        let origen = this.origenGeneracion.getNombre();
        let clasificacion = this.clasificacion.getNombre();
        const datosSerie = this.serieTemporal
        ? this.serieTemporal.obtenerMuestras(sismografos)
        : { muestras: [], fechaHoraRegistro: null, codigoEstacion: null }
        return{
            ...datosSerie,
            alcanceNombre: alcance,
            origenNombre: origen,
            clasificacionNombre: clasificacion 
        };
    }

    rechazarEvento(estadoRechazado, fecha){
        this.setEstadoActual(estadoRechazado);
        this.buscarCEAct(fecha);
        this.crearCE(estadoRechazado, fecha, this.empleado);
        // console.log(`El estado actual es ${this.estadoActual}`);
    }

    // FLUJO ALTERNATIVO 1
    confirmarEvento(estadoConfirmado, fecha){
        this.setEstadoActual(estadoConfirmado);
        this.buscarCEAct(fecha);
        this.crearCE(estadoConfirmado, fecha, this.empleado);
        // console.log(`El estado actual es ${this.estadoActual}`);
    }

    // FLUJO ALTERNATIVO 2
    revisionExperto(estadoRevision, fecha){
        this.setEstadoActual(estadoRevision);
        this.buscarCEAct(fecha);
        this.crearCE(estadoRevision, fecha, this.empleado);
        // console.log(`El estado actual es ${this.estadoActual}`);
    }

}
