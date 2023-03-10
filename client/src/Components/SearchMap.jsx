import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Map, Marker,Overlay } from "pigeon-maps";
import { Link } from 'react-router-dom';

const Container = styled.div`
    flex: 3;
    background-color: aliceblue;
    height:100%;

    @media (max-width: 768px) {
    flex: 1
    }
`
const StyledOverlay = styled(Overlay)`
    min-height: 300px;
    width: 300px;
    background-color: #fff;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    color: #000;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    gap:0.5rem;
`
const PropertyImage = styled.img`
    width: 100%;
    object-fit: cover;
`

const PropertyName = styled.span`
    font-weight: bold;
`

const PropertyLocation = styled.span`
    font-size: 0.8rem;
    color: #252525a4;
`

const PropertyPrice = styled.span`
    font-size: 0.9rem;
    font-weight: 700;
`

const Rating = styled.span`
    border: none;
    background-color: #bc4cf8;
    color: white;
    padding: 4px;
    margin-right: 8px;
    min-height: 1rem;
    width: 2rem;
`
const Button = styled(Link)`
    border: none;
    border-radius: 8px;
    text-decoration: none;
    text-align: center;
    background-color: #D179FF;
    color: white;
    padding: 4px;
    margin-right: 8px;

    &:hover {
        background-color: #b85bff;
    }
`

const SearchMap = ({hostels}) => {
    // console.log(hostels)
    const [center, setCenter] = useState([27.694582657545205, 85.32046340409931]);
    const [zoom, setZoom] = useState(14);
    const [overlayStatus, setOverlayStatus] = useState(false);
    const [overlayContent, setOverlayContent] = useState(null);

    const API_KEY = '769f09ef503a44d1bcb4218675c23b0c'

    const [street, setStreet] = React.useState([])
    const [city, setCity] = React.useState([])

    const [displayStreet, setDisplayStreet] = React.useState('')

    useEffect(() => {
         hostels.map((item,index) => {
            axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${item.location.coordinates[1]}&lon=${item.location.coordinates[0]}&format=json&apiKey=${API_KEY}`)
            .then((res) => {
                // console.log(res.data.results[0].street )
                setStreet( prev => [...prev, res.data.results[0].street] )
                setCity( prev => [...prev, res.data.results[0].city] )
            })
            .catch((err) => {
                console.log(err)
            })
        })
    },[])
            
  return (
    <Container>
        <Map 
        center={center} 
        zoom={zoom} 
        onClick={()=>{setOverlayStatus(false)} }
        >
            {
            hostels.map((hostel,index )=> (
            <Marker
            key={hostel._id}
            anchor={[hostel.location.coordinates[1], hostel.location.coordinates[0]]}
            color="#f40d0d"
            onClick={() => {
                // console.log(street, city)
                setOverlayStatus(true)
                setOverlayContent(hostel)
                setDisplayStreet(`${street[index]}, ${city[index]}`)
            }}
            />
            ))
        }
        {
            overlayStatus &&
             <StyledOverlay 
             anchor={[overlayContent.location.coordinates[1], overlayContent.location.coordinates[0]]} 
             offset={[300, 390]}
            >
                <PropertyImage src={overlayContent.images[0] } />
                {/* <PropertyImage src="https://res.cloudinary.com/dxhwnryud/image/upload/v1675146838/cld-sample-3.jpg" /> */}
                <PropertyName>{ overlayContent.name }</PropertyName>
                <PropertyLocation>{displayStreet}</PropertyLocation>
                <PropertyPrice>Rs. { overlayContent.rooms[0].price }</PropertyPrice>
                <div>
                    <Rating>{ overlayContent.hostel_rating.toFixed(2) }</Rating>
                    <span>( { overlayContent.number_of_reviews } ratings )</span>
                </div>
                <Button to={`/hostels/${overlayContent.id}`} > View More</Button>
            </StyledOverlay>
        }
        </Map>
    </Container>
  )
}

export default SearchMap