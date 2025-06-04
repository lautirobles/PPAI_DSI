import {
  EventoSismico,
  Estado,
  CambioEstado,
  Sismografo,
  EstacionSismologica,
  SerieTemporal,
  MuestraSismica,
  DetalleMuestraSismica,
  TipoDeDato,
  Empleado,
  Usuario,
  Sesion,
  AlcanceSismico,
  OrigenDeGeneracion,
  ClasificacionSismo
} from './index.jsx';


const empleado = new Empleado("García", "juan.garcia@mail.com", "Juan", "3511234567");
const usuario = new Usuario("jgarcia", "1234", "juan.garcia@mail.com", empleado);
const sesion = new Sesion("2024-05-25 08:00", null, usuario);

const tipoDatoMagnitud = new TipoDeDato("Magnitud", "Richter", 6.0);
const tipoDatoProfundidad = new TipoDeDato("Profundidad", "km", 70);

const detalleMagnitud = new DetalleMuestraSismica(5.2, tipoDatoMagnitud);
const detalleProfundidad = new DetalleMuestraSismica(60, tipoDatoProfundidad);

const muestra1 = new MuestraSismica("2018-09-12 12:30", [detalleMagnitud, detalleProfundidad]);
const muestra2 = new MuestraSismica("2025-03-12 13:30", [detalleMagnitud]);
const muestra3 = new MuestraSismica("2017-05-25 14:30", [detalleMagnitud, detalleProfundidad]);
const muestra4 = new MuestraSismica("2004-12-02 15:30", [detalleMagnitud]);
const muestra5 = new MuestraSismica("2024-05-04 16:30", [detalleMagnitud, detalleProfundidad]);
const muestra6 = new MuestraSismica("2013-05-25 17:30", [detalleMagnitud]);
const muestra7 = new MuestraSismica("2024-06-28 18:30", [detalleMagnitud, detalleProfundidad]);
const muestra8 = new MuestraSismica("2006-05-30 19:30", [detalleMagnitud]);
const muestra9 = new MuestraSismica("2000-08-06 20:30", [detalleMagnitud, detalleProfundidad]);
const muestra10 = new MuestraSismica("2022-05-25 21:30", [detalleMagnitud]);
const muestra11 = new MuestraSismica("2023-11-15 10:30", [detalleMagnitud, detalleProfundidad]);
const muestra12 = new MuestraSismica("2024-02-20 05:10", [detalleMagnitud, detalleProfundidad]);
const muestra13 = new MuestraSismica("2023-08-03 23:45", [detalleMagnitud, detalleProfundidad]);
const muestra14 = new MuestraSismica("2024-04-12 16:00", [detalleMagnitud, detalleProfundidad]);
const muestra15 = new MuestraSismica("2023-12-25 08:20", [detalleMagnitud, detalleProfundidad]);
const muestra16 = new MuestraSismica("2001-04-15 03:20", [detalleMagnitud, detalleProfundidad]); 
const muestra17 = new MuestraSismica("2005-11-22 14:10", [detalleMagnitud, detalleProfundidad]); 
const muestra18 = new MuestraSismica("2010-07-09 09:45", [detalleMagnitud, detalleProfundidad]); 
const muestra19 = new MuestraSismica("2012-02-28 21:30", [detalleMagnitud, detalleProfundidad]); 
const muestra20 = new MuestraSismica("2015-09-13 06:05", [detalleMagnitud, detalleProfundidad]); 
const muestra21 = new MuestraSismica("2018-12-01 17:55", [detalleMagnitud, detalleProfundidad]); 
const muestra22 = new MuestraSismica("2020-03-18 12:40", [detalleMagnitud, detalleProfundidad]); 
const muestra23 = new MuestraSismica("2022-08-27 04:25", [detalleMagnitud, detalleProfundidad]); 
const muestra24 = new MuestraSismica("2023-01-05 19:15", [detalleMagnitud, detalleProfundidad]); 
const muestra25 = new MuestraSismica("2025-06-11 23:50", [detalleMagnitud, detalleProfundidad]);

const estacion1 = new EstacionSismologica("EST001", "DOC123", "2024-05-20", -31.4, -64.2, "Estación Central", "CERT001");
const estacion2 = new EstacionSismologica("EST002", "DOC456", "2022-05-18", -35.0, -66.6, "Estación Sur", "CERT002");



const serieTemporal = new SerieTemporal([muestra1, muestra2], "2020-01-01");
const serieTemporal2 = new SerieTemporal([muestra3, muestra4, muestra5], "2021-11-07");
const serieTemporal3 = new SerieTemporal([muestra6, muestra7, muestra8, muestra9, muestra10, muestra11, muestra12, muestra13, muestra14, muestra15, muestra16, muestra17, muestra18, muestra19, muestra20, muestra21, muestra22, muestra23], "2022-03-07");


const sismografos= [
  new Sismografo("2022-01-01", "SISMO001", "SN12345", estacion1, [serieTemporal]),
  new Sismografo("2022-02-01", "SISMO002", "SN67", estacion2, [serieTemporal2]),
  new Sismografo("2022-03-01", "SISMO003", "SN89", estacion1, [serieTemporal3])
]



const clasificacion = new ClasificacionSismo(0, 70, "Superficial");
const origen = new OrigenDeGeneracion("Generado en un volcan", "Volcánico");
const alcance = new AlcanceSismico("Afecta zona urbana", "Local");

const estados = [
    new Estado("AutoDetectado", "EvSismico"),
    new Estado("BloqEnRevision", "EvSismico"),
    new Estado("Rechazado", "EvSismico"),
    new Estado("Confirmado", "EvSismico"),
    new Estado("Revision Experto", "EvSismico"),
    new Estado("Solicitar revision a experto", "EvSismico")
]

const cambioEstado1 = new CambioEstado("2024-05-25 12:30", null, null, estados[0]);
const cambioEstado2 = new CambioEstado("2024-05-25 12:30", null, null, estados[1]);

const eventosEjemplo = [
  new EventoSismico("2018-09-12 12:40", "2018-09-12 12:30", -31.4, -64.2, -32.1, -65.1, 5.2, serieTemporal, clasificacion, 5.2, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2025-03-12 13:40", "2025-03-12 13:30", -31.5, -64.3, -32.2, -65.2, 5.2, serieTemporal, clasificacion, 5.2, origen, alcance, estados[1], cambioEstado2),
  new EventoSismico("2017-05-25 14:40", "2017-05-25 14:30", -31.6, -64.4, -32.3, -65.3, 5.2, serieTemporal2, clasificacion, 5.2, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2004-12-02 15:40", "2004-12-02 15:30", -31.7, -64.5, -32.4, -65.4, 5.2, serieTemporal2, clasificacion, 5.2, origen, alcance, estados[1], cambioEstado2),
  new EventoSismico("2024-05-04 16:40", "2024-05-04 16:30", -31.8, -64.6, -32.5, -65.5, 5.2, serieTemporal2, clasificacion, 5.2, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2013-05-25 17:40", "2013-05-25 17:30", -31.9, -64.7, -32.6, -65.6, 5.2, serieTemporal3, clasificacion, 5.2, origen, alcance, estados[1], cambioEstado2),
  new EventoSismico("2024-06-28 18:40", "2024-06-28 18:30", -32.0, -64.8, -32.7, -65.7, 5.2, serieTemporal3, clasificacion, 5.2, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2006-05-30 19:40", "2006-05-30 19:30", -32.1, -64.9, -32.8, -65.8, 5.2, serieTemporal3, clasificacion, 5.2, origen, alcance, estados[1], cambioEstado2),
  new EventoSismico("2000-08-06 20:40", "2000-08-06 20:30", -32.2, -65.0, -32.9, -65.9, 5.2, serieTemporal3, clasificacion, 5.2, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2022-05-25 21:40", "2022-05-25 21:30", -32.3, -65.1, -33.0, -66.0, 5.2, serieTemporal3, clasificacion, 5.2, origen, alcance, estados[1], cambioEstado2),
  new EventoSismico("2023-11-15 10:45", "2023-11-15 10:30", -30.5, -63.8, -31.0, -64.0, 6.1, serieTemporal, clasificacion, 6.1, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2024-02-20 05:20", "2024-02-20 05:10", -32.8, -65.2, -33.1, -65.5, 5.7, serieTemporal2, clasificacion, 5.7, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2023-08-03 23:55", "2023-08-03 23:45", -29.9, -62.7, -30.2, -63.0, 4.8, serieTemporal3, clasificacion, 4.8, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2024-04-12 16:10", "2024-04-12 16:00", -33.3, -66.1, -33.6, -66.4, 7.0, serieTemporal, clasificacion, 7.0, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2023-12-25 08:30", "2023-12-25 08:20", -31.7, -64.4, -32.0, -64.7, 5.5, serieTemporal2, clasificacion, 5.5, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2001-04-15 03:30", "2001-04-15 03:20", -30.2, -63.5, -31.1, -64.3, 6.3, serieTemporal3, clasificacion, 6.3, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2005-11-22 14:20", "2005-11-22 14:10", -32.0, -65.0, -32.8, -65.7, 5.7, serieTemporal3, clasificacion, 5.7, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2010-07-09 09:55", "2010-07-09 09:45", -31.7, -64.8, -32.5, -65.6, 4.9, serieTemporal3, clasificacion, 4.9, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2012-02-28 21:40", "2012-02-28 21:30", -33.1, -66.2, -33.9, -66.8, 7.2, serieTemporal3, clasificacion, 7.2, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2015-09-13 06:15", "2015-09-13 06:05", -30.8, -63.9, -31.6, -64.7, 5.5, serieTemporal3, clasificacion, 5.5, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2018-12-01 18:05", "2018-12-01 17:55", -32.4, -65.3, -33.2, -66.1, 6.8, serieTemporal3, clasificacion, 6.8, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2020-03-18 12:50", "2020-03-18 12:40", -31.2, -64.1, -32.0, -64.9, 5.1, serieTemporal3, clasificacion, 5.1, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2022-08-27 04:35", "2022-08-27 04:25", -30.6, -63.7, -31.4, -64.5, 6.0, serieTemporal3, clasificacion, 6.0, origen, alcance, estados[3], cambioEstado2),
  new EventoSismico("2023-01-05 19:25", "2023-01-05 19:15", -32.7, -65.5, -33.5, -66.3, 5.9, serieTemporal3, clasificacion, 5.9, origen, alcance, estados[0], cambioEstado1),
  new EventoSismico("2025-06-11 00:00", "2025-06-11 23:50", -31.9, -64.6, -32.7, -65.4, 7.0, serieTemporal3, clasificacion, 7.0, origen, alcance, estados[1], cambioEstado2)
];

export { estados, eventosEjemplo, sesion, sismografos }