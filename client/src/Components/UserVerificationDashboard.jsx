import React from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`

const ViewButton = styled.button`
  background-color: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const VerifyButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`

const DeleteButton = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'createdAt', headerName: 'Created At', width: 130 },
    {
      field: 'userProfile',
      headerName: 'View User Profile',
      width: 130,
      renderCell: (params) => (
        <ViewButton>View Profile</ViewButton>
      )
    },
    { 
      field: 'document',
      headerName: 'Verification Document',
      width: 160,
      renderCell: (params) => (
        <ViewButton>View Document</ViewButton>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => (
        <ActionButtons>
          <VerifyButton>Verify</VerifyButton>
          <DeleteButton>Delete</DeleteButton>
        </ActionButtons>
      )
    }
]

const rows = [
  {
    id: 1,
    username: 'John Doe',
    createdAt: '2021-10-05',
  },
  {
    id: 2,
    username: 'Sandy Lama',
    createdAt: '2021-10-06',
  },
  {
    id: 3,
    username: 'Helli Copter',
    createdAt: '2021-10-09',
  }
]

const UserVerificationDashboard = () => {
  return (
    <Wrapper>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
    </Wrapper>
  )
}

export default UserVerificationDashboard