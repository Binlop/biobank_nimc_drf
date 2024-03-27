// App.js
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext'

import Navbar from "./components/Navbar/Navbar";
import AsideBar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import Laboratory from "./pages/Laboratory/Laboratory";
import LoginPage from './pages/LoginPage/LoginPage';
import Family from "./pages/Family/Family";
import Individ from "./pages/Individ/Individ";
import Sample from "./pages/Sample/Sample";
import Storage from "./pages/Storage/Storage";

import "./App.css"; // Подключаем стили
import PrivateRoute from './utils/PrivateRoute'

import SampleDetail from "./pages/Sample/SampleDetail";
import SampleCreate from "./pages/Sample/SampleCreate";
import SampleUpdate from "./pages/Sample/SampleUpdate";

function App() {
    return (
        <div className="all_page">

        <Router>
            <AuthProvider>
                <div className="header"><Navbar /></div>
                <div className="left_bar"><AsideBar /></div>
                    <Routes>
                        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />                
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/laboratories/*" element={<PrivateRoute><Laboratory/></PrivateRoute>} />
                        <Route path="/families/*" element={<PrivateRoute><Family/></PrivateRoute>} />
                        <Route path="/individs/*" element={<PrivateRoute><Individ/></PrivateRoute>} />

                        <Route path="/samples/aliquot/:id/" element={<SampleDetail />} />
                        <Route path="/samples/aliquot/create/" element={<SampleCreate page_title="Добавить аликвоту" apiPath="/api/sample/aliquot/create/" />} />
                        <Route path="/samples/aliquot/:id/update/" element={<SampleUpdate page_title="Изменить аликвоту" />} />

                        <Route path="/samples/*" element={<PrivateRoute><Sample/></PrivateRoute>} />
                        <Route path="/storage/*" element={<PrivateRoute><Storage/></PrivateRoute>} />

                    </Routes>
            </AuthProvider>
        </Router>
        </div>
    );
}
 
export default App;