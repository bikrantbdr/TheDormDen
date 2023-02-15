import React from 'react'
import styled from 'styled-components'
import background from '../assets/background.png'
import NavAndSidebar from '../Components/NavAndSidebar'
import HeroSection from '../Components/HeroSection'


const HomeContainer = styled.div`
    height: 120vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `
const HomeBackground = styled.div`
position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  z-index: -1;
background-image: url(${background});
`


const HomePage = () => {
  return (
    <HomeContainer>
        <HomeBackground>
            <img src="" alt="" />
        </HomeBackground>
        <NavAndSidebar/>
        <HeroSection/>
    </HomeContainer>
  )
}

export default HomePage