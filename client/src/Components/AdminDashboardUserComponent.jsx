import { useState,useEffect, useContext } from "react";
import styled from 'styled-components'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import {AiOutlineDelete as DeleteOutline } from "react-icons/ai";
import { NotificationContext } from "../context/NotificationContext";
import { proxy } from "../assets/proxy";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  width: 100%;
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
    padding: 8px 20px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-right: 20px;
    font-weight: 500;
`

const AdminDashboardUserComponent = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const baseURL = proxy

  const { dispatch } = useContext(NotificationContext)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(false)
        setUsers([])
        setLoading(true)
        const { data } = await axios.get(`${baseURL}/api/users`)
        setUsers(data)
        console.log(data[0])
      } catch (error) {
        setError(error.response.data.message)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])
  const [pageSize, setPageSize] = useState(25);
  
  const columns = [
    { field: "id", headerName: "ID", width:220 },
    {
      field: "user",
      headerName: "User",
      width: 170,
      renderCell: (params) => {
        return (
          <User>
            <UserImg src={params.row.avatar} alt="" />
            {params.row.username}
          </User>
        );
      },
    },
    { field: "email", headerName: "Email", width: 220 },
    {
      field: "usertype",
      headerName: "User Type",
      width: 110,
      renderCell: (params) => {
        return (
          <span>
            {params.row.usertype.typeof_user}
          </span>
        );
      }
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 110,
      renderCell: (params) => {
        return(
          <span>
            {params.row.profile.gender==0?"Male":"Female"}
          </span>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <Edit>View</Edit>
            </Link>
            <DeleteOutline
              style={{ color: "red",
                cursor: "pointer",
                height:"20px",
                width:"20px",
                }
              }
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    if (!window.confirm("Do you want to delete this user?")) {
      return
    }
    setUsers(users.filter(item => item.id !== id));
    dispatch({ type: 'NOTIFICATION_START', payload: { message: 'User Deleted Successfully', status: 'success' } });
  };



  return (
    <Wrapper>
      <Container>
      <DataGrid rows={users} columns={columns} pageSize={pageSize} onPageSizeChange={(newPage) => setPageSize(newPage)}/>
      </Container>
    </Wrapper>
  )
}

export default AdminDashboardUserComponent