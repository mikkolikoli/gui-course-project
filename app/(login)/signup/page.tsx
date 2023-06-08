"use client"
import { useState } from "react"

import Link from "next/link"
import { Stack, TextField, Button } from "@mui/material"

export default function Page() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ repeatPassword, setRepeatPassword ] = useState("")
    const [ error, setError ] = useState(false)
    const [ errortext, setErrortext] = useState("")

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const handleRepeatPasswordChange = (e: any) => {
        setRepeatPassword(e.target.value)
    }

    const signUpFormSubmitted = (e: any) => {}
    /*
    
    
    <form onSubmit={signUp}>
                <input type="email" name="email" id="email" value={email} />
                <input type="password" name="password" id="password" value={password} />
                <input type="password" name="repeat" id="repeat" value={password} />

                <SignInWithGoogleButton />

                {valid ? <ErrorText text={errortext} /> : null}
                <input type="submit" value="Sign up" />
            </form>

            <p>Already have an account? <Link href="/login">Login instead</Link></p>
            */

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
                    error={error}
                    helperText={errortext}
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="new-password" />
                <TextField
                    required
                    error={error}
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
            </Stack>
            <p>Already have an account? <Link href="/login">Login instead</Link></p>
        </Stack>
    )
}