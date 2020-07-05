import React, { useState, useContext, useEffect } from "react";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/autenticacion/authContext";
// Styles css Materia-UI
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// Componentes material-ui

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Iconos
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import Alert from "@material-ui/lab/Alert";
// Estilos Css Material-UI

const Estilos = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    margin: theme.spacing(2),
  },
}));

const Register = (props) => {
  // Extraer los valores del context
  const { alerta, mostrarAlerta } = useContext(alertaContext);

  const { mensaje, autenticado, registrarUsuario } = useContext(authContext);
  // Si el usuario este autenticado y registrado
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }
    if(mensaje){
      mostrarAlerta(mensaje);
    }
       // eslint-disable-next-line
  }, [ autenticado,mensaje,props.history]);

  // State del componente form
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
    nombre: "",
    password2: "",
  });
  //   Extraer de usuarios Destructuring

  const { email, password, nombre, password2 } = usuario;

  // iniciar estilos
  const classes = Estilos();

  //   Leer Los datos del formulario
  const LeerDatos = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //   Guardar Datos en el State
  const EnviarFormulario = (e) => {
    e.preventDefault();
    // Validad campos
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios");
      return;
    }
    // Password minimo de 6 caracteres

    if (password.length < 8) {
      mostrarAlerta("Contraseña 8 caracteres minimo");
      return;
    }

    // Los 2 passwords son iguales
    if (password !== password2) {
      mostrarAlerta("Contraseñan no conciden");
      return;
    }

    // Pasarlo al action

    registrarUsuario({
      nombre,
      email,
      password,
    });
  };
  return (
    <Container maxWidth="xs" component="main">
      <CssBaseline />
      <Paper elevation={3} square={false}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SupervisedUserCircleIcon />
          </Avatar>

          <Typography variant="h5" component="h1">
            Registrate
          </Typography>
          {alerta ? <Alert severity="error">{alerta}</Alert> : null}
          <form className={classes.form} noValidate onSubmit={EnviarFormulario}>
            <TextField
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              label="Ingrese nombre"
              name="nombre"
              autoComplete="nombre"
              onChange={LeerDatos}
              value={nombre}
            />

            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Ingrese email"
              name="email"
              autoComplete="email"
              onChange={LeerDatos}
              value={email}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Ingrese Contraseña"
              type="password"
              autoComplete="current-password"
              onChange={LeerDatos}
              value={password}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password2"
              label="Confirma Contraseña "
              type="password"
              autoComplete="current-password"
              onChange={LeerDatos}
              value={password2}
            />
            <Button
              className={classes.submit}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Registrarte
            </Button>
          </form>
          <Link href="/" variant="body2" className={classes.link}>
            {"¿Posees Cuenta? Inicia Sesión"}
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default Register;
