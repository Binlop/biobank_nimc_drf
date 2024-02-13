import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function LabDetail() {
    const { id } = useParams();
    const [laboratoryDetail, setLaboratoryDetail] = useState(null);

    useEffect(() => {
        refreshList();
        document.title = 'Лаборатории';
    }, []);

    const refreshList = () => {
        axios
            .get(`/api/laboratory/${id}`)
            .then((res) => {
                setLaboratoryDetail(res.data);
            })
            .catch((err) => console.log(err));
    };   

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
