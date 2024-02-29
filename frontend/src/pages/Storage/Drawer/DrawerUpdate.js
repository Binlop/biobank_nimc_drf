import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../storage.css"
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";

export default function FreezerUpdate() {
    const { id } = useParams();

  const [formData, setFormData] = useState({
    laboratory: [],
    pregnancy: [],
    });
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [errors, setError] = useState(null); 


  useEffect(() => {
    refreshIndividData();
    document.title = 'Изменить морозильник';
    const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
    fetchLaboratories();
    }, []);

  const getCSRFToken = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
  }

  const refreshIndividData = () => {
    axios
        .get(`/api/storage/freezer/${id}`)
        .then((res) => {
          setFormData(res.data);
          const laboratoryIds = res.data.laboratory.map(lab => lab.id);
          setFormData(prevState => ({
            ...prevState,
            laboratory: res.data.laboratory.map(lab => lab.id)
          }));            
        })
        .catch((err) => console.log(err));
  };

  const fetchLaboratories = () => {
    axios
      .get(`/api/laboratory`)
      .then((res) => {
      setAllLaboratories(res.data);
      console.log(res.data)
    })
      .catch((err) => console.log(err));
  };   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasChecked = formData.laboratory.length > 0;

    if (!hasChecked) {
      alert('Выберите хотя бы одну лабораторию');
      }

    try {
      const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
      const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;

      const formStorage = makeStorageForm();

      await axios.put(`/api/storage/freezer/${id}/update/`, formStorage, {
      headers: {
      "Content-Type": contentTypeHeader,
      },
      });
      navigate('/storage/');
    } 
    catch (error) {
        console.error('Ошибка с отправкой индивида:', error);
        setError(error.response.data);
      }
  };

  const handleChangeLaboratory = (e) => {
    const { name, value, checked } = e.target;
    const labId = parseInt(value);
    let updatedLaboratories;
    if (checked) {
      updatedLaboratories = [...formData.laboratory, labId];
    } else {
      updatedLaboratories = formData.laboratory.filter(id => id !== labId);
    }
    setFormData({ ...formData, [name]: updatedLaboratories });
  };

  const makeStorageForm = () => {
    const formSample = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value) {
          formSample.append(key, value);
        }
      }
    }
    return formSample;
  };


  return (
    <div className="features">
      <div className="user_form">
      <h2>Добавить морозильник</h2>
        <form onSubmit={handleSubmit}>
          <CharFieldWithError
            label="Название:"
            name="name"
            value={formData.name}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Этаж:"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            errors={errors}
          />                              
          <CharFieldWithError
            label="Номер морозильника:"
            name="id_freezer"
            value={formData.id_freezer}
            onChange={handleChange}
            errors={errors}
          />     
          <div className="form-group">
          <label>Лаборатории:</label>
          {allLaboratories.map(lab => (
          <div key={lab.id} className="form-check">
          <input
          type="checkbox"
          id={`lab-${lab.id}`}
          name="laboratory"
          value={lab.id}
          onChange={handleChangeLaboratory}
          className="form-check-input"
          checked={formData.laboratory.includes(lab.id)}
          />
          <label htmlFor={`lab-${lab.id}`} className="form-check-label">{lab.name}</label>
          </div>
          ))}
          </div>                      
          <button type="submit" className="btn btn-primary">
          Изменить
          </button>
        </form>
      </div>
    </div>
  );
  }