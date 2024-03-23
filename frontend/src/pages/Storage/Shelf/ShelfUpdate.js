import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import { handleUpdate, setCSRFToken, makeNewForm } from "../../../components/API/CreateUpdate";
import { refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import "../storage.css"


export default function ShelfUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 

  useEffect(() => {
    document.title = 'Изменить полку';
    setCSRFToken();
    refreshObjectDetail(setFormData, `/api/storage/shelf/${id}`)
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formStorage = makeNewForm(formData);
    handleUpdate(e, formStorage, `/api/storage/shelf/${id}/update/`, `/storage/shelf/${id}/`, setError, navigate)
  };

  return (
    <div className="features">
      <div className="user_form">
      <h2>Добавить морозильник</h2>
        <form onSubmit={handleSubmit}>
          <CharFieldWithError
            label="Название"
            name="name"
            value={formData.name}
            onChange={handleChange}
            errors={errors}
          />    
          <CharFieldWithError
            label="Кол-во коробок на полке"
            name="count_boxes"
            value={formData.count_boxes}
            onChange={handleChange}
            errors={errors}
          />                           
          <CharFieldWithError
            label="Кол-во коробок по горизонтали"
            name="len_row"
            value={formData.len_row}
            onChange={handleChange}
            errors={errors}
          />                           
          <CharFieldWithError
            label="Кол-во коробок по вертикали"
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