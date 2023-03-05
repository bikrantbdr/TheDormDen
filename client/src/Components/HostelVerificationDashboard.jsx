import React from 'react'
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { useFetch } from './../hooks/useFetch';
import axios from 'axios';
import { PromptContext } from '../context/PromptContext';
import { NotificationContext } from './../context/NotificationContext';

import DocumentImageModal from './DocumentImageModal';
import { Wrapper, ViewButton, ActionButtons, VerifyButton, DeleteButton } from './UserVerificationDashboard';

const HostelVerificationDashboard = () => {
    const [rows, setRows] = useState([])
    const { data, loading, error, reFetchData } = useFetch(`http://localhost:5000/api/hostels/unverified`)

    useEffect(() => {
        setRows(data)
    }, [data])

    const [showModal, setShowModal] = useState(false)
    const [documentImage, setDocumentImage] = useState(null)
    const showDocument = (document) => {
        setDocumentImage(document)
        setShowModal(true)
    }

    const { status, dispatch } = useContext(PromptContext);
    const { dispatch: notificationDispatch } = useContext(NotificationContext)
    const verifyHostel = async (hostelId) => {
        const data = {
            "verified": true
        }
        notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Hostel successfully Verified", status: "success" } })
        // dispatch({ type: 'PROMPT_START', payload: { display: true, message: "Are you sure you want to verify this hostel?", purpose: "warning" } })
        try {
            const response = await axios.put(`http://localhost:5000/api/hostels/update/${hostelId}`, data, { withCredentials: true })
            dispatch({ type: 'PROMPT_END' })
            reFetchData()
        } catch (error) {
            dispatch({ type: 'PROMPT_END' })
            // notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: `${error.response.data.error}`, status: "error" } })
        }
    }

    const deleteHostel = async (hostelId) => {
      dispatch({ type: 'PROMPT_START', payload: { display: true, message: "Are you sure you want to delete this hostel?", purpose: "alert" } })
        try {
            const response = await axios.delete(`http://localhost:5000/api/hostels/delete/${hostelId}`, { withCredentials: true })
            dispatch({ type: 'PROMPT_END' })
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Hostel successfully deleted", status: "success" } })
            reFetchData()
        } catch (error) {
            dispatch({ type: 'PROMPT_END' })
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: `${error.response.data.error}`, status: "error" } })
        }
    }

    const columns = [
        { field: 'name', headerName: 'Hostel Name', width: 200},
        {
            field: 'owner',
            headerName: 'Hostel Owner',
            width: 200,
            renderCell: (params) => (
                <>{params.row.owner.username}</>
            )
        },
        { 
          field: 'createdAt',
          headerName: 'Created At',
          width: 130,
          renderCell: (params) => (
            <>{ new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(params.row.createdAt)) || "date_unavailable" }</>
          )
        },
        { 
          field: 'document',
          headerName: 'Verification Document',
          width: 160,
          renderCell: (params) => (
            <ViewButton onClick={ () => showDocument(params.row.document) }>View Document</ViewButton>
          )
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 160,
          renderCell: (params) => (
            <ActionButtons>
              <VerifyButton onClick={() => verifyHostel(params.row.id)}>Verify</VerifyButton>
              <DeleteButton onClick={() => deleteHostel(params.row.id)}>Delete</DeleteButton>
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
        {showModal && <DocumentImageModal showModal={ showModal} setShowModal={ setShowModal } documentImage={ documentImage }/>}
    </Wrapper>
  )
}

export default HostelVerificationDashboard