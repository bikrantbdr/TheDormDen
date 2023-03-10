import React from 'react'
import styled from 'styled-components'
import background from '../assets/background.png'
import NavAndSidebar from '../Components/NavAndSidebar'
import HeroSection from '../Components/HeroSection'
import FeaturedHostels from '../Components/FeaturedHostels'
import HighestRatingHostels from './../Components/HighestRatingHostels';
import MailList from '../Components/MailList'
import {Helmet} from "react-helmet";


const HomeContainer = styled.div`
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

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  
`

const Title = styled.h1`
  width: 100%;
  max-width: 924px;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`


const HomePage = () => {
  return (
    <>
    <Helmet>
        <title>Dorm Den</title>
        <meta name="description" content="Web portal to compare and contrast different hostels around the kathmandu valley" />
    </Helmet>
      <HomeContainer>
          <HomeBackground>
              <img src="" alt="" />
          </HomeBackground>
          <NavAndSidebar/>
          <HeroSection/>
      <Container>
        <Title>Featured Hostels✨</Title>
        <FeaturedHostels />
        <Title>Hostels Guests love❤️</Title>
        <HighestRatingHostels />
      </Container>
      <MailList />
      </HomeContainer>
      
    </>
  )
}

export default HomePage