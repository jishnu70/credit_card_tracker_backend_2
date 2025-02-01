import React, { useEffect, useState } from 'react';
import NavBar from '@components/NavBar/NavBarComponent';  // Updated import
import DashBoard from '@components/DashBoard/DashBoardComponent'; // Updated import
import './App.css';
import Profile from '@components/Profile/Profile';  // Updated import
import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from '@components/ProtectedRoute'; // If you have it under components
import CardsCarrousel from '@components/CreditCards/CardsCarrousel'; // Updated import
import LandingPage from '@components/LandingPage/LandingPage'; // Updated import
import Login from '@components/Login/Login';  // Updated import
import NotFound from '@components/Login/NotFound'; // Updated import
import Register from '@components/Login/Register'; // Updated import
import api from '@api/axios'; // Updated import
import Charts from '@components/charts/Charts'; // Updated import
import ProtectedRoute from './ProtectedRoute'; // Updated import

export const u = 12;

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function Home() {
  return (
    <>
      <DashBoard />
      <Profile />
    </>
  );
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
  );
}

export default App;
