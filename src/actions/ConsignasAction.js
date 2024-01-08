import httpCliente from "../servicios/HttpCliente";
import axios from "axios";

export const Registrar = (data) => {
  return new Promise((resolve, eject) => {
    httpCliente
      .post("/Consignas/Crear", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const Obtener = () => {
  return new Promise((resolve, eject) => {
    const obj = {PaginaActual: 1, Consulta:"",FechaInicio:"",FechaFin:""};
    httpCliente.post("/Consignas/Consulta",obj).then((response) => {
      resolve(response);
    });
  });
};

export const Eliminar = (id) => {
  return new Promise((resolve, eject) => {
       httpCliente.delete("/Consignas/Eliminar/" + id).then((response) => {
      resolve(response);
    }).catch((error) => {
      console.log(error.response);
      resolve(error.response);
    });
  });
};