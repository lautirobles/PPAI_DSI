import { estados, eventosEjemplo, sesion } from '../modelos/eventos'; 
import { GestorRevision } from '../modelos/index';
import { useEffect, useState, useRef } from 'react';
import React from 'react'
import VisualizarMapa from './Visualizar';

    function RevisionManual(){
        const gestorRef = useRef(new GestorRevision(estados, eventosEjemplo, sesion));
        const gestor = gestorRef.current;
        const [eventos, setEventos] = useState([]);
        const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
        const [mostrarModal, setMostrarModal] = useState(false);

        const handleRevisar = (eventoPlano) => {
            const eventoInstancia = gestor.eventos.find(
                ev => ev.fechaHoraOcurrencia === eventoPlano.fechaHoraOcurrencia
            );
            gestor.tomarSelecEvento(eventoInstancia);
            gestor.buscarEstadoBloqEnRev();
            if (gestor.habilitarOpcionVisualizarMapa()) {
                setEventoSeleccionado(eventoInstancia);
                setMostrarModal(true);
            }
        };

        const handleEstadoActualizado = () => {
            setEventos(gestor.buscarEventosNoRevisados());
            setMostrarModal(false);
        };

        useEffect(() => {
            setEventos(gestor.buscarEventosNoRevisados());
        }, []);

        const handleFinCU = () => {
            gestor.finCU();
            setMostrarFinCU(true);
        }

        return(
            <div className='container'>
                <h1 className='mb-4'>Eventos sismicos auto detectados</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Fecha y Hora</th>
                            <th>Latitud Epicentro</th>
                            <th>Longitud Epicentro</th>
                            <th>Latitud Hipocentro</th>
                            <th>Longitud Hipocentro</th>
                            <th>Magnitud</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map((evento, idx) => (
                            <tr key={idx}>
                                <td>{evento.fechaHoraOcurrencia}</td>
                                <td>{evento.latitudEpicentro}</td>
                                <td>{evento.longitudEpicentro}</td>
                                <td>{evento.latitudHipocentro}</td>
                                <td>{evento.longitudHipocentro}</td>
                                <td>{evento.valorMagnitud}</td>
                                <td>
                                    { <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={()=> handleRevisar(evento)}>
                                        Revisar
                                    </button> }
                                    {/* <VisualizarMapa evento={evento}/> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
                
                <VisualizarMapa
                    evento={eventoSeleccionado}
                    show={mostrarModal}
                    onHide={() => setMostrarModal(false)}
                    gestor={gestor}
                    onEstadoActualizado={handleEstadoActualizado}
                    finCU={handleFinCU}
                />

            </div>
        );  
    }

    export { RevisionManual };
