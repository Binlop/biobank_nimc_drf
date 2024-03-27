import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { refreshObjectList } from "../../components/API/GetListOrDelete";
import "./laboratory.css"


export default function LabList() {
    const [laboratoryList, setLaboratoryList] = useState([]);


    useEffect(() => {
        refreshObjectList(setLaboratoryList, `/api/laboratory/`)
        document.title = 'Направления';
      }, []);
    
    return (
        <main className="container">
            <div className="title_object">
                <p>
                    <span className="larger-text">Направления </span>
                </p>
            </div>            
            <div className="features">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table_list_property">Название</th>
                            <th className="table_list_property">Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laboratoryList && laboratoryList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/laboratories/${item.id}`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value">{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}