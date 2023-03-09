import React from 'react'
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { useFetch } from './../hooks/useFetch';
import axios from 'axios';
import { PromptContext } from '../context/PromptContext';
import { NotificationContext } from './../context/NotificationContext';

import { Wrapper, ViewButton, ActionButtons, VerifyButton, DeleteButton } from './UserVerificationDashboard';
import ReviewComponentModal from './ReviewComponentModal';
import { AuthContext } from '../context/AuthContext';
import { proxy } from '../assets/proxy';

const VerifiedButton = styled.button`
    padding: 5px;
    border: none;
    border-radius: 5px;
    color: green;
    background-color: rgba(0, 128, 0, 0.151);
`

const UnverifiedButton = styled.button`
    padding: 5px;
    border: none;
    border-radius: 5px;
    color: orange;
    background-color: rgba(255, 165, 0, 0.151);
`

const UserDashBoardComment = () => {
    const [showModal, setShowModal] = useState(false);
    const [rows, setRows] = useState([])
    const { user_id } = useContext(AuthContext);
    const { data, loading, error, reFetchData } = useFetch(`${proxy}/api/reviews/user/${user_id}`)

    useEffect(() => {
        setRows(data)
        console.log(data)
    }, [data])

    const { status, dispatch } = useContext(PromptContext);
    const { dispatch: notificationDispatch } = useContext(NotificationContext)

    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(`${proxy}/api/reviews/remove/${reviewId}/${user_id}`, {withCredentials: true})
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Review successfully deleted", status: "success" } })
            reFetchData()
        } catch (error) {
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: `${error.response.data.error}`, status: "error" } })
        }
    }

    const [cleanlinessRating, setCleanlinessRating] = useState(0)
    const [foodRating, setFoodRating] = useState(0)
    const [staffRating, setStaffRating] = useState(0)
    const [amenitiesRating, setAmenitiesRating] = useState(0)
    const [comment, setComment] = useState("")
    const showReview = async (reviewId) => {
        setCleanlinessRating(data.filter(review => review.id === reviewId)[0].cleanliness)
        setFoodRating(data.filter(review => review.id === reviewId)[0].food)
        setStaffRating(data.filter(review => review.id === reviewId)[0].staff)
        setAmenitiesRating(data.filter(review => review.id === reviewId)[0].amenities)
        setComment(data.filter(review => review.id === reviewId)[0].comment)
        setShowModal(true)
    }

    const columns = [
        {
            field: 'user',
            headerName: 'Username',
            width: 130,
            renderCell: (params) => (
                <>{params.row.user.username || "Anonymous"}</>)
        },
        {
            field: 'verification',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => (
                <>{params.row.user.usertype.is_verified ? <VerifiedButton>Verified User</VerifiedButton> : <UnverifiedButton>Unverified User</UnverifiedButton>}</>)
        },
        {
            field: 'hostel',
            headerName: 'Hostel Name',
            width: 160,
            renderCell: (params) => (
                <>{params.row.hostel.name}</>)
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 130,
            renderCell: (params) => (
                <>{ new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(params.row.createdAt)) || "date_unavailable" }</>)
        },
        {
            field: 'comment',
            headerName: 'Comment',
            width: 230,
            renderCell: (params) => (
                <div style={{display:"flex", justifyContent:"space-between", width: "100%"}}><p>{params.row.comment.substring(0,15)}..</p><ViewButton onClick={ () => showReview(params.row.id)}>View more</ViewButton></div>)
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => (
              <ActionButtons>
                <DeleteButton onClick={() => deleteReview(params.row.id)}>Delete</DeleteButton>
              </ActionButtons>
            )
        }
    ]

  return (
    <Wrapper>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
        />
        {showModal && <ReviewComponentModal setShowModal={ setShowModal} cleanlinessRating={ cleanlinessRating } setCleanlinessRating={ cleanlinessRating } amenitiesRating={ amenitiesRating } setAmenitiesRating={ amenitiesRating } staffRating={ staffRating } setStaffRating={ staffRating } foodRating={ foodRating } setFoodRating={ foodRating } comment={ comment } setComment={ comment }/>}
    </Wrapper>
  )
}

export default UserDashBoardComment