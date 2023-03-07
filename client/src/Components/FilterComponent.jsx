import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import MultiRangeSlider from "react-js-multi-range-sliders";
import { useLocation } from 'react-router-dom';

const SearchSection = styled.div`
    flex: 1;
    padding: 1.5rem;
    border-radius: 10px;
    background-color: #D179FF;
    position: sticky;
    top: 65px;
    height: fit-content;

    @media (max-width: 768px) {
        display: none;
    }
`

const SearchTitle = styled.h1`
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #ffffff;
`

const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;

    &>label {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 5px;
        color: #292929;
    }

    &>input {
        height: 30px;
        border: none;
        padding: 10px;
    }

    &>span {
        height: 30px;
        background-color: #fff;
        padding: 5px;
    }
`

const ListOptions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    &>span {
        font-size: 0.8rem;
        font-weight: 600;
        color: #ffffff;
    }

    &>input {
        width: 40px;
    }
`

const LocationOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    background-color: #fff;
    padding: 8px 0px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    &>div {
        padding: 8px 16px;
    }

    &>div:hover {
        background-color: #f4f2f2;
    }

    @media (max-width: 768px) {
        top: 220px;
        right: 25px;    
    }
`

const ListPricing = styled.div`
    margin-bottom: 10px;

    & > div {
        height: 50px;
    }

    & strong, & br {
        display: none;
    }

    & .slider__left-value, & .slider__right-value {
        font-weight: bold;
        font-size: 0.8rem;
    }

    & .slider__left-value::before {
        content: "Min Rs. ";
    }

    & .slider__right-value::before {
        content: "Max Rs. ";
    }

    & .slider__range {
        background-color: #0892d0;
    }
`

const Button = styled.button`
    width: 100%;
    padding: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5rem;
    color: #fff;
    background-color: #382b2f79;

    &:hover {
        background-color: #382b2f;
    }
`

function FilterComponent({ setUrl }) {
    const location = useLocation();

    const [name, setName] = useState(location.state.name);
    const [options, setOptions] = useState(location.state.options === "any" ? ["one","two","three","four"] : [location.state.options] );
    const [locate, setLocate] = useState(location.state.location);
    const [destination, setDestination] = useState(location.state.destination);
    const [price, setPrice] = useState(null);

    const [openLocationOptions, setOpenLocationOptions] = useState(false);

    const [res, setRes] = useState('')
    useEffect(() => {
        const API_KEY = '769f09ef503a44d1bcb4218675c23b0c'
        if (locate.length > 0) {
            axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${locate}&apiKey=${API_KEY}`).then( (res) => {
                setRes(res.data)
        })
        } else {
            console.log("location length is not maximum dude")
        }
    }, [locate])
    
    const handleDestination = (address) => {
        setDestination({ longitude: address.properties.lon, latitude: address.properties.lat })
        setLocate(address.properties.formatted)
        setOpenLocationOptions(false)
    }

    const handleChange = (e) => {
        const { value, checked } = e.target;
         
        if (checked) {
          setOptions([...options, value])
          console.log(options)
        } else {
          setOptions(options.filter((e) => e !== value))
          console.log(options)
        }
      };

    const handleSearch = () => {
        const url = `http://localhost:5000/api/hostels?name=${name}&room_types=${ options.map((option) => option+"_seater" ) }&longitude=${destination.longitude}&latitude=${destination.latitude}` // &price_lower=${price.min || 0}&price_upper=${price.max || 20000}
        setUrl(url)
    }

  return (
    <SearchSection>
            <SearchTitle>Filter</SearchTitle>
            <ListItem>
                <label>Name</label>
                <input type="text" value={ name } onChange={ (e) => setName(e.target.value) }/>
            </ListItem>

            <ListItem>
                <label>Location</label>
                <input type="text" value={ locate } onClick={ () => setOpenLocationOptions(!openLocationOptions)} onChange={ (e) => setLocate(e.target.value) }/>
                {openLocationOptions && (locate.length > 0) && <LocationOptions>
                    { res ? res.features.map((address) => (
                        <div key={address.properties.place_id} onClick={ () => handleDestination(address) }>{address.properties.formatted}</div>
                    )) : "loading please await"}
                </LocationOptions>}
            </ListItem>

            <ListItem>
                <label>Pricing Range</label>
                <ListPricing>
                    <MultiRangeSlider
                        min={0}
                        max={20000}
                        onChange={({ min, max }) => setPrice({ min, max })}
                    />
                </ListPricing>
            </ListItem>

            <ListItem>
                <label>Seaters Options</label>
                <ListOptions>
                    <span>One Seater</span>
                    <input type="checkbox" value={"one"} checked={options.includes("one")} onChange={ handleChange }/>
                </ListOptions>
                <ListOptions>
                    <span>Two Seater</span>
                    <input type="checkbox" value={"two"} checked={options.includes("two")} onChange={ handleChange }/>
                </ListOptions>
                <ListOptions>
                    <span>Three Seater</span>
                    <input type="checkbox" value={"three"} checked={options.includes("three")} onChange={ handleChange }/>
                </ListOptions>
                <ListOptions>
                    <span>Four Seater</span>
                    <input type="checkbox" value={"four"} checked={options.includes("four")} onChange={ handleChange }/>
                </ListOptions>
            </ListItem>
            <Button onClick={ handleSearch }>Search</Button>
    </SearchSection>
  )
}

export default FilterComponent