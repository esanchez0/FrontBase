import { useStateValue } from "../../contexto/store";
import {
  Route,
  useNavigate,
} from "react-router-dom";

function RutaSegura({ component: Component, ...rest }) {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const navigate = useNavigate();

  //Se regresara una ruta condicionada
  return (
    <Route
      {...rest} //tendra todas las caracteristicas originales que se pasa desde el parametro rest
      //Condiconamos el render, si la autentificacion es = true, se pintara la pagina que se solicito
      render={(props) =>
        sesionUsuario ? (
          sesionUsuario.autenticado == true ? (
            <Component {...props} {...rest} />
          ) : (
            navigate("/auth/login")
          )
        ) : (
          // <Redirect to="/auth/login" />
          navigate("/auth/login")
        )
      }
    />
  );
}

export default RutaSegura;
