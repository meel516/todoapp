import { RouterProvider } from "react-router-dom";
import "./App.css"
import { getRoutes } from "./Routes";

function App() {


 return <RouterProvider router={getRoutes()} ></RouterProvider>
}

export default App;
