import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import authContext from "../../context/autenticacion/authContext";

// COMPONENTES
import DrawerRoot from "../layout/Drawer";
import ToolbarRoot from "../layout/Toolbar";
import FormTareas from "../tareas/FormTareas";
import ListadoTareas from "../tareas/ListadoTareas";
// Componentes Material-UI
import {
  AppBar,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Container,
  Grid,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

// Import componentes de styles
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Import Inconos material-ui

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Proyectos(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const { usuarioAuntenticado } = useContext(authContext);
  useEffect(() => {
    usuarioAuntenticado();
       // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <ToolbarRoot />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerRoot />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerRoot />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <FormTareas />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <ListadoTareas />
          </Grid>
        </Container>
      </main>
    </div>
  );
}

Proyectos.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Proyectos;
