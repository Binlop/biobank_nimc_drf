import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../individ.css"
import AddSampleToAdult from "../AddSample";
import ModalToPregnancy from "./ModalToPregnancy";


export default function MotherDetail() {
    const { id } = useParams();
    const [individDetail, setIndividDetail] = useState(null);
    const [samplesList, seSampleList] = useState([]);
    const [motherPregnacies, setmotherPregnacies] = useState([]);
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState({
        pregnancy_year: '',
        diagnosis: '',
      });

    useEffect(() => {
        refreshList();
        getIndividSamples();
        getMotherPregnancy();
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

    const getMotherPregnancy = () => {
        axios
        .get(`api/individ/mother/${id}/pregnancy/`)
        .then((res) => {
            setmotherPregnacies(res.data);
        })
        .catch((err) => {
            console.log(err)});
    }

    const editPregnancy = (item) => {
        setActiveItem(item);
        console.log(activeItem)
        setModal(!modal);  
        };

    const togglePregnancy = () => {
        setModal(!modal);      
    };

    const handleSubmitPregnancy = (item) => {
        togglePregnancy();
          axios
            .put(`/api/individ/mother/pregnancy/${item.id}/`, item)
            .then((res) => getMotherPregnancy());
          return;
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
                            <tr>
                                <td className="table_detail_property">Беременности</td>
                                <td className="table_detail_value">
                                    {individDetail.pregnancy && individDetail.pregnancy.map(item => (
                                        item.pregnancy_year, item.diagnosis
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
            <div className="features">
            {motherPregnacies && (
                <div>
                    <h5>Беременности</h5>
                    <table>
                        <thead>
                            <tr>
                                <th className="table_list_property">Год</th>
                                <th className="table_list_property">Диагноз</th>
                            </tr>
                        </thead>
                        <tbody>
                            {individDetail.pregnancy.map(item => (
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
                                        onClick={() => handleDelete(item)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {modal ? (
                    <ModalToPregnancy
                        activeItem={activeItem}
                        toggle={togglePregnancy}
                        onSave={handleSubmitPregnancy}
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
