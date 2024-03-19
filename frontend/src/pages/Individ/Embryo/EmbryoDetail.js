import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../individ.css"
import AddSampleToEmbryo from "./AddSampleEmbryo.js";


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
            <div className="add_sample">
            <AddSampleToEmbryo
            individ_id={id}/>

            </div>
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
                            <tr>
                                <td className="table_detail_property">Семья</td>
                                <td className="table_detail_value">{embryoDetail.family ? 
                                <Link to={`/families/${embryoDetail.family.id}`} className="link-style">{embryoDetail.family.name}</Link> 
                                : 'Нет данных'}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Кол-во крови</td>
                                <td className="table_detail_value">{embryoDetail.count_blood}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Кол-во ДНК</td>
                                <td className="table_detail_value">{embryoDetail.count_dna}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Кол-во хориона</td>
                                <td className="table_detail_value">{embryoDetail.count_chorion}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">ID семьи</td>
                                <td className="table_detail_value">{embryoDetail.family_number}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">ID пробанда</td>
                                <td className="table_detail_value">{embryoDetail.abortus_id}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">ID пробанда в семье</td>
                                <td className="table_detail_value">{embryoDetail.abortus_id_in_family}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">ID пробанда в семье</td>
                                <td className="table_detail_value">{embryoDetail.abortus_id_in_family}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Дата получения</td>
                                <td className="table_detail_value">{embryoDetail.date_of_receipt}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Диагноз</td>
                                <td className="table_detail_value">{embryoDetail.diagnosis}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Последняя менструация</td>
                                <td className="table_detail_value">{embryoDetail.last_menstruation}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Срок беременности по дате</td>
                                <td className="table_detail_value">{embryoDetail.period_pregnancy_by_date}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Срок беременности по УЗИ</td>
                                <td className="table_detail_value">{embryoDetail.period_pregnancy_by_USI}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Зачатие</td>
                                <td className="table_detail_value">{embryoDetail.conception}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Близнецы</td>
                                <td className="table_detail_value">{embryoDetail.twins}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Размеры 1 плодного мешка по x</td>
                                <td className="table_detail_value">{embryoDetail.dimensions_fetal_sac_x_1}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Размеры 1 плодного мешка по y</td>
                                <td className="table_detail_value">{embryoDetail.dimensions_fetal_sac_y_1}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Размеры 2 плодного мешка по x</td>
                                <td className="table_detail_value">{embryoDetail.dimensions_fetal_sac_x_2}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Размеры 2 плодного мешка по y</td>
                                <td className="table_detail_value">{embryoDetail.dimensions_fetal_sac_y_2}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Копчико-теменной размер плода (КТР)</td>
                                <td className="table_detail_value">{embryoDetail.ktr}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Особенности эмбриона</td>
                                <td className="table_detail_value">{embryoDetail.features_embryo}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Особенности хориона</td>
                                <td className="table_detail_value">{embryoDetail.features_chorion}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Особенности желточного мешка</td>
                                <td className="table_detail_value">{embryoDetail.features_yolk_sac}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Особенности амниотической мембраны</td>
                                <td className="table_detail_value">{embryoDetail.features_amniotic_membrane}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Примечание</td>
                                <td className="table_detail_value">{embryoDetail.note}</td>
                            </tr>
                            <tr>
                            <td className="table_detail_property">Cкан направления</td>
                            <td className="table_detail_value">
                                <a href={embryoDetail.scan_directions} download>Сканы направления</a>
                            </td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Примечание</td>
                                <td className="table_detail_value">{embryoDetail.note}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Вероятный кариотип</td>
                                <td className="table_detail_value">{embryoDetail.karyotype}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Кариотип</td>
                                <td className="table_detail_value">{embryoDetail.karyotype_type}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Сверхчисленная хромосома</td>
                                <td className="table_detail_value">{embryoDetail.supernumerary_chromosome}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Мозаицизм</td>
                                <td className="table_detail_value">{embryoDetail.mosaicism}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Стандартный кариотип</td>
                                <td className="table_detail_value">{embryoDetail.standard_karyotype}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">aCGH кариотип</td>
                                <td className="table_detail_value">{embryoDetail.aCGH_karyotype}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">CNV</td>
                                <td className="table_detail_value">{embryoDetail.CNV}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">FISH</td>
                                <td className="table_detail_value">{embryoDetail.FISH}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">FISH мозаицизм</td>
                                <td className="table_detail_value">{embryoDetail.FISH_mosaicism}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">CGH</td>
                                <td className="table_detail_value">{embryoDetail.CGH}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">STR</td>
                                <td className="table_detail_value">{embryoDetail.STR}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">SRY</td>
                                <td className="table_detail_value">{embryoDetail.SRY}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">RT PCR</td>
                                <td className="table_detail_value">{embryoDetail.RT_PCR}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Метилирование</td>
                                <td className="table_detail_value">{embryoDetail.methylation}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">LINE</td>
                                <td className="table_detail_value">{embryoDetail.LINE}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Конфликт между различными методами</td>
                                <td className="table_detail_value">{embryoDetail.сonflict_between_different_methods}</td>
                            </tr>
                            <tr>
                                <td className="table_detail_property">Суть конфликта</td>
                                <td className="table_detail_value">{embryoDetail.essence_conflict}</td>
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
