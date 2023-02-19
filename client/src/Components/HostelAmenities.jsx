import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const Amenities = styled.div`
    &>h1 {
        font-size: 1rem;
    }
`

const HostelAmenities = () => {
    
  return (
    <Container>
        <Amenities>
            <h1>Amenities we offer</h1>
        </Amenities>
    </Container>
  )
}

export default HostelAmenities