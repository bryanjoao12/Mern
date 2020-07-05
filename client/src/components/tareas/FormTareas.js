import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

import { TextField, Button, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";

// Implementacion de Estilos Material-UI
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: theme.spacing(1),
  },
  form: {
    width: "50%",
    marginBottom: theme.spacing(3),
  },
}));

const FormTareas = () => {
  const classes = useStyles();
  // State proyectos
  const { proyecto } = useContext(proyectoContext);
  const {
    errortarea,
    tareaseleccionada,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = useContext(tareaContext);
  // State del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });
  // Effect que detecta la tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;
  // Array destructuring del proyecto actual
  const [proyectoActual] = proyecto;

  const { nombre } = tarea;
  // Leervalores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    // Si es edicion o es nueva tarea

    if (tareaseleccionada === null) {
      // agregar la nueva tarea
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    
    } else {
      actualizarTarea(tarea);
      limpiarTarea();
    }

    // obtener y filtrar las tareas del proyecto

    obtenerTareas(proyectoActual._id);
    // Reiniciar el form
    guardarTarea({
      nombre: "",
    });
  };
  return (
    <Paper elevation={3} className={classes.paper}>
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          type="text"
          variant="standard"
          fullWidth
          margin="normal"
          label="Nombre de Tarea"
          name="nombre"
          autoFocus
          autoComplete="off"
          value={nombre}
          onChange={handleChange}
        />

        <Button type="submit" fullWidth variant="contained" color="secondary">
          {tareaseleccionada ? "Editar Tarea" : "  Agregar tarea"}
        </Button>
      </form>

      {errortarea ? (
        <Alert severity="error" color="error" p={3}>
          Ingrese tarea
        </Alert>
      ) : null}
    </Paper>
  );
};

export default FormTareas;
