import React from 'react'
import {Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import UserRegistrationPage from './Pages/UserRegistrationPage'
import HostelRegistrationPage from './Pages/HostelRegistrationPage'
import HostelSearchResultPage from './Pages/HostelSearchResultPage'
import HostelIndividualPage from './Pages/HostelIndividualPage';
import AdminDashboardPage from './Pages/AdminDashboardPage'
import AdminDashboardHomeComponent from './Components/AdminDashboardHomeComponent'
import AdminDashboardUserComponent from './Components/AdminDashboardUserComponent'
import AdminDashboardHostelComponent from './Components/AdminDashboardHostelComponent'
import LoginPage from './Pages/LoginPage'
import UserVerificationDashboard from './Components/UserVerificationDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/hostels" element={<HostelSearchResultPage />} />
      <Route path="/hostels/:id" element={<HostelIndividualPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/user" element={<UserRegistrationPage/>} />
      <Route path="/register/hostel" element={<HostelRegistrationPage/>} />
      <Route path="/admin" element={<AdminDashboardPage/>} >
        {/* <Route path="/" element={<AdminDashboardHomeComponent/>} /> */}
        <Route path="userverification" element={<UserVerificationDashboard />} />
        <Route path="users" element={<AdminDashboardUserComponent/>} />
        <Route path="hostels" element={<AdminDashboardHostelComponent/>} />
      </Route>
    </Routes>
  )
}

export default App