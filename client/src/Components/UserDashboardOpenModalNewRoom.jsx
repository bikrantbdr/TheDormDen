import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';
import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import { v4 as uuidv4 } from 'uuid';

const Modal = styled.div`
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 10; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const ModalContent = styled.div`
    background-color: #fefefe;
    margin: 50px auto; /* 15% from the top and centered */
    padding: 40px 20px;
    border: 1px solid #888;
    border-radius: 4px;
    width: fit-content; /* Could be more or less, depending on screen size */
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const CloseButton = styled.span`
    background-color: crimson;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
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
`

const ComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const NumberWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    background-color: #eee;
    font-size: 1rem;
    padding: 10px;
    border-radius: 4px;

    &>button {
        font-size: 1rem;
        padding: none;
        border: none;
    }

    &>input {
        width: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 1rem;
        font-weight: bold;
    }

    &>select {
        width: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        font-size: 1rem;
        font-weight: bold;
    }
`

const FeaturesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #eee;
    font-size: 20px;
    padding: 10px;
    border-radius: 4px;
`

const Minus = styled.button`
    color: #D179FF;
    cursor: pointer;
    height: 1rem;

    &:hover {
        color: #A761CC;
    }
`

const Number = styled.span``

const Text = styled.span`
    font-size: 1rem;
    text-transform: capitalize;
`

const Plus = styled.button`
    color: #D179FF;
    cursor: pointer;
    height: 1rem;

    &:hover {
        color: #A761CC;
    }
`

const SubmitButton = styled.button`
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    font-weight: bold;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
`

const UserDashboardOpenModalNewRoom = ({setOpenModal, hostel, setHostel, roomId}) => {
    const [room, setRoom] = useState({
        available_seats: 0,
        price: 10000,
        attached_bathroom: false,
        balcony: false,
        direct_sunlight: false,
        room_type: "one_seater",
        room_number: null,
        availability: false,
        id: uuidv4()
    })

    let features = [
        {
            value: "balcony",
            available: false
        },
        {   
            value: "attached_bathroom",
            available: false
        },
        {
            value: "direct_sunlight",
            available: false
        }
    ]
    
    const changeFeatureValue = (feature) => {
        feature.available = !feature.available
        setRoom({...room, [feature.value]: feature.available})
    }

    const handlePlus = (type) => {
        if (type === "price") {
            setRoom({...room, price: room.price + 500})
        } else if (type === "available_seats") {
            setRoom({...room, available_seats: room.available_seats + 1, availability: true})
        }
    }

    const handleMinus = (type) => {
        if (type === "price") {
            setRoom({...room, price: room.price - 500})
        } else if (type === "available_seats") {
            if (room.available_seats <= 0) setRoom({...room, availability: false})
            setRoom({...room, available_seats: room.available_seats - 1, availability: true})
        }
    }

    const submitRoom = () => {
        setHostel({...hostel, rooms: [...hostel.rooms, room]})
        setOpenModal(false)
    }


  return (
    <Modal>
        <ModalContent>
            <CloseButton onClick={ () => setOpenModal(false)}>&times;</CloseButton>

            <ComponentContainer>
                <h4>Room Type</h4>
                <NumberWrapper>
                    <select value={room.room_type} onChange={ (e) => setRoom({...room, room_type: e.target.value}) } >
                        <option value="one_seater" selected>One Seater</option>
                        <option value="two_seater">Two Seater</option>
                        <option value="three_seater">Three Seater</option>
                        <option value="four_seater">Four Seater</option>
                    </select>
                </NumberWrapper>
            </ComponentContainer>        
            
            <ComponentContainer>
                <h4>Room Number</h4>
                <NumberWrapper>
                    <input type="text" value={room.room_number} onChange={ (e) => setRoom({...room, room_number: e.target.value}) } />
                </NumberWrapper>
            </ComponentContainer>

            <ComponentContainer>
                <h4>Price</h4>
                <NumberWrapper>
                    <Minus onClick={ () => handleMinus("price")} disabled={room.price <=0 ? true: false}><AiFillMinusSquare /></Minus>
                    <Number>{room.price}</Number>
                    <Plus onClick={ () => handlePlus("price")}><AiFillPlusSquare /></Plus>
                </NumberWrapper>
            </ComponentContainer>

            <ComponentContainer>
                <h4>Available Seats</h4>
                <NumberWrapper>
                    <Minus onClick={ () => handleMinus("available_seats")} disabled={room.available_seats<=0?true:false}><AiFillMinusSquare /></Minus>
                    <Number>{room.available_seats}</Number>
                    <Plus onClick={ () => handlePlus("available_seats")}><AiFillPlusSquare /></Plus>
                </NumberWrapper>
            </ComponentContainer>
            
            <ComponentContainer>
                <h4>Available amenities</h4>
                <FeaturesWrapper>
                    {features.map((feature, index) => (
                        <Checkbox state={feature.available} setState={feature.available} onChange={ () => changeFeatureValue(feature) } key={index} color="success" >
                            <Text>
                            {feature.value}
                            </Text>
                        </Checkbox>
                        ))}
                </FeaturesWrapper>
            </ComponentContainer>
            
            <SubmitButton onClick={ submitRoom }>Add Room</SubmitButton>
        </ModalContent>
    </Modal>
  )
}

export default UserDashboardOpenModalNewRoom