import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import NavAndSidebar from '../Components/NavAndSidebar'
import FilterComponent from '../Components/FilterComponent'
import SearchResult from '../Components/SearchResult'
import { useFetch } from './../hooks/useFetch';

const Container = styled.div``

function HostelSearchResultPage() {
    const location = useLocation()

    const [name, setName] = useState(location.state.name)
    const [options, setOptions] = useState(location.state.options)
    const [destination, setDestination] = useState(location.state.destination)

  return (
    <>
        <NavAndSidebar />
        <Container>
          <FilterComponent />
          <SearchResult />
        </Container>
    </>
  )
}

export default HostelSearchResultPage