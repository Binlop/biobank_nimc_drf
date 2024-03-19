import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../../context/AuthContext'
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../components/API/GetListOrDelete";
import "./family.css"


export default function FamilyDetail() {
    const { id } = useParams();
    const [familyDetail, setFamilyDetail] = useState(null);
    const [individList, setindividList] = useState(null);
    const { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        refreshObjectDetail(setFamilyDetail, `/api/family/${id}`, authTokens)  
        refreshObjectList(setindividList, `/api/individ/family_${id}_individs/`, authTokens)      
    }, []);

    const handleDeleteClick = (object_id) => {
        handleDelete(`/api/individ/${object_id}/delete`, setindividList, `/api/individ/family_${id}_individs/`, authTokens);
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
                                        onClick={() => handleDeleteClick(item.individ.id)}
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
