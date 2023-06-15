"use client"
import "../globals.css"
import { AuthContext } from "@/src/authContext"
import { redirect } from "next/navigation"
import { useAuthState } from 'react-firebase-hooks/auth'

import Navbar from "@/src/components/navbar"
import { Box } from "@mui/material"
import { auth } from "@/src/firebase/firebaseConfig"

export default function MainLayout({children}:{children: React.ReactNode}) {

  const [user] = useAuthState(auth)

  // redirecting user to login page if not logged in
  if (!user) {
    redirect("/login")
  }

  return (
    <AuthContext.Provider value={{user: user}}>
      <Navbar />

      <Box
        component="main"
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        {children}
      </Box>
    </AuthContext.Provider>
  )
}
