import axios from "axios";
import "./individ.css"
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NestedMenu from './NestedMenu'; // Импортируем компонент NestedMenu

export default function IndividList() {
    const [IndividList, seIndividList] = useState([]);

    useEffect(() => {
        const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
        refreshList()
        document.title = 'Индивиды';
      }, []);
    
    const getCSRFToken = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
      }
    
    const handleDelete = (item) => {
        axios
          .delete(`/api/individ/${item.individ.id}/delete`)
          .then((res) => refreshList());
      };


    const refreshList = () => {
        axios
          .get("/api/individ/")
          .then((res) => {
            seIndividList(res.data)
        })
          .catch((err) => console.log(err));
      };    
    return (
        <main className="container">
             <NestedMenu />
            <div className="features">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table_list_property">Название</th>
                            <th className="table_list_property">Кол-во ДНК</th>
                            <th className="table_list_property">Кол-во хориона</th>
                            <th className="table_list_property">Кол-во крови</th>
                            <th className="table_list_property">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {IndividList && IndividList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/individs/${item.individ_type}/${item.individ.id}`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value">{item.count_dna}</td>
                                <td className="table_list_value">{item.count_chorion}</td>
                                <td className="table_list_value">{item.count_blood}</td>
                                <td className="table_list_value">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item)}
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