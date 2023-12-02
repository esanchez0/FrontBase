import httpCliente from "../servicios/HttpCliente";
import axios from "axios";

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
    httpCliente.post("/Usuario/registrar", usuario).then((response) => {
      resolve(response);
    });
    // .catch((error) => {
    //   resolve(error.response);
    // });
  });
};

export const ObtenerUsuarioActual = () => {
  return new Promise((resolve, eject) => {
    httpCliente.get("/Usuario").then((response) => {
      // if (response.data && response.data.imagenPerfil) {
      //   let fotoPerfil = response.data.imagenPerfil;
      //   const nuevoFile =
      //     "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
      //   response.data.imagenPerfil = nuevoFile;
      // }

      // dispatch({
      //   type: "INICIAR_SESION",
      //   sesion: response.data,
      //   autenticado: true,
      // });
      resolve(response);
    });
    // .catch((error) => {
    //   console.log("error actualizar aqui", error);
    //   resolve(error);
    // })
    // .catch((error) => {
    //   resolve(error.response);
    // });
  });
};

export const ActualizarUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    httpCliente.put("/Usuario", usuario).then((response) => {
      // if(response.data && response.data.imagenPerfil){
      //   let fotoPerfil = response.data.imagenPerfil;
      //   const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
      //   response.data.imagenPerfil = nuevoFile;
      // }

      // dispatch({
      //   type : 'INICIAR_SESION',
      //   sesion : response.data,
      //   autenticado : true,
      // });

      resolve(response);
    });
    // .catch(error => {
    //   resolve(error.response);
    // })
  });
};

export const loginUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    httpCliente.post("/Usuario/login", usuario).then((response) => {
      resolve(response);
    });
  });
};
