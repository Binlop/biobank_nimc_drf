import React, { useState, useEffect, useContext } from 'react'
import { refreshObjectDetail } from "../../components/API/GetListOrDelete";
import "./home.css"

const Home = () => {
    const [ profile, setProfile ] = useState([])
    
    useEffect(() => {
        refreshObjectDetail(setProfile, `/api/user/profile/`)  
        document.title = 'Главная страница';
      }, []);

    return (
        <div className="features">
            <p>Добро пожаловать в биобанк!</p>
            {/* Временная текстовая заглушка */}
            <p>Пользователь: {profile.first_name} {profile.last_name}</p>
        </div>
    );
};

export default Home;
