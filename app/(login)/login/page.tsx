"use client"
import { useState } from "react"
import Link from "next/link"
import signIn from "@/src/firebase/auth/signin"

import { Stack, TextField, Button } from "@mui/material"
import { redirect, useRouter } from "next/navigation"
import SuccessSnackBar from "@/src/components/successSnackBar"
import LoginForm from "@/src/components/LoginForm"

export default function Login() {
    const router = useRouter()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ uierror, setError ] = useState(false)
    const [ errorText, setErrorText ] = useState("")
    const [ success, setSuccess ] = useState(false)

    const handleEmailChange = (e: any) => setEmail(e.target.value)
    const handlePasswordChange = (e: any) => setPassword(e.target.value)

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        const { result, error } = await signIn(email, password)

        if (!error) {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                router.push("/")
            }, 1000)
        }
        else {
            setError(true)
            setErrorText("Incorrect email or password!")
        }
    }

    const handleSuccess = () => {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
            router.push("/")
        }, 1000)
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
            {/* 
            <Stack 
                component="form" 
                direction="column" 
                alignItems="center"
                justifyContent="center"
                spacing={2} 
                onSubmit={handleSubmit}
            >
                <TextField
                    error={uierror}
                    type="email"
                    label="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    helperText={errorText}  />
                <TextField
                    error={uierror}
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
            */}

            <LoginForm onSuccess={handleSuccess} />

            <p>or <Link href="/signup">sign up</Link></p>

            {success ? <SuccessSnackBar isOpen={true} text="Successfully signed up" />: null}
        </Stack>
    )
}