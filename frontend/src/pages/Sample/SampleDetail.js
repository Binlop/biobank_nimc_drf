import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../components/API/GetListOrDelete";
import { handleUpdate, setCSRFToken } from "../../components/API/CreateUpdate";
import ModalToAliquot from "./ModalToAliquot";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "./sample.css"

export default function SampleDetail() {
    const { id } = useParams();
    const [sampleDetail, setSampleDetail] = useState(null);
    const [AliquotList, setAliquotList] = useState([]);
    const [modal, setModal] = useState(false);
    const [sampleInWork, setSampleInWork] = useState({id: id})
    const [aliquot, setAliquot] = useState({
        name: '',
        location: '',
        volume: '',
      });

    useEffect(() => {
      refreshObjectDetail(setSampleDetail, `/api/sample/${id}`)  
      refreshObjectList(setAliquotList, `/api/sample/aliquot/${id}/`)
      setCSRFToken()
    }, []);

    const handleDeleteClick = (object_id) => {
      handleDelete(`/api/sample/${object_id}/delete`, setSampleDetail, `/api/sample/${id}/`);
    };

    const editAliquot = (item) => {
      setAliquot(item);
      setModal(!modal);  
      };

    const toggleAliquot = () => {
        setModal(!modal);      
    };

    const handleSubmitAliquot = (item) => {
      toggleAliquot();
          axios
            .put(`/api/sample/aliquot/${item.sample.id}/update/`, item)
            .then((res) => refreshObjectList(setAliquotList, `/api/sample/aliquot/${id}/`));
          return;
    };

    const handleChange = (e) => {
      const { name, checked } = e.target;
      setSampleInWork(prevFormData => {
        const updatedFormData = { ...prevFormData, [name]: checked };
        axios.put(`/api/sample/change_status/${id}/`, updatedFormData)
             .then((res) => refreshObjectDetail(setSampleDetail, `/api/sample/${id}`));
        return updatedFormData;
      });
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
                  <div className="switch_status mr-2 d-inline">
                  <Form>
                    <FormGroup check inline>
                      <Input type="checkbox" name="sample_in_work" checked={sampleDetail.sample.sample_in_work} onChange={handleChange} />
                      <Label check className="ml-2">
                        Образец в работе
                      </Label>
                    </FormGroup>
                  </Form>
                </div>


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
                                        className="btn btn-primary mr-2"
                                        onClick={() => editAliquot(item)}
                                    >
                                        Изменить
                                    </button>
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
                {modal ? (
                    <ModalToAliquot
                        aliquot={aliquot}
                        toggle={toggleAliquot}
                        onSave={handleSubmitAliquot}
                    />
                ) : null}
                </div>
                )}
            </div>
        </div>
        )}
        </main>
      );      
}
