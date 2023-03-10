import React from 'react'
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { useFetch } from './../hooks/useFetch';
import axios from 'axios';

import DocumentImageModal from './DocumentImageModal';
import { NotificationContext } from './../context/NotificationContext';
import { proxy } from '../assets/proxy';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`

export const ViewButton = styled.button`
  background-color: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

export const VerifyButton = styled.button`
  color: #4caf50;
  border: 1px dotted #4caf50;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`

export const DeleteButton = styled.button`
  color: #f44336;
  border: 1px dotted crimson;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`

const UserVerificationDashboard = () => {
    const [showModal, setShowModal] = useState(false)
    const [documentImage, setDocumentImage] = useState(null)

    const [rows, setRows] = useState([])
    const { data, loading, error, reFetchData } = useFetch(`${proxy}/api/users/unverified`)

    useEffect(() => {
      setRows(data)
    }, [data])


    const { dispatch: notificationDispatch } = useContext(NotificationContext)
    const verifyUser = async (userId) => {
      const data = {
        "usertype.is_verified": true
      }
      try {
        if (!window.confirm("Are you sure you want to verify this user?")) return
        const response = await axios.put(`${proxy}/api/users/verify/${userId}`, data, { withCredentials: true })
        notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "User successfully Verified", status: "success" } })
        reFetchData()
      } catch (error) {
        notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "User couldn't be verified", status: "error" } })
      }
    }

    const deleteUser = async (userId) => {

      try {
        if (!window.confirm("Are you sure you want to delete this user?")) return
        const response = await axios.delete(`${proxy}/api/users/delete/${userId}`, { withCredentials: true })
        notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "User successfully Deleted", status: "success" } })
        reFetchData()
      } catch (error) {
        notificationDispatch({ type: "NOTIFICATION_START", payload: { display: true, message: "User couldn't be deleted", status: "error" } })
      }
    }
    
    const showDocument = (document) => {
      setDocumentImage(document)
      setShowModal(true)
    }

    const columns = [
      { field: 'username', headerName: 'Username', width: 180 },
      { field: 'email', headerName: 'Email Address', width: 220},
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
          <ViewButton onClick={ () => showDocument(params.row.profile.document) }>View Document</ViewButton>
        )
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 160,
        renderCell: (params) => (
          <ActionButtons>
            <VerifyButton onClick={() => verifyUser(params.row.id)}>Verify</VerifyButton>
            <DeleteButton onClick={() => deleteUser(params.row.id)}>Delete</DeleteButton>
          </ActionButtons>
        )
      }
    ]

  return (
    <>
      <Wrapper>
          <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10]}
          />
          {showModal && <DocumentImageModal showModal={ showModal} setShowModal={ setShowModal } documentImage={ documentImage }/>}
      </Wrapper>
    </>
  )
}

export default UserVerificationDashboard