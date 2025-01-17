import { createBrowserRouter } from "react-router-dom"
import {Login} from "../pages/index"
export const getRoutes =()=>{
    return createBrowserRouter([{
                path: "/",
               element:<Login/>
            }])
}