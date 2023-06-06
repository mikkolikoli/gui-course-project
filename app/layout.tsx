import './globals.css'
import { Inter } from 'next/font/google'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../src/firebaseConfig'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Workout app',
  description: 'An app to track your workouts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      redirect('/login')
    }
  })
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
