import React,{useState} from 'react'
import styled from 'styled-components'
import HostelImageSection from '../Components/HostelImageSection'

import background from '../assets/background.png'
import Navbar from '../Components/Navbar'
import HostelDetails from './../Components/HostelDetails';
import MailList from './../Components/MailList';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 924px;
`

const HostelIndividualPage = () => {
    const [images,setImages] = useState([background,background,background,background,background])
    const [longitude,setLongitude] = useState(85.32046340409931)
    const [latitude,setLatitude] = useState(27.694582657545205)
  return (
    <>
    <Navbar />
    <Container>
    <HostelImageSection images={images} longitude={longitude} latitude={latitude}/>
    <DetailContainer>
        <Wrapper>
          <HostelDetails />
          <div style={{flex: 1}}>Review Section here</div>
        </Wrapper>
      </DetailContainer>
      <MailList />

    </Container>
    </>


  )
}

export default HostelIndividualPage