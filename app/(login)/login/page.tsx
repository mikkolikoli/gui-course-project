"use client"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import signIn from "@/src/firebase/auth/signin"

export default function Login() {
    // const router = useRouter()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

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