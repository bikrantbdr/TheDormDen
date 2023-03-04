import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { useFetch } from './../hooks/useFetch';
import axios from 'axios';

import DocumentImageModal from './DocumentImageModal';

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
    const { data, loading, error, reFetchData } = useFetch(`http://localhost:5000/api/users/unverified`)

    useEffect(() => {
      setRows(data)
    }, [data])

    const verifyUser = async (userId) => {
      const data = {
        "usertype.is_verified": true
      }
      try {
        const response = await axios.put(`http://localhost:5000/api/users/update/${userId}`, data, { withCredentials: true })
        reFetchData()
      } catch (error) {
        console.log(error)
      }
    }

    const deleteUser = async (userId) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        console.log("User deleted")
      } else {
        return null
      }

      try {
        const response = await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, { withCredentials: true })
        reFetchData()
      } catch (error) {
        console.log(error)
      }
    }
    
    const showDocument = (document) => {
      setDocumentImage(document)
      setShowModal(true)
    }

    const columns = [
      { field: 'username', headerName: 'Username', width: 130 },
      { field: 'email', headerName: 'Email Address', width: 200},
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
    <Wrapper>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
        {showModal && <DocumentImageModal showModal={ showModal} setShowModal={ setShowModal } documentImage={ documentImage }/>}
    </Wrapper>
  )
}

export default UserVerificationDashboard