import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
// Componentes material-ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
// import estilos Material Ui
import { makeStyles } from "@material-ui/core/styles";

// Implementacion de Estilos Material-UI
const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
    with: "100%",
  },
  boton: {
    marginTop: theme.spacing(2),
  },
}));

const NuevoProyecto = () => {
  const classes = useStyles();

  // ontener state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;
  //   State principal
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;
  //   Leerdatos del formulario y guadar en el state
  const LeerDatos = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Guardar Proyecto onSubmit
  const onSubmitProyectos = (e) => {
    e.preventDefault();
    // Validar proyecto
    if (nombre.trim() === "") {
      mostrarError();
      return;
    }

    // Agregar al state
    agregarProyecto(proyecto);

    // Reiniciar el form
    guardarProyecto({
      nombre: "",
    });
  };
  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={() => mostrarFormulario()}
      >
        Nuevo proyecto
      </Button>
      {formulario ? (
        <form
          onSubmit={onSubmitProyectos}
          noValidate
          autoComplete="off"
          className={classes.form}
        >
          <TextField
            type="text"
            variant="filled"
            margin="normal"
            fullWidth
            label="Nombre de proyecto"
            name="nombre"
            autoFocus
            onChange={LeerDatos}
            value={nombre}
          />
          <Button
            variant="contained"
            className={classes.boton}
            fullWidth
            type="submit"
            color="primary"
          >
            Agregar Proyecto
          </Button>
        </form>
      ) : null}

      {errorFormulario ? (
        <Alert variant="filled" severity="error" >
          Por favor Ingrese un proyecto
        </Alert>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
