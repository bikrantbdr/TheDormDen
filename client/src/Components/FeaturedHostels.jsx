import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useFetch } from './../hooks/useFetch';
import {AiOutlineStar} from 'react-icons/ai'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { proxy } from '../assets/proxy';

const Container = styled.div`
    max-width: 934px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`
const FeaturedLink = styled(Link)`
    text-decoration: none;
`

const FeaturedItem = styled(Link)`
    text-decoration: none;
    flex: 1;
    position: relative;
    background-color: #382b2f4b;
    border-radius: 8px;
    height: 280px;
    width : 250px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: 0.5rem;
    gap: 10px;
    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
        flex: 0 0 300px;
    }

    :hover {
        background-color: #382b2f67;
        cursor: pointer;
        transform: scale(1.1);
    }
`

const FeaturedImage = styled.img`
    width: 100%;
    height: 60%;
    border-radius: 8px;
    object-fit: cover;
`

const FeaturedText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 40%;
`
const FeaturedTitle = styled.div`
    font-weight: bold;
    font-size: 1rem;
    color : #fff;
    flex : 1;

`
const FeaturedLocation = styled.div`
    font-size: 0.8rem;
    color : #fff;
    flex : 1;

`
const FeaturedRating = styled.div`
    font-size: 0.8rem;
    color : #fff;
    flex : 1;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 1rem;

`

function FeaturedHostels() {
    const { data, loading, error } = useFetch(`${proxy}/api/hostels/featured`)
    const API_KEY = '769f09ef503a44d1bcb4218675c23b0c'

    const [street, setStreet] = React.useState([])
    const [city, setCity] = React.useState([])

    useEffect(() => {
        data.map((item,index) => {
            axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${item.location.coordinates[0]}&lon=${item.location.coordinates[1]}&format=json&apiKey=${API_KEY}`)
            .then((res) => {
                console.log(res.data.results[0].street, res.data.results[0].city )
                setStreet( prev => [...prev, res.data.results[0].street] )
                setCity( prev => [...prev, res.data.results[0].city] )
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }, [data])

  return (
    <Container>
        {loading? "Loading please wait" : <>
        {
            data.map((item,index) => (
                <FeaturedItem key={index} to={`/hostels/${item.id}`} >
                    <FeaturedImage src={item.images[0]}/>
                    <FeaturedText>
                        <FeaturedTitle>{item.name}</FeaturedTitle>
                        <FeaturedLocation>{ `${street[index]}, ${city[index]}` }</FeaturedLocation>
                        {
                        }
                        <FeaturedRating>
                            <AiOutlineStar size={"1.5rem"} />
                            {item.hostel_rating.toFixed(1)}
                        </FeaturedRating>
                    </FeaturedText>
                </FeaturedItem>
            ))
        }
        </>
        }
    </Container>
  )
}

export default FeaturedHostels