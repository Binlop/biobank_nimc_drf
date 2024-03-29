import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../individ.css"
import AddSampleToAdult from "../AddSample";


export default function AnotherMemberDetail() {
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
                        <Link to={`/individs/another_member/${id}/update/`} className="btn btn-primary">
                            Изменить
                        </Link>
                        </>
                    )}
                </p>
                <div className="add_sample">
                <AddSampleToAdult
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
                            <tr>
                                <td className="table_detail_property">Семья</td>
                                <td className="table_detail_value">{individDetail.family ? 
                                <Link to={`/families/${individDetail.family.id}`} className="link-style">{individDetail.family.name}</Link> 
                                : 'Нет данных'}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Кол-во крови</td>
                                <td className="table_detail_value">{individDetail.count_blood}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Кол-во ДНК</td>
                                <td className="table_detail_value">{individDetail.count_dna}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Кол-во хориона</td>
                                <td className="table_detail_value">{individDetail.count_chorion}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Кол-во хориона</td>
                                <td className="table_detail_value">{individDetail.count_chorion}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">№ Семьи</td>
                                <td className="table_detail_value">{individDetail.family_number}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">ID иного члена семьи</td>
                                <td className="table_detail_value">{individDetail.another_member_user_id}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Фамилия</td>
                                <td className="table_detail_value">{individDetail.last_name}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Имя</td>
                                <td className="table_detail_value">{individDetail.first_name}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Отчество</td>
                                <td className="table_detail_value">{individDetail.patronymic}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Дата рождения</td>
                                <td className="table_detail_value">{individDetail.date_of_birth}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Возраст на момент взятия лет</td>
                                <td className="table_detail_value">{individDetail.age_at_sampling}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Телефон</td>
                                <td className="table_detail_value">{individDetail.phone}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Домашний адрес</td>
                                <td className="table_detail_value">{individDetail.home_address}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Национальность</td>
                                <td className="table_detail_value">{individDetail.nationality}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Место рождения</td>
                                <td className="table_detail_value">{individDetail.place_of_birth}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Наследственная отягощенность в семье</td>
                                <td className="table_detail_value">{individDetail.hereditary_burden_in_the_family}</td>
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
