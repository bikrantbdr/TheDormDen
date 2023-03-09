<<<<<<< HEAD
import React from 'react'
import {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Checkbox } from 'pretty-checkbox-react';
import { useCheckboxState } from 'pretty-checkbox-react';
import { Map, Marker, Draggable } from "pigeon-maps";
import location from '../assets/location-pin.png'
import cancelimg from '../assets/cancel.png'

import '@djthoms/pretty-checkbox';

import {AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai'
import { useFetch } from './../hooks/useFetch';
import UserDashboardOpenModalEditRoom from './UserDashboardOpenModalEditRoom';
import UserDashboardOpenModalNewRoom from './UserDashboardOpenModalNewRoom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80vw;
  margin: auto auto;
  background-color: #f8f8f8;
  border-radius: 8px;
  /* border: 1px solid #382b2f; */
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 0 2rem 0;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const LabelInput = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  gap:16px;
  margin: 0.5rem;
`
const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &>button {
    background-color: #D179FF;
    border: none;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 6px;
    padding: 0.5rem;
    cursor: pointer;
    }
`
const Input = styled.input`
  height: 2rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D179FF;
  border-radius: 6px;
  `

const Description = styled.textarea`
  height: 10rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D179FF;
  border-radius: 6px;
`  

const Button = styled.button`
  width: 35%;
  height: 2rem;
  margin: 0.5rem;
  background-color: #D179FF;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
`
const MapContainer = styled.div`
    width: 100%;
    height: 25vh;
`

const AvailableRooms = styled.div`
    width: 500px;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 16px;
`

const Room = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
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

const CheckboxDiv = styled.div`
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
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

const EditButton = styled.button`
    padding: 8px 16px;
    background-color: #386bc0;
    border: none;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
`

const DeleteButton = styled.button`
    padding: 8px 16px;
    background-color: #d1485f;
    border: none;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
`

const UserDashboardHostelEdit = () => {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openRoomModal, setOpenRoomModal] = useState(false);
  const [openOneSeaterOption, setOpenOneSeaterOption] = useState(true)
  const [openTwoSeaterOption, setOpenTwoSeaterOption] = useState(false)
  const [openThreeSeaterOption, setOpenThreeSeaterOption] = useState(false)
  const [openFourSeaterOption, setOpenFourSeaterOption] = useState(false)
  let localAmenities = [
    {
        value: 'Wifi',
        available: hostel?.amenities?.includes('Wifi') ? true : false,
    },
    {
        value: '24hr Electricity',
        available: hostel?.amenities?.includes('24hr Electricity') ? true : false,
    },
    {
        value: 'CCTV',
        available: hostel?.amenities?.includes('CCTV') ? true : false,  
    },
    {
        value: 'Laundry',
        available: hostel?.amenities?.includes('Laundry') ? true : false,
    },
    { 
        value: 'Hotwater',
        available: hostel?.amenities?.includes('Hotwater') ? true : false,
    },
    { 
        value: 'Parking',
        available: hostel?.amenities?.includes('Parking') ? true : false,
    },
    { 
        value: 'Terrace',
        available: hostel?.amenities?.includes('Terrace') ? true : false,
    },
]
    const changeAmenities = (amenity_obj) => {
        amenity_obj.available = !amenity_obj.available
        setHostel({...hostel, amenities: localAmenities.filter((amenity) => amenity.available).map((amenity) => amenity.value)})
    }

  const checkbox = useCheckboxState({ state: [] });

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:5000/api/hostels/63dc7276e547623e0cff4a8c")
        .then(res => {
            setHostel(res.data)
            localAmenities.forEach((amenity) => {
                amenity.available = res.data.amenities.includes(amenity.value)
            })
        })
        .finally(() => setLoading(false))
  }, [])

  const [center, setCenter] = useState([27.694582657545205, 85.32046340409931]);
  const [zoom, setZoom] = useState(14);
  const [locationanchor, setAnchor] = useState([27.694582657545205, 85.32046340409931]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

    const onmapclickhandler = async(e) => {
        setAnchor(e.latLng)
        setLatitude(e.latLng[0])
        setLongitude(e.latLng[1])
    }

    const [currentRoom, setCurrentRoom] = useState(null)
    const editRoomDetails = (e, room) => {
        e.preventDefault()
        setOpenModal(true)
        setCurrentRoom(room)
    }

    const deleteRoom = (e, room) => {
        const afterDeletion = hostel.rooms.filter(r => r.id !== room)
        setHostel({...hostel, rooms: afterDeletion})
    }

  return (
    <Container>
        <Form>
            <Row>
                <LabelInput>
                    <Label>Hostel Name</Label>
                    <Input type="text" placeholder="Hostel Name" />
                </LabelInput>
            </Row>
            <Row>
                <LabelInput>
                    <Label>Hostel Description</Label>
                    <Description type="text" placeholder="Hostel Address" row="20" column="20"/>
                </LabelInput>
            </Row>

            <Row>
                <LabelInput>
                    <Label>Hostel Amenities</Label>
                    <CheckboxDiv>

                    {localAmenities.map((amenity,index )=> (
                        <Checkbox state={amenity.available} setState={amenity.available} onChange={ () => changeAmenities(amenity) } key={index} color="success" style={{width:"40%"}} >
                          {amenity.value}
                      </Checkbox>
                    ))}
                    </CheckboxDiv>
                </LabelInput>
            </Row>
            <Row>
                <LabelInput>
                <Label htmlFor='location'>Location</Label>
                        <MapContainer>
                        <Map center={center} zoom={zoom} onClick={onmapclickhandler}>
                            <Draggable
                                offset={[25, 50]}
                                anchor={locationanchor}
                                onDragEnd={setAnchor}
                                >
                                <img src={location} width={50} height={50} alt="Pigeon!" />
                            </Draggable>
                        </Map>
                        </MapContainer>
                </LabelInput>
            </Row>
            <Row>
                {loading ? "loading please wait" : <LabelInput>
                    <Label>Available Rooms<button onClick={ (e) => {e.preventDefault(); setOpenRoomModal(true)} }>Add new rooms</button></Label>
                    <AvailableRooms>
                    
                    <h2>{openOneSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)} size={20}/> : <AiFillPlusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)}  size={20}/>}One Seater Rooms</h2>
                    {openOneSeaterOption && <RoomsContainer>
                        {hostel.rooms.filter(room => room.room_type === 'one_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <EditButton onClick={ (e) => editRoomDetails(e, room.id) }>Edit</EditButton>
                                    <DeleteButton onClick={ (e) => deleteRoom(e, room.id) }>Delete</DeleteButton>
                                </div>
                            </Room>)
                        })}
                    </RoomsContainer>}

                    <h2>{openTwoSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)} size={20}/>} Two Seater Rooms</h2>
                    {openTwoSeaterOption && <RoomsContainer>
                        {hostel.rooms.filter(room => room.room_type === 'two_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <EditButton onClick={ (e) => editRoomDetails(e, room.id) }>Edit</EditButton>
                                    <DeleteButton onClick={ (e) => deleteRoom(e, room.id) }>Delete</DeleteButton>
                                </div>
                            </Room>)
                        })}
                    </RoomsContainer>}
        
                    <h2>{openThreeSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)} size={20}/>} Three Seater Rooms</h2>
                    {openThreeSeaterOption && <RoomsContainer>
                        {hostel.rooms.filter(room => room.room_type === 'three_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <EditButton onClick={ (e) => editRoomDetails(e, room.id) }>Edit</EditButton>
                                    <DeleteButton onClick={ (e) => deleteRoom(e, room.id) }>Delete</DeleteButton>
                                </div>
                            </Room>)
                        })}
                    </RoomsContainer>}

                    <h2>{openFourSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)} size={20}/>} Four Seater Rooms</h2>
                    {openFourSeaterOption && <RoomsContainer>
                        {hostel.rooms.filter(room => room.room_type === 'four_seater').map(room => {
                            return (<Room key={room._id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <EditButton onClick={ (e) => editRoomDetails(e, room.id) }>Edit</EditButton>
                                    <DeleteButton onClick={ (e) => deleteRoom(e, room.id) }>Delete</DeleteButton>
                                </div>
                            </Room>)
                        })}
                    </RoomsContainer>}
                    </AvailableRooms>
                </LabelInput>}
            </Row>
        </Form>
        
        { openModal && <UserDashboardOpenModalEditRoom setOpenModal={ setOpenModal } hostel={ hostel } setHostel={ setHostel } roomId={ currentRoom }/>}
        { openRoomModal && <UserDashboardOpenModalNewRoom setOpenModal={ setOpenRoomModal } hostel={ hostel } setHostel={ setHostel } />}
    </Container>
  )
}

=======
import React from 'react'
import {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Checkbox } from 'pretty-checkbox-react';
import { useCheckboxState } from 'pretty-checkbox-react';
import { Map, Marker, Draggable } from "pigeon-maps";
import location from '../assets/location-pin.png'
import cancelimg from '../assets/cancel.png'

import '@djthoms/pretty-checkbox';

import {AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai'
import { useFetch } from './../hooks/useFetch';
import UserDashboardOpenModalEditRoom from './UserDashboardOpenModalEditRoom';
import UserDashboardOpenModalNewRoom from './UserDashboardOpenModalNewRoom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 80vw;
  margin: auto auto;
  background-color: #f8f8f8;
  border-radius: 8px;
  /* border: 1px solid #382b2f; */
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 0 2rem 0;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const LabelInput = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  gap:16px;
  margin: 0.5rem;
`
const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &>button {
    background-color: #D179FF;
    border: none;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 6px;
    padding: 0.5rem;
    cursor: pointer;
    }
`
const Input = styled.input`
  height: 2rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D179FF;
  border-radius: 6px;
  `

const Description = styled.textarea`
  height: 10rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D179FF;
  border-radius: 6px;
`  

const Button = styled.button`
  width: 35%;
  height: 2rem;
  margin: 0.5rem;
  background-color: #D179FF;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
`
const MapContainer = styled.div`
    width: 100%;
    height: 25vh;
`

const AvailableRooms = styled.div`
    width: 500px;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 16px;
`

const Room = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
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

const CheckboxDiv = styled.div`
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
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

const EditButton = styled.button`
    padding: 8px 16px;
    background-color: #386bc0;
    border: none;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
`

const DeleteButton = styled.button`
    padding: 8px 16px;
    background-color: #d1485f;
    border: none;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
`

const UserDashboardHostelEdit = () => {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openRoomModal, setOpenRoomModal] = useState(false);
  const [openOneSeaterOption, setOpenOneSeaterOption] = useState(true)
  const [openTwoSeaterOption, setOpenTwoSeaterOption] = useState(false)
  const [openThreeSeaterOption, setOpenThreeSeaterOption] = useState(false)
  const [openFourSeaterOption, setOpenFourSeaterOption] = useState(false)
  let localAmenities = [
    {
        value: 'Wifi',
        available: hostel?.amenities?.includes('Wifi') ? true : false,
    },
    {
        value: '24hr Electricity',
        available: hostel?.amenities?.includes('24hr Electricity') ? true : false,
    },
    {
        value: 'CCTV',
        available: hostel?.amenities?.includes('CCTV') ? true : false,  
    },
    {
        value: 'Laundry',
        available: hostel?.amenities?.includes('Laundry') ? true : false,
    },
    { 
        value: 'Hotwater',
        available: hostel?.amenities?.includes('Hotwater') ? true : false,
    },
    { 
        value: 'Parking',
        available: hostel?.amenities?.includes('Parking') ? true : false,
    },
    { 
        value: 'Terrace',
        available: hostel?.amenities?.includes('Terrace') ? true : false,
    },
]
    const changeAmenities = (amenity_obj) => {
        amenity_obj.available = !amenity_obj.available
        setHostel({...hostel, amenities: localAmenities.filter((amenity) => amenity.available).map((amenity) => amenity.value)})
    }

  const checkbox = useCheckboxState({ state: [] });

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:5000/api/hostels/63dc7276e547623e0cff4a8c")
        .then(res => {
            setHostel(res.data)
            localAmenities.forEach((amenity) => {
                amenity.available = res.data.amenities.includes(amenity.value)
            })
        })
        .finally(() => setLoading(false))
  }, [])

  const [center, setCenter] = useState([27.694582657545205, 85.32046340409931]);
  const [zoom, setZoom] = useState(14);
  const [locationanchor, setAnchor] = useState([27.694582657545205, 85.32046340409931]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

    const onmapclickhandler = async(e) => {
        setAnchor(e.latLng)
        setLatitude(e.latLng[0])
        setLongitude(e.latLng[1])
    }

    const [currentRoom, setCurrentRoom] = useState(null)
    const editRoomDetails = (e, room) => {
        e.preventDefault()
        setOpenModal(true)
        setCurrentRoom(room)
    }

    const deleteRoom = (e, room) => {
        const afterDeletion = hostel.rooms.filter(r => r.id !== room)
        setHostel({...hostel, rooms: afterDeletion})
    }

  return (
    <Container>
        <Form>
            <Row>
                <LabelInput>
                    <Label>Hostel Name</Label>
                    <Input type="text" placeholder="Hostel Name" />
                </LabelInput>
            </Row>
            <Row>
                <LabelInput>
                    <Label>Hostel Description</Label>
                    <Description type="text" placeholder="Hostel Address" row="20" column="20"/>
                </LabelInput>
            </Row>

            <Row>
                <LabelInput>
                    <Label>Hostel Amenities</Label>
                    <CheckboxDiv>

                    {localAmenities.map((amenity,index )=> (
                        <Checkbox state={amenity.available} setState={amenity.available} onChange={ () => changeAmenities(amenity) } key={index} color="success" style={{width:"40%"}} >
                          {amenity.value}
                      </Checkbox>
                    ))}
                    </CheckboxDiv>
                </LabelInput>
            </Row>
            <Row>
                <LabelInput>
                <Label htmlFor='location'>Location</Label>
                        <MapContainer>
                        <Map center={center} zoom={zoom} onClick={onmapclickhandler}>
                            <Draggable
                                offset={[25, 50]}
                                anchor={locationanchor}
                                onDragEnd={setAnchor}
                                >
                                <img src={location} width={50} height={50} alt="Pigeon!" />
                            </Draggable>
                        </Map>
                        </MapContainer>
                </LabelInput>
            </Row>
            <Row>
                {loading ? "loading please wait" : <LabelInput>
                    <Label>Available Rooms<button onClick={ (e) => {e.preventDefault(); setOpenRoomModal(true)} }>Add new rooms</button></Label>
                    <AvailableRooms>
                    
                    <h2>{openOneSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)} size={20}/> : <AiFillPlusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)}  size={20}/>}One Seater Rooms</h2>
                    {openOneSeaterOption && <RoomsContainer>
                        {hostel.rooms.filter(room => room.room_type === 'one_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <EditButton onClick={ (e) => editRoomDetails(e, room.id) }>Edit</EditButton>
                                    <DeleteButton onClick={ (e) => deleteRoom(e, room.id) }>Delete</DeleteButton>
                                </div>
                            </Room>)
                        })}
                    </RoomsContainer>}

                    <h2>{openTwoSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)} size={20}/>} Two Seater Rooms</h2>
                    {openTwoSeaterOption && <RoomsContainer>
                        {hostel.rooms.filter(room => room.room_type === 'two_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <EditButton onClick={ (e) => editRoomDetails(e, room.id) }>Edit</EditButton>
                                    <DeleteButton onClick={ (e) => deleteRoom(e, room.id) }>Delete</DeleteButton>
                                </div>
                            </Room>)
                        })}
                    </RoomsContainer>}
        
                    <h2>{openThreeSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)} size={20}/>} Three Seater Rooms</h2>
                    {openThreeSeaterOption && <RoomsContainer>
                        {hostel.rooms.filter(room => room.room_type === 'three_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <EditButton onClick={ (e) => editRoomDetails(e, room.id) }>Edit</EditButton>
                                    <DeleteButton onClick={ (e) => deleteRoom(e, room.id) }>Delete</DeleteButton>
                                </div>
                            </Room>)
                        })}
                    </RoomsContainer>}

                    <h2>{openFourSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)} size={20}/>} Four Seater Rooms</h2>
                    {openFourSeaterOption && <RoomsContainer>
                        {hostel.rooms.filter(room => room.room_type === 'four_seater').map(room => {
                            return (<Room key={room._id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                                <div style={{display: "flex", gap: "10px"}}>
                                    <EditButton onClick={ (e) => editRoomDetails(e, room.id) }>Edit</EditButton>
                                    <DeleteButton onClick={ (e) => deleteRoom(e, room.id) }>Delete</DeleteButton>
                                </div>
                            </Room>)
                        })}
                    </RoomsContainer>}
                    </AvailableRooms>
                </LabelInput>}
            </Row>
        </Form>
        
        { openModal && <UserDashboardOpenModalEditRoom setOpenModal={ setOpenModal } hostel={ hostel } setHostel={ setHostel } roomId={ currentRoom }/>}
        { openRoomModal && <UserDashboardOpenModalNewRoom setOpenModal={ setOpenRoomModal } hostel={ hostel } setHostel={ setHostel } />}
    </Container>
  )
}

>>>>>>> c8d7b12e44bb6d02388e98bfcb2ae45f59b4e86a
export default UserDashboardHostelEdit