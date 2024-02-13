import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import "./navbar.css"; // Подключаем стили
import logo from './nimc_logo.png'; // Путь к изображению
import AuthContext from '../../context/AuthContext'


const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Логотип платформы" />
        <Link to="/">SIB NIMC Biobank</Link>
      </div>
      <div className="login">
            {user && <p>{user.username}</p>}
            {user ? (
                <span onClick={logoutUser}>Выйти</span>
            ) : (
                <p><Link to="/login" >Войти</Link></p>
            )}
      </div>
    </nav>
  );
};

export default Navbar;

