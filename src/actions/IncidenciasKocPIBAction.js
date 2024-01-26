import httpCliente from "../servicios/HttpCliente";
import axios from "axios";

// const instancia = axios.create();
// instancia.CancelToken = axios.CancelToken;
// instancia.isCancel = axios.isCancel;

// axios.interceptors.request.use(function(config) {
//   console.log('request => config ====================================');
//   console.log(config);
//   console.log('request => config ====================================');

//   // if u add new Chainable promise or other interceptor
//   // You have to return `config` inside of a rquest
//   // otherwise u will get a very confusing error
//   // and spend sometime to debug it.
//   return config;
// }, function(error) {
//   console.log("error",error);
//   return Promise.reject(error);
// });


export const Registrar = (data) => {
  return new Promise((resolve, eject) => {
    httpCliente
      .post("/IncidenciaKocPIB", data)
      .then((response) => {
        resolve(response);
      }) 
      .catch(error => {
        resolve(error.response);
      });
      // .catch((error) => {
      //   console.log(error);
      //   resolve(error.response);
      // });
  });
};

export const Obtener = () => {
  return new Promise((resolve, eject) => {
    httpCliente.get("/IncidenciaKocPIB").then((response) => {
      resolve(response);
    });
  });
};

export const Eliminar = (id) => {
  return new Promise((resolve, eject) => {
    //httpCliente.delete("/CumpleAnios/Eliminar").then((response) => {
       httpCliente.delete("/IncidenciaKocPIB/Eliminar/" + id).then((response) => {
      resolve(response);
    }).catch((error) => {
      console.log(error.response);
      resolve(error.response);
    });
  });
};