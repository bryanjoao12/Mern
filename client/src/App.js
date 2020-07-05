import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Importando components

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Proyectos from "./components/proyectos/Proyectos";
// Import Context
import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/tokenAuht";
import RutaPrivada from "./components/rutas/RutasPrivada";
// Revisar si tenemos un token

const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}
function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
