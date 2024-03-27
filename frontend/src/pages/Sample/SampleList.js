import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { handleDelete, refreshObjectList } from "../../components/API/GetListOrDelete";
import "./sample.css"

export default function SampleList() {
    const [sampleList, setSampleList] = useState([]);

    useEffect(() => {
        refreshObjectList(setSampleList, `/api/sample/`)
        document.title = 'Образцы';
      }, []);

    const handleDeleteClick = (sample_id) => {
        handleDelete(`/api/sample/${sample_id}/delete/`, setSampleList, `/api/sample/`);
    };

    return (
        <main className="container">
               <div className="title_object">
                <p>
                <span className="larger-text">Образцы</span></p>
                </div>
            <div className="features">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table_list_property">Название</th>
                            <th className="table_list_property">Индивид</th>
                            <th className="table_list_property">Место хранения</th>
                            <th className="table_list_property">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleList && sampleList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/samples/${item.sampletype}/${item.sample.id}/`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value"><Link to={`/individs/${item.individ.individ_type}/${item.individ.individ.id}`} className="link-style">{item.individ.name}</Link></td>
                                <td className="table_list_value"><Link to={`/storage/box/${item.location.box}/`} className="link-style">{item.location.name}</Link></td>
                                <td className="table_list_value">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteClick(item.sample.id)}
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