import React, { useContext, useEffect } from "react";
import authContext from "../../context/autenticacion/authContext";

// Componentes Materia -ui
import { Box, Typography, IconButton, Tooltip } from "@material-ui/core";
// Iconos material-ui
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Toolbar = () => {
  const { usuario, usuarioAuntenticado, cerrarSesion } = useContext(
    authContext
  );
  useEffect(() => {
    usuarioAuntenticado();
       // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          {usuario ? (
            <Typography variant="overline" component="h6" color="initial">
              Bienvenido <span> {usuario.nombre}</span>
            </Typography>
          ) : null}
        </Box>
        <Box>
          <Tooltip title="Cerrar Sesión">
            <IconButton onClick={() => cerrarSesion()} color="inherit">
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default Toolbar;
