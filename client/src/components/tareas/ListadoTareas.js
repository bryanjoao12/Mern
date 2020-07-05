import React, { Fragment, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Tarea from "./Tarea";
// Component Material-UI
import { Typography, List, ListItem, Box, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
// Implementacion de Estilos Material-UI
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "40px",
    alignItems: "center",
  },
}));

const ListadoTareas = () => {
  const classes = useStyles();

  // State proyectos

  const { proyecto, eliminarProyecto } = useContext(proyectoContext);
  const { tareasproyecto } = useContext(tareaContext);
  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  // Array destructuring del proyecto actual
  const [proyectoActual] = proyecto;

  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  return (
    <Fragment>
      <Box className={classes.paper}>
        <Typography variant="h4" component="h4" color="initial">
          Proyecto: {proyectoActual.nombre}
        </Typography>

        <List>
          {tareasproyecto.length === 0 ? (
            <ListItem>
              <Typography variant="subtitle2" color="initial">
                No hay Tareas
              </Typography>
            </ListItem>
          ) : (
            <TransitionGroup>
              {tareasproyecto.map((tarea) => (
                <CSSTransition
                  key={tarea.id}
                  timeout={200}
                  classNames="my-node"
                >
                  <Tarea tarea={tarea} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </List>
      </Box>
      <Button
        onClick={() => eliminarProyecto(proyectoActual._id)}
        startIcon={<DeleteIcon />}
        variant="outlined"
        color="inherit"
      >
        Eliminar Proyecto
      </Button>
    </Fragment>
  );
};

export default ListadoTareas;
