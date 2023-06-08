import { auth } from "@/src/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";
import { redirect } from "next/navigation";

interface props {
    email: string,
    password: string,
    isActive?: boolean
}

export const LogInButton = ({ email, password }: props) => {
    const login = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <button onClick={login}>Login</button>
    )
}

export const SignUpButton = ({ email, password, isActive }: props) => {

    const signUp = (e: any) => {
        e.preventDefault();

        if (!isActive) {
            return;
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

    return (
        <button onClick={signUp}>Sign up</button>
    )
}

export const SignInWithGoogleButton = () => {
    const provider = new GoogleAuthProvider();

    const signInButtonClicked = (e: any) => {
        e.preventDefault();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
            })
    }
    return (
        <button onClick={signInButtonClicked}>Sign in with google</button>
    )
}

export const SignOutButton = () => {
    const signOutButtonClicked = (e: any) => {
        e.preventDefault();
        // alert user
        signOut(auth).then(
            redirect('/login')
        )
    }
    return (
        <button onClick={signOutButtonClicked}>Sign out</button>
    )
}