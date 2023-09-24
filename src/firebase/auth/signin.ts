import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function signIn(email: string, password: string) {
  let result, error;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
