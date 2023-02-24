import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import NavAndSidebar from '../Components/NavAndSidebar'
import FilterComponent from '../Components/FilterComponent'
import SearchResult from '../Components/SearchResult'
import { useFetch } from './../hooks/useFetch';

const Container = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 100%;
    max-width: 1024px;
    display: flex;
    gap: 20px;
`

const ResultSection = styled.div`
    flex: 3;

    @media (max-width: 768px) {
      flex: 1
    }
`

function HostelSearchResultPage() {
    const location = useLocation()

    const [name, setName] = useState(location.state.name)
    const [options, setOptions] = useState(location.state.options)
    const [searchLocation, setSearchLocation] = useState(location.state.location)
    const [destination, setDestination] = useState(location.state.destination)

    const [url, setUrl] = useState(`http://localhost:5000/api/hostels?name=${name}&room_types=${ options === "any" ? "one_seater,two_seater,three_seater,four_seater" : options+"_seater" }&longitude=${destination.longitude || ''}&latitude=${destination.latitude || ''}`)
    const { data, loading, error } = useFetch(url)

  return (
    <>
        <NavAndSidebar />
        <Container>
          <Wrapper>
          <FilterComponent setUrl={setUrl} />
          <ResultSection>  
          { loading ? "Loading text here please..." : (
              data.map((hostel, index) => (
                <SearchResult hostel={hostel} key={index}/>
              ))
          )}
          </ResultSection>
          </Wrapper>
        </Container>
    </>
  )
}

export default HostelSearchResultPage