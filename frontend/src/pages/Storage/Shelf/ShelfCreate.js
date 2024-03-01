import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import "../storage.css"
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";

export default function ShelfCreate() {
    const [formData, setFormData] = useState({
        laboratory: [],
        });  
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const parentStorageId = searchParams.get('drawer_id');

  useEffect(() => {
    document.title = 'Добавить полку';
    const csrftoken = getCSRFToken('csrftoken'); 
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    }, []);

  const getCSRFToken = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
  }

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

      await axios.post(`/api/storage/shelf/create/`, formStorage, {
      headers: {
      "Content-Type": contentTypeHeader,
      },
      });
      navigate(`/storage/drawer/${parentStorageId}`);
    } 
    catch (error) {
        console.error('Ошибка с отправкой полки:', error);
        setError(error.response.data);
      }
  };

  const makeStorageForm = () => {
    const formStorage = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value) {
          formStorage.append(key, value);
        }
      }
    }
    formStorage.append('drawer_id', parentStorageId)
    return formStorage;
  };

  return (
    <div className="features">
      <div className="user_form">
      <h2>Добавить ящик</h2>
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
          Добавить
          </button>
        </form>
      </div>
    </div>
  );
  }