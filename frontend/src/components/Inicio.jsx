import React from "react";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="container text-center">
      <h1 className="mb-4 mt-5">Red Sísmica</h1>
      <Link to="/revisionManual" className="btn btn-lg btn-primary">
        <i className="bi bi-journal-check me-2"></i> Registrar Resultado de Revisión Manual
      </Link>
    </div>
  );
}

export { Inicio };
