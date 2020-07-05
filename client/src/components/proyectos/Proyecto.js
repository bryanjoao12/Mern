import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

//  Componentes material-ui

import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const Proyecto = ({ proyecto }) => {
  // Obtener  state de proyecto

  const { proyectoActual } = useContext(proyectoContext);
  const { obtenerTareas } = useContext(tareaContext);


  // Funcion que define la funcion actual

  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fijar proyecto actual

    obtenerTareas(id); //Filtrar tareas
  };

  return (
    <ListItem>
      <Button
        variant="text"
        color="default"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </Button>
      <Divider />
    </ListItem>
  );
};

export default Proyecto;
