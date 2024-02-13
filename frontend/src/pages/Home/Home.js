import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import "./home.css"

const Home = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState([])

    useEffect(() => {
        document.title = 'Главная страница';
        getProfile()
    }, []);
    
    const getProfile = async() => {
        let response = await fetch('http://127.0.0.1:8000/user/profile/', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            setProfile(data)
        } else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }

    return (
        <div className="features">
            <p>Добро пожаловать в биобанк платформы W_VI</p>
            {/* Временная текстовая заглушка */}
            <p>Пользователь: {profile.first_name} {profile.last_name}</p>
        </div>
    );
};

export default Home;
