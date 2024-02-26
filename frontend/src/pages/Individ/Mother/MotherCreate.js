import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../individ.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import CheckMarkWithError from "../../../components/Fields/CheckMarkWithError";

export default function MotherCreate() {
  const [formData, setFormData] = useState({
    laboratory: [],
    pregnancy: [],
    });
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [date_of_birth, setDatebirth] = useState(new Date());
  const [errors, setError] = useState(null); 


  useEffect(() => {
    document.title = 'Добавить мать';
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

      const formEmbryo = makeEmbryoForm();

      await axios.post(`/api/individ/mother/create/`, formEmbryo, {
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
  const makeEmbryoForm = () => {
    const formEmbryo = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value) {
          formEmbryo.append(key, value);
        }
      }
    }
    return formEmbryo;
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

  const handleAddFieldPregnancy = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      pregnancy: [...prevFormData.pregnancy, []] // Добавляем новое пустое поле
    }));
  };

  const handleChangePregnancy = (index, event) => {
    const { name, value } = event.target;
    const newPregnancy = formData.pregnancy.map((item, i) => {
      if (i === index) {
        const newValue = value.split(','); // Разделяем строку на пары значений (год и диагноз)
        return [parseInt(newValue[0]), newValue[1]]; // Преобразуем год в целое число
      } else {
        return item;
      }
    });
    setFormData(prevFormData => ({
      ...prevFormData,
      pregnancy: newPregnancy
    }));
  };

  const handleChangeDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFormData(prevFormData => ({ ...prevFormData, date_of_birth: formattedDate }));    
    setDatebirth(date)
  };

  const handleChangeСheckmark = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  }

  return (
    <div className="features">
      <div className="user_form">
      <h2>Добавить мать</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>Беременности</label>
        {formData.pregnancy.map((item, index) => (
      <div key={index}>
        <input
          type="text"
          name="pregnancy"
          placeholder="Год, Диагноз"
          value={`${item[0]},${item[1]}`} // Объединяем год и диагноз в строку с разделителем
          onChange={(event) => handleChangePregnancy(index, event)}
        />
      </div>
    ))}
    <button onClick={(e) => { e.preventDefault(); handleAddFieldPregnancy(); }}>Добавить поле для беременности</button>      
    </div>
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
          />
          <label htmlFor={`lab-${lab.id}`} className="form-check-label">{lab.name}</label>
          </div>
          ))}
          </div>
          {/* <div className="form-group">
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
          </div>   */}
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
            label="Тестовое поле мать"
            name="test_field"
            value={formData.test_field}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="ID матери"
            name="mother_id"
            value={formData.mother_id}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Число беременностей"
            name="number_of_pregnancies"
            value={formData.number_of_pregnancies}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Привычное невынашивание"
            name="habitual_miscarriage"
            value={formData.habitual_miscarriage}
            onChange={handleChange}
            errors={errors}
          />
          <div className="form-group">
            <label htmlFor="diagnosis_of_current_pregnancy">Диагноз:</label>
            <select id="diagnosis_of_current_pregnancy" name="diagnosis_of_current_pregnancy" value={formData.diagnosis_of_current_pregnancy} onChange={handleChange} className="form-control">
            <option value="noth">---------------------</option>
            <option value="none">Нет данных</option>
            <option value="spontaneous_abortion">Спонтанный аборт</option>
            <option value="blighted_ovum">Неразвивающаяся беременность</option>
            <option value="anembryonia">Анэмбриония</option>
            <option value="fetal_development_abnormalities">Пороки развития плода</option>
            </select>
            {errors && errors.diagnosis &&
            <div className="alert alert-danger mt-3 mb-0">{errors.diagnosis}</div>
            }
          </div>
          <CharFieldWithError
          label="Срок беременности по УЗИ"
          name="period_pregnancy_by_USI"
          value={formData.period_pregnancy_by_USI}
          onChange={handleChange}
          errors={errors}
          />
          <CharFieldWithError
          label="Примечание"
          name="note"
          value={formData.note}
          onChange={handleChange}
          errors={errors}
          />
          <CharFieldWithError
          label="Гинекологические заболевания матери"
          name="mother_gynecological_diseases"
          value={formData.mother_gynecological_diseases}
          onChange={handleChange}
          errors={errors}
          />
          <CharFieldWithError
          label="Экстрагенитальные заболевания матери"
          name="mother_extragenital_diseases"
          value={formData.mother_extragenital_diseases}
          onChange={handleChange}
          errors={errors}
          />
          <CharFieldWithError
          label="Возраст начала менструации, лет"
          name="age_at_menarche"
          value={formData.age_at_menarche}
          onChange={handleChange}
          errors={errors}
          />
          <CharFieldWithError
          label="Продолжительность цикла, дней"
          name="cycle_duration_days"
          value={formData.cycle_duration_days}
          onChange={handleChange}
          errors={errors}
          />
          <CharFieldWithError
          label="Примечание"
          name="menstrual_note"
          value={formData.menstrual_note}
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