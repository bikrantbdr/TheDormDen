import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav``
const Logo = styled.div``
const Navlinks = styled.div``

const Navbar = () => {
  return (
    <Nav>
        <Logo>Logo</Logo>
        <Navlinks>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </Navlinks>

    </Nav>
  )
}

export default Navbar