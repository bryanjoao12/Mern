import React, { useState, useContext,useEffect } from "react";

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

// Iconos
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

const Login = (props) => {
  // State del componente form
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });
  const { alerta, mostrarAlerta } = useContext(alertaContext);

  const { mensaje, autenticado, iniciarSesion } = useContext(authContext);


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

  //   Extraer de usuarios Destructuring

  const { email, password } = usuario;

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
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Llenar todos los campos");
      return;
    }

    // Pasarlo al action
    iniciarSesion({
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
            <FaceRoundedIcon />
          </Avatar>

          <Typography variant="h5" component="h1">
            Inicia Sesion
          </Typography>
          {alerta ? <Alert severity="error">{alerta}</Alert> : null}

          <form className={classes.form} noValidate onSubmit={EnviarFormulario}>
            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Ingrese email"
              name="email"
              autoComplete="email"
              autoFocus
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

            <Button
              className={classes.submit}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Inicia Sesion
            </Button>
          </form>
          <Link href="/register" variant="body2" className={classes.link}>
            {"¿No Posees Cuenta? Registrate"}
          </Link>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
