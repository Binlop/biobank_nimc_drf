import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import "./family.css"


export default function FamilyUpdate() {
    const { id } = useParams();
    const [laboratoryDetail, setLaboratoryDetail] = useState(null);
    const navigate = useNavigate();
    const [errors, setError] = useState(null); // Состояние для сообщения об ошибке
    
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
            if (error.response) {
              console.log(error.response.data.description[0])
              setError(error.response.data);
            }
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
          {/* {error && <div className="error-message">{error}</div>} */}
          {laboratoryDetail && (
          <div className="user_form">
            <h2>Изменить направление</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Название:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control mr-sm-2"
                  value={laboratoryDetail.name}
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
                  value={laboratoryDetail.description}
                  onChange={handleChange}
                />
                {errors && errors.description &&
                  <div className="alert alert-danger mt-3 mb-0">{errors.description}</div>
                }
              </div>
              <button type="submit" className="btn btn-primary">
                Добавить
              </button>
              { errors && errors.apiError &&
                            <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                        }
            </form>
            </div>
          )}
        </div>
    )
}
