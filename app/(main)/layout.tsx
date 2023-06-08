"use client"
import "../globals.css"
import { useContext } from "react"
import { AuthContext } from "@/src/authContext"
import { redirect } from "next/navigation"

import Navbar from "@/src/components/navbar"
import { Container, Box } from "@mui/material"
import styled from "styled-components"

const DarkBG = styled.div`
  background-color: black;
  color: white;
  height: 100vh;
`

export default function MainLayout({children}:{children: React.ReactNode}) {
  const user = useContext(AuthContext)
  // const router = useRouter()

  // redirecting user to login page if not logged in
  if (!user) {
    // router.push('/login')
    redirect("/login")
  }

  return (
    <DarkBG>
      <Navbar />

      <Box component="main" 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      >
        {children}
      </Box>
    </DarkBG>
  )
}
