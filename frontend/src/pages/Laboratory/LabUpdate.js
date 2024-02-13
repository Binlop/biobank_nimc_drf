import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function LabUpdate() {
    const { id } = useParams();
    const [laboratoryDetail, setLaboratoryDetail] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        refreshLaboratoryData();
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
            .get(`/api/laboratory/${id}`)
            .then((res) => {
                setLaboratoryDetail(res.data);
            })
            .catch((err) => console.log(err));
    };   
    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .put(`/api/laboratory/${id}/update/`, laboratoryDetail)
          .then(() => {
            console.log("Отправленный объект", laboratoryDetail);
            navigate('/laboratories');
          })
          .catch((error) => {
            console.error("Ошибка при отправке данных:", error);
          });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLaboratoryDetail({
            ...laboratoryDetail,
            [name]: value
        });
    };

    return (
        <div className="features">
          <h2>Изменить направление</h2>
          {laboratoryDetail && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Название:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={laboratoryDetail.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Описание:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={laboratoryDetail.description}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Добавить
              </button>
            </form>
          )}
        </div>
    )
}
