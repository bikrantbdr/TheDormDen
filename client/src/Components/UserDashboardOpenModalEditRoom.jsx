import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { AiFillMinusSquare, AiFillPlusCircle, AiFillPlusSquare } from 'react-icons/ai';
import { Checkbox } from 'pretty-checkbox-react';
import { useCheckboxState } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

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
`

const FeaturesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #eee;
    font-size: 20px;
    padding: 10px;
    border-radius: 4px;
`

const Minus = styled.button`
    color: #D179FF;
    cursor: pointer;

    &:hover {
        color: #A761CC;
    }
`
const Text = styled.p`
    font-size: 1rem;
    text-transform: capitalize;
`

const Number = styled.span``

const Plus = styled.button`
    color: #D179FF;
    cursor: pointer;

    &:hover {
        color: #A761CC;
    }
`

const UserDashboardOpenModalEditRoom = ({setOpenModal, hostel, setHostel, roomId}) => {
    const [room, setRoom] = useState(hostel.rooms.find(room => room.id === roomId))

    let features = [
        {
            value: "balcony",
            available: room["balcony"]
        },
        {   
            value: "attached_bathroom",
            available: room["attached_bathroom"]
        },
        {
            value: "direct_sunlight",
            available: room["direct_sunlight"]
        }
    ]
    
    const checkbox = useCheckboxState({ state: [] });
    
    const changeFeatureValue = (feature) => {
        setRoom({...room, [feature.value]: !room[feature.value]})
        setHostel({...hostel, rooms: hostel.rooms.map(room => room.id === roomId ? {...room, [feature.value]: !room[feature.value]} : room)})
    }

    const handlePlus = (type) => {
        if (type === "price") {
            setRoom({...room, price: room.price + 500})
            setHostel({...hostel, rooms: hostel.rooms.map(room => room.id === roomId ? {...room, price: room.price + 500} : room)})
        } else if (type === "available_seats") {
            setRoom({...room, available_seats: room.available_seats + 1})
            setHostel({...hostel, rooms: hostel.rooms.map(room => room.id === roomId ? {...room, available_seats: room.available_seats + 1} : room)})
        }
    }

    const handleMinus = (type) => {
        if (type === "price") {
            setRoom({...room, price: room.price - 500})
            setHostel({...hostel, rooms: hostel.rooms.map(room => room.id === roomId ? {...room, price: room.price - 500} : room)})
        } else if (type === "available_seats") {
            setRoom({...room, available_seats: room.available_seats - 1})
            setHostel({...hostel, rooms: hostel.rooms.map(room => room.id === roomId ? {...room, available_seats: room.available_seats - 1} : room)})
        }
    }

  return (
    <Modal>
        <ModalContent>
            <CloseButton onClick={ () => setOpenModal(false)}>&times;</CloseButton>
            <ComponentContainer>
                <h4>Room Number</h4>
                <NumberWrapper>
                    <h3>{room.room_number}</h3>
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

        </ModalContent>
    </Modal>
  )
}

export default UserDashboardOpenModalEditRoom