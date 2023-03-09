import React,{useState} from 'react'
import styled from 'styled-components'
import HostelImageSection from '../Components/HostelImageSection'

import background from '../assets/background.png'
import HostelDetails from './../Components/HostelDetails';
import MailList from './../Components/MailList';
import CustomerReview from '../Components/CustomerReview'
import { useFetch } from './../hooks/useFetch';
import { useParams } from 'react-router-dom'
import {Helmet} from "react-helmet";
import NavAndSidebar from '../Components/NavAndSidebar'
import { proxy } from '../assets/proxy';

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
  width: 80%;

  @media (max-width: 768px) {
    flex-direction: column;
  }

`

const HostelIndividualPage = () => {
    const hostelId = useParams().id
    const { data, loading, error } = useFetch(`${proxy}/api/hostels/${hostelId}`)

    const [images,setImages] = useState([background,background,background,background,background])
    const [longitude,setLongitude] = useState(85.32046340409931)
    const [latitude,setLatitude] = useState(27.694582657545205)
  return (
    <>
    <Helmet>
        <title>{`Dorm | ${data.name}`}</title>
        <meta name="description" content="Get the detail descriptions of all the hostels inside kathmandu valley with genuine and verified reviews from actual students" />
    </Helmet>
    <NavAndSidebar />
    <Container>
    {loading ? "loading please wait" : <><HostelImageSection images={data.images} longitude={longitude} latitude={latitude}/>
    <DetailContainer>
        <Wrapper>
          <HostelDetails hostelInfo={ data }/>
          {/* reviews ra hostel_rating backend bata pass garna parxa */}
          {console.log(data)}
          <CustomerReview overallRating={data.hostel_rating} hostelInfo={ data }/>
        </Wrapper>
      </DetailContainer>
      <MailList />
    </>
    }
    </Container>
    </>


  )
}

export default HostelIndividualPage