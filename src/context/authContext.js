import { createContext, useContext } from "react";

export const authContext = createContext()
export const useAuth = () =>{
    const context=useContext(authContext)

    if(!context)throw new Error('there is not provider')

    return context

}

export function AuthProvider ({children}){
    const user = {
        login: true
    }

    return (
        <authContext.Provider value={{user}}>
            {children}

        </authContext.Provider>
    )
}