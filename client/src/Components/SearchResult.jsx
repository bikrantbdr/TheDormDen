import React from 'react'
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
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 1.5rem;
    flex: 2;

    @media (max-width: 768px) {
        gap: 8px;
    }
`

const Title = styled.h1`
    font-size: 1.5rem;
    color: #A761CC;
`

const Distance = styled.span`
    font-size: 0.8rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

const RoomAvailableOption = styled.span`
    font-size: 0.8rem;
    font-weight: bold;
    color: #fff;
    background-color: green;
    width: fit-content;
    border-radius: 5px;
    padding: 2px;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

const Subtitle = styled.span`
    font-size: 0.8rem;
`

const Features = styled.span`
    font-weight: bold;
    font-size: 0.8rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

const CancelOption = styled.span`
    font-weight: bold;
    color: green;
    font-size: 0.8rem;

    @media (max-width: 768px) {
        display: none;
    }
`

const CancelSubtitle = styled.span`
    color: green;
    font-size: 0.8rem;

    @media (max-width: 768px) {
        display: none;
    }
`

const Details = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 3rem;

    @media (max-width: 768px) {
        gap: 10px;
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

        &:hover {
            background-color: #c189df;
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

function ResultItem({ hostel }) {
  return (
    <Container>
        <ImageContainer src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
        <Description>        
            <Title>{ hostel.name }</Title>
            <Distance>Thapathali, Kathmandu</Distance>
            <Features>Free Wifi • Bathroom • 24hr Water</Features>
            {/* <RoomAvailableOption>Rooms Available</RoomAvailableOption> */}
            {/* <Subtitle>{ hostel.description.substring(0, 40) }...</Subtitle> */}
            {/* <CancelOption>Verified Listing</CancelOption> */}
            {/* <CancelSubtitle>By clicking at See availability button, you can check the amenities and pricing </CancelSubtitle> */}
        </Description>
        <Details>
            <Rating>
                <span>( { hostel.number_of_reviews } ratings )</span>
                <button>{ hostel.ranking.toFixed(1) }</button>
            </Rating>
            <DetailText>
                <span>Rs.{ hostel.rooms[0].price }</span>
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