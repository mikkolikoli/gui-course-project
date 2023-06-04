// use possibly AppBar from MUI

import { Stack, Link } from '@mui/material'
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
`

const LogOut = styled(NavItem)`
  position: fixed;
  right: 10px;
`

export default function Navbar() {
  return (
    <Nav>
      <NavStack direction="row" spacing={2}>
        <NavItem underline='hover' href='/home'>Home</NavItem>
        <NavItem underline='hover' href='/new'>New workouts</NavItem>
        <NavItem underline='hover' href='/view'>View workout</NavItem>
        <LogOut underline='hover' href='/logout'>Log out</LogOut>
      </NavStack>
    </Nav>
  )
}