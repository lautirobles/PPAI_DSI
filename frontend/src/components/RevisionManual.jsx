

import React from 'react'

function RevisionManual(){



    return(
        <div className='container'>
            <h1 className='mb-4'>Eventos sísmicos auto detectados</h1>
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
                    {/* Aquí irán las filas de datos */}
                </tbody>
            </table>
        </div>
    );
}

export { RevisionManual };
