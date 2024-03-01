import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "../storage.css"
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";

export default function DrawerUpdate() {
    const { id } = useParams();

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 


  useEffect(() => {
    refreshIndividData();
    document.title = 'Изменить ящик';
    const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
    }, []);

  const getCSRFToken = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
  }

  const refreshIndividData = () => {
    axios
        .get(`/api/storage/drawer/${id}`)
        .then((res) => {
          setFormData(res.data);         
        })
        .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
      const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;

      const formStorage = makeStorageForm();

      await axios.put(`/api/storage/drawer/${id}/update/`, formStorage, {
      headers: {
      "Content-Type": contentTypeHeader,
      },
      });
      navigate(`/storage/drawer/${id}/`);
    } 
    catch (error) {
        console.error('Ошибка с отправкой ящика:', error);
        setError(error.response.data);
      }
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
          <button type="submit" className="btn btn-primary">
          Изменить
          </button>
        </form>
      </div>
    </div>
  );
  }