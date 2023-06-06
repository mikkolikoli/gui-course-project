import { LogInButton, SignInWithGoogleButton } from "@/src/components/auth/authButtons"
import { useState } from "react"
import Link from "next/link"

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    return (
        <main>
            <h1>Login</h1>

            <form>
                <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} />
                <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />

                <SignInWithGoogleButton />

                <LogInButton email={email} password={password} />
                <p>or</p>
                <button>
                    <Link href="/signup">Sign up</Link>
                </button>
            </form>
        </main>
    )
}