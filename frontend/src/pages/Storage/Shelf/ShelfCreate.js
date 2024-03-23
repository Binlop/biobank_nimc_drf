import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import { GetParamFromURL } from "../../../components/API/Sample/CreateSample";
import { handlePost, setCSRFToken, makeNewForm } from "../../../components/API/CreateUpdate";
import "../storage.css"


export default function ShelfCreate() {
  const [formData, setFormData] = useState({});  
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 
  const parentStorageId = GetParamFromURL('drawer_id');

  useEffect(() => {
    document.title = 'Добавить полку';
    setCSRFToken();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };   

  const handleSubmit = (e) => {
    e.preventDefault();
    const formStorage = makeNewForm(formData);
    formStorage.append('drawer_id', parentStorageId)
    handlePost(e, formStorage, `/api/storage/shelf/create/`, `/storage/drawer/${parentStorageId}/`, setError, navigate)
  };

  return (
    <div className="features">
      <div className="user_form">
      <h2>Добавить полку</h2>
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