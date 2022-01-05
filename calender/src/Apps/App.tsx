import React from 'react';
import LandingPage from './Calender/LandingPage';
import './../design/ui-design.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calender from './Calender/components/Calender/Calender';
import Login from './Calender/components/Login/Login';
import Reports from './Reports/Reports';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/calender" element={<Calender />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
