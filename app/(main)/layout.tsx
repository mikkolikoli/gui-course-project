"use client"
import "../globals.css"
import { useContext } from "react"
import { AuthContext } from "@/src/authContext"
import { useRouter, redirect } from "next/navigation"

export default function MainLayout({children}:{children: React.ReactNode}) {
  const user = useContext(AuthContext)
  // const router = useRouter()

  console.log(!user)

  // redirecting user to login page if not logged in
  if (user) {
    // router.push('/login')
    redirect("/login")
  }

  return (
    <main>
      {children}
    </main>
  )
}
