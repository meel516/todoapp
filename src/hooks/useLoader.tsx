import React, { createContext, useContext, useState, ReactNode } from "react";

type UseLoaderTypes = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoaderContext = createContext<UseLoaderTypes | undefined>(undefined);

export const LoaderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

const useLoader = (): UseLoaderTypes => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderContextProvider");
  }

  return context;
};

export default useLoader;
