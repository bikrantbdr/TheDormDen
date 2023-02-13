import React,{useState} from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import styled from 'styled-components'
import background from '../assets/background.png'
import HeroSection from '../Components/HeroSection'


const HomeContainer = styled.div`
    height: 120vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
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
//   overflow: hidden;
  background-size: cover;
  z-index: -1;
background-image: url(${background});
`


const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false)

  const toggle = () =>{
    setIsOpen(!isOpen);
  }
  return (
    <HomeContainer>
        <HomeBackground>
            <img src="" alt="" />
        </HomeBackground>
        <Navbar toggle={toggle} />
        <Sidebar isOpen={isOpen} toggle={toggle}/>
        <HeroSection/>
    </HomeContainer>
  )
}

export default HomePage