import React from 'react';
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import CheckMarkWithError from "../../../components/Fields/CheckMarkWithError";
import DatePicker from "react-datepicker";


const MotherFilterForm = ({ motherData, handleChangeMother, handleChangeDateOfBirth, errors, toggleMother, 
    handleChangeMotherCheckMark, isOpenMother }) => {
    return (
        <div className="collapsible" onClick={toggleMother}>
        {"Мать"}
        <br />
        {isOpenMother && (          
          <div onClick={(event) => event.stopPropagation()}>
            <CharFieldWithError
              label="Название"
              name="name"
              value={motherData.name}
              onChange={handleChangeMother}
              errors={errors}
            />
            <CheckMarkWithError
            label="Кровь:"
            name="count_blood"
            value={motherData.count_blood || false}            
            onChange={handleChangeMotherCheckMark}
            errors={errors}  
            />
            <CheckMarkWithError
            label="ДНК:"
            name="count_dna"
            value={motherData.count_dna || false}
            onChange={handleChangeMotherCheckMark}
            errors={errors}  
          />
            <CheckMarkWithError
            label="Хорион:"
            name="count_chorion"
            value={motherData.count_chorion || false}
            onChange={handleChangeMotherCheckMark}
            errors={errors}  
          />
        <CharFieldWithError
            label="№ Семьи"
            name="family_number"
            value={motherData.family_number}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="ID абортуса"
            name="abortion_id"
            value={motherData.abortion_id}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="ID матери"
            name="mother_id"
            value={motherData.mother_id}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Фамилия"
            name="last_name"
            value={motherData.last_name}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Имя"
            name="first_name"
            value={motherData.first_name}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Отчество"
            name="patronymic"
            value={motherData.patronymic}
            onChange={handleChangeMother}
            errors={errors}
        />
        <div className="form-group">
        <label htmlFor="date_of_birth">Дата рождения:</label>
        <DatePicker selected={motherData.date_of_birth} dateFormat="yyyy/MM/dd" onChange={handleChangeDateOfBirth} />
        {errors && errors.date_of_birth &&
        <div className="alert alert-danger mt-3 mb-0">{errors.date_of_birth}</div>
        }
        </div>
        <CharFieldWithError
            label="Возраст на момент взятия(лет)"
            name="age_at_sampling"
            value={motherData.age_at_sampling}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Телефон"
            name="phone"
            value={motherData.phone}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Домашний адрес"
            name="home_address"
            value={motherData.home_address}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Национальность"
            name="nationality"
            value={motherData.nationality}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Место рождения"
            name="place_of_birth"
            value={motherData.place_of_birth}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Наследственная отягощенность в семье"
            name="hereditary_burden_in_the_family"
            value={motherData.hereditary_burden_in_the_family}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Число беременностей"
            name="number_of_pregnancies"
            value={motherData.number_of_pregnancies}
            onChange={handleChangeMother}
            errors={errors}
        />
          <div className="form-group">
            <label>Привычное невынашивание</label>
            <select name="habitual_miscarriage" value={motherData.habitual_miscarriage} onChange={handleChangeMother} className="form-control">
            <option value="noth">---------------------</option>
            <option value="none">Нет данных</option>
            <option value="fisrt">Первичное</option>
            <option value="second">Вторичное</option>
            <option value="no_PNB">Нет ПНБ</option>
            </select>
            {errors && errors.habitual_miscarriage &&
            <div className="alert alert-danger mt-3 mb-0">{errors.habitual_miscarriage}</div>
            }
          </div>
          <div className="form-group">
            <label>Настоящая беременность - диагноз</label>
            <select name="diagnosis_of_current_pregnancy" value={motherData.diagnosis_of_current_pregnancy} onChange={handleChangeMother} className="form-control">
            <option value="noth">---------------------</option>
            <option value="none">Нет данных</option>
            <option value="spontaneous_abortion">Спонтанный аборт</option>
            <option value="blighted_ovum">Неразвивающаяся беременность</option>
            <option value="anembryonia">Анэмбриония</option>
            <option value="fetal_development_abnormalities">Пороки развития плода</option>
            </select>
            {errors && errors.diagnosis_of_current_pregnancy &&
            <div className="alert alert-danger mt-3 mb-0">{errors.diagnosis_of_current_pregnancy}</div>
            }
          </div>
          <CharFieldWithError
            label="Примечание"
            name="note"
            value={motherData.note}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Гинекологические заболевания матери"
            name="mother_gynecological_diseases"
            value={motherData.mother_gynecological_diseases}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Экстрагенитальные заболевания матери"
            name="mother_extragenital_diseases"
            value={motherData.mother_extragenital_diseases}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Возраст начала менструации, лет"
            name="age_at_menarche"
            value={motherData.age_at_menarche}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Продолжительность цикла, дней"
            name="cycle_duration_days"
            value={motherData.cycle_duration_days}
            onChange={handleChangeMother}
            errors={errors}
        />
        <CharFieldWithError
            label="Примечание"
            name="menstrual_note"
            value={motherData.menstrual_note}
            onChange={handleChangeMother}
            errors={errors}
        />
          </div>
        )}
        </div>    
    );
};

export default MotherFilterForm;