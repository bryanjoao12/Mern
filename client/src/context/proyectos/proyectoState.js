import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import clienteAxios from "../../config/axios";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  VALIDAD_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";

const ProyectoState = (props) => {
  const initialState = {
    formulario: false,
    proyectos: [],
    errorFormulario: false,
    proyecto: null,
    mensaje: null
  };

  //   Dispach para ejecutar acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  // Obtener proyecto
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");

      dispatch({
        type: OBTENER_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = 'Hubo un eeror'
     dispatch({
       type: PROYECTO_ERROR,
       payload:  alerta
     })
    }
  };

  // Agregar Nuevo proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      console.log(resultado);

      // Insertar proyecto en el state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = 'Hubo un eeror'
      dispatch({
        type: PROYECTO_ERROR,
        payload:  alerta
      })
    }
  };

  // VALIDA EL FORMULARIO
  const mostrarError = () => {
    dispatch({
      type: VALIDAD_FORMULARIO,
    });
  };

  // Seleecciona el proyecto que el usuario dio click
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };
  // Elimina un proyecto
  const eliminarProyecto = async (proyectoid) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoid}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoid,
      });
    } catch (error) {
      const alerta = 'Hubo un eeror'
     dispatch({
       type: PROYECTO_ERROR,
       payload:  alerta
     })
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
