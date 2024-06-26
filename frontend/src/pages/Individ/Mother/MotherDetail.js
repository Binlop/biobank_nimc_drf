import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import { handleUpdate, setCSRFToken, makeNewForm } from "../../../components/API/CreateUpdate";
import "../individ.css"
import AddSampleToAdult from "../AddSample";
import ModalToPregnancy from "./ModalToPregnancy";


export default function MotherDetail() {
    const { id } = useParams();
    const [individDetail, setIndividDetail] = useState(null);
    const [samplesList, seSampleList] = useState([]);
    const [motherPregnacies, setMotherPregnacies] = useState([]);
    const [modalToCreate, setModalToCreate] = useState(false);
    const [modalToUpdate, setModalToUpdate] = useState(false);
    const [pregnancy, setPregnancy] = useState({});

    useEffect(() => {
        refreshObjectDetail(setIndividDetail, `/api/individ/${id}`)  
        refreshObjectList(seSampleList, `/api/sample/individ_${id}_samples/`)
        refreshObjectList(setMotherPregnacies, `/api/individ/mother/${id}/pregnancy/`)
        setCSRFToken()
    }, []);

    const editPregnancy = (item) => {
        setPregnancy(item);
        setModalToUpdate(!modalToUpdate);  
        };

    const togglePregnancyCreate = () => {
        setModalToCreate(!modalToCreate);      
    };

    const togglePregnancyUpdate = () => {
        setModalToUpdate(!modalToUpdate);      
    };

    const handleCreatePregnancy = (item) => {
        togglePregnancyCreate();
        const pregnancyForm = makeNewForm(item)
        pregnancyForm.append('mother_id', id)
          axios
            .post(`/api/individ/mother/pregnancy/create/`, pregnancyForm)
            .then((res) => refreshObjectList(setMotherPregnacies, `/api/individ/mother/${id}/pregnancy/`));
        };

    const handleUpdatePregnancy = (item) => {
        togglePregnancyUpdate();
          axios
            .put(`/api/individ/mother/pregnancy/${item.id}/update/`, item)
            .then((res) => refreshObjectList(setMotherPregnacies, `/api/individ/mother/${id}/pregnancy/`));
        };

    const handleDeletePregnancy = (object_id) => {
        handleDelete(`/api/individ/mother/pregnancy/${object_id}/delete/`, setMotherPregnacies, `/api/individ/mother/${id}/pregnancy/`);
    };

    const handleDeleteClick = (object_id) => {
        handleDelete(`/api/sample/${object_id}/delete`, seSampleList, `/api/sample/individ_${id}_samples/`);
    };

    return (
        <main className="container">
            <div className="title_object">
                <p>
                    {individDetail && (
                        <>
                        <span className="larger-text">{individDetail.name}</span>
                        <Link to={`/individs/mother/${id}/update/`} className="btn btn-primary mr-2">
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
                                <td className="table_detail_property">Направления</td>
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
                                <td className="table_detail_property">ID матери</td>
                                <td className="table_detail_value">{individDetail.mother_id}</td>
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
                            <tr>
                                <td className="table_detail_property">Число беременностей</td>
                                <td className="table_detail_value">{individDetail.number_of_pregnancies}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Привычное невынашивание</td>
                                <td className="table_detail_value">{individDetail.habitual_miscarriage}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Привычное невынашивание</td>
                                <td className="table_detail_value">{individDetail.habitual_miscarriage}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Настоящая беременность - диагноз</td>
                                <td className="table_detail_value">{individDetail.diagnosis_of_current_pregnancy}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Примечание</td>
                                <td className="table_detail_value">{individDetail.note}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Гинекологические заболевания матери</td>
                                <td className="table_detail_value">{individDetail.mother_gynecological_diseases}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Экстрагенитальные заболевания матери</td>
                                <td className="table_detail_value">{individDetail.mother_extragenital_diseases}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Возраст начала менструации, лет</td>
                                <td className="table_detail_value">{individDetail.age_at_menarche}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Продолжительность цикла, дней</td>
                                <td className="table_detail_value">{individDetail.cycle_duration_days}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Примечание</td>
                                <td className="table_detail_value">{individDetail.menstrual_note}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <div className="features">
            {motherPregnacies && (
                <div>
                    <h5>Беременности
                    <button
                        className="btn btn-primary mr-2"
                        onClick={() => togglePregnancyCreate()}
                    >
                        Добавить беременность
                    </button>
                    </h5>
                    <table>
                        <thead>
                            <tr>
                                <th className="table_list_property">Год</th>
                                <th className="table_list_property">Диагноз</th>
                                <th className="table_list_property">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {motherPregnacies.map(item => (
                                <tr key={item.id}>
                                    <td className="table_list_value">{item.pregnancy_year}</td>
                                    <td className="table_list_value">{item.diagnosis}</td>
                                    <td className="table_list_value">
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={() => editPregnancy(item)}
                                    >
                                        Изменить
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeletePregnancy(item.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {modalToCreate ? (
                    <ModalToPregnancy
                        pregnancy={pregnancy}
                        toggle={togglePregnancyCreate}
                        onSave={handleCreatePregnancy}
                    />
                ) : null}
                    {modalToUpdate ? (
                    <ModalToPregnancy
                        pregnancy={pregnancy}
                        toggle={togglePregnancyUpdate}
                        onSave={handleUpdatePregnancy}
                    />
                ) : null}
                </div>
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
                                <td className="table_list_value"><Link to={`/storage/box/${item.location.box}/`} className="link-style">{item.location.name}</Link></td>
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
