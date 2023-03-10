import React from 'react'
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { RiFolderWarningFill } from 'react-icons/ri';
import StarRating from './StarRating';
import { useFetch } from './../hooks/useFetch';
import axios from 'axios';
import { AuthContext } from './../context/AuthContext';
import UserReviewComponent from './UserReviewComponent';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from './../context/NotificationContext';
import { proxy } from '../assets/proxy';

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
        background-clip: text;
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

export const RateHostel = styled.div`
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border: 2px dashed #eaedec;
    border-radius: 8px;

    &>h1 {
        font-size: 1rem;
    }

    &>h2 {
        font-size: 0.9rem;
    }
`

export const Rating = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;  
    &>h3 {
        font-size: 0.8rem;
    }
`

export const WriteReview = styled.div`
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

export const ReviewFooter = styled.div`
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

    @media (max-width: 768px) {
        gap: 8px;

        &>p {
            font-size: 0.7rem;
        }

        &>button {
            padding: 6px 10px;
            font-size: 0.8rem;
        }
    }
`


const HostelReviewsAndComments = ({ hostelInfo }) => {
    const { data, loading, error, reFetchData } = useFetch(`${proxy}/api/reviews/${hostelInfo.id}`);
    
    const [existingReview, setExistingReview] = useState([])
    const [cleanlinessRating, setCleanlinessRating] = useState(null)
    const [foodRating, setFoodRating] = useState(null)
    const [staffRating, setStaffRating] = useState(null)
    const [amenitiesRating, setAmenitiesRating] = useState(null)
    const [comment, setComment] = useState("")

    const { dispatch } = useContext(NotificationContext)

    const { user_id } = useContext(AuthContext)
    useEffect(() => {
        if (data) {
            const userReview = data.filter(review => review.user !== null && review.user.id === user_id)
            setExistingReview(userReview)
            if (userReview.length > 0) {
                setCleanlinessRating(userReview[0].cleanliness)
                setFoodRating(userReview[0].food)
                setStaffRating(userReview[0].staff)
                setAmenitiesRating(userReview[0].amenities)
                setComment(userReview[0].comment)
            }
        }
    }, [data])

    const navigate = useNavigate()
    const handleSubmitReview = async (e) => {
        e.preventDefault()
        if (user_id === null) {
            dispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "You must be logged in first to submit review", type: "error" } })
            navigate("/login")
        }
        const review = {
            cleanliness: cleanlinessRating,
            food: foodRating,
            staff: staffRating,
            amenities: amenitiesRating,
            comment: comment
        }
        if (existingReview.length > 0) {
            try {
                const response = await axios.put(`${proxy}/api/hostels/review/update/${existingReview[0].id}`, review, { withCredentials: true })
                dispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Review updated successfully", status: "success" } })
                reFetchData()
            } catch (err) {
                dispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Error reviewing the hostel", status: "error" } })
            }
        } else if (existingReview.length === 0 && comment.length > 0) {
            try {
                const response = await axios.post(`${proxy}/api/hostels/review/${hostelInfo.id}`, review, { withCredentials: true })
                dispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Reviewed successfully", status: "success" } })
                reFetchData()
            } catch (err) {
                dispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Error reviewing the hostel", status: "error" } })
            }
        }
    }

    const reportReview = async (review_id) => {
        try {
            if (user_id === null) { 
                dispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "You must be logged in first to report a review", status: "success" } })
                navigate("/login")
            }
            if(!window.confirm("Are you sure you want to report this review?")) return
            const response = await axios.put(`${proxy}/api/reviews/flag/${review_id}`, {}, { withCredentials: true })
            dispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Reported Review successfully", status: "success" } })
        } catch (err) {
            dispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Error reporting the review", status: "error" } })
        }
    }

  return (
    <Container>
        {loading ? "loading" : <Reviews>
            <h1>Reviews</h1>
            {data.map(review => {
                return (
                    <Comment key={review.id}>
                        <CommentHeading>
                            <div>
                                <h1>{review.user !== null ? review.user.username : "Anonymous"}</h1>
                                <p>{ new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(review.createdAt)) }</p>
                            </div>
                            <Star style={{"--rating": review.overall_rating}}/>
                        </CommentHeading>
                        <CommentText>
                            {review.comment}
                        </CommentText>
                        <ReportButton onClick={ () => reportReview(review.id)}>
                            <RiFolderWarningFill /> Report
                        </ReportButton>
                    </Comment>)
            }) }
            <UserReviewComponent existingReview={ existingReview } cleanlinessRating={ cleanlinessRating } setCleanlinessRating={ setCleanlinessRating } foodRating={ foodRating } setFoodRating={ setFoodRating } staffRating={ staffRating } setStaffRating={ setStaffRating } amenitiesRating={ amenitiesRating } setAmenitiesRating={ setAmenitiesRating } comment={ comment } setComment={ setComment } handleSubmitReview={ handleSubmitReview } />
        </Reviews>}
    </Container>
  )
}

export default HostelReviewsAndComments