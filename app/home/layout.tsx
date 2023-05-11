"use client"

import Navbar from "@/src/components/navbar"

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}