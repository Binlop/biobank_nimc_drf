import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../storage.css"
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";

export default function DrawerCreate() {
    const [formData, setFormData] = useState({
        laboratory: [],
        });  
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 
  const [allLaboratories, setAllLaboratories] = useState([]);

  useEffect(() => {
    document.title = 'Добавить морозильник';
    const csrftoken = getCSRFToken('csrftoken'); 
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    fetchLaboratories();
    }, []);

  const getCSRFToken = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
      const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;

      const formStorage = makeStorageForm();

      await axios.post(`/api/storage/freezer/create/`, formStorage, {
      headers: {
      "Content-Type": contentTypeHeader,
      },
      });
      navigate('/storage/');
    } 
    catch (error) {
        console.error('Ошибка с отправкой образца:', error);
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
          />
          <label htmlFor={`lab-${lab.id}`} className="form-check-label">{lab.name}</label>
          </div>
          ))}
          </div>                         
          <button type="submit" className="btn btn-primary">
          Добавить
          </button>
        </form>
      </div>
    </div>
  );
  }