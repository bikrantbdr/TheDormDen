import React from 'react'
import styled from 'styled-components';
import { RiFolderWarningFill } from 'react-icons/ri';
import StarRating from './StarRating';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const Reviews = styled.div`
    &>h1 {
        font-size: 1rem;
    }

    &>h2 {
        font-size: 0.9rem;
    }
`

const Comment = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1.5px solid #eaedec;
`

const CommentHeading = styled.div`
    display: flex;
    justify-content: space-between;

    &>div {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    &>div>h1 {
        font-size: 1rem;
        color: #18754f;
    }

    &>div>p {
        font-size: 0.8rem;
        font-weight: bold;
    }
`

const Star = styled.div`
    --percent: calc(var(--rating) / 5 * 100%);
    display: inline-block;
    font-size: 1.3rem;
    font-family: Times;
    line-height: 1;

    &::before {
        content: '★★★★★';
        background: linear-gradient(90deg, #fc0 var(--percent), lightgray var(--percent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`

const CommentText = styled.div`
    font-size: 0.8rem;
    color: #838990;
    line-height: 1.3;
`

const ReportButton = styled.button`
    width: fit-content;
    padding: 0px 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    border: none;
    background: none;
    cursor: pointer;
    color: #838990;
`

const RateHostel = styled.div`
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &>h1 {
        font-size: 1rem;
    }

    &>h2 {
        font-size: 0.9rem;
    }
`

const Rating = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;  
    &>h3 {
        font-size: 0.8rem;
    }
`

const WriteReview = styled.div`
    &>h2 {
        font-size: 0.9rem;
    }

    &>textarea {
        margin-top: 8px;
        width: 100%;
        color: black;
        border: none;
        background: #eaedec;
        border-radius: 8px;
        padding: 8px;
    }

    &>textarea:focus {
        outline: none;
    }
`

const ReviewFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &>p {
        font-size: 0.8rem;
        color: #838990;
    }

    &>button {
        margin-top: 8px;
        width: fit-content;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        background: #d179ff;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
`


const HostelReviewsAndComments = () => {
  return (
    <Container>
        <Reviews>
            <h1>Reviews</h1>
            <Comment>
                <CommentHeading>
                    <div>
                        <h1>Jason Fried</h1>
                        <p>Nov 10, 2022</p>
                    </div>
                    <Star style={{"--rating": 3.5}}/>
                </CommentHeading>
                <CommentText>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati accusamus iusto aliquid quae, consequuntur est. Repudiandae quo nemo ut obcaecati mollitia, doloremque voluptatum expedita, saepe ex dignissimos iusto inventore minima.    
                </CommentText>
                <ReportButton>
                    <RiFolderWarningFill /> Report
                </ReportButton>
            </Comment>
            <Comment>
                <CommentHeading>
                    <div>
                        <h1>Marko Lopo</h1>
                        <p>Nov 15, 2022</p>
                    </div>
                    <Star style={{"--rating": 2}}/>
                </CommentHeading>
                <CommentText>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod voluptatum voluptates, quae molestiae nihil ipsum harum beatae tempora totam recusandae unde praesentium provident exercitationem distinctio sapiente, nobis, aperiam modi voluptatem!
                </CommentText>
                <ReportButton>
                    <RiFolderWarningFill /> Report
                </ReportButton>
            </Comment>
            <RateHostel>
                <h1>Write a Review</h1>
                <h2>Rating</h2>
                <Rating>
                    <h3>Cleanliness</h3>
                    <StarRating />
                    <h3>Food</h3>
                    <StarRating />
                    <h3>Staff</h3>
                    <StarRating />
                    <h3>Amenities</h3>
                    <StarRating />
                </Rating>
                <WriteReview>
                    <h2>Write a Review</h2>
                    <textarea rows="10" column="30" placeholder='Share your experience'/>
                </WriteReview>
                <ReviewFooter>
                    <p>Your review must be atleast 50 characters long</p>
                    <button>Submit review</button>
                </ReviewFooter>
            </RateHostel>
        </Reviews>
    </Container>
  )
}

export default HostelReviewsAndComments