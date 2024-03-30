import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { handlePost, setCSRFToken, makeNewForm } from "../../components/API/CreateUpdate";
import { refreshObjectList } from "../../components/API/GetListOrDelete";


export default function FamilyCreate() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [errors, setError] = useState(null); // Состояние для сообщения об ошибке


  useEffect(() => {
    setCSRFToken();
    document.title = 'Добавить семью'
    refreshObjectList(setAllLaboratories,`/api/laboratory`)
  }, []);

  const handleChange = (e) => {
      const { name, value, checked } = e.target;
      if (name === 'laboratory') {
        const labId = parseInt(value);
        let updatedLaboratories;
        if (checked) {
          updatedLaboratories = [...formData.laboratory, labId];
        } else {
          updatedLaboratories = formData.laboratory.filter(id => id !== labId);
        }
        setFormData({ ...formData, [name]: updatedLaboratories });
      } else {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
      }
    };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formFamily = makeNewForm(formData)
    handlePost(e, formFamily, '/api/family/create', `/families/`, setError, navigate)
  };

  return (
    <div className="features">
      <div className="user_form">
        <h2>Добавить семью</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Название:</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-control mr-sm-2"
                  value={formData.name} 
                  onChange={handleChange} 
                />
                {errors && errors.name &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.name}</div>
                }
              </div>
            <div className="form-group">
                <label>Описание:</label>
                <input 
                  type="text" 
                  name="description" 
                  className="form-control mr-sm-2"
                  value={formData.description} 
                  onChange={handleChange} 
                />
                {errors && errors.description &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.description}</div>
                }
              </div>
              <div className="form-group">
                <label>Лаборатории:</label>
                {allLaboratories.map(lab => (
                  <div key={lab.id} className="form-check">
                <input
                  type="checkbox"
                  id={`lab-${lab.id}`}
                  name="laboratory"
                  value={lab.id}
                  onChange={handleChange}
                  className="form-check-input"
                />
                  <label htmlFor={`lab-${lab.id}`} className="form-check-label">{lab.name}</label>
                  </div>
                ))}
                {errors && errors.laboratory &&
                  <div className="alert alert-danger mt-3 mb-0">{errors.laboratory}</div>
                }
              </div>
        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </form>
      </div>
    </div>
  );
}