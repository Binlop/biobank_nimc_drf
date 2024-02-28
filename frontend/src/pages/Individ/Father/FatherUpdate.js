import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../individ.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import CheckMarkWithError from "../../../components/Fields/CheckMarkWithError";

export default function FatherUpdate() {
    const { id } = useParams();

  const [formData, setFormData] = useState({
    laboratory: [],
    pregnancy: [],
    });
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [date_of_birth, setDatebirth] = useState(new Date());
  const [errors, setError] = useState(null); 


  useEffect(() => {
    refreshIndividData();
    document.title = 'Изменить мать';
    const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
    fetchLaboratories();
    }, []);

  const getCSRFToken = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
  }

  const refreshIndividData = () => {
    axios
        .get(`/api/individ/${id}`)
        .then((res) => {
          setFormData(res.data);
          console.log(res.data)
          const laboratoryIds = res.data.laboratory.map(lab => lab.id);
          console.log(laboratoryIds)
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
      console.log(res.data)
    })
      .catch((err) => console.log(err));
  };   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasChecked = formData.laboratory.length > 0;

    if (!hasChecked) {
      alert('Выберите хотя бы одну лабораторию');
      }

    try {
      const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
      const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;

      const formFather = makeFatherForm();

      await axios.put(`/api/individ/${formData.individ_type}/${id}/update/`, formFather, {
      headers: {
      "Content-Type": contentTypeHeader,
      },
      });
      navigate('/individs');
    } 
    catch (error) {
        console.error('Ошибка с отправкой индивида:', error);
        setError(error.response.data);
      }
  };
  const makeFatherForm = () => {
    const formFather = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value) {
          formFather.append(key, value);
        }
      }
    }
    return formFather;
  };

  const handleChangeLaboratory = (e) => {
    const { name, value, checked } = e.target;
    const labId = parseInt(value);
    let updatedLaboratories;
    if (checked) {
      updatedLaboratories = [...formData.laboratory, labId];
    } else {
      updatedLaboratories = formData.laboratory.filter(id => id !== labId);
    }
    setFormData({ ...formData, [name]: updatedLaboratories });
  };

  const handleChangeDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFormData(prevFormData => ({ ...prevFormData, date_of_birth: formattedDate }));    
    setDatebirth(date)
  };

  return (
    <div className="features">
      <div className="user_form">
      <h2>Изменить отца</h2>
        <form onSubmit={handleSubmit}>
          <CharFieldWithError
            label="Название:"
            name="name"
            value={formData.name}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Тестовое поле:"
            name="test_field"
            value={formData.test_field}
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
          <CheckMarkWithError
            label="Создать семью:"
            name="create_family"
            value={formData.create_family}
            onChange={handleChange}
            errors={errors}  
          />
          <CharFieldWithError
            label="Номер семьи"
            name="family_number"
            value={formData.family_number}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="ID абортуса"
            name="abortus_id"
            value={formData.abortus_id}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Фамилия"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Имя"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Отчество"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleChange}
            errors={errors}
          />
          <div className="form-group">
          <label htmlFor="date_of_birth">Дата рождения:</label>
          <DatePicker selected={date_of_birth} dateFormat="yyyy/MM/dd" onChange={handleChangeDate} />
          {errors && errors.date_of_birth &&
          <div className="alert alert-danger mt-3 mb-0">{errors.date_of_receipt}</div>
          }
          </div>
          <CharFieldWithError
            label="Возраст на момент взятия, лет"
            name="age_at_sampling"
            value={formData.age_at_sampling}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Домашний адрес"
            name="home_address"
            value={formData.home_address}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Национальность"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Место рождения"
            name="place_of_birth"
            value={formData.place_of_birth}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Наследственная отягощенность в семье"
            name="hereditary_burden_in_the_family"
            value={formData.hereditary_burden_in_the_family}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Тестовое поле отец"
            name="test_field"
            value={formData.test_field}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="ID отца"
            name="father_id"
            value={formData.mother_id}
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