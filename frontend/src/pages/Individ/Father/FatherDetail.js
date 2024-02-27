import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../individ.css"
import NestedMenu from "../../Sample/NestedMenu";

export default function FatherDetail() {
    const { id } = useParams();
    const [individDetail, setIndividDetail] = useState(null);
    const [samplesList, seSampleList] = useState([]);

    useEffect(() => {
        refreshList();
        getIndividSamples();
    }, []);

    const refreshList = () => {
        axios
            .get(`/api/individ/${id}`)
            .then((res) => {
                setIndividDetail(res.data);
                if (res.data) {
                    document.title = res.data.name;
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
                    {individDetail && (
                        <>
                        <span className="larger-text">{individDetail.name}</span>
                        <Link to={`/individs/mother/${id}/update/`} className="btn btn-primary">
                            Изменить индивида
                        </Link>
                        </>
                    )}
                </p>
                <div className="add_sample">
                <NestedMenu
                individ_id={id}/>

                </div>

            </div>
            <div className="features">
                {individDetail && (
                    <table>
                        <tbody>
                            <tr>
                                <td className="table_detail_property">Название</td>
                                <td className="table_detail_value">{individDetail.name}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Описание</td>
                                <td className="table_detail_value">{individDetail.description}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Лаборатории</td>
                                <td className="table_detail_value">
                                    {individDetail.laboratory && individDetail.laboratory.map(item => (
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
