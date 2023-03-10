import React from 'react'
import styled from 'styled-components'
import {FaStar, FaStarHalfAlt} from 'react-icons/fa'
import {AiOutlineStar} from 'react-icons/ai'
import { useFetch } from '../hooks/useFetch'
import { proxy } from '../assets/proxy'
 
const Wrapper = styled.div`
    flex: 1.15;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    padding-top: 8rem;
    padding-left: 2rem;

    @media (max-width: 768px) {
        padding-top: 1rem;
        padding-left: 0;
    }
    
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height:50vh;
    padding: 24px;
    /* border: 1.5px solid #eaedec; */
    background-color: #B5CCD7;
    border-radius: 5px;
    /* justify-content: center; */
    align-items: center;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.421);
`
const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;

`
const OverallRatingDiv = styled.div`
    display : inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2rem;
    gap: 1rem;
    margin: 0.5rem;
    padding: 0.8rem;
    border-radius: 20px;
    background-color: #8F8F8F;
    color: white;
    font-weight: 600;
    
`
const IndividualRating = styled.div`
    width: 100%;
    display: flex;
    gap:5px;
`
const IndividualRatingText = styled.div`
    flex: 2;
`

const BarContainer = styled.div`
    width: 100%;
    height: 0.5rem;
    background-color: #eaedec;
    border-radius: 20px;
    margin: 0.5rem 0;
    flex : 5;
`
const Bar = styled.div`
    height: 100%;
    border-radius: 20px;
    background-color: #FFCB47;
`

const CustomerReview = ({overallRating,hostelInfo}) => {
    const { data, loading, error, reFetchData } = useFetch(`${proxy}/api/reviews/${hostelInfo.id}`);
    console.log(data)

    const totalReviews = data.length;
    const review = [0,0,0,0,0]
    for (let i = 0; i < totalReviews; i++) {
        switch (Math.round(data[i].overall_rating)) {
            case 1:
                review[0] = review[0] + 1;
                break;
            case 2:
                review[1] = review[1] + 1;
                break;
            case 3:
                review[2] = review[2] + 1;
                break;
            case 4:
                review[3] = review[3] + 1;
                break;
            case 5:
                review[4] = review[4] + 1;
                break;
            default:
                break;
        }

    }
  return (
    <Wrapper>
        <Container>
            <Title>Customer Reviews</Title>
            <OverallRatingDiv>
                {
                    [...Array(5)].map((item,i) => {
                        return (
                        Math.round(overallRating) >= (i + 1) ? <FaStar key={i} style ={{color: '#FFCB47'}}/> : <AiOutlineStar key={i} style ={{color: '#FFCB47'}}/>
                        )
                    })
                }
                
                {overallRating.toFixed(1)}
                </OverallRatingDiv>

            {review.map((item,index) => {
                return (
                    <IndividualRating key={index}>

                        {/* {console.log(review)} */}
                        <IndividualRatingText>
                       { index + 1 } star
                        </IndividualRatingText>
                       <BarContainer>
                            <Bar style={{width: `${totalReviews==0?0:(item/totalReviews)*100}%`}}/>
                       </BarContainer>
                        <IndividualRatingText>

                          {totalReviews==0?0:((item/totalReviews)*100).toFixed(0)}%
                        </IndividualRatingText>
                    </IndividualRating>
                )
            })
            }
        </Container>
    </Wrapper>
  )
}

export default CustomerReview