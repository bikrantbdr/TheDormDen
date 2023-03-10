import {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import {AiOutlineDelete as DeleteOutline } from "react-icons/ai";
import { NotificationContext } from '../context/NotificationContext';
import { proxy } from '../assets/proxy';


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

const AdminDashboardHostelComponent = () => {
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const baseURL = proxy

  const { dispatch } = useContext(NotificationContext)

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setError(false)
        setHostels([])
        setLoading(true)
        const { data } = await axios.get(`${baseURL}/api/hostels/all`)
        setHostels(data)
        console.log(data[0])
      } catch (error) {
        setError(error.response.data.message)
      }
      setLoading(false)
    }
    fetchHostels()
  }, [])

  
  const [pageSize, setPageSize] = useState(25);
  
  const columns = [
    {field:"name",headerName:"Hostel",width:200},
    { field: "hostel_rating", headerName: "Rating", width: 60,
      renderCell: (params) => (
        <span> {Math.floor(params.row.hostel_rating)} </span>
      )},
    {
      field: "owner",
      headerName: "Owner",
      width: 200,
      renderCell: (params) => {
        return (
          <User>
            <UserImg src={params.row.owner.profile.profile_picture} alt="" />
            {params.row.owner.username}
          </User>
        );
      },
    },
    {
      field: "for_gender",
      headerName: "Gender",
      width: 110,
      renderCell: (params) => {
        return (
          <span>
            {params.row.for_gender == 1 ? "female": "male" }
          </span>
        )
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/hostels/" + params.row.id}>
              <Edit>View</Edit>
            </Link>
            <DeleteOutline
              style={{ color: "red",
                cursor: "pointer",
                height:"20px",
                width:"20px"
              }}
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this hostel?")) {
      return;
    }
    dispatch({ type: "NOTIFICATION_START", payload: { status: "success", message: "Hostel was deleted successfully" } });
    setHostels(hostels.filter(item => item.id !== id));
  };



  return (
    <Wrapper>
      <Container>
      <DataGrid rows={hostels} columns={columns} pageSize={pageSize} onPageSizeChange={(newPage) => setPageSize(newPage)}/>
      </Container>
    </Wrapper>
  )
}

export default AdminDashboardHostelComponent