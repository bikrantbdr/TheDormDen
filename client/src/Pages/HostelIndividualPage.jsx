import React,{useState} from 'react'
import styled from 'styled-components'
import HostelImageSection from '../Components/HostelImageSection'

import background from '../assets/background.png'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`


const HostelIndividualPage = () => {
    const [images,setImages] = useState([background,background,background,background,background])
    const [longitude,setLongitude] = useState(85.32046340409931)
    const [latitude,setLatitude] = useState(27.694582657545205)
  return (
    <Container>
        <HostelImageSection images={images} longitude={longitude} latitude={latitude}/>
    </Container>
  )
}

export default HostelIndividualPage