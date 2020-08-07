import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {

};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function actionCreator(type) {
    return (payload) => {
      dispatch({
        type,
        payload,
      });
    };
  }

  const setPage = actionCreator('SET_PAGE');

  return (
    <GlobalContext.Provider
      value={{
        // records: state.records,
        // setPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
