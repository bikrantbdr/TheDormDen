import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import {Routes, Route, Navigate } from 'react-router-dom'
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

import jwt_decode from "jwt-decode";
import UserDashBoardComment from './Components/UserDashBoardComment'
    
const App = () => {
    const { user_id, token } = useContext(AuthContext);
    
    const ProtectedRoute = ({ children }) => {
      if (user_id === null) {
        return <Navigate to="/login" />;
      }
        return children;
    }

    const AdminProtectedRoute = ({ children }) => {
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        if (!decoded.isAdmin) {
          return <Navigate to="/user" />;
        }
        return children;
      } catch (error) {
        return <Navigate to="/login" />;
      }
    }
    
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
      <Route path="/admin" element={<AdminProtectedRoute><AdminDashboardPage/></AdminProtectedRoute>} >
        <Route path="userverification" element={<UserVerificationDashboard />} />
        <Route path="hostelverification" element={<HostelVerificationDashboard />} />
        <Route path="feedback" element={<ReviewVerification />} />
        <Route path="users" element={<AdminDashboardUserComponent/>} />
        <Route path="hostels" element={<AdminDashboardHostelComponent/>} />
        <Route path="featured" element={<AdminDashboardFeaturedHostels />} />
      </Route>
      <Route path="/user" element={<ProtectedRoute><UserDashboardPage/></ProtectedRoute>} >
        <Route path="changepassword" element={<UserDashboardPasswordComponent/>} />
        <Route path="hostels" element={<UserDashboardHostelsComponent/>} />
        <Route path="hostels/:id" element={<UserDashboardHostelEdit />} />
        <Route path='reviews' element={<UserDashBoardComment/>} />
        <Route path="register/hostel" element={<HostelRegistrationPage/>} />
      </Route>
    </Routes>
  )
}

export default App