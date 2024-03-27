import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { handleDelete, refreshObjectDetail } from "../../components/API/GetListOrDelete";
import "./laboratory.css"

export default function LabDetail() {
    const { id } = useParams();
    const [laboratoryDetail, setLaboratoryDetail] = useState(null);

    useEffect(() => {
        refreshObjectDetail(setLaboratoryDetail, `/api/laboratory/${id}`)  
    }, []);

    return (
        <main className="container">
            <div className="title_object">
                <p>
                    {laboratoryDetail && (
                        <>
                        <span className="larger-text">{laboratoryDetail.name}</span>
                        <Link to={`/laboratories/${id}/update`} className="btn btn-primary">
                            Изменить лабораторию
                        </Link>
                        </>
                    )}
                </p>
            </div>
            <div className="features">
                {laboratoryDetail && (
                    <table>
                        <tbody>
                            <tr>
                                <td className="table_detail_property">Название</td>
                                <td className="table_detail_value">{laboratoryDetail.name}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Описание</td>
                                <td className="table_detail_value">{laboratoryDetail.description}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Тестовое поле</td>
                                <td className="table_detail_value">{laboratoryDetail.test_field}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}
