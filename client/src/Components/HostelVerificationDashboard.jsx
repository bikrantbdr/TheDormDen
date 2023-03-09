import React from 'react'
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { useFetch } from './../hooks/useFetch';
import axios from 'axios';

import { NotificationContext } from './../context/NotificationContext';

import DocumentImageModal from './DocumentImageModal';
import { Wrapper, ViewButton, ActionButtons, VerifyButton, DeleteButton } from './UserVerificationDashboard';
import { proxy } from '../assets/proxy';

const HostelVerificationDashboard = () => {
    const [rows, setRows] = useState([])
    const { data, loading, error, reFetchData } = useFetch(`${proxy}/api/hostels/unverified`)

    useEffect(() => {
        setRows(data)
    }, [data])

    const [showModal, setShowModal] = useState(false)
    const [documentImage, setDocumentImage] = useState(null)
    const showDocument = (document) => {
        setDocumentImage(document)
        setShowModal(true)
    }

    const { dispatch: notificationDispatch } = useContext(NotificationContext)
    const verifyHostel = async (hostelId) => {
        const data = {
            "verified": true
        }
        try {
          if (!window.confirm("Are you sure you want to verify this hostel?")) return
            const response = await axios.put(`${proxy}/api/hostels/update/${hostelId}`, data, { withCredentials: true })
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Hostel successfully Verified", status: "success" } })
            reFetchData()
        } catch (error) {
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Hostel couldn't be verified", status: "error" } })
        }
    }

    const deleteHostel = async (hostelId) => {
        try {
            if (!window.confirm("Are you sure you want to delete this hostel?")) return
            const response = await axios.delete(`${proxy}/api/hostels/delete/${hostelId}`, { withCredentials: true })
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Hostel successfully deleted", status: "success" } })
            reFetchData()
        } catch (error) {
            notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "Hostel couldn't be deleted", status: "error" } })
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