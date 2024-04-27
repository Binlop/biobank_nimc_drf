import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FormGroup, Input, Label } from "reactstrap";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import CheckMarkWithError from "../../../components/Fields/CheckMarkWithError";
import { handlePost, setCSRFToken } from "../../../components/API/CreateUpdate";
import { refreshObjectList } from "../../../components/API/GetListOrDelete";
import { GetParamFromURL } from "../../../components/API/Sample/CreateSample";
import "../individ.css"


export default function MotherCreate() {
  const [formData, setFormData] = useState({
    laboratory: [],
    });
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [errors, setError] = useState(null); 
  const [pregnancies, setPregnancies] = useState([{ pregnancy_year: "", diagnosis: "" }]);
  const familyId = GetParamFromURL('family_id')

  useEffect(() => {
    document.title = 'Добавить мать';
    setCSRFToken();
    refreshObjectList(setAllLaboratories,`/api/laboratory`)
    }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIndivid = makeIndividForm();
    if (familyId){
      formIndivid.append('family_id', familyId)
    }
    handlePost(e, formIndivid, `/api/individ/mother/create/`, `/individs/`, setError, navigate)
  };

  const makeIndividForm = () => {
    const formEmbryo = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value) {
          formEmbryo.append(key, value);
        }
      }
    }
    formEmbryo.append('pregnancy', JSON.stringify(pregnancies))
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

  const handleAddPregnancy = () => {
    setPregnancies([...pregnancies, { pregnancy_year: "", diagnosis: "" }]);
  };

  const handleChangePregnancy = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...pregnancies];
    onChangeValue[index][name] = value;
    setPregnancies(onChangeValue);
  };

  const handleDeletePregnancy = (index) => {
    const newArray = [...pregnancies];
    newArray.splice(index, 1);
    setPregnancies(newArray);
  };

  return (
    <div className="features">
      <div className="user_form">
      <h2>Добавить мать</h2>
        <form onSubmit={handleSubmit}>
        <div className="container_pregnancy">
          {pregnancies.map((item, index) => (
            <div className="input_container" key={index}>
              <input
                name="pregnancy_year"
                placeholder="Год беременности"
                type="text"
                value={item.pregnancy_year}
                onChange={(event) => handleChangePregnancy(event, index)}
              />
              <label>Диагноз</label>
              <select type="text" name="diagnosis" value={item.diagnosis} onChange={(event) => handleChangePregnancy(event, index)} className="form-control">
              <option value="noth">---------------------</option>
              <option value="none">Нет данных</option>
              <option value="spontaneous_abortion">Спонтанный аборт</option>
              <option value="blighted_ovum">Неразвивающаяся беременность</option>
              <option value="anembryonia">Анэмбриония</option>
              <option value="fetal_development_abnormalities">Пороки развития плода</option>
              <option value="medical_abortion">Медицинский аборт</option>
              <option value="ectopic_pregnancy">Внематочная беременность</option>
              <option value="stillbirth">Мертворожденный ребенок</option>
              <option value="live_birth">Живорожденный ребенок</option>
              <option value="child_with_developmental_defects">Ребенок с пороками развития</option>
              <option value="child_with_delayed_development">Ребенок с задержкой психо-речевого развития</option>
              </select>
              {pregnancies.length > 1 && (
                <button onClick={() => handleDeletePregnancy(index)}>Удалить</button>
              )}
              {index === pregnancies.length - 1 && (
                <button onClick={() => handleAddPregnancy()}>Добавить</button>
              )}
            </div>
          ))}

          {/* <div className="body"> {JSON.stringify(inputs)} </div> */}
        </div>
          <CharFieldWithError
            label="Название:"
            name="name"
            value={formData.name}
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