import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AppointmentForm from './pages/AppointmentForm';
import { AuthProvider } from './context/AuthContext';
import './i18n';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:doctorId" element={<AppointmentForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;