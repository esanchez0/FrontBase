// import { Navigate, Outlet } from "react-router-dom";
// import { useStateValue } from "../../contexto/store";


// const ProtectedRoute = (children) => {
//     const [{ sesionUsuario }, dispatch] = useStateValue();
//     const redirectTo ="/auth/login";

//     if (!sesionUsuario) {
//         return <Navigate to={redirectTo} replace />;
//       }
    
//       return children ? children : <Outlet />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

 const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/auth/login",
  children
}) => {
  if (!isAllowed) {
    return React.createElement(Navigate, { to: redirectTo, replace: true });
  }

  return children ? children : React.createElement(Outlet, null);
};

export default ProtectedRoute;