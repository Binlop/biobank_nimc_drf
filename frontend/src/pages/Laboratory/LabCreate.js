import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { handlePost, setCSRFToken } from "../../components/API/CreateUpdate";

function LabCreate() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate();
  const [errors, setError] = useState({}); 

  useEffect(() => {
    setCSRFToken()
    document.title = 'Добавить направление';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    handlePost(event, formData, `/api/laboratory/create`, `/laboratories`, setError, navigate)
  };

  return (
    <div className="features">
      <h2>Добавить направление</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </form>
    </div>
  );
}

export default LabCreate;
