import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { User, UserConverter } from "../firestore/objects";

export default async function signUp(email: string, password: string) {
    let result,
        error;
    
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create document in Firestore in 'users' collection
        
        const ref = doc(db, "users", result.user.uid).withConverter(UserConverter);
        await setDoc(ref, new User(email))
    }
    catch (e) {
        error = e;
        console.log(e)
    }

    return { result, error };
}