"use client"
import { createContext } from "react";

export const AuthContext = createContext({user: null})

export function AuthContextProvider({children, value}: {children: React.ReactNode, value: any}) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}