import { Link, Stack } from '@mui/material'
import styled from 'styled-components';

const Nav = styled.nav`
    height: 75px;
    width: 100%;
    background-color: gray;
  `

export default function Navbar() {
  return (
    <Nav>
      <Stack direction="row" spacing={2}>
        <Link href='/home'>Home</Link>
      </Stack>
    </Nav>
  )
}