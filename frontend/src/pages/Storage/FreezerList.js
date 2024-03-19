import axios from "axios";
import "./storage.css"
import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { handleDelete, refreshObjectList } from "../../components/API/GetListOrDelete";
import NestedMenu from "./NestedMenu";
import AuthContext from '../../context/AuthContext'

export default function FreezerList() {
    const [FreezerList, seFreezerList] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
        refreshObjectList(seFreezerList, `/api/storage/`, authTokens)
        document.title = 'Морозильники';
      }, []);
    
    const getCSRFToken = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
      }
    
    const handleDeleteClick = (obj_id) => {
        handleDelete(`/api/storage/freezer/${obj_id}/delete/`, seFreezerList, `/api/storage/`, authTokens);
    };

    return (
        <main className="container">
             <NestedMenu />
            <div className="features">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table_list_property">Название</th>
                            <th className="table_list_property">Этаж</th>
                            <th className="table_list_property">Номер</th>
                            <th className="table_list_property">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FreezerList && FreezerList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/storage/freezer/${item.id}/`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value">{item.floor}</td>
                                <td className="table_list_value">{item.id_freezer}</td>
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