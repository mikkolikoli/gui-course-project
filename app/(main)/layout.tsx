"use client"
import "../globals.css"
import { useContext } from "react"
import { AuthContext } from "@/src/authContext"
import { redirect } from "next/navigation"

import Navbar from "@/src/components/navbar"
import { Container, Box, Grid } from "@mui/material"
import styled from "styled-components"

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

      <Box
        component="main"
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        {children}
      </Box>
    </div>
  )
}
