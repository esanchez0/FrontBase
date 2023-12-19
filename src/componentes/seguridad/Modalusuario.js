import { React } from "react";
import { Modal, Box } from "@mui/material";
import EditarUsuario from "./EditarUsuario";
import ResetearPassword from "./ResetearPassword";

const Modalusuario = ({
  open,
  setopen,
  Information,
  municipio,
  Actualizar,
  Accion,
}) => {
  const handleOpen = () => {
    setopen(true);
  };

  const cerrarModal = () => {
    setopen(false);
  };

  let componenet;
  if (Accion === "Edicion") {
    componenet = (
      <EditarUsuario
        AtributoEsEdicion={false}
        AtributoData={Information}
        AtributoMun={municipio}
        AtributoCerrarModal={cerrarModal}
        AtributoActualizarUsuarios={Actualizar}
        AtributoAccion={Accion}
      />
    );
  } else {
    console.log("otra");
    // componenet = (
    //   <ResetearPassword AtributoData={Information} AtributoCerrarModal={cerrarModal}
    //   AtributoActualizarUsuarios={Actualizar} />
    // );
  }

  return (
    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "scroll", scrollSnapType: "y mandatory" }}
    >
      <Box>
        <div className="flex flex-col justify-center items-center  bg-gray-100 md:w-1/2 w-11/12 mx-auto snap-y">
          {componenet}
          <button
            onClick={() => setopen(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-5 mt-5  "
          >
            Cancelar
          </button>
        </div>
      </Box>
    </Modal>
  );
};
export default Modalusuario;