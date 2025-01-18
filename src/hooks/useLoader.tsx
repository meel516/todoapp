import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the loader context
type UseLoaderTypes = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create a context with the correct type
const LoaderContext = createContext<UseLoaderTypes | undefined>(undefined);

// Create a provider for the LoaderContext
export const LoaderContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Custom hook to consume the context
const useLoader = (): UseLoaderTypes => {
  const context = useContext(LoaderContext);

  // Throw an error if the hook is used outside of the provider
  if (!context) {
    throw new Error('useLoader must be used within a LoaderContextProvider');
  }

  return context;
};

export default useLoader;
