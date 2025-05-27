import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function VisualizarMapa({ evento }) {
  const [show, setShow] = useState(true);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false);

  // Estados para campos modificables
  const [magnitud, setMagnitud] = useState('');
  const [alcance, setAlcance] = useState('');
  const [origen, setOrigen] = useState('');

  // Cargar datos del evento al iniciar
  useEffect(() => {
    if (evento) {
      setMagnitud(evento.valorMagnitud || '');
      setAlcance(evento.alcance || '');
      setOrigen(evento.origen || '');
    }
  }, [evento]);

  // Controladores de modales
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSecondClose = () => setShowSecondModal(false);

  // FALTA LA LOGICA ACA PARA QUE VAYA AL METODO DEL GESTOR HABILITARMODIFICACIONEVENTO         !!!!!!!!!!!!!!!
  const handleNoClick = () => {
    setShow(false); // cerrar primer modal
    // tomarSolicitud(setShow())
    setShowSecondModal(true); // abrir segundo modal
  };

  // Cuando rechazas la modificación (cerrar el segundo modal)
  const handleRejectModification = () => {
    setShowSecondModal(false);
    setShowThirdModal(true); // abrir tercer modal con opciones
  };

  // Cuando confirmas/modificas o cierras tercer modal
  const handleThirdClose = () => setShowThirdModal(false);

  // Manejar selección de opción en tercer modal
  const handleOptionSelect = (option) => {
    console.log(`Opción seleccionada: ${option}`);
    // Aquí puedes agregar lógica para cada opción (confirmar, rechazar, solicitar revisión)
    setShowThirdModal(false);
  };

  if(!evento) return null;

  return (
    <>

      {/* Primer modal */}
      <Modal show={show} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleRejectModification}>
            Rechazar
          </Button>
          <Button variant="primary" onClick={handleSecondClose}>
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
            <Button variant="success" onClick={() => handleOptionSelect('Confirmar evento')}>
              Confirmar evento
            </Button>
            <Button variant="danger" onClick={() => handleOptionSelect('Rechazar evento')}>
              Rechazar evento
            </Button>
            <Button variant="warning" onClick={() => handleOptionSelect('Solicitar revisión a experto')}>
              Solicitar revisión a experto
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleThirdClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VisualizarMapa;