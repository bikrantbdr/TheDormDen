import React from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import HostelDetails from './../Components/HostelDetails';
import MailList from './../Components/MailList';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 924px;
`

const HostelIndividualPage = () => {
  return (
    <>
      <Navbar />
      <DetailContainer>
        <Wrapper>
          <HostelDetails />
          <div style={{flex: 1}}>Review Section here</div>
        </Wrapper>
      </DetailContainer>
      <MailList />
    </>
  )
}

export default HostelIndividualPage