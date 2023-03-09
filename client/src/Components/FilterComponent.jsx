import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import MultiRangeSlider from "multi-range-slider-react";
import { useLocation } from 'react-router-dom';
import { proxy } from '../assets/proxy';

const SearchTitle = styled.h1`
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #ffffff;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`

const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
    position: relative;

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

    @media (max-width: 768px) {

        &>label {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 5px;
        }

        &>input {
            height: 40px;
            padding: 10px;
            font-size: 1rem;
        }
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

    @media (max-width: 768px) {
        &>span {
            font-size: 1rem;
            font-weight: 600;
        }
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
    position: absolute;
    z-index: 20;
    top: 55px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    &>div {
        padding: 8px 16px;
    }

    &>div:hover {
        background-color: #f4f2f2;
    }

    @media (max-width: 425px) {
        top: 70px;
        right: 0px;
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
        background-color: yellow;
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

    @media (max-width: 768px) {
        padding: 1rem;
        font-size: 1.2rem;
        font-weight: 600;
    }
`
const LocationOption = styled.div`
    padding: 8px 16px;
`

const CloseButton = styled.span`
    display: none;
    background-color: crimson;
    width: 48px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    border-radius: 50%;
    color: #fff;
    font-size: 34px;
    font-weight: bold;
    position: absolute;
    z-index: 20;
    top: 10px;
    right: 5px;

    &:hover, &:focus {
        background-color: #999;
        text-decoration: none;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        display: block;
    }
`
const SearchSection = styled.div`
        flex: 1;
        padding: 1.5rem;
        border-radius: 10px;
        background-color: #D179FF;
        position: sticky;
        top: 65px;
        height: fit-content;

        @media (max-width: 768px) {
            display: ${({openModal}) => (openModal ? 'flex' : 'none')};
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;
            z-index: 10;

            flex-direction: column;
            justify-content: center;
        }
    `

function FilterComponent({ setUrl, setOpenModal, openModal }) {
    
    const location = useLocation();

    const [name, setName] = useState(location.state.name);
    const [options, setOptions] = useState(location.state.options === "any" ? ["one","two","three","four"] : [location.state.options] );
    const [locate, setLocate] = useState(location.state.location);
    const [destination, setDestination] = useState(location.state.destination);
    const [minValue, setminValue] = useState(0);
    const [maxValue, setmaxValue] = useState(20000);
    const handleInput = (e) => {
        setminValue(e.minValue);
        setmaxValue(e.maxValue);
        // console.log(e.minValue, e.maxValue);
    };

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
        const url = `${proxy}/api/hostels?name=${name}&room_types=${ options.map((option) => option+"_seater" ) }&longitude=${destination.longitude}&latitude=${destination.latitude}&price_lower=${minValue || 0}&price_upper=${maxValue|| 20000}`
        setUrl(url)
    }

  return (
    <SearchSection>
            <CloseButton onClick={ () => setOpenModal(false)}>&times;</CloseButton>
            <SearchTitle>Filter</SearchTitle>
            <ListItem>
                <label>Name</label>
                <input type="text" value={ name } onChange={ (e) => setName(e.target.value) }/>
            </ListItem>

            <ListItem>
                <label>Location</label>
                <input type="text" value={ locate }
                onClick={ () => setOpenLocationOptions(!openLocationOptions)}
                onBlur={ () => setTimeout(() => setOpenLocationOptions(false), 500) }
                onChange={ (e) => setLocate(e.target.value) }/>

                {openLocationOptions && (locate.length > 0) && 
                <LocationOptions>
                    { res ? res.features.map((address) => (
                        <LocationOption key={address.properties.place_id} onClick={ () => handleDestination(address) }>{address.properties.formatted}</LocationOption>
                    )) : <LocationOption>Loading</LocationOption>
                    }
                </LocationOptions>}
            </ListItem>

            <ListItem>
                <label>Pricing Range</label>
                <ListPricing>
                    <MultiRangeSlider
                        min={0}
                        max={20000}
                        style={{ width: "200px" }}
                        minValue={minValue}
                        ruler={"false"}
                        barInnerColor={"#fff"}
                        maxValue={maxValue}
                        onInput={(e) => {
                            handleInput(e);
                        }}
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