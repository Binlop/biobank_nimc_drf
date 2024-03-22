import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import { handleUpdate, setCSRFToken, makeNewForm } from "../../../components/API/CreateUpdate";
import { refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import "../storage.css"


export default function DrawerUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 


  useEffect(() => {
    document.title = 'Изменить ящик';
    setCSRFToken();
    refreshObjectDetail(setFormData, `/api/storage/drawer/${id}`)
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formStorage = makeNewForm(formData);
    handleUpdate(e, formStorage, `/api/storage/drawer/${id}/update/`, `/storage/drawer/${id}/`, setError, navigate)
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