import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/index";
import RootLayout from "../Layout/RootLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import BaseLayout from "../Layout/BaseLayout"; 
export const getRoutes = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />, 
      errorElement: <Error />, 
      children: [
        {
          index: true,
          element: <Login />, 
        },
        {
          path: "home",
          element: <RootLayout />, 
          children: [
            {
              index: true,
              element: <Home />, 
            },
          ],
        },
        {
          path: "*",
          element: <Error />, 
        },
      ],
    },
  ]);
};
