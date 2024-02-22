import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../individ.css"

export default function EmbryoDetail() {
    const { id } = useParams();
    const [embryoDetail, setEmbryoDetail] = useState(null);

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        axios
            .get(`/api/individ/${id}`)
            .then((res) => {
                setEmbryoDetail(res.data);
                if (res.data) {
                    document.title = res.data.family_member.name;
                }
            })
            .catch((err) => {
                console.log(err)});
    };   

    console.log('Содержимое useParams:', useParams());

    return (
        <main className="container">
            <div className="title_object">
                <p>
                    {embryoDetail && (
                        <>
                        <span className="larger-text">{embryoDetail.name}</span>
                        <Link to={`/individs/embryo/${id}/update`} className="btn btn-primary">
                            Изменить индивида
                        </Link>
                        </>
                    )}
                </p>
            </div>
            <div className="features">
                {embryoDetail && (
                    <table>
                        <tbody>
                            <tr>
                                <td className="table_detail_property">Название</td>
                                <td className="table_detail_value">{embryoDetail.name}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Описание</td>
                                <td className="table_detail_value">{embryoDetail.description}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Лаборатории</td>
                                <td className="table_detail_value">
                                    {embryoDetail.laboratory && embryoDetail.laboratory.map(item => (
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
