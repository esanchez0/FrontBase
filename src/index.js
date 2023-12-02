import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Librerias para usar el ContextApi(variables globales)
import { initialState } from "./contexto/initialState"; // variable contenedora de todas las variables
import { StateProvider } from "./contexto/store"; //almacena variables globales, suscribe a todos los componentes
import { mainReducer } from "./contexto/reducers"; //indice de los reducers, todas las variables globales, quien tiene acceso a todas esas variables

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
