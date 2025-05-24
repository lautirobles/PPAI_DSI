import React from "react";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="contenedor-inicio">
      <h1>Red Sísmica</h1>
      <Link to="/revisionManual" className="btn btn-lg btn-primary">
        <i className=""></i> Registrar Resultado de Revisión Manual
      </Link>
    </div>
  );
}

export { Inicio };
