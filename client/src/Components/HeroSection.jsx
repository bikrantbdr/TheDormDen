import React from 'react'
import styled from 'styled-components';
import SearchBar from './SearchBar';
 
const Container = styled.div`
    display: flex;
    justify-content: center;
`
 
const Wrapper = styled.div`
    width: 100%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin: 50px;
`
 
const HeroText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
 
    &>p {
        color: #382B2F;
    }
`
 
function HeroSection() {
  return (
    <Container>
        <Wrapper>
            <HeroText>
                <h1>Welcome to our hostel searching platform!</h1>
                <p>Search your stay with us today and experience the best of your city.</p>
            </HeroText>
            <SearchBar />
        </Wrapper>
    </Container>
  )
}
 
export default HeroSection