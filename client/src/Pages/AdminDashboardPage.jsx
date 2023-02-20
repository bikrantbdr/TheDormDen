import React from 'react'
import { Outlet,useLocation } from 'react-router-dom'
import styled from 'styled-components'
import DashboardSidebar from '../Components/DashboardSidebar'

const Wrapper = styled.div`
    display: flex;
`
const Content = styled.div`
    flex: 5;
`

const AdminDashboardPage = () => {
    const location = useLocation()
  return (
    <Wrapper>
        <DashboardSidebar />
        <Content>
            {location.pathname === '/admin' ? <h1>Admin Dashboard</h1> : <Outlet/>}
        </Content>
    </Wrapper>
  )
}

export default AdminDashboardPage