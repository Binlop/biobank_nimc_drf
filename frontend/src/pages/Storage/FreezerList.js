import axios from "axios";
import "./storage.css"
import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { handleDelete, refreshObjectList } from "../../components/API/GetListOrDelete";
import { setCSRFToken } from "../../components/API/CreateUpdate";
import NestedMenu from "./NestedMenu";

export default function FreezerList() {
    const [FreezerList, seFreezerList] = useState([]);

    useEffect(() => {
        refreshObjectList(seFreezerList, `/api/storage/`)
        document.title = 'Морозильники';
      }, []);
    
    const handleDeleteClick = (obj_id) => {
        handleDelete(`/api/storage/freezer/${obj_id}/delete/`, seFreezerList, `/api/storage/`);
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