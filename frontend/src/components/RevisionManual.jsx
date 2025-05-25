import { estados, eventosEjemplo } from '../modelos/eventos'; 
import { GestorRevision } from '../modelos/index';
import { useEffect, useState } from 'react';
import React from 'react'
import VisualizarMapa from './Visualizar';

    function RevisionManual(){
        const gestor = new GestorRevision(estados, eventosEjemplo);
        const [eventos, setEventos] = useState([]);

        useEffect(() => {
            setEventos(gestor.buscarEventosNoRevisados());
        }, []);

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
                                    {/* { <button className="btn btn-primary btn-sm">Revisar</button> } */}
                                    <VisualizarMapa evento={evento}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        );
    }

    export { RevisionManual };
