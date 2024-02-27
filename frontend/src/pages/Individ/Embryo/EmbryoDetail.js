import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../individ.css"

export default function EmbryoDetail() {
    const { id } = useParams();
    const [embryoDetail, setEmbryoDetail] = useState(null);
    const [samplesList, seSampleList] = useState([]);

    useEffect(() => {
        refreshList();
        getIndividSamples();
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

    const getIndividSamples = () => {
        axios
        .get(`/api/sample/individ_${id}_samples/`)
        .then((res) => {
            seSampleList(res.data);
        })
        .catch((err) => {
            console.log(err)});
        };   

    const handleDelete = (item) => {
            axios
              .delete(`/api/sample/${item.sample.id}/delete`)
              .then((res) => refreshList());
        };

    return (
        <main className="container">
            <div className="title_object">
                <p>
                    {embryoDetail && (
                        <>
                        <span className="larger-text">{embryoDetail.name}</span>
                        <Link to={`/individs/embryo/${id}/update/`} className="btn btn-primary">
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
            <div className="features">
            {samplesList && (
                <div>
                <h5>Образцы</h5>
                <table>
                    <thead>
                        <th className="table_list_property">Название</th>
                        <th className="table_list_property">Место хранения</th>
                        <th className="table_list_property">Количество</th>
                        <th className="table_list_property">Действия</th>
                    </thead>
                    <tbody>
                    {samplesList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/samples/${item.sampletype}/${item.sample.id}/`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value"></td>
                                <td className="table_list_value">{item.volume}</td>
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
                )}
            </div>
        </main>
    );
}
