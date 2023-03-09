import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    border: 1px solid #cccccc4a;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 2px 10px 10px rgba(0,0,0,0.1);

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`

const ImageContainer = styled.img`
    width: 250px;
    height: 200px;
    object-fit: cover;

    @media (max-width: 768px) {
        width: 100%;
        height: 200px;
    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 1.5rem;
    flex: 2;

    @media (max-width: 768px) {
        gap: 12px;
    }
`

const Title = styled.h1`
    font-size: 1.5rem;
    color: #A761CC;
`

const Distance = styled.span`
    font-size: 0.8rem;
    color: #252525a4;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

const RoomAvailableOption = styled.span`
    font-size: 0.8rem;
    font-weight: bold;
    color: #fff;
    background-color: #008000bc;
    width: fit-content;
    border-radius: 5px;
    padding: 4px;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`


const Features = styled.span`
    font-weight: bold;
    font-size: 0.8rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`



const Details = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 3rem;

    @media (max-width: 768px) {
        margin-top: 8px;
        gap: 12px;
    }
`

const Rating = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &> span {
        font-weight: bold;
    }
    
    &>button {
        background-color: #c189df;
        color: white;
        padding: 5px;
        font-weight: bold;
        border: none;
    }

    @media (max-width: 768px) {
        flex-direction: row-reverse;
        justify-content: flex-end;
        gap: 8px;

        &>span {
            font-size: 1.2rem;
        }

        &>button {
            padding: 10px;
            font-size: 1rem;
        }
    }
`

const DetailText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: right;

    &>span:first-child {
        font-weight: bold;
        font-size: 1.5rem;
    }
    &>span:nth-child(2) {
        font-size: 0.8rem;
        color: #2525255f;
    }

    & button {
        margin-top: 1rem;
        background-color: #D179FF;
        color: white;
        padding: 0.7rem;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: #c355fe;
            color : #ffffff;
        }
    }

    @media (max-width: 768px) {
        text-align: left;

        &>span:nth-child(2) {
            display: none;
        }

        & button {
            width: 100%;
            padding: 12px 16px;
            font-size: 1rem;
        }
    }
`

function ResultItem({ hostel, sortBy }) {
    const API_KEY = '769f09ef503a44d1bcb4218675c23b0c'

    const [price, setPrice] = React.useState(0)

    useEffect(() => {
        if (sortBy === "price_increasing" || sortBy === "popularity") {
            setPrice(hostel.rooms.reduce((min, room) => room.price < min ? room.price : min, hostel.rooms[0].price))
        } else {
            setPrice(hostel.rooms.reduce((max, room) => room.price > max ? room.price : max, hostel.rooms[0].price))
        }
    }, [sortBy])

    const [street, setStreet] = React.useState('')
    const [city, setCity] = React.useState('')
    axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${hostel.location.coordinates[1]}&lon=${hostel.location.coordinates[0]}&format=json&apiKey=${API_KEY}`)
    .then((res) => {
        setStreet(res.data.results[0].street)
        setCity(res.data.results[0].city)
    })
    .catch((err) => {
        console.log(err)
    })

  return (
    <Container>
        <ImageContainer src={hostel.images[0]} />
        <Description>        
            <Title>{ hostel.name }</Title>
            <Distance>{`${street}, ${city}`}</Distance>
            
            <Features>
                { hostel.amenities[0] ? `${hostel.amenities[0]} ` : "  "
                }
                { hostel.amenities[1] ? ` • ${hostel.amenities[1]} ` : "  "
                }
                { hostel.amenities[2] ? ` • ${hostel.amenities[2]} ` : "  "
                }
                { hostel.amenities[3] ? ` • ${hostel.amenities[3]} ` : "  "
                }
                { hostel.amenities[4] ? ` • ${hostel.amenities[4]} ` : "  "
                }
            </Features>
            <RoomAvailableOption>For gender { hostel.for_gender === 0 ? "Male" : "Female"} </RoomAvailableOption>
        </Description>
        <Details>
            <Rating>
                <span>( { hostel.number_of_reviews } ratings )</span>
                <button>{ hostel.ranking.toFixed(1) }</button>
            </Rating>
            <DetailText>
                <span>Rs.{ price }</span>
                <span>Includes taxes and fees</span>
                <Link to={`/hostels/${hostel.id}`}>
                    <button>See availability</button>
                </Link>
            </DetailText>
        </Details>
    </Container>
  )
}

export default ResultItem