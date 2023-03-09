import React from 'react'
import notfound from './../assets/404.png'
import NavAndSidebar from '../Components/NavAndSidebar'
import styled from 'styled-components'
import {Helmet} from "react-helmet";

const Container = styled.div`
    display: flex;
    width:100%;
    height: 100vh;
    margin: 0 auto;
    flex-direction: column;
`

const Wrapper = styled.div`
    margin-top: 1rem;
    display: flex;
    width:100%;
    height: 80vh;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
const NotFoundPage = () => {
  return (
    <Container>
      <Helmet>
        <title>Dorm den | 404</title>
        <meta name="description" content="Page not found" />
    </Helmet>
    <NavAndSidebar/>
    <Wrapper>
        <img src={notfound} alt="404" />
    </Wrapper>
    </Container>
  )
}

export default NotFoundPage