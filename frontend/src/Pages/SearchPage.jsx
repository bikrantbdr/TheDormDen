import React from 'react'
import styled from 'styled-components'
import star from '../images/Star.png'

import {Link} from 'react-router-dom'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`
const Card = styled.div`
    display: flex;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`
const CardImage = styled.div`
    width: 40%;
`
const CardContent = styled.div`
    width: 60%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`

const Gender = styled.div``
const HostelName = styled.div`
    font-weight: 600;
    font-size: 20px;
    // width: 50%;
`
const Review = styled.div`
    width:50%;
    display: flex;
    justify-content: space-between;
`
const HostelRating = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #d179ff;
    width: 50px;
    padding: 5px;
    color: white;

`
const HostelNoOfReviews = styled.div``
const Details = styled.button`
    background-color: #d179ff;
    border: none;
    border-radius: 5px;
    padding: 10px 10px;
    color: white;
`

const SearchPage = ({hostels,setHostels}) => {
  return (
    <Container>
        {
            hostels.map((hostel) => {
                return (
                    <Card key={hostel.id}>
                        <CardImage>
                            <img src={hostel.images[0]} width="100%" height='100%' alt="Hostel Image"/>
                        </CardImage>
                        <CardContent>
                            <HostelName>
                                {hostel.name}
                            </HostelName>
                            <Gender>
                                For gender: {hostel.for_gender ===0 ? "male" : "female"}
                            </Gender>
                            <Review>
                            <HostelRating>
                                {hostel.hostel_rating}
                                <img src={star} width="20px" height="20px" alt="star"/>
                                {/* svg */}
                            </HostelRating>
                            <HostelNoOfReviews>
                                No of reviews: ({hostel.number_of_reviews})
                            </HostelNoOfReviews>
                            </Review>
                            <Details>
                                <Link to={`/hostels/${hostel.id}`}>
                                View Details
                                </Link>
                            </Details>
                        </CardContent>
                    </Card>
                )
            })
        }
    </Container>
  )
}

export default SearchPage