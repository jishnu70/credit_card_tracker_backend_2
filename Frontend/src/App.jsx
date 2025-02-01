import React, { useEffect, useState, Suspense } from 'react';
// Use React.lazy for all components
const NavBar = React.lazy(() => import('./components/NavBar/NavBar'));
const DashBoard = React.lazy(() => import('./components/DashBoard/DashBoard'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const CardsCarrousel = React.lazy(() => import('./components/CreditCards/CardsCarrousel'));
const LandingPage = React.lazy(() => import('./components/LandingPage/LandingPage'));
const Login = React.lazy(() => import('./components/Login/Login'));
const NotFound = React.lazy(() => import('./components/Login/NotFound'));
const Register = React.lazy(() => import('./components/Login/Register'));
const Charts = React.lazy(() => import('./components/charts/Charts'));
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import api from './Api/axios';
import ProtectedRoute from './ProtectedRoute';

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route key={0} path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route key={1} path="/Home" element={<ProtectedRoute><><NavBar /><Home /></></ProtectedRoute>} />
          <Route key={3} path="/ReCredit" element={<ProtectedRoute><><NavBar /><CardsCarrousel /></></ProtectedRoute>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />} />
          <Route key={5} path="/charts" element={<ProtectedRoute><><NavBar /><Charts /></></ProtectedRoute>} />
          {/* <Route key={4} path="/LPage" element={<LandingPage />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
