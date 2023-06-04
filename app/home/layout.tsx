"use client"

import Navbar from "@/src/components/navbar"
import styled from "styled-components"

const Body = styled.main`
  margin: 0 10px;
`

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Navbar />
      <Body>
        {children}
      </Body>
    </div>
  )
}