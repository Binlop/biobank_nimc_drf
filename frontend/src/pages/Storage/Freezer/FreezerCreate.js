import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { handlePost, setCSRFToken, makeNewForm, handleChangeLaboratoryIds } from "../../../components/API/CreateUpdate";
import { refreshObjectList } from "../../../components/API/GetListOrDelete";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import "../storage.css"

export default function FreezerCreate() {
    const [formData, setFormData] = useState({
        laboratory: [],
        });  
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 
  const [allLaboratories, setAllLaboratories] = useState([]);

  useEffect(() => {
    document.title = 'Добавить морозильник';
    refreshObjectList(setAllLaboratories,`/api/laboratory`)
    setCSRFToken();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formStorage = makeNewForm(formData);
    handlePost(e, formStorage, `/api/storage/freezer/create/`, `/storage/`, setError, navigate)
  };

  const handleChangeLaboratory = (e) => {
    handleChangeLaboratoryIds(e, formData, setFormData)
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