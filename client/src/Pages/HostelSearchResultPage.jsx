import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import NavAndSidebar from '../Components/NavAndSidebar'
import FilterComponent from '../Components/FilterComponent'
import SearchResult from '../Components/SearchResult'
import { useFetch } from './../hooks/useFetch';
import SearchMap from '../Components/SearchMap'
import {Switch } from 'pretty-checkbox-react';

const Container = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 100%;
    max-width: 1024px;
    height: 85vh;
    display: flex;
    gap: 20px;
`

const ResultSection = styled.div`
    flex: 3;

    @media (max-width: 768px) {
      flex: 1
    }

    display: flex;
    flex-direction: column;
    height: 100%;
`
const SearchHeader = styled.div`
    display: flex;
    height : 3rem;
    padding:1rem 0;
    justify-content: space-around;
    align-items: center;
    background-color: #e1aaf66b;
    border-radius: 10px;
    margin-bottom: 10px;
    `
const Title = styled.span`
    font-size: 1.2rem;
    `
const MapButtonConainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
const Button = styled.button`
    height: 1.5rem;
`

function HostelSearchResultPage() {
    const location = useLocation()
    const [toggleMap, setToggleMap] = useState(false)

    const [name, setName] = useState(location.state.name)
    const [options, setOptions] = useState(location.state.options)
    const [searchLocation, setSearchLocation] = useState(location.state.location)
    const [destination, setDestination] = useState(location.state.destination)

    const [url, setUrl] = useState(`http://localhost:5000/api/hostels?name=${name}&room_types=${ options === "any" ? "one_seater,two_seater,three_seater,four_seater" : options+"_seater" }&longitude=${destination.longitude || ''}&latitude=${destination.latitude || ''}`)
    const { data, loading, error } = useFetch(url)

    const handleMap = () => {
        setToggleMap(!toggleMap)
    }
  return (
    <>
        <NavAndSidebar />
        <Container>
          <Wrapper>
          <FilterComponent setUrl={setUrl} />
          <ResultSection>  
            <SearchHeader>
              <Title> {data.length} Results Found</Title>
              <MapButtonConainer>
                Map view
                <Switch shape="fill" color="success" onChange={handleMap} />
                {/* <Button onClick={handleMap}>Map</Button> */}
              </MapButtonConainer>
            </SearchHeader>
          { loading ? "Loading text here please..." : !toggleMap &&(
              data.map((hostel, index) => (
                <SearchResult hostel={hostel} key={index}/>
              ))
          )
          }
          { loading ? "Loading text here please..." : toggleMap &&
              <SearchMap hostels={data} />       
        }
          </ResultSection>
          </Wrapper>
        </Container>
    </>
  )
}

export default HostelSearchResultPage