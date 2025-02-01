import React, { useEffect, useState } from 'react'
import NavBar from './components/Navbar/NavBarComponent'
import DashBoard from './components/DashBoard/DashBoardComponent'
import './App.css'
import Profile from './components/Profile/Profile'
import { Routes, Route, Navigate } from "react-router-dom"
// import ProtectedRoute from './ProtectedRoute'
import CardsCarrousel from './components/CreditCards/CardsCarrousel'
import LandingPage from './components/LandingPage/LandingPage'
import Login from "./components/Login/Login"
import NotFound from "./components/Login/NotFound"
import Register from "./components/Login/Register"
import api from './Api/axios'
import Charts from './components/charts/Charts'
import ProtectedRoute from './ProtectedRoute'

export const u = 12

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function Home() {
  return (
    <>
      <DashBoard />
      <Profile />
    </>
  )
}

function App() {
  return (
    <div className="father-app">
      {/* <NavBar /> */}
      <Routes>
        <Route key={0} path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route key={1} path="/Home" element={<ProtectedRoute><><NavBar/><Home /></></ProtectedRoute>} />
        <Route key={3} path="/ReCredit" element={<ProtectedRoute><><NavBar/><CardsCarrousel /></></ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
        <Route key={5} path="/charts" element={<ProtectedRoute><><NavBar/><Charts /></></ProtectedRoute>} />
        {/* <Route key={4} path="/LPage" element={<LandingPage />} /> */}
      </Routes>
    </div>
  )
}

export default App
