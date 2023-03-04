import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { useFetch } from './../hooks/useFetch';
import axios from 'axios';

import { Wrapper, ViewButton, ActionButtons, VerifyButton, DeleteButton } from './UserVerificationDashboard';
import ReviewComponentModal from './ReviewComponentModal';

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

const ReviewVerification = () => {
    const [showModal, setShowModal] = useState(false);
    const [rows, setRows] = useState([])
    const { data, loading, error, reFetchData } = useFetch(`http://localhost:5000/api/reviews/flagged`)

    useEffect(() => {
        setRows(data)
    }, [data])

    const verifyReview = async (reviewId) => {
        // do you want to verify this review?
        await axios.put(`http://localhost:5000/api/reviews/verify/${reviewId}`)
        reFetchData()
    }

    const deleteReview = async (reviewId) => {
        // do you want to delete this review?
        await axios.delete(`http://localhost:5000/api/reviews/remove/${reviewId}`)
        reFetchData()
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
            width: 120,
            renderCell: (params) => (
                <>{params.row.user.username || "Anonymous"}</>)
        },
        {
            field: 'verification',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => (
                <>{params.row.user.usertype.is_verified ? <VerifiedButton>Verified User</VerifiedButton> : <UnverifiedButton>Unverified User</UnverifiedButton>}</>)
        },
        {
            field: 'hostel',
            headerName: 'Hostel Name',
            width: 200,
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
                <VerifyButton onClick={() => verifyReview(params.row.id)}>Verify</VerifyButton>
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

export default ReviewVerification