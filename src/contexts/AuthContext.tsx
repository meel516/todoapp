import { createContext } from "react";

export const AuthContext =createContext()


export const AuthContextProvider = (children)=> (
    <AuthContext.Provider value={}>
        {children}
    </AuthContext.Provider>

)