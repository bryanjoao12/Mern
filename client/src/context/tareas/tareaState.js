import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import clienteAxios from "../../config/axios";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREAS,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,

  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  //   Dispach para ejecutar acciones
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Obtener tareas
  const obtenerTareas = async (proyecto) => {
    try {
      const respuesta = await clienteAxios.get("/api/tareas", {
        params: { proyecto},
      });
      console.log(respuesta);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: respuesta.data.tareas,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //   AGREGAR TAREAS
  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea);
      console.log(resultado);
      dispatch({
        type: AGREGAR_TAREAS,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //    vALIDA Y MUESTRA UN ERRO
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  // Eliminar tarea

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ACTUALIZAR TAREA
  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      console.log(resultado);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // EXTRAER TAREA ACTUAL
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  // LIMPIAR TAREA

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };
  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
