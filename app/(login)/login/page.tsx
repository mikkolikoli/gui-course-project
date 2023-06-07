"use client"
import { redirect } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import signIn from "@/src/firebase/auth/signin"

export default async function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const { result, error } = await signIn(email, password)
        redirect('/')
    }

    return (
        <main>
            <h1>Login</h1>

            <form name="Login" onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} required />
                <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} required />

                <button type="submit">Log in</button>
            </form>
            <p>or</p>
            <button>
                <Link href="/signup">Sign up</Link>
            </button>
            
        </main>
    )
}