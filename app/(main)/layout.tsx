"use client"
import "../globals.css"
import { useContext } from "react"
import { AuthContext } from "@/src/authContext"
import { redirect } from "next/navigation"

import Navbar from "@/src/components/navbar"
import { Container } from "@mui/material"

export default function MainLayout({children}:{children: React.ReactNode}) {
  const user = useContext(AuthContext)
  // const router = useRouter()

  // redirecting user to login page if not logged in
  if (!user) {
    // router.push('/login')
    redirect("/login")
  }

  return (
    <div>
      <Navbar />

      <Container 
        component="main"
        maxWidth="sm">
        {children}
      </Container>
    </div>
  )
}
