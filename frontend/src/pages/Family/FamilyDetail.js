import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./family.css"

export default function FamilyDetail() {
    const { id } = useParams();
    const [familyDetail, setFamilyDetail] = useState(null);
    const [individList, setindividList] = useState([]);

    useEffect(() => {
        refreshList();
        getFamilyIndivids();
    }, []);

    const refreshList = () => {
        axios
            .get(`/api/family/${id}`)
            .then((res) => {
                setFamilyDetail(res.data);
                console.log(res.data)
                if (res.data) {
                    document.title = res.data.name;
                }
            })
            .catch((err) => console.log(err));
    };   

    const getFamilyIndivids = () => {
        axios
        .get(`/api/individ/family_${id}_individs/`)
        .then((res) => {
            setindividList(res.data);
        })
        .catch((err) => {
            console.log(err)});
    };  

    const handleDelete = (item) => {
        axios
          .delete(`/api/individ/${item.individ.id}/delete`)
          .then((res) => refreshList());
    };

    return (
        <main className="container">
            <div className="title_object">
                <p>
                    {familyDetail && (
                        <>
                        <span className="larger-text">{familyDetail.name}</span>
                        <Link to={`/families/${id}/update`} className="btn btn-primary">
                            Изменить семью
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
            <div className="features">
            {individList && (
                <div>
                <h5>Члены семьи</h5>
                <table>
                    <thead>
                        <th className="table_list_property">Название</th>
                        <th className="table_list_property">Место хранения</th>
                        <th className="table_list_property">Количество</th>
                        <th className="table_list_property">Действия</th>
                    </thead>
                    <tbody>
                    {individList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/individs/${item.individ_type}/${item.individ.id}/`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value"></td>
                                <td className="table_list_value"></td>
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
