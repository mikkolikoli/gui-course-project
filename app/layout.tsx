import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/src/authContext'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Workout app',
  description: 'An app to track your workouts',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider value={{user: {}}}>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}