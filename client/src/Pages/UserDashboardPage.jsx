import DashboardSidebarUser from '../Components/DashboardSideboardUser'
import UserDashboardHomeComponent from '../Components/UserDashboardHomeComponent'
import NavAndSidebar from '../Components/NavAndSidebar'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Helmet } from 'react-helmet'
import { proxy } from '../assets/proxy'
import NotificationBar from './../Components/NotificationBar';

const Wrapper = styled.div`
    display: flex;
    width:100%;
    margin: 0 auto;
`
const Content = styled.div`
    flex: 5;
`

const UserDashboardPage = () => {
    const [user, setUser] = useState(null)
    const { user_id } = useContext(AuthContext)
    // console.log(user_id)
    useEffect(() => {
        console.log(user_id)
        axios.get(`${proxy}/api/users/${user_id}`)
        .then(res => {
            setUser(res.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const location = useLocation()
  return (
    <>
    <Helmet>
        <title>Dormden | UserDashboard</title>
        <meta name="description" content="User Dashboard to manage their accound, change password, view their review and their hostel listings" />
    </Helmet>
    <NotificationBar />
    <NavAndSidebar/>
    <Wrapper>
        {user? 
        <DashboardSidebarUser user={user} />
        :null
    }
        <Content>
            {location.pathname === '/user' ? <UserDashboardHomeComponent/> : <Outlet/>}
        </Content>
    </Wrapper>
    </>
  )
}

export default UserDashboardPage