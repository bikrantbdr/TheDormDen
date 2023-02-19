import React,{useState} from 'react'
import styled from 'styled-components'
import HostelImageSection from '../Components/HostelImageSection'

import background from '../assets/background.png'
import Navbar from '../Components/Navbar'
import HostelDetails from './../Components/HostelDetails';
import MailList from './../Components/MailList';
import CustomerReview from '../Components/CustomerReview'

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
          {/* reviews ra hostel_rating backend bata pass garna parxa */}
          {/* <CustomerReview reviews={reviews} overallRating={hostel_rating} /> */}
        </Wrapper>
      </DetailContainer>
      <MailList />

    </Container>
    </>


  )
}

export default HostelIndividualPage