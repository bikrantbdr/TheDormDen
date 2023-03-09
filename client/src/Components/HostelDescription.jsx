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

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

const Room = styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 8px;
    border: 1.5px solid #eaedec;
    border-radius: 4px;

    box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 2px 3px rgba(0,0,0,0.1);
`

const Heading = styled.div`
    &>h1 {
        font-size: 1.2rem;
        padding: 0 0 5px 0;
        border-bottom: 1.5px solid #eaedec;
    }

    &>p {
        font-size: 0.8rem;
        padding: 5px 0 0 0 ;
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

const HostelDescription = ({ hostelInfo }) => {
    const [openOneSeaterOption, setOpenOneSeaterOption] = useState(true)
    const [openTwoSeaterOption, setOpenTwoSeaterOption] = useState(false)
    const [openThreeSeaterOption, setOpenThreeSeaterOption] = useState(false)
    const [openFourSeaterOption, setOpenFourSeaterOption] = useState(false)

  return (
    <Container>
        <DescriptionText>
            <h1>Our Hostel</h1>
            <p>{hostelInfo.description}</p>
        </DescriptionText>
        <AvailableRooms>
            <h1>Available Rooms</h1>
            <h2><div>{openOneSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)} size={20} color={"#A761CC"} /> : <AiFillPlusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)}  size={20} color={"#D179FF"}/>}</div> One Seater Rooms</h2>
            {openOneSeaterOption && <RoomsContainer>
                {hostelInfo.rooms.filter(room => room.room_type === 'one_seater').map(room => {
                    return (
                    <Room key={room._id}>
                        <Heading>
                            <h1>One Seater</h1>
                            <p>{room.balcony ? 'Balcony ' : ''} {room.attached_bathroom ? '• Attached bathroom ' : ''} {room.direct_sunlight ? ' • Direct sunlight' : ''}</p>
                        </Heading>
                        <Options>
                            <p><small>Available seats </small>( {room.available_seats || 0} )</p>
                            <p><small>Price </small>Rs. {room.price}</p>
                        </Options>
                    </Room>)
                })}
            </RoomsContainer>}
            
            <h2><div>{openTwoSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)}  size={20} color={"#A761CC"}/> : <AiFillPlusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)} size={20} color={"#D179FF"}/>} </div>Two Seater Rooms</h2>
            {openTwoSeaterOption && <RoomsContainer>
                {hostelInfo.rooms.filter(room => room.room_type === 'two_seater').map(room => {
                    return (<Room key={room._id}>
                        <Heading>
                            <h1>Two Seater</h1>
                            <p>{room.balcony ? 'Balcony ' : ''} {room.attached_bathroom ? '• Attached bathroom ' : ''} {room.direct_sunlight ? ' • Direct sunlight' : ''}</p>
                        </Heading>
                        <Options>
                            <p><small>Available seats </small>( {room.available_seats || 0} )</p>
                            <p><small>Price </small>Rs. {room.price}</p>
                        </Options>
                    </Room>)
                })}
            </RoomsContainer>}
        
            <h2><div>{openThreeSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)}  size={20} color={"#A761CC"}/> : <AiFillPlusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)} size={20} color={"#D179FF"}/>}</div> Three Seater Rooms</h2>
            {openThreeSeaterOption && <RoomsContainer>
                {hostelInfo.rooms.filter(room => room.room_type === 'three_seater').map(room => {
                    return (<Room key={room._id}>
                        <Heading>
                            <h1>Three Seater</h1>
                            <p>{room.balcony ? 'Balcony ' : ''} {room.attached_bathroom ? '• Attached bathroom ' : ''} {room.direct_sunlight ? ' • Direct sunlight' : ''}</p>
                        </Heading>
                        <Options>
                            <p><small>Available seats </small>( {room.available_seats || 0} )</p>
                            <p><small>Price </small>Rs. {room.price}</p>
                        </Options>
                    </Room>)
                })}
            </RoomsContainer>}

            <h2><div>{openFourSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)}  size={20} color={"#A761CC"}/> : <AiFillPlusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)} size={20} color={"#D179FF"}/>}</div>Four Seater Rooms</h2>
            {openFourSeaterOption && <RoomsContainer>
                {hostelInfo.rooms.filter(room => room.room_type === 'four_seater').map(room => {
                    return (<Room key={room._id}>
                        <Heading>
                            <h1>Four Seater</h1>
                            <p>{room.balcony ? 'Balcony ' : ''} {room.attached_bathroom ? '• Attached bathroom ' : ''} {room.direct_sunlight ? ' • Direct sunlight' : ''}</p>
                        </Heading>
                        <Options>
                            <p><small>Available seats </small>( {room.available_seats || 0} )</p>
                            <p><small>Price </small>Rs. {room.price}</p>
                        </Options>
                    </Room>)
                })}
            </RoomsContainer>}
        </AvailableRooms>
    </Container>
  )
}

export default HostelDescription