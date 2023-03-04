import {useState} from 'react'
import styled from 'styled-components'
import { Map, Marker,Overlay } from "pigeon-maps";

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
`

const PropertyPrice = styled.span`
    font-size: 0.9rem;
    font-weight: 700;
`

const Rating = styled.span`
    border: none;
    background-color: #D179FF;
    color: white;
    padding: 4px;
    margin-right: 8px;
    min-height: 1rem;
    width: 2rem;
`
const Button = styled.button`
    border: none;
    border-radius: 8px;
    background-color: #D179FF;
    color: white;
    padding: 4px;
    margin-right: 8px;

    &:hover {
        background-color: #b85bff;
    }
`

const SearchMap = ({hostels}) => {
    console.log(hostels)
    const [center, setCenter] = useState([27.694582657545205, 85.32046340409931]);
    const [zoom, setZoom] = useState(14);
    const [overlayStatus, setOverlayStatus] = useState(false);
    const [overlayContent, setOverlayContent] = useState(null);
  return (
    <Container>
        <Map 
        center={center} 
        zoom={zoom} 
        onClick={()=>{setOverlayStatus(false)} }
        >
            {
            hostels.map(hostel => (
            <Marker
            key={hostel._id}
            anchor={[hostel.location.coordinates[1], hostel.location.coordinates[0]]}
            color="#f40d0d"
            onClick={() => {
                setOverlayStatus(true)
                setOverlayContent(hostel)
            }}
            />
            ))
        }
        {
            overlayStatus &&
             <StyledOverlay 
             anchor={[overlayContent.location.coordinates[1], overlayContent.location.coordinates[0]]} 
             offset={[200, 200]}
            >
                {/* <PropertyImage src={overlayContent.images[0] } /> */}
                <PropertyImage src="https://res.cloudinary.com/dxhwnryud/image/upload/v1675146838/cld-sample-3.jpg" />
                <PropertyName>{ overlayContent.name }</PropertyName>
                <PropertyLocation>Thapathali, Kathmandu</PropertyLocation>
                <PropertyPrice>Rs. { overlayContent.rooms[0].price }</PropertyPrice>
                <div>
                    <Rating>{ overlayContent.hostel_rating.toFixed(2) }</Rating>
                    <span>( { overlayContent.number_of_reviews } ratings )</span>
                </div>
                <Button> View More</Button>
            </StyledOverlay>
        }
        </Map>
    </Container>
  )
}

export default SearchMap