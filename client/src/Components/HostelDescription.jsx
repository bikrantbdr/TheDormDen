import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';

import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const DescriptionText = styled.div`
    &>h1 {
        font-size: 1rem;
    }

    &>p {
        margin-top: 8px;
        font-size: 0.8rem;
        color: #838990;
        line-height: 1.3;
    }
`

const AvailableRooms = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    &>h1 {
        font-size: 1rem;
    }

    &>h2 {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
    }

    &>h2>div {
        cursor: pointer;
    }
`

const RoomsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 16px;
`

const Room = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    border: 1.5px solid #eaedec;
    border-radius: 4px;
`

const Heading = styled.div`
    &>h1 {
        font-size: 1.2rem;
    }

    &>p {
        font-size: 0.8rem;
        color: #b7bac6;
    }
`

const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    &>p:first-child {
        color: #008000;
        font-size: 1rem;
    }

    &>p:last-child {
        font-size: 1.2rem;
        color: #008000;
        font-weight: bold;
    }
`

const HostelDescription = () => {
    const [openOneSeaterOption, setOpenOneSeaterOption] = useState(true)
    const [openTwoSeaterOption, setOpenTwoSeaterOption] = useState(false)
    const [openThreeSeaterOption, setOpenThreeSeaterOption] = useState(false)
    const [openFourSeaterOption, setOpenFourSeaterOption] = useState(false)

  return (
    <Container>
        <DescriptionText>
            <h1>Our Hostel</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae delectus odit consequuntur impedit officia voluptate, illo, ad ab neque quas dolore tempore iure! Tempora soluta eius facere, eos nisi minus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat sunt voluptate, et vero cupiditate necessitatibus. Aspernatur voluptatibus accusamus fugiat culpa tempore quasi minima recusandae, illo, ullam voluptates quae eius iusto? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, laudantium nulla consequatur sapiente ipsa, assumenda eligendi praesentium facere non magni explicabo excepturi, asperiores quod voluptatibus impedit iusto culpa! Et, fugiat.</p>
        </DescriptionText>
        <AvailableRooms>
            <h1>Available Rooms</h1>
            <h2><div>{openOneSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)} size={20}/> : <AiFillPlusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)}  size={20}/>}</div> One Seater Rooms</h2>
            {openOneSeaterOption && <RoomsContainer>
                <Room>
                    <Heading>
                        <h1>One Seater</h1>
                        <p>balcony • direct sunlight • attached bathroom</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 5 )</p>
                        <p><small>price </small>Rs. 11000</p>
                    </Options>
                </Room>
                <Room>
                    <Heading>
                        <h1>One Seater</h1>
                        <p>balcony • direct sunlight</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 3 )</p>
                        <p><small>price </small>Rs. 10500</p>
                    </Options>
                </Room>
            </RoomsContainer>}
            
            <h2>{openTwoSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)} size={20}/>} Two Seater Rooms</h2>
            {openTwoSeaterOption && <RoomsContainer>
                <Room>
                    <Heading>
                        <h1>Two Seater</h1>
                        <p>balcony • direct sunlight</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 3 )</p>
                        <p><small>price </small>Rs. 10000</p>
                    </Options>
                </Room>
                <Room>
                    <Heading>
                        <h1>Two Seater</h1>
                        <p>balcony</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 2 )</p>
                        <p><small>price </small>Rs. 10000</p>
                    </Options>
                </Room>
            </RoomsContainer>}
        
            <h2>{openThreeSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)} size={20}/>} Three Seater Rooms</h2>
            {openThreeSeaterOption && <RoomsContainer>
                <Room>
                    <Heading>
                        <h1>Three Seater</h1>
                        <p>balcony • direct sunlight</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 3 )</p>
                        <p><small>price </small>Rs. 10000</p>
                    </Options>
                </Room>
                <Room>
                    <Heading>
                        <h1>Three Seater</h1>
                        <p>balcony</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 2 )</p>
                        <p><small>price </small>Rs. 10000</p>
                    </Options>
                </Room>
                <Room>
                    <Heading>
                        <h1>Three Seater</h1>
                        <p>balcony • direct sunlight</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 2 )</p>
                        <p><small>price </small>Rs. 10000</p>
                    </Options>
                </Room>
                <Room>
                    <Heading>
                        <h1>Three Seater</h1>
                        <p>balcony • attached bathroom</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 2 )</p>
                        <p><small>price </small>Rs. 10000</p>
                    </Options>
                </Room>
            </RoomsContainer>}

            <h2>{openFourSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)} size={20}/>} Four Seater Rooms</h2>
            {openFourSeaterOption && <RoomsContainer>
                <Room>
                    <Heading>
                        <h1>Four Seater</h1>
                        <p>balcony • direct sunlight • attached bathroom</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 5 )</p>
                        <p><small>price </small>Rs. 11000</p>
                    </Options>
                </Room>
                <Room>
                    <Heading>
                        <h1>Four Seater</h1>
                        <p>balcony • direct sunlight</p>
                    </Heading>
                    <Options>
                        <p><small>available seats </small>( 3 )</p>
                        <p><small>price </small>Rs. 10500</p>
                    </Options>
                </Room>
            </RoomsContainer>}
        </AvailableRooms>
    </Container>
  )
}

export default HostelDescription