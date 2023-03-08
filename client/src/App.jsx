import React from 'react'
import {Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import UserRegistrationPage from './Pages/UserRegistrationPage'
import HostelRegistrationPage from './Pages/HostelRegistrationPage'
import HostelSearchResultPage from './Pages/HostelSearchResultPage'
import HostelIndividualPage from './Pages/HostelIndividualPage';
import LoginPage from './Pages/LoginPage'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import ForgotPasswordSentSuccess from './Pages/ForgotPasswordSentSuccess';
import SetNewPassword from './Components/SetNewPassword'
import AdminDashboardPage from './Pages/AdminDashboardPage'
import AdminDashboardUserComponent from './Components/AdminDashboardUserComponent'
import AdminDashboardHostelComponent from './Components/AdminDashboardHostelComponent'
import UserVerificationDashboard from './Components/UserVerificationDashboard';
import HostelVerificationDashboard from './Components/HostelVerificationDashboard'
import ReviewVerification from './Components/ReviewVerification'
import UserDashboardPage from './Pages/UserDashboardPage';
import UserDashboardPasswordComponent from './Components/UserDashboardPasswordComponent'
import UserDashboardHostelsComponent from './Components/UserDashboardHostelsComponent'
import UserDashboardHostelEdit from './Components/UserDashboardHostelEdit';
import NotFoundPage from './Pages/NotFoundPage'
import AdminDashboardFeaturedHostels from './Components/AdminDashboardFeaturedHostels';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage/>} />
      <Route path="/" element={<HomePage/>} />
      <Route path="/hostels" element={<HostelSearchResultPage />} />
      <Route path="/hostels/:id" element={<HostelIndividualPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/forgotpassword/success" element={<ForgotPasswordSentSuccess/>} />
      <Route path="/newpassword/:tokenId" element={<SetNewPassword />} />
      <Route path="/register/user" element={<UserRegistrationPage/>} />
      <Route path="/register/hostel" element={<HostelRegistrationPage/>} />
      <Route path="/admin" element={<AdminDashboardPage/>} >
        <Route path="userverification" element={<UserVerificationDashboard />} />
        <Route path="hostelverification" element={<HostelVerificationDashboard />} />
        <Route path="feedback" element={<ReviewVerification />} />
        <Route path="users" element={<AdminDashboardUserComponent/>} />
        <Route path="hostels" element={<AdminDashboardHostelComponent/>} />
        <Route path="featured" element={<AdminDashboardFeaturedHostels />} />
      </Route>
      <Route path="/user" element={<UserDashboardPage/>} >
        <Route path="changepassword" element={<UserDashboardPasswordComponent/>} />
        <Route path="hostels" element={<UserDashboardHostelsComponent/>} />
        <Route path="hostels/:id" element={<UserDashboardHostelEdit />} />
      </Route>
    </Routes>
  )
}

export default App