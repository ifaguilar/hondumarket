import React, { createContext, useState } from "react";

export const TermsContext = createContext(false);

export const TermsContextProvider = ({ children }) => {
  const [termsModal, setTermsModal] = useState(false);

  return (
    <TermsContext.Provider value={{ termsModal, setTermsModal }}>
      {children}
    </TermsContext.Provider>
  );
};

export default TermsContext;
