import React from 'react'
import {Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import UserRegistrationPage from './Pages/UserRegistrationPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/register/user" element={<UserRegistrationPage/>} />
    </Routes>
  )
}

export default App