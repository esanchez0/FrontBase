import httpCliente from "../servicios/HttpCliente";
import axios from "axios";

//Acciones para roles
export const registrarCatalogo = (catalogo) => {
  return new Promise((resolve, eject) => {
    httpCliente
      .post("/rol/crear", catalogo)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerPerfiles = () => {
  return new Promise((resolve, eject) => {
    httpCliente
      .get("/rol/lista")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const EliminarRol = (datos) => {
  return new Promise((resolve, eject) => {
    httpCliente
      .delete("/rol/eliminar",datos)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error.response);
        resolve(error.response);
      });
  });
};

//--------------------------------------
