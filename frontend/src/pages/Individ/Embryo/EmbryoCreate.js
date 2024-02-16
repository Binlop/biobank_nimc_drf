import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Multiselect from 'react-select'
import "../individ.css"

export default function EmbryoCreate() {
  const [formData, setFormData] = useState({
      name: '',
      description: '',
      laboratory: [],
      create_family: false,
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
      } else if (name === 'create_family') {
          setFormData(prevFormData => ({ ...prevFormData, [name]: checked }));
      } else {
          setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
      }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/api/individ/embryo/create/', formData);
        navigate('/individs');
    } catch (error) {
        console.error('Ошибка с отправкой семьи:', error);
        setError(error.response.data);

    }
};

  return (
    <div className="features">
      <div className="user_form">
        <h2>Добавить эмбриона</h2>
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
                <label>Тестовое поле:</label>
                <input 
                  type="text" 
                  name="test_field" 
                  className="form-control mr-sm-2"
                  value={formData.test_field} 
                  onChange={handleChange} 
                />
                {errors && errors.test_field &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.test_field}</div>
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
              <div className="form-group">
                <label>Создать семью:</label>
                <input
                  type="checkbox"
                  id="create_family"
                  name="create_family"
                  onChange={handleChange}
                  className="form-control mr-sm-2"
                />
                {errors && errors.create_family &&
                  <div className="alert alert-danger mt-3 mb-0">{errors.create_family}</div>
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