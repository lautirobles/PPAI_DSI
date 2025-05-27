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
  Responsable,
  Usuario,
  Sesion,
  AlcanceSismo,
  OrigenDeGeneracion,
  ClasificacionSismo
} from './index.jsx';


const responsable = new Responsable("García", "juan.garcia@mail.com", "Juan", "3511234567");
const usuario = new Usuario("jgarcia", "1234", "juan.garcia@mail.com", responsable);
const sesion = new Sesion("2024-05-25 08:00", null, usuario);

const tipoDatoMagnitud = new TipoDeDato("Magnitud", "Richter", 6.0);
const tipoDatoProfundidad = new TipoDeDato("Profundidad", "km", 70);

const detalleMagnitud = new DetalleMuestraSismica(5.2, tipoDatoMagnitud);
const detalleProfundidad = new DetalleMuestraSismica(60, tipoDatoProfundidad);

const muestra1 = new MuestraSismica("2024-05-25 12:30", [detalleMagnitud, detalleProfundidad]);
const muestra2 = new MuestraSismica("2024-05-25 13:30", [detalleMagnitud]);
const muestra3 = new MuestraSismica("2024-05-25 14:30", [detalleMagnitud, detalleProfundidad]);
const muestra4 = new MuestraSismica("2024-05-25 15:30", [detalleMagnitud]);
const muestra5 = new MuestraSismica("2024-05-25 16:30", [detalleMagnitud, detalleProfundidad]);
const muestra6 = new MuestraSismica("2024-05-25 17:30", [detalleMagnitud]);
const muestra7 = new MuestraSismica("2024-05-25 18:30", [detalleMagnitud, detalleProfundidad]);
const muestra8 = new MuestraSismica("2024-05-25 19:30", [detalleMagnitud]);
const muestra9 = new MuestraSismica("2024-05-25 20:30", [detalleMagnitud, detalleProfundidad]);
const muestra10 = new MuestraSismica("2024-05-25 21:30", [detalleMagnitud]);

const serieTemporal = new SerieTemporal([muestra1, muestra2]);
const serieTemporal2 = new SerieTemporal([muestra3, muestra4, muestra5]);
const serieTemporal3 = new SerieTemporal([muestra6, muestra7, muestra8, muestra9, muestra10]);

const estacion = new EstacionSismologica("EST001", "DOC123", "2024-05-20", -31.4, -64.2, "Estación Central", "CERT001");
const sismografo = new Sismografo("2022-01-01", "SISMO001", "SN12345");

const clasificacion = new ClasificacionSismo(0, 70, "Superficial");
const origen = new OrigenDeGeneracion("Generado en un volcan", "Volcánico");
const alcance = new AlcanceSismo("Afecta zona urbana", "Local");

const estados = [
    new Estado("AutoDetectado", "EvSismico"),
    new Estado("Manual", "EvSismico")
]

const cambioEstado = new CambioEstado("2024-05-25 12:30", null);

const eventosEjemplo = [
  new EventoSismico("2024-05-25 12:40", "2024-05-25 12:30", -31.4, -64.2, -32.1, -65.1, 5.2, serieTemporal, clasificacion, 5.2, origen, alcance, estados[0], cambioEstado),
  new EventoSismico("2024-05-25 13:40", "2024-05-25 13:30", -31.5, -64.3, -32.2, -65.2, 4.8, serieTemporal2, clasificacion, 4.8, origen, alcance, estados[1], cambioEstado),
  new EventoSismico("2024-05-25 14:40", "2024-05-25 14:30", -31.6, -64.4, -32.3, -65.3, 4.6, serieTemporal, clasificacion, 4.6, origen, alcance, estados[0], cambioEstado),
  new EventoSismico("2024-05-25 15:40", "2024-05-25 15:30", -31.7, -64.5, -32.4, -65.4, 4.9, serieTemporal2, clasificacion, 4.9, origen, alcance, estados[1], cambioEstado),
  new EventoSismico("2024-05-25 16:40", "2024-05-25 16:30", -31.8, -64.6, -32.5, -65.5, 5.1, serieTemporal3, clasificacion, 5.1, origen, alcance, estados[0], cambioEstado),
  new EventoSismico("2024-05-25 17:40", "2024-05-25 17:30", -31.9, -64.7, -32.6, -65.6, 4.7, serieTemporal, clasificacion, 4.7, origen, alcance, estados[1], cambioEstado),
  new EventoSismico("2024-05-25 18:40", "2024-05-25 18:30", -32.0, -64.8, -32.7, -65.7, 4.5, serieTemporal3, clasificacion, 4.5, origen, alcance, estados[0], cambioEstado),
  new EventoSismico("2024-05-25 19:40", "2024-05-25 19:30", -32.1, -64.9, -32.8, -65.8, 5.0, serieTemporal2, clasificacion, 5.0, origen, alcance, estados[1], cambioEstado),
  new EventoSismico("2024-05-25 20:40", "2024-05-25 20:30", -32.2, -65.0, -32.9, -65.9, 4.4, serieTemporal, clasificacion, 4.4, origen, alcance, estados[0], cambioEstado),
  new EventoSismico("2024-05-25 21:40", "2024-05-25 21:30", -32.3, -65.1, -33.0, -66.0, 4.3, serieTemporal3, clasificacion, 4.3, origen, alcance, estados[1], cambioEstado),
];

export { estados, eventosEjemplo }