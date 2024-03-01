import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "../storage.css"
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";

export default function ShelfUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 


  useEffect(() => {
    refreshStoragedData();
    document.title = 'Изменить полку';
    const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
    }, []);

  const getCSRFToken = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
  }

  const refreshStoragedData = () => {
    axios
        .get(`/api/storage/shelf/${id}`)
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

      await axios.put(`/api/storage/shelf/${id}/update/`, formStorage, {
      headers: {
      "Content-Type": contentTypeHeader,
      },
      });
      navigate(`/storage/shelf/${id}/`);
    } 
    catch (error) {
        console.error('Ошибка с отправкой полки:', error);
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
          <CharFieldWithError
            label="Кол-во коробок на полке:"
            name="count_boxes"
            value={formData.count_boxes}
            onChange={handleChange}
            errors={errors}
          />                           
          <CharFieldWithError
            label="Кол-во коробок по горизонтали:"
            name="len_row"
            value={formData.len_row}
            onChange={handleChange}
            errors={errors}
          />                           
          <CharFieldWithError
            label="Кол-во коробок по вертикали:"
            name="len_col"
            value={formData.len_col}
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