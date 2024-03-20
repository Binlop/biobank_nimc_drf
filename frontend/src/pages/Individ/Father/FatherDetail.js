import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from '../../../context/AuthContext'
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import "../individ.css"
import AddSampleToAdult from "../AddSample";


export default function FatherDetail() {
    const { id } = useParams();
    const [individDetail, setIndividDetail] = useState(null);
    const [samplesList, seSampleList] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);


    useEffect(() => {
        refreshObjectDetail(setIndividDetail, `/api/individ/${id}`, authTokens)  
        refreshObjectList(seSampleList, `/api/sample/individ_${id}_samples/`, authTokens)
    }, []);

    const handleDeleteClick = (object_id) => {
        console.log(authTokens)
        handleDelete(`/api/sample/${object_id}/delete`, seSampleList, `/api/sample/individ_${id}_samples/`, authTokens);
    };

    return (
        <main className="container">
            <div className="title_object">
                <p>
                    {individDetail && (
                        <>
                        <span className="larger-text">{individDetail.name}</span>
                        <Link to={`/individs/father/${id}/update/`} className="btn btn-primary">
                            Изменить индивида
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
                                <td className="table_detail_property">№ Семьи</td>
                                <td className="table_detail_value">{individDetail.family_number}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">ID отца</td>
                                <td className="table_detail_value">{individDetail.father_id}</td>
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
                                <td className="table_list_value">
                                <Link to={`/storage/box/${item.location.box}/`} className="link-style">{item.location.name}</Link>
                                </td>                                
                                <td className="table_list_value">{item.volume}</td>
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
                )}
            </div>
        </main>
    );
}
