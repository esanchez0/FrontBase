import httpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

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

//la promesa espera hasta la contestacion del servidor
export const registrarUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    instancia
      .post("/Usuario/registrar", usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerUsuarioActual = (dispatch) => {
  return new Promise((resolve, eject) => {
    httpCliente
      .get("/Usuario")
      .then((response) => {
        // if (response.data && response.data.imagenPerfil) {
        //   let fotoPerfil = response.data.imagenPerfil;
        //   const nuevoFile =
        //     "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
        //   response.data.imagenPerfil = nuevoFile;
        // }

        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ActualizarUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    httpCliente
      .put("/Usuario", usuario)
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });

        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const loginUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    instancia
      .post("/Usuario/login", usuario)
      .then((response) => {
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const ObtenerUsuarios = () => {
  return new Promise((resolve, eject) => {
    httpCliente.get("/Usuario/ObtenerUsuarios").then((response) => {
      resolve(response);
    });
  });
};

export const obtenerRoles = () => {
  return new Promise((resolve, eject) => {
    httpCliente.get("/Rol/lista").then((Response) => {
      resolve(Response);
    });
  });
};


export const Eliminar = (id) => {
  return new Promise((resolve, eject) => {
    //httpCliente.delete("/CumpleAnios/Eliminar").then((response) => {
       httpCliente.delete("/Usuario/Eliminar/" + id).then((response) => {
      resolve(response);
    }).catch((error) => {
      console.log(error.response);
      resolve(error.response);
    });
  });
};