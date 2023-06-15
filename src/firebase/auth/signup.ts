import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function signUp(email: string, password: string) {
    let result,
        error;
    
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create document in Firestore in 'users' collection
        await setDoc(doc(db, "users", result.user.uid), {
            email: email,
            // Add other details you want to keep
        });
        console.log("user added to db")
    }
    catch (e) {
        error = e;
    }

    return { result, error };
}