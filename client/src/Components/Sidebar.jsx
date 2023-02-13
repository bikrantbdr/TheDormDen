import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #fff;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : '-100%')}; 
  
`

const CloseIcon = styled(FaTimes)`
  color: #000;
`
const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`

const SidebarWrapper = styled.div`
    height:30%;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4rem;
`
const SidebarMenu = styled.div`
  display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
`
const SidebarLink = styled(Link)`
display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.3s ease-in-out;
  text-decoration: none;
  color: #000;
  cursor: pointer;

  &:hover {
    color: #A761CC;
    transition: 0.2s ease-in-out;
  }
`
const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`
const SidebarRoute = styled(Link)`
  border-radius: 50px;
  background: #D179FF;
  white-space: nowrap;
  padding: 16px 64px;
  color: #fff;
  font-size: 16px;
  outline:  none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #A761CC;
  }
`
const Sidebar = ({isOpen,toggle}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon  onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to='/' onClick={toggle}>Home</SidebarLink>
          <SidebarLink to='/about' onClick={toggle}>About</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/'>Profile</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar