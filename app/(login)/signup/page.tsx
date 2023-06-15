"use client"
import { useState } from "react"

import Link from "next/link"
import { Stack, TextField, Button } from "@mui/material"

import signUp from "@/src/firebase/auth/signup"
import SuccessSnackBar from "@/src/components/successSnackBar"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter();

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ repeatPassword, setRepeatPassword ] = useState("")
    const [ uiError, setUiError ] = useState(false)
    const [ errortext, setErrortext] = useState("")
    const [ snackbarOpen, setSnackbarOpen ] = useState(false);

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const handleRepeatPasswordChange = (e: any) => {
        setRepeatPassword(e.target.value)
    }

    const signUpFormSubmitted = async (e: any) => {
        e.preventDefault()

        if (password !== repeatPassword) {
            setUiError(true)
            setErrortext("Passwords don't match")
        }
        else {
            setUiError(false)
            setErrortext("")
        }

        if (!uiError) {
            const { result, error } = await signUp(email, password)

            if (error) {
                setUiError(true)
                setErrortext("Email already in use")
            }
            else {
                setSnackbarOpen(true)
                setTimeout(() => {
                    setSnackbarOpen(false)
                    router.push("/login"); // redirect to "/login" after showing the snackbar
                }, 1000);
            }
        }
    }

    return (
        <Stack 
            component="section" 
            alignItems="center"
            justifyContent="center"
            direction="column" 
            spacing={2}
        >
            <h1>Sign up</h1>
            <Stack 
                component="form" 
                direction="column" 
                alignItems="center"
                justifyContent="center"
                spacing={2} 
                onSubmit={signUpFormSubmitted}
            >
                <TextField
                    required
                    type="email"
                    label="E-mail"
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="username" />
                <TextField
                    required
                    error={uiError}
                    helperText={errortext}
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="new-password" />
                <TextField
                    required
                    error={uiError}
                    helperText={errortext}
                    type="password"
                    label="Repeat password"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    autoComplete="new-password" />

                <Button
                    variant="contained"
                    type="submit"
                >
                    Sign up
                </Button>

                {snackbarOpen ? <SuccessSnackBar isOpen={true} text="Successfully signed up" />: null}
            </Stack>
            <p>Already have an account? <Link href="/login">Login instead</Link></p>
        </Stack>
    )
}