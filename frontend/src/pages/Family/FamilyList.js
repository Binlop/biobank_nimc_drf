import Modal from "../Modal";
import axios from "axios";
import "./family.css"
import { Routes,     BrowserRouter as Router,
  Route, Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../../context/AuthContext'
import { handleDelete, refreshObjectList } from "../../components/API/GetListOrDelete";

export default function FamilyList() {
    const [familyList, setFamilyList] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
        refreshObjectList(setFamilyList, `/api/family/`, authTokens)
        document.title = 'Семьи';
      }, []);
    
    const getCSRFToken = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
      }
    
    const handleDeleteClick = (item) => {
        handleDelete(`/api/family/${item.id}/`, setFamilyList,`/api/family/`, authTokens)
      };;
    
    
    return (
        <main className="container">
            <div className="title_object">
                <p>
                    <span className="larger-text">Семьи </span>
                    <Link to="/families/create" className="btn btn-primary">
                        Добавить семью
                    </Link> 
                </p>
            </div>
            <div className="features">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table_list_property">Название</th>
                            <th className="table_list_property">Описание</th>
                            <th className="table_list_property">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {familyList && familyList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/families/${item.id}`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value">{item.description}</td>
                                <td className="table_list_value">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteClick(item.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}