import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../storage.css"
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import { GetParamFromURL } from "../../../components/API/Sample/CreateSample";
import { handlePost, setCSRFToken, makeNewForm } from "../../../components/API/CreateUpdate";

export default function DrawerCreate() {
  const [formData, setFormData] = useState({});  
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 
  const parentStorageId = GetParamFromURL('freezer_id');

  useEffect(() => {
    document.title = 'Добавить ящик';
    setCSRFToken();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };   

  const handleSubmit = (e) => {
    e.preventDefault();
    const formStorage = makeNewForm(formData);
    formStorage.append('freezer_id', parentStorageId)
    handlePost(e, formStorage, `/api/storage/drawer/create/`, `storage/freezer/${parentStorageId}/`, setError, navigate)
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
          <button type="submit" className="btn btn-primary">
          Добавить
          </button>
        </form>
      </div>
    </div>
  );
  }