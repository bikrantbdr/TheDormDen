import React from 'react'
import {Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import UserRegistrationPage from './Pages/UserRegistrationPage'
import HostelRegistrationPage from './Pages/HostelRegistrationPage'
import HostelSearchResultPage from './Pages/HostelSearchResultPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/hostels" element={<HostelSearchResultPage />} />
      <Route path="/register/user" element={<UserRegistrationPage/>} />
      <Route path="/register/hostel" element={<HostelRegistrationPage/>} />
    </Routes>
  )
}

export default App