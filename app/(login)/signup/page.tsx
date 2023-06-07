"use client"
import { useState } from "react"
// import { auth } from "@/src/firebaseConfig"
// import { createUserWithEmailAndPassword } from "firebase/auth"
// import { SignInWithGoogleButton } from "@/src/components/auth/authButtons"
// import ErrorText from "@/src/components/errorText"
import Link from "next/link"

export default function Page() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ repeatPassword, setRepeatPassword ] = useState("")
    const [ valid, setValid ] = useState(false)
    const [ errortext, setErrortext] = useState("")

    const checkPassword = () => {
        if (password === repeatPassword) {
            setValid(true)
        }
        else {
            setValid(false)
        }
    }

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
        checkPassword();

        if (repeatPassword.length > 0 && !valid) {
            setErrortext("Passwords don't match")
        }
    }

    const handleRepeatPasswordChange = (e: any) => {
        setRepeatPassword(e.target.value)
        checkPassword()

        if (!valid) {
            setErrortext("Passwords don't match")
        }
    }
    /*
    const signUp = (e: any) => {
        e.preventDefault();

        if (!valid) {
            return false;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                // add user to firestore
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // alert user
            })
    }
    
    <form onSubmit={signUp}>
                <input type="email" name="email" id="email" value={email} />
                <input type="password" name="password" id="password" value={password} />
                <input type="password" name="repeat" id="repeat" value={password} />

                <SignInWithGoogleButton />

                {valid ? <ErrorText text={errortext} /> : null}
                <input type="submit" value="Sign up" />
            </form>
            */

    return (
        <main>
            
            <p>Already have an account? <Link href="/login">Login instead</Link></p>
        </main>
    )
}