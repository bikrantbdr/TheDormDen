import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import logo from '../assets/Logo.svg'

const Nav = styled.nav`
    background: ${({scrollNav}) => (scrollNav ? '#fff' : '#eeeeee6e')};
    height: 10vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding:  32px 10% 32px 10%;
    align-items: center;
    position: sticky;
    top:0;
    z-index:10;
    transition: 0.8s all ease;
`
const LogoDiv = styled(Link)`
    cursor: pointer;

`
const Navlinks = styled.div`
width:30%;
display:flex;
  justify-content: center;
  list-style: none;
  text-align: center;
//   margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

 const NavLink = styled(Link)`
    color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover{
    transition: all 0.2s ease-in-out;
    color:#A761CC;
  }
`
const MobileIcon = styled.div`
  display: none;
  
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

const Navbar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false)
    const changeNav = () => {
        // console.log(window.scrollY)
        if(window.scrollY >= 20) {
        setScrollNav(true)
        } else {
        setScrollNav(false)
        }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])


  return (
    <Nav scrollNav={scrollNav}>
        <LogoDiv to="/" >
            <img src={logo} alt="logo" />
        </LogoDiv>
        <Navlinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </Navlinks>
        <MobileIcon onClick={toggle}>
                    <FaBars/>
        </MobileIcon>

    </Nav>
  )
}

export default Navbar