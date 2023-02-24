import { useState } from "react";
import styled from 'styled-components'

import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import {AiOutlineDelete as DeleteOutline } from "react-icons/ai";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  width: 80%;
  height: 100%;
`

const User = styled.div`
display: flex;
  align-items: center;
`
const UserImg= styled.img`
width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`

const Edit = styled.button`
  border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
`







const AdminDashboardUserComponent = () => {
  const rows = [
    {
      id: 1,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      usertype: "admin",
      gender : "Female"
    },
    {
      id: 2,
      username: "Jon Snow",
      avatar:
        "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "jon@gmail.com",
      status: "active",
      usertype: "user",
      gender:"Male"
    }
  ];
  const [data, setData] = useState(rows);
  const [pageSize, setPageSize] = useState(25);
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <User>
            <UserImg src={params.row.avatar} alt="" />
            {params.row.username}
          </User>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "usertype",
      headerName: "User Type",
      width: 110,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 110,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <Edit>Edit</Edit>
            </Link>
            <DeleteOutline
              style={{ color: "red",
                cursor: "pointer"}}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };



  return (
    <Wrapper>
      <Container>
      <DataGrid rows={data} columns={columns} pageSize={pageSize} onPageSizeChange={(newPage) => setPageSize(newPage)}/>
      </Container>
    </Wrapper>
  )
}

export default AdminDashboardUserComponent