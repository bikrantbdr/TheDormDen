import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import { FaSearch } from "react-icons/fa";
import { useFetch } from '../hooks/useFetch';

const Container = styled.div`
    width: fit-content;
    background-color: red;
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 16px 20px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    position: relative;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #fff;

    &>label {
        color: #fffffff5;
    }
    

    &>input, &>span {
        height: 30px;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.1);
        border: 1.5px solid #fff;
        border-radius: 5px;
        outline: none;
        color: #fff;

        ::placeholder {
            color: #fff8;
          }
    }

    &>span {
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`

const Button = styled.button`
    height: 35px;
    padding: 8px 16px;
    border: none;
    background-color: #D179FF;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    @media (max-width: 768px) {
        width: 100%
    }
`

const SeatersOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: #fff;
    padding: 8px 0px;
    border-radius: 5px;
    position: absolute;
    top: 72px;
    left: 240px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    &>div {
        padding: 8px 16px;
    }

    &>div:hover {
        background-color: lightgray;
    }

    @media (max-width: 768px) {
        top: 150px;
        left: 20px;
    }
`

const LocationOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: #fff;
    padding: 8px 0px;
    border-radius: 5px;
    position: absolute;
    top: 72px;
    right: 160px;
    z-index: 20;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    &>div {
        padding: 8px 16px;
    }

    &>div:hover {
        background-color: lightgray;
    }

    @media (max-width: 768px) {
        top: 220px;
        right: 25px;    
    }
`
const LocationOption = styled.div`
    padding: 8px 16px;
`

function SearchBar() {
    const [openSearchOptions, setOpenSearchOptions] = useState(false)
    const [openLocationOptions, setOpenLocationOptions] = useState(false)

    const [name, setName] = useState('')
    const [options, setOptions] = useState('any')
    const [location, setLocation] = useState('')
    const [destination, setDestination] = useState({
        longitude: null,
        latitude: null
    })

    const [res, setRes] = useState('')

    useEffect(() => {
        const API_KEY = '769f09ef503a44d1bcb4218675c23b0c'
        if (location.length > 0) {
            axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=${API_KEY}`).then( (res) => {
                setRes(res.data)
        })
        } else {
            console.log("location length is not maximum dude")
        }
    }, [location])

    const handleDestination = (address) => {
        setDestination({ longitude: address.properties.lon, latitude: address.properties.lat })
        console.log(destination)
        setLocation(address.properties.formatted)
        setOpenLocationOptions(false)
    }

    const navigate = useNavigate()
    const handleSearch = () => {
        navigate('/hostels', { state: { name, options, location, destination}})
    }

  return (
    <Container>
        <Content>
            <label>Hostel Name</label>
            <input type="text" placeholder='Does it have a name?' value={name} onChange={ (e) => setName(e.target.value)} />
        </Content>

        <Content>
            <label>Seaters</label>
            <span onClick={ () => setOpenSearchOptions(!openSearchOptions)}>{options}</span>
        </Content>
        {openSearchOptions && <SeatersOptions>
            <div onClick={ () => setOptions('any')}>Any</div>
            <div onClick={ () => setOptions('one')}>One Seater</div>
            <div onClick={ () => setOptions('two')}>Two Seater</div>
            <div onClick={ () => setOptions('three')}>Three Seater</div>
            <div onClick={ () => setOptions('four')}>Four Seater</div>
        </SeatersOptions>}

        <Content>
            <label>Location</label>
            <input type="text" placeholder='Where are you staying?' 
            onClick={ () => setOpenLocationOptions(!openLocationOptions)}
            onBlur={ () => setTimeout(() => setOpenLocationOptions(false), 500) } 
            value={ location } onChange={ (e) => setLocation(e.target.value) } />
        </Content>
        {openLocationOptions && (location.length > 0) &&
        <LocationOptions>
            { res ? res.features.map((address) => (
                <LocationOption key={address.properties.place_id} onClick={ () => handleDestination(address) }>{address.properties.formatted}</LocationOption>
            )) : <LocationOption>Loading</LocationOption>
        }
        </LocationOptions>}

        <Button onClick={ handleSearch }><FaSearch /> Search</Button>
    </Container>
  )
}

export default SearchBar