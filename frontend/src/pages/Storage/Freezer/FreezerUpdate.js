import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import { handleUpdate, setCSRFToken, makeNewForm, handleChangeLaboratoryIds } from "../../../components/API/CreateUpdate";
import { refreshObjectList } from "../../../components/API/GetListOrDelete";
import "../storage.css"


export default function FreezerUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    laboratory: [],
    });
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [errors, setError] = useState(null); 

  useEffect(() => {
    refreshFreezerData();
    document.title = 'Изменить морозильник';
    setCSRFToken();
    refreshObjectList(setAllLaboratories,`/api/laboratory`)
    }, []);

  const refreshFreezerData = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formStorage = makeNewForm(formData);
    handleUpdate(e, formStorage, `/api/storage/freezer/${id}/update/`, `/api/storage/freezer/${id}/`, setError, navigate)
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