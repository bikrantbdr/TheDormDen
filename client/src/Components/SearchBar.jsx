import React from 'react'
import { useState } from 'react'
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";

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

function SearchBar() {
    const [openSearchOptions, setOpenSearchOptions] = useState(false)
    const [openLocationOptions, setOpenLocationOptions] = useState(false)

  return (
    <Container>
        <Content>
            <label>Hostel Name</label>
            <input type="text" placeholder='Does it have a name?'/>
        </Content>

        <Content>
            <label>Seaters</label>
            <span onClick={ () => setOpenSearchOptions(!openSearchOptions)}>Any</span>
        </Content>
        {openSearchOptions && <SeatersOptions>
            <div>Any</div>
            <div>One Seater</div>
            <div>Two Seater</div>
            <div>Three Seater</div>
            <div>Four Seater</div>
        </SeatersOptions>}

        <Content>
            <label>Location</label>
            <input type="text" placeholder='Where are you staying?' onClick={ () => setOpenLocationOptions(!openLocationOptions)}/>
        </Content>
        {openLocationOptions && <LocationOptions>
            <div>Kathmandu, Nepal</div>
            <div>Bhairavpur, Nepal</div>
            <div>Homeland, Nepal</div>
            <div>Dummy, Nepal</div>
            <div>Mula, Nepal</div>
        </LocationOptions>}

        <Button><FaSearch /> Search</Button>
    </Container>
  )
}

export default SearchBar