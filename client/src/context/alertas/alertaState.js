import React, { useReducer } from "react";
import alertaReducer from "./alertaReducer";
import alertaContext from "./alertaContext";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispach] = useReducer(alertaReducer, initialState);

  // Funciones

  const mostrarAlerta = (msg) => {
    dispach({
      type: MOSTRAR_ALERTA,
      payload:  msg
      
      
    });

    setTimeout(() => {
      dispach({
        type: OCULTAR_ALERTA,
      });
    }, 4000);
  };

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
      }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
