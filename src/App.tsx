import { RouterProvider } from "react-router-dom";
import "./App.css";
import { getRoutes } from "./Routes";
import useSWR from "swr";
import { useFetch } from "./api/useFetch";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "./contexts/AuthContext";

function App() {
  const { getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);

  return <RouterProvider router={getRoutes()}></RouterProvider>;
}

export default App;
