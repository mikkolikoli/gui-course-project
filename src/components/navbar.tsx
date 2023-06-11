// use possibly AppBar from MUI

import { Stack, Button } from '@mui/material'
import Link from 'next/link'
import styled from 'styled-components';

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 75px;
    width: 100vw;
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

const LogOut = styled(Button)`
  position: fixed;
  right: 10px;
`

export default function Navbar() {
  return (
    <Nav>
      <NavStack direction="row" spacing={3} alignItems="center" >
        <NavItem href='/'>Home</NavItem>
        <NavItem href='/new_workout'>New workout</NavItem>
        <NavItem href='/workouts'>View workouts</NavItem>
        <NavItem href='/programmes'>Manage programmes</NavItem>
        <LogOut href="/">Log out</LogOut>
      </NavStack>
    </Nav>
  )
}