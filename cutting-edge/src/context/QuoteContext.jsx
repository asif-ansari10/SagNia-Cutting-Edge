import { createContext, useContext, useState } from "react";

const QuoteContext = createContext();

export function QuoteProvider({ children }) {
  const [quoteData, setQuoteData] = useState({
    projectName: "",
    brand: "",
    category: "",
    length: "",
    width: "",
    thickness: "",
    notes: "",
  });

  return (
    <QuoteContext.Provider value={{ quoteData, setQuoteData }}>
      {children}
    </QuoteContext.Provider>
  );
}

export const useQuote = () => useContext(QuoteContext);
