// App.js
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext'

import Navbar from "./components/Navbar/Navbar";
import AsideBar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import Laboratory from "./pages/Laboratory/Laboratory";
import LoginPage from './pages/LoginPage/LoginPage';

import "./App.css"; // Подключаем стили
import PrivateRoute from './utils/PrivateRoute'

function App() {
    return (
        <div className="all_page">

        <Router>
            <AuthProvider>
                <div className="header"><Navbar /></div>
                <div className="left_bar"><AsideBar /></div>
                    <Routes>
                        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />                
                        <Route path="/laboratories/*" element={<PrivateRoute><Laboratory/></PrivateRoute>} />
                        <Route path="/login" element={<LoginPage/>}/>
                    </Routes>
            </AuthProvider>
        </Router>
        </div>
    );
}
 
export default App;