import React from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import styled from 'styled-components'
import DashboardSidebarAdmin from '../Components/DashboardSidebarAdmin'
import AdminDashboardHomeComponent from '../Components/AdminDashboardHomeComponent'
import NavAndSidebar from '../Components/NavAndSidebar'
import PromptBar from '../Components/PromptBar'
import NotificationBar from './../Components/NotificationBar';

const Wrapper = styled.div`
    display: flex;
    width:100%;
    margin: 0 auto;
`
const Content = styled.div`
    flex: 5;

    @media (max-width: 768px) {
        flex: 6;
    }
`

const AdminDashboardPage = () => {
    const location = useLocation()
  return (
    <>
    <PromptBar />
    <NotificationBar />
    <NavAndSidebar/>
    <Wrapper>
        <DashboardSidebarAdmin />
        <Content>
            {location.pathname === '/admin' ? <AdminDashboardHomeComponent/> : <Outlet/>}
        </Content>
    </Wrapper>
    </>
  )
}

export default AdminDashboardPage