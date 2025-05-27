import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function VisualizarMapa({ evento, show, onHide, gestor, onEstadoActualizado, handleFinCU }) {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);

  // Estados para campos modificables
  const [magnitud, setMagnitud] = useState('');
  const [alcance, setAlcance] = useState('');
  const [origen, setOrigen] = useState('');
  const [mostrarFinCU, setMostrarFinCU] = useState(false);


  // Cargar datos del gestor
  const opciones = gestor.crearOpciones();

  // Cargar datos del evento al iniciar
  useEffect(() => {
    if (evento) {
      setMagnitud(evento.valorMagnitud || '');
      setAlcance(evento.alcance.getNombre() || '');
      setOrigen(evento.origenGeneracion.getNombre() || '');
    }
  }, [evento]);

  // Controladores de modales
  const handleClose = () => onHide();

  const handleSecondClose = () => setShowSecondModal(false);

  
  const handleNoClick = () => {
    onHide();
    if(gestor.habilitarModificacionEvento()) setShowSecondModal(true); 
  };

  // Cuando rechazas la modificación (cerrar el segundo modal)
  const handleModificacion = (bool) => {
    setShowSecondModal(false);
    gestor.tomarModificacion(bool);
    setShowThirdModal(true); // abrir tercer modal con opciones
  };

  // Cuando confirmas/modificas o cierras tercer modal
  const handleThirdClose = () => setShowThirdModal(false);

  // Manejar selección de opción en tercer modal
  const handleOptionSelect = (option) => {
    gestor.obtenerFechaYHoraActual();
    gestor.actualizarEstado(option);
    onEstadoActualizado();
    console.log(`Opción seleccionada: ${option}`);
    setShowThirdModal(false);
    setMostrarFinCU(true);
  };

  if(!evento) return null;

  return (
    <>

      {/* Primer modal */}
      <Modal show={show} onHide={onHide} >
        <Modal.Header closeButton>
          <Modal.Title>Datos del evento sismico seleccionado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Alcance: {evento.alcance.getNombre()}</p>
            <p>Clasificacion: {evento.clasificacion.getNombre()}</p>
            <p>Origen: {evento.origenGeneracion.getNombre()}</p>
          </div>
          <hr />
          <div>
            <h5>Desea visualizar en un mapa el evento sísmico y las estaciones sismológicas involucradas?</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleNoClick}>
            No
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Segundo modal */}
      <Modal show={showSecondModal} onHide={handleSecondClose}>
        <Modal.Header closeButton>
          <Modal.Title>¿Desea modificar datos del evento?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modificación de los siguientes datos del evento sísmico:</p>
          <form id="formModificarEvento">
            <div className="mb-3">
              <label htmlFor="magnitud" className="form-label">Magnitud</label>
              <input
                type="number"
                className="form-control"
                id="magnitud"
                name="magnitud"
                step="0.1"
                value={magnitud}
                onChange={(e) => setMagnitud(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="alcance" className="form-label">Alcance</label>
              <select
                className="form-select"
                id="alcance"
                name="alcance"
                value={alcance}
                onChange={(e) => setAlcance(e.target.value)}
                required
              >
                <option value="">Seleccione alcance</option>
                <option value="Local">Local</option>
                <option value="Regional">Regional</option>
                <option value="Global">Global</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="origen" className="form-label">Origen de generación</label>
              <select
                className="form-select"
                id="origen"
                name="origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                required
              >
                <option value="">Seleccione origen</option>
                <option value="Tectónico">Tectónico</option>
                <option value="Volcánico">Volcánico</option>
                <option value="Artificial">Artificial</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModificacion(false)}>
            Rechazar
          </Button>
          <Button variant="primary" onClick={() => handleModificacion(true)}>
            Modificar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tercer modal */}
      <Modal show={showThirdModal} onHide={handleThirdClose}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccione una acción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Seleccione una acción para el evento.</p>
          <div className="d-grid gap-2">
            {opciones.map((op, idx) =>(
              <Button 
                key={idx}
                variant="outline-primary"
                onClick={() => handleOptionSelect(op)}
              >{op}</Button>
            ))}

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleThirdClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Fin CU */}
      <Modal show={mostrarFinCU} onHide={() => setMostrarFinCU(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar resultado de revision manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Revision manual registrada correctamente</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setMostrarFinCU(false)}>
                        Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VisualizarMapa;