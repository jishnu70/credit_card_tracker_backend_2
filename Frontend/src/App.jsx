import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import DashBoard from './components/DashBoard/DashBoard'
import './App.css'
import Profile from './components/Profile/Profile'
import { Routes, Route } from "react-router-dom"
// import ProtectedRoute from './ProtectedRoute'
import CardsCarrousel from './components/CreditCards/CardsCarrousel'
import LandingPage from './components/LandingPage/LandingPage'
import Login from "./components/Login/Login"
import NotFound from "./components/Login/NotFound"
import Register from "./components/Login/Register"
import api from './Api/axios'

export const u = 12

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchCardData = async () => {
      const result = await api.get("/api/get-cards/").then((res) => res.data).then((data) => {
        setData(data)
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      })
    }
    fetchCardData()
  }, [])

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
      <NavBar />
      <Routes>
        <Route key={0} path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route key={1} path="/Home" element={<Home />} />
        <Route key={3} path="/ReCredit" element={<CardsCarrousel />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route key={4} path="/LPage" element={<LandingPage />} /> */}
      </Routes>
    </div>
  )
}

export default App
