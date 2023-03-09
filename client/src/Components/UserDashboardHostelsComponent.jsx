import {useEffect, useState} from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import styled from 'styled-components'
import axios from 'axios'

import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import {AiOutlineDelete as DeleteOutline } from "react-icons/ai";
import { proxy } from '../assets/proxy'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
const Container = styled.div`
    height: 100%;
    width: 100%;
`
const Edit = styled.button`
    border: none;
    border-radius: 4px;
    padding: 4px 12px;
    background-color: #3bb077;
    color: white;
    cursor: pointer;
    margin-left: 12px;
    font-weight: 500;
`
const Verified = styled.button`
    border: 1px solid green;
    border-radius: 10px;
    padding: 8px 20px;  
`
const Notverified = styled.button`
    border-radius: 10px;
    padding: 8px 20px;
    border:1px solid crimson;
    color: #000;
`

const EditButton = styled.button`
    border: none;
    border-radius: 4px;
    font-weight: 500;
    padding: 4px 12px;
    background-color: orange;
    color: white;
    cursor: pointer;
`

const UserDashboardHostelsComponent = () => {
    const {user_id} = useContext(AuthContext)
    const [pageSize, setPageSize] = useState(25);
    const [hostels, setHostels] = useState([])

    const [rows, setRows] = useState([])

    useEffect(() => {
        console.log(user_id)
        axios.get(`${proxy}/api/users/${user_id}`)
        .then(res => {
            setHostels(res.data.hostel_listings)
            console.log(res.data.hostel_listings)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
   

    const columns = [
        {field:"name",headerName:"Hostel",width:200},
        { field: "hostel_rating", headerName: "Rating", width: 80,
          renderCell: (params) => (
            <span> {Math.floor(params.row.hostel_rating)} </span>
          )},
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
            field: "Verification",
            headerName: "Verification",
            width: 150,
            renderCell: (params) => {
                return (
                    <span>
                    {params.row.verified == true ? <Verified>Verified</Verified> : <Notverified>Not Verified</Notverified> }
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
                <Link to={"/user/hostels/" + params.row.id}>
                  <EditButton>Edit</EditButton>
                </Link>
                <Link to={"/hostels/" + params.row.id}>
                  <Edit>View</Edit>
                </Link>
              </>
            );
          },
        },
      ];

  return (
    <Wrapper>
        <Container>
            
            <DataGrid rows={hostels} columns={columns} pageSize={pageSize} onPageSizeChange={(newPage) => setPageSize(newPage)}/>
            </Container>
    </Wrapper>
  )
}

export default UserDashboardHostelsComponent