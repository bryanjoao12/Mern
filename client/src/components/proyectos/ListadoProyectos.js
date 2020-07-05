import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import alertaContext from "../../context/alertas/alertaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Alert from "@material-ui/lab/Alert";
// Componentes material ui

import List from "@material-ui/core/List";

// Styles material ui

import { makeStyles } from "@material-ui/core/styles";
// Asignacion de estilos

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
const ListadoProyectos = () => {
  const classes = useStyles();
  // Extraer proyecto del state inicial
  const { mensaje, proyectos, obtenerProyectos } = useContext(proyectoContext);
  const { alerta, mostrarAlerta } = useContext(alertaContext);

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje);
    }

    obtenerProyectos();
    //eslint-disable-next-line
  }, [mensaje]);
  // Revisar si proyecto tiene contenido
  if (!proyectos)
    return (
      <h6>
        Sin proyectos <span>Agrega uno por favor</span>
      </h6>
    );

  return (
    <List className={classes.root}>
      {alerta ? <Alert severity="error">{alerta}</Alert> : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={300} classNames="my-node">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </List>
  );
};

export default ListadoProyectos;
