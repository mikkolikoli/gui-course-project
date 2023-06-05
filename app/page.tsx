import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../src/firebaseConfig'
import { redirect } from 'next/navigation'

export default function Home() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      redirect('/home')
    }
    else {
      redirect('/login')
    }
  })
}
