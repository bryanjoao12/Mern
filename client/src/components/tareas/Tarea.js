import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

// Componentes material -ui

import {
  ListItem,
  Typography,
  Button,
  Paper,
  Box,
  ButtonGroup,
  Chip,
} from "@material-ui/core";

// iconos material ui
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";

// Implementacion de Estilos Material-UI

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    display: "flex",

    alignItems: "center",
  },
  title: {
    flexGrow: 1,
  },
  botogroup: {
    flexGrow: 1,
  },
  colorsucees: {
    background: "#388e3c",
    color: "#fff",
  },
  colordanger: {
    background: "#d32f2f",
    color: "#fff",
    "&:hover": {
      background: "#f44336",
    },
  },
}));

const Tarea = ({ tarea }) => {
  const classes = useStyles();
  const {
    eliminarTarea,
    obtenerTareas,
    actualizarTarea,
    guardarTareaActual,
  } = useContext(tareaContext);
  const { proyecto } = useContext(proyectoContext);

  const [proyectoActual] = proyecto;
  // Funcion eliminar tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  // Funcion cambia estado
  const cambiarEstadoTarea = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);

 
  };
  // Guardar tarea actual

  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };
  return (
    <ListItem>
      <Paper elevation={2} className={classes.paper}>
        <Box p={1} className={classes.title}>
          <Typography variant="subtitle2" color="initial">
            {tarea.nombre}
          </Typography>
        </Box>
        {tarea.estado ? (
          <Box p={1}>
            <Chip
              size="small"
              label="Completo"
              clickable
              onClick={() => cambiarEstadoTarea(tarea)}
              deleteIcon={<DoneIcon />}
              className={classes.colorsucees}
              color="primary"
            />
          </Box>
        ) : (
          <Box p={1}>
            <Chip
              size="small"
              label="Incompleto"
              onClick={() => cambiarEstadoTarea(tarea)}
              className={classes.colordanger}
            />
          </Box>
        )}

        <ButtonGroup variant="text" color="primary">
          <Button aria-label="delete" onClick={() => tareaEliminar(tarea._id)}>
            <DeleteIcon />
          </Button>
          <Button aria-label="edit" onClick={() => seleccionarTarea(tarea)}>
            <EditIcon />
          </Button>
        </ButtonGroup>
      </Paper>
    </ListItem>
  );
};

export default Tarea;
