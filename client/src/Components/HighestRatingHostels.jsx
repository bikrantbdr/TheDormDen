import React from 'react'
import styled from 'styled-components'
import { useFetch } from './../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { proxy } from '../assets/proxy';

const Container = styled.div`
    width: 100%;
    max-width: 924px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const PropertyItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    @media (max-width: 768px) {
        flex: 0 0 200px;
    }
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

const Button = styled.button`
    border: none;
    background-color: #D179FF;
    color: white;
    padding: 4px;
    margin-right: 8px;
`

function HighestRatingHostels() {
    const { data, loading, error } = useFetch(`${proxy}/api/hostels/all`)

    const images = [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
        "https://images.unsplash.com/photo-1517568770283-ebb57fc0d3af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ]

    const navigate = useNavigate()
    const navigateTo = (id) => {
        navigate(`/hostels/${id}`)
    }

  return (
    <Container>
        { loading ? "Loading please wait" : 
            (images.map((hostel, index) => (
                    <PropertyItem key={index} onClick={ () => navigateTo(data[index].id) }>
                        <PropertyImage src={ data[index]?.images[1] } />
                        <PropertyName>{ data[index]?.name }</PropertyName>
                        <PropertyLocation>Thapathali, Kathmandu</PropertyLocation>
                        <PropertyPrice>Rs. { data[index]?.rooms[0]?.price || 10000 }</PropertyPrice>
                        <div>
                            <Button>{ data[index]?.hostel_rating.toFixed(2) }</Button>
                            <span>( { data[index]?.number_of_reviews } ratings )</span>
                        </div>
                    </PropertyItem> 
            ))
        )}
    </Container>
  )
}

export default HighestRatingHostels