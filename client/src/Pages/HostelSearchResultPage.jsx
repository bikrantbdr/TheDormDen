import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import NavAndSidebar from '../Components/NavAndSidebar'
import FilterComponent from '../Components/FilterComponent'
import SearchResult from '../Components/SearchResult'
import { useFetch } from './../hooks/useFetch';
import SearchMap from '../Components/SearchMap'
import {Switch } from 'pretty-checkbox-react';

import {AiFillCaretDown} from 'react-icons/ai'

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
    min-height : 4rem;
    padding:1rem 0;
    justify-content: space-around;
    align-items: center;
    background-color: #e1aaf66b;
    border-radius: 10px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      border-radius: 3px;
      margin: 0 2px;
      padding: 8px;
      font-size: 0.8rem;
    }
    `
const Title = styled.span`
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      font-weight: bold;
    }
    `
const MapButtonConainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
const Button = styled.button`
    height: 1.5rem;
`

const SortBar = styled.div`
    height: 90%;
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


    const [sort, setSort] = React.useState(0);

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  
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
              <SortBar>

              <Box sx={{ minWidth: 120 }}>
                <FormControl size='small' >
                  <InputLabel id="sort">Sort</InputLabel>
                  <Select
                    labelId="sort-label"
                    id="sort"
                    value={sort}
                    label="Sort"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Popularity</MenuItem>
                    <MenuItem value={2}>Price ↑</MenuItem>
                    <MenuItem value={3}>Price ↓</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              </SortBar>
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