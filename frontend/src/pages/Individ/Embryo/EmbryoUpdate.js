import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../individ.css"
import React, { useState, useEffect } from "react";
import Multiselect from 'react-select'

export default function FamilyUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setError] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      laboratory: []
    });
    const [allLaboratories, setAllLaboratories] = useState([]);
    
    useEffect(() => {
        refreshLaboratoryData();
        fetchLaboratories();
        document.title = 'Изменить направление';
        const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
    }, []);
    
    const getCSRFToken = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
      }
    
    const refreshLaboratoryData = () => {
      axios
          .get(`/api/family/${id}`)
          .then((res) => {
            setFormData(res.data);
            const laboratoryIds = res.data.laboratory.map(lab => lab.id);
            setFormData(prevState => ({
              ...prevState,
              laboratory: laboratoryIds
            }));            
          })
          .catch((err) => console.log(err));
    };
      

    const fetchLaboratories = () => {
      axios
          .get(`/api/laboratory`)
          .then((res) => {
            setAllLaboratories(res.data);
          })
          .catch((err) => console.log(err));
      };  
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .put(`/api/individ/${formData.individ_type}/${id}/update/`, formData)
          .then(() => {
            navigate('/families');
          })
          .catch((error) => {
            if (error.response) {
              setError(error.response.data);
            }
        });
    };

    const handleChange = (event) => {
      const { name, value, checked } = event.target;
      if (name === 'laboratory') {
        const labId = parseInt(value);
        let updatedLaboratories;
        if (checked) {
          updatedLaboratories = [...formData.laboratory, labId];
        } else {
          updatedLaboratories = formData.laboratory.filter(id => id !== labId);
        }
        setFormData(prevFormData => ({ ...prevFormData, laboratory: updatedLaboratories }));
      } else {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
      }
    };
    
    

    return (
        <div className="features">
          {formData && (
          <div className="user_form">
            <h2>Изменить эмбриона</h2>
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="name">Название:</label>
                <input
                  type="text"
                  id="name"
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
                <label htmlFor="description">Описание:</label>
                <input
                  type="text"
                  id="description"
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
                  checked={formData.laboratory.includes(lab.id)}
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
          )}
        </div>
    )
}
