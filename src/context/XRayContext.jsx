import React, { createContext, useState, useContext } from 'react';

const XRayContext = createContext();

export const XRayProvider = ({ children }) => {
  const [isXRayOn, setIsXRayOn] = useState(false);
  const [activeInfo, setActiveInfo] = useState(null); // Holds the clicked section's data

  const toggleXRay = () => {
    setIsXRayOn((prev) => !prev);
    setActiveInfo(null); // Clear any open popups when turning off
  };

  return (
    <XRayContext.Provider value={{ isXRayOn, toggleXRay, activeInfo, setActiveInfo }}>
      {children}
    </XRayContext.Provider>
  );
};

export const useXRay = () => useContext(XRayContext);