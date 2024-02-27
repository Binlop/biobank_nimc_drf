import axios from "axios";
import "./sample.css"
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { handleDelete, refreshList } from "../../components/API/GetListOrDelete";
import NestedMenu from "./NestedMenu";

export default function SampleList() {
    const [IndividList, seIndividList] = useState([]);

    useEffect(() => {
        const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
        refreshList(seIndividList, `/api/sample/`)
        document.title = 'Образцы';
      }, []);
    
    const getCSRFToken = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
      }
    
    const handleDeleteClick = (sample_id) => {
        handleDelete(sample_id, () => refreshList(`api/sample/${sample_id}/`, seIndividList));
    };

    return (
        <main className="container">
             <NestedMenu />
            <div className="features">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table_list_property">Название</th>
                            <th className="table_list_property">Индивид</th>
                            <th className="table_list_property">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {IndividList && IndividList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/samples/${item.sampletype}/${item.sample.id}/`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value"><Link to={`/individs/${item.individ.individ_type}/${item.individ.individ.id}`} className="link-style">{item.individ.name}</Link></td>
                                <td className="table_list_value">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteClick(item)}
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