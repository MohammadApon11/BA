import React, { createContext, useContext, useState } from "react";

const UtilsContext = createContext();

export const useUtilsContext = () => useContext(UtilsContext);

export const UtilsProvider = ({ children }) => {
  const [cartUpdateFlag, setCartUpdateFlag] = useState(false);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [totalRegularPrice, setTotalRegularOrderPrice] = useState(0);
  const updateCart = () => {
    setCartUpdateFlag((prev) => !prev);
  };
  return (
    <UtilsContext.Provider
      value={{
        cartUpdateFlag,
        updateCart,
        totalOrderPrice,
        setTotalOrderPrice,
        totalRegularPrice,
        setTotalRegularOrderPrice,
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};
