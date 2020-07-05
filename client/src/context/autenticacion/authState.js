import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuht";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LOGIN_EXISTOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  OBTENER_USUARIO,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      // console.log(respuesta);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      // Obtener usuario
      usuarioAuntenticado();
    } catch (error) {
      console.log(error);
      const alert = error.response.data.msg;
      dispatch({
        type: REGISTRO_ERROR,
        payload: alert,
      });
    }
  };

  //Retorna el usuario autenticado
  const usuarioAuntenticado = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      // Todo para funcion para headers

      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");

      // console.log(respuesta);

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  // Iniciar Sesiosn

  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXISTOSO,
        payload: respuesta.data,
      });
      usuarioAuntenticado();
    } catch (error) {
      console.log(error.response.data.msg);
      const alert = error.response.data.msg;
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  // Cierra la sesion de sion

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.usuario,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAuntenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
