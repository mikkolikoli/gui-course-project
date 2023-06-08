"use client"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import signIn from "@/src/firebase/auth/signin"

import { Stack, TextField, Button } from "@mui/material"

export default function Login() {
    // const router = useRouter()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState(false)
    const [ errorText, setErrorText ] = useState("")

    const handleEmailChange = (e: any) => setEmail(e.target.value)
    const handlePasswordChange = (e: any) => setPassword(e.target.value)

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        alert("Successfully signed in")
        // router.push("/")
        // const { result, error } = await signIn(email, password)
        /*
        if (!error) {
            router.push("/")
        }
        */
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
            <Stack 
                component="form" 
                direction="column" 
                alignItems="center"
                justifyContent="center"
                spacing={2} 
                onSubmit={handleSubmit}
            >
                <TextField
                    error={error}
                    type="email"
                    label="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    helperText={errorText}  />
                <TextField
                    error={error}
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    helperText={errorText} />

                <Button
                    variant="contained"
                    type="submit"
                >
                    Login
                </Button>
            </Stack>

            <p>or <Link href="/signup">sign up</Link></p>
        </Stack>
    )
}