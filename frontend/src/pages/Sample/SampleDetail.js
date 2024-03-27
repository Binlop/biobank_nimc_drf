import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../components/API/GetListOrDelete";
import "./sample.css"

export default function SampleDetail() {
    const { id } = useParams();
    const [sampleDetail, setSampleDetail] = useState(null);
    const [AliquotList, setAliquotList] = useState([]);

    useEffect(() => {
      refreshObjectDetail(setSampleDetail, `/api/sample/${id}`)  
      refreshObjectList(setAliquotList, `/api/sample/aliquot/${id}/`)
    }, []);

    const handleDeleteClick = (object_id) => {
      handleDelete(`/api/sample/${object_id}/delete`, setSampleDetail, `/api/sample/${id}/`);
    };

    return (
        <main className="container">
        {sampleDetail && (
        <div>
            <div className="title_object">
              <p>
                <>
                  <span className="larger-text">{sampleDetail.name}</span>
                  <Link to={`/samples/${sampleDetail.sampletype}/${id}/update`} className="btn btn-primary mr-2">
                    Изменить образец
                  </Link>
                  <Link to={`/samples/aliquot/create/?individ_id=${sampleDetail.individ.individ.id}&original_sample_id=${sampleDetail.sample.id}`} className="btn btn-primary">
                    Добавить аликвоту
                  </Link>
                </>
              </p>
            </div>
      
          <div className="features">
            <table>
              <tbody>
                <tr>
                  <td className="table_detail_property">Название</td>
                  <td className="table_detail_value">{sampleDetail.name}</td>
                </tr>
                <tr>
                  <td className="table_detail_property">Индивид</td>
                  <td className="table_list_value">
                    <Link to={`/individs/${sampleDetail.individ.individ_type}/${sampleDetail.individ.individ.id}`} className="link-style">{sampleDetail.individ.name}</Link>
                  </td>
                </tr>
                <tr>
                  <td className="table_detail_property">Место хранения</td>
                  <td className="table_list_value">
                  <Link to={`/storage/box/${sampleDetail.location.box}/`} className="link-style">{sampleDetail.location.name}</Link>
                  </td>
                </tr>
                <tr>
                  <td className="table_detail_property">Количество</td>
                  <td className="table_list_value">{sampleDetail.volume}</td>
                </tr>
                <tr>
                  <td className="table_detail_property">Концентрация</td>
                  <td className="table_detail_value">{sampleDetail.concentration !== undefined && sampleDetail.concentration !== null ? 
                    sampleDetail.concentration : 'Нет данных'}</td>
                </tr>
                {sampleDetail.original_sample &&
                <tr>
                  <td className="table_detail_property">Исходный образец</td>
                  <td className="table_detail_value">{
                    <Link to={`/samples/${sampleDetail.original_sample.sampletype}/${sampleDetail.original_sample.sample.id}/`} className="link-style">{sampleDetail.original_sample.name}</Link>}</td>
                </tr>
              } 
              </tbody>
            </table>
          </div>
          <div className="features">
            {AliquotList && sampleDetail.sampletype !== "aliquot" && (
                <div>
                <h5>Аликвоты</h5>
                <table>
                    <thead>
                        <th className="table_list_property">Название</th>
                        <th className="table_list_property">Место хранения</th>
                        <th className="table_list_property">Количество</th>
                        <th className="table_list_property">Действия</th>
                    </thead>
                    <tbody>
                    {AliquotList.map(item => (
                            <tr key={item.id}>                            
                                <td className="table_list_value">
                                <Link to={`/samples/${item.sampletype}/${item.sample.id}`} className="link-style">{item.name}</Link>
                                </td>
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
        </div>
        )}
        </main>
      );      
}
