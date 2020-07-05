import React from "react";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListadoProyecto from "../proyectos/ListadoProyectos";

// import estilos Material Ui
import { makeStyles } from "@material-ui/core/styles";
// Import componentes material-ui
import Box from "@material-ui/core/Box";


// Implementacion de Estilos Material-UI
const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  proyectos: {
    marginTop: theme.spacing(4),
  },
}));

const Drawer = () => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.box}>
      <h1>
        {" "}
        MERN <span>STAKS</span>
      </h1>
      <NuevoProyecto />
      <div className={classes.proyectos}>
        <h2> Tus proyectos</h2>
        
        <ListadoProyecto />
      </div>
    </Box>
  );
};

export default Drawer;
