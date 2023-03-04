import React from 'react'
import styled from 'styled-components'
import { useFetch } from './../hooks/useFetch';

const Container = styled.div`
    width: 100%;
    max-width: 924px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 768px) {
        overflow-x: scroll;
        padding: 0 20px;

        ::-webkit-scrollbar {
            display: none;
        }
    }
`

const PropertyItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

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
    const { data, loading, error } = useFetch("http://localhost:5000/api/hostels/all")

    const images = [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
        "https://images.unsplash.com/photo-1517568770283-ebb57fc0d3af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ]

  return (
    <Container>
        {/* { loading ? "Loading please wait" : 
            (data.map((hostel, index) => (
                <PropertyItem key={index} >
                    <PropertyImage src={ images[index] } />
                    <PropertyName>{ hostel.name }</PropertyName>
                    <PropertyLocation>Thapathali, Kathmandu</PropertyLocation>
                    <PropertyPrice>Rs. { hostel.rooms[0].price }</PropertyPrice>
                    <div>
                        <Button>{ hostel.hostel_rating.toFixed(2) }</Button>
                        <span>( { hostel.number_of_reviews } ratings )</span>
                    </div>
                </PropertyItem>
            ))
        )} */}
    </Container>
  )
}

export default HighestRatingHostels