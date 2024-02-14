import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./family.css"

export default function FamilyDetail() {
    const { id } = useParams();
    const [familyDetail, setFamilyDetail] = useState(null);

    useEffect(() => {
        refreshList();
        document.title = 'Лаборатории';
    }, []);

    const refreshList = () => {
        axios
            .get(`/api/family/${id}`)
            .then((res) => {
                setFamilyDetail(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err));
    };   

    return (
        <main className="container">
            <div className="title_object">
                <p>
                    {familyDetail && (
                        <>
                        <span className="larger-text">{familyDetail.name}</span>
                        <Link to={`/families/${id}/update`} className="btn btn-primary">
                            Изменить лабораторию
                        </Link>
                        </>
                    )}
                </p>
            </div>
            <div className="features">
                {familyDetail && (
                    <table>
                        <tbody>
                            <tr>
                                <td className="table_detail_property">Название</td>
                                <td className="table_detail_value">{familyDetail.name}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Описание</td>
                                <td className="table_detail_value">{familyDetail.description}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Лаборатории</td>
                                <td className="table_detail_value">
                                    {familyDetail.laboratory && familyDetail.laboratory.map(item => (
                                        <Link to={`/laboratories/${item.id}`} className="link-style">{item.name}<br></br></Link>
                                    ))}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}
