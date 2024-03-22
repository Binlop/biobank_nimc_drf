import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import CheckMarkWithError from "../../../components/Fields/CheckMarkWithError";
import { handleUpdate, setCSRFToken } from "../../../components/API/CreateUpdate";
import { refreshObjectList } from "../../../components/API/GetListOrDelete";
import "../individ.css"

export default function AnotherMemberUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    laboratory: [],
    });
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [errors, setError] = useState(null); 

  useEffect(() => {
    refreshIndividData();
    document.title = 'Изменить отца';
    setCSRFToken();
    refreshObjectList(setAllLaboratories,`/api/laboratory`)
    }, []);

  const refreshIndividData = () => {
    axios
        .get(`/api/individ/${id}`)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIndivid = makeIndividForm();
    handleUpdate(e, formIndivid, `/api/individ/${formData.individ_type}/${id}/update/`, `/individs/${formData.individ_type}/${id}/`, setError, navigate)
  };

  const makeIndividForm = () => {
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

  return (
    <div className="features">
      <div className="user_form">
      <h2>Изменить иного члена семьи</h2>
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
          <FormGroup>
            <Label>Дата рождения</Label>
            <Input
              name="date_of_birth"
              type="date"
              onChange = {handleChange}
              value = {formData.date_of_birth}
            />
            {errors && errors.date_of_birth &&
            <div className="alert alert-danger mt-3 mb-0">{errors.date_of_birth}</div>
            }
          </FormGroup>
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
            label="ID иного члена семьи"
            name="another_member_user_id"
            value={formData.another_member_user_id}
            onChange={handleChange}
            errors={errors}
          />
          <button type="submit" className="btn btn-primary">
          Изменить
          </button>
        </form>
      </div>
    </div>
  );
  }