// use possibly AppBar from MUI

import { Stack } from '@mui/material'
import Link from 'next/link'
import styled from 'styled-components';

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    width: 100%;
    background-color: lightgray;
  `

const NavStack = styled(Stack)`
  margin: 0 10px;
`

const NavItem = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    color: #616161;
    text-decoration: underline;
  }
`

const LogOut = styled(NavItem)`
  position: fixed;
  right: 10px;
`

export default function Navbar() {
  return (
    <Nav>
      <NavStack direction="row" spacing={3}>
        <NavItem href='/home'>Home</NavItem>
        <NavItem href='/new'>New workout</NavItem>
        <NavItem href='/view'>View workouts</NavItem>
        <LogOut href='/logout'>Log out</LogOut>
      </NavStack>
    </Nav>
  )
}