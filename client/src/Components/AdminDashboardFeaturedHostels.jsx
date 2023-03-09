import React from 'react'
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid';
import { useFetch } from './../hooks/useFetch';
import axios from 'axios';

import { ViewButton } from './UserVerificationDashboard';
import { AiTwotoneStar } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { NotificationContext } from '../context/NotificationContext';
import { proxy } from '../assets/proxy';

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Heading = styled.div`
    display: flex;
    justify-content: space-between;

    &>button {
        background-color: #3f51b5;
    }
`

const Container = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`

const Cover = styled.div`
    background: url('https://picsum.photos/500');
    height: 160px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
`

const Card = styled.div`
    height: 130px;
    margin-top: 30px;
    border-radius: 10px;
    padding: 10px;
    background-color: #f2f2f2;
    color: #000;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > h3 {
        font-size: 1.3rem;
    }
`

const Button = styled.button`
    background-color: #3f51b5;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 10px;
    cursor: pointer;
`

const Dummy = styled.div`
    background-color: #f2f2f2;
    height: 160px;
    border-radius: 10px;
    border: 1px dashed #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #ccc;
    font-size: 1.2rem;
`

const AdminDashboardFeaturedHostels = () => {
    const [rows, setRows] = useState([])
    
    const {data, loading, error} = useFetch(`${proxy}/api/hostels/all`)
    const { data: featuredData, loading: featuredLoading, error: featuredError, reFetchData } = useFetch(`http://localhost:5000/api/hostels/featured`)

    const { dispatch } = useContext(NotificationContext)
    
    useEffect(() => {
        setRows(data)
    }, [data])

    const columns = [
        {field: 'name', headerName: 'Hostel Name', width: 200},
        {field: 'id', headerName: 'Hostel Id', width: 200},
        {
            field: 'owner',
            headerName: 'Owner',
            width: 200,
            renderCell: (params) => {
                return (
                    <p>{params.row.owner.username}</p>
                )
            }
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 100,
            renderCell: (params) => {
                return (
                    <p>{new Date(params.row.createdAt).toLocaleDateString()}</p>
                )
            }
        },
        {
            field: 'feature',
            headerName: 'Feature',
            width: 100,
            renderCell: (params) => {
                return (
                    <ViewButton onClick={ () => featurehostel(params.row.id) }>Feature</ViewButton>
                )
            }
        }
    ]

    const unfeaturehostel = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to remove this hostel from featured?")) {
                return
            }
            const res = await axios.post(`${proxy}/api/hostels/unfeatured/${id}`, { withCredentials: true })
            dispatch({type: "NOTIFICATION_START", payload: {status: "success", message: "Hostel removed from featured successfully"}})
            reFetchData()
        } catch (error) {
            dispatch({type: "NOTIFICATION_END", payload: {status: "error", message: "Hostel could not be removed from featured"}})
        }
    }

    const unfeatureAll = async () => {
        try {
            if(!window.confirm("Are you sure you want to remove all featured hostels?")) {
                return
            }
            const res = await axios.post(`${proxy}/api/hostels/unfeatured`, { withCredentials: true })
            dispatch({type: "NOTIFICATION_START", payload: {status: "success", message: "All featured hostels removed successfully"}})
            reFetchData()
        } catch (error) {
            dispatch({type: "NOTIFICATION_START", payload: {status: "error", message: "All featured hostels could not be removed"}})
        }
    }

    const featurehostel = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to feature this hostel?")) {
                return
            }
            const res = await axios.post(`${proxy}/api/hostels/featured/${id}`, { withCredentials: true })
            dispatch({type: "NOTIFICATION_START", payload: {status: "success", message: "Hostel featured successfully"}})
            reFetchData()
        } catch (error) {
            dispatch({type: "NOTIFICATION_END", payload: {status: "error", message: "Hostel could not be featured"}})
        }
    }

  return (
    <Wrapper>
        <Heading>
            <h2>✨Featured Hostels✨</h2>
            <Button style={{backgroundColor: "orange"}} onClick={ () => unfeatureAll() }>Remove all</Button>
        </Heading>
        {featuredLoading ? "loading please wait" : <Container>
            {featuredData[0] ? <Cover>
                <Card>
                    <h3>{featuredData[0].name}</h3>
                    <p>{featuredData[0].owner.username}</p>
                    <p><AiTwotoneStar />{Math.round(featuredData[0].hostel_rating * 100) / 100} ({featuredData[0].number_of_reviews} ratings)</p>
                    <Button onClick={ () => unfeaturehostel(featuredData[0].id) }>Remove Hostel</Button>
                </Card>
            </Cover>: <Dummy><AiOutlinePlusCircle/>Add new server</Dummy>}

            {featuredData[1] ? <Cover>
                <Card>
                    <h3>{featuredData[1].name}</h3>
                    <p>{featuredData[1].owner.username}</p>
                    <p><AiTwotoneStar />{Math.round(featuredData[1].hostel_rating * 100) / 100} ({featuredData[1].number_of_reviews} ratings)</p>
                    <Button onClick={ () => unfeaturehostel(featuredData[1].id)}>Remove Hostel</Button>
                </Card>
            </Cover>: <Dummy><AiOutlinePlusCircle/>Add new server</Dummy>}

            {featuredData[2] ? <Cover>
                <Card>
                    <h3>{featuredData[2].name}</h3>
                    <p>{featuredData[2].owner.username}</p>
                    <p><AiTwotoneStar />{Math.round(featuredData[2].hostel_rating * 100) / 100} ({featuredData[2].number_of_reviews} ratings)</p>
                    <Button onClick={ () => unfeaturehostel(featuredData[2].id)}>Remove Hostel</Button>
                </Card>
            </Cover>: <Dummy><AiOutlinePlusCircle/>Add new server</Dummy>}
        </Container>}
        <h2>👏Feature Hostels👏</h2>
        <div style={{minHeight: "500px"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    </Wrapper>
  )
}

export default AdminDashboardFeaturedHostels