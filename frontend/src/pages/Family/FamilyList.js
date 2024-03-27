import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { handleDelete, refreshObjectList } from "../../components/API/GetListOrDelete";
import "./family.css"

export default function FamilyList() {
    const [familyList, setFamilyList] = useState([]);

    useEffect(() => {
        refreshObjectList(setFamilyList, `/api/family/`)
        document.title = 'Семьи';
      }, []);
    
    const handleDeleteClick = (item) => {
        handleDelete(`/api/family/${item.id}/`, setFamilyList,`/api/family/`)
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