"use client"
import { useState } from "react"
import Link from "next/link"

import { Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import LoginForm from "@/src/components/auth/LoginForm"

export default function Login() {
    const router = useRouter()

    const handleSuccess = () => {
        toast.success("Successfully logged in")
        router.push("/")
    }

    return (
        <Stack 
            component="section" 
            alignItems="center"
            justifyContent="center"
            direction="column" 
            spacing={2}
        >
            <h1>Login</h1>

            <LoginForm onSuccess={handleSuccess} />

            <p>or <Link href="/signup">sign up</Link></p>
        </Stack>
    )
}