import httpCliente from "../servicios/HttpCliente";
import axios from "axios";


export const Registrar = (data) => {
    return new Promise((resolve, eject) => {
      httpCliente
        .post("/CumpleAnios", data)
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
      httpCliente.get("/CumpleAnios").then((response) => {
        resolve(response);
      });
    });
  };

  export const Eliminar = (id) => {
    return new Promise((resolve, eject) => {
      httpCliente.delete("/CumpleAnios?id" + id).then((response) => {
        resolve(response);
      });
    });
  };