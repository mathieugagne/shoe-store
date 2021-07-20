import React from "react";
import { createContext, useContext } from "react";
import { useInventoryUpdates } from "./useInventoryUpdates";

const GlobalContext = createContext({});

const GlobalContextProvider = ({ children }) => {

  const [settings, setSettings] = React.useState({
    isOpenSidebar: false,
    isSocketConnected: false,
  });
  const data = useInventoryUpdates({setSettings})
  return (
    <GlobalContext.Provider value={{ settings, setSettings, data }}>
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within an GlobalContextProvider"
    );
  }

  return context;
}

export { GlobalContextProvider, useGlobalContext };
