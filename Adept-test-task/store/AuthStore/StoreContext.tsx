import React, { createContext, useContext } from "react";
import AuthStore from "./Store";


const authStore = new AuthStore();

export const StoreContext = createContext({
  authStore,

});

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StoreContext.Provider value={{ authStore}}>
      {children}
    </StoreContext.Provider>
  );
};

// Хук для доступа к хранилищам
export const useStore = () => useContext(StoreContext);