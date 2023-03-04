import React from 'react'
import {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Checkbox } from 'pretty-checkbox-react';
import { useCheckboxState } from 'pretty-checkbox-react';
import { Map, Marker, Draggable } from "pigeon-maps";
import location from '../assets/location.svg'
import cancelimg from '../assets/cancel.png'

import '@djthoms/pretty-checkbox';

import {AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai'
import { useFetch } from './../hooks/useFetch';

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
  padding: 2rem 0;
  align-items: center;
  height: 100%;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

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
  gap:0.25rem;
  margin: 0.5rem;
`
const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
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
    width: 75%;
    height: 25vh;
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
    grid-template-columns: repeat(2, 1fr);
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

const UserDashboardHostelEdit = () => {
  const  [hostel, setHostel] = useState(null);
  const [openOneSeaterOption, setOpenOneSeaterOption] = useState(true)
  const [openTwoSeaterOption, setOpenTwoSeaterOption] = useState(false)
  const [openThreeSeaterOption, setOpenThreeSeaterOption] = useState(false)
  const [openFourSeaterOption, setOpenFourSeaterOption] = useState(false)

  const { data, loading, error } = useFetch("http://localhost:5000/api/hostels/63dc7276e547623e0cff4a8c");

  useEffect(() => {
    setHostel(data)
  }, [data])

  // useEffect(() => {
  //   const fetchHostel = async () => {
  //     const response = await axios.get('http://localhost:5000/api/hostels/63dc7276e547623e0cff4a8c');
  //     const data = response.data
  //     setHostel(data);
  //   }
  //   fetchHostel();
  // }, [])


  const amenities = ['Wifi', '24hr Electricity', 'CCTV', 'Laundry', 'Hotwater', 'Parking', 'Terrace'];
  const checkbox = useCheckboxState({ state: [] });
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
                    {amenities.map(amenity => (
                      <Checkbox value={amenity} {...checkbox} color="success" >
                          {amenity}
                      </Checkbox>
                    ))}
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
                    <Label>Available Rooms</Label>
                    <AvailableRooms>
                    
                    <h2>{openOneSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)} size={20}/> : <AiFillPlusSquare onClick={ () => setOpenOneSeaterOption(!openOneSeaterOption)}  size={20}/>}One Seater Rooms</h2>
                    {openOneSeaterOption && <RoomsContainer>
                        {data.rooms.filter(room => room.room_type === 'one_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                            </Room>)
                        })}
                    </RoomsContainer>}

                    <h2>{openTwoSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenTwoSeaterOption(!openTwoSeaterOption)} size={20}/>} Two Seater Rooms</h2>
                    {openTwoSeaterOption && <RoomsContainer>
                        {data.rooms.filter(room => room.room_type === 'two_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                            </Room>)
                        })}
                    </RoomsContainer>}
        
                    <h2>{openThreeSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenThreeSeaterOption(!openThreeSeaterOption)} size={20}/>} Three Seater Rooms</h2>
                    {openThreeSeaterOption && <RoomsContainer>
                        {data.rooms.filter(room => room.room_type === 'three_seater').map(room => {
                            return (<Room key={room.id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                            </Room>)
                        })}
                    </RoomsContainer>}

                    <h2>{openFourSeaterOption ? <AiFillMinusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)}  size={20}/> : <AiFillPlusSquare onClick={ () => setOpenFourSeaterOption(!openFourSeaterOption)} size={20}/>} Four Seater Rooms</h2>
                    {openFourSeaterOption && <RoomsContainer>
                        {data.rooms.filter(room => room.room_type === 'four_seater').map(room => {
                            return (<Room key={room._id}>
                                <Heading>
                                    <h1>Room No. {room.room_number}</h1>
                                    <p>{room.balcony ? 'balcony • ' : ''} {room.attached_bathroom ? 'attached bathroom • ' : ''} {room.direct_sunlight ? 'direct sunlight • ' : ''}</p>
                                </Heading>
                                <Options>
                                    <p><small>available seats </small>( {room.available_seats || 0} )</p>
                                    <p><small>price </small>Rs. {room.price}</p>
                                </Options>
                            </Room>)
                        })}
                    </RoomsContainer>}
                    </AvailableRooms>
                </LabelInput>}
            </Row>
        </Form>
    </Container>
  )
}

export default UserDashboardHostelEdit