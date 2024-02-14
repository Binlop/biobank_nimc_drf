import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Multiselect from 'react-select'

export default function FamilyCreate() {
  const [formData, setFormData] = useState({
      name: '',
      description: '',
      laboratory: []
  });
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [errors, setError] = useState(null); // Состояние для сообщения об ошибке


  useEffect(() => {
    document.title = 'Добавить семью';
    const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
    fetchLaboratories();
  }, []);

  const getCSRFToken = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  const fetchLaboratories = () => {
    axios
        .get(`/api/laboratory`)
        .then((res) => {
          setAllLaboratories(res.data);
            console.log(res.data)
        })
        .catch((err) => console.log(err));
    };   

  const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'laboratory') {
        const selectedLaboratories = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({ ...formData, [name]: selectedLaboratories });
      } else {
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/api/family/create', formData);
        navigate('/families');
    } catch (error) {
        console.error('Ошибка с отправкой семьи:', error);
        setError(error.response.data);

    }
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
                  <select name="laboratory" multiple value={formData.laboratory} onChange={handleChange}>
                    {allLaboratories.map(lab => (
                        <option className="form-control mr-sm-2" key={lab.id} value={lab.id}>{lab.name}</option>
                    ))}
                  </select>
                {errors && errors.name &&
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