import React from 'react';
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import CheckMarkWithError from "../../../components/Fields/CheckMarkWithError";
import DatePicker from "react-datepicker";


const FatherFilterForm = ({ fatherData, handleChangeFather, handleChangeDateOfBirth, errors, toggleFather, 
    handleChangeFatherCheckMark, isOpenFather }) => {
    return (
        <div className="collapsible" onClick={toggleFather}>
        {"Отец"}
        <br />
        {isOpenFather && (          
          <div onClick={(event) => event.stopPropagation()}>
            <CharFieldWithError
              label="Название"
              name="name"
              value={fatherData.name}
              onChange={handleChangeFather}
              errors={errors}
            />
            <CheckMarkWithError
            label="Кровь:"
            name="count_blood"
            value={fatherData.count_blood || false}            
            onChange={handleChangeFatherCheckMark}
            errors={errors}  
            />
            <CheckMarkWithError
            label="ДНК:"
            name="count_dna"
            value={fatherData.count_dna || false}
            onChange={handleChangeFatherCheckMark}
            errors={errors}  
          />
            <CheckMarkWithError
            label="Хорион:"
            name="count_chorion"
            value={fatherData.count_chorion || false}
            onChange={handleChangeFatherCheckMark}
            errors={errors}  
          />
        <CharFieldWithError
            label="№ Семьи"
            name="family_number"
            value={fatherData.family_number}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="ID абортуса"
            name="abortion_id"
            value={fatherData.abortion_id}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="ID отца"
            name="father_id"
            value={fatherData.father_id}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="Фамилия"
            name="last_name"
            value={fatherData.last_name}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="Имя"
            name="first_name"
            value={fatherData.first_name}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="Отчество"
            name="patronymic"
            value={fatherData.patronymic}
            onChange={handleChangeFather}
            errors={errors}
        />
        <div className="form-group">
        <label htmlFor="date_of_birth">Дата рождения:</label>
        <DatePicker selected={fatherData.date_of_birth} dateFormat="yyyy/MM/dd" onChange={handleChangeDateOfBirth} />
        {errors && errors.date_of_birth &&
        <div className="alert alert-danger mt-3 mb-0">{errors.date_of_birth}</div>
        }
        </div>
        <CharFieldWithError
            label="Возраст на момент взятия(лет)"
            name="age_at_sampling"
            value={fatherData.age_at_sampling}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="Телефон"
            name="phone"
            value={fatherData.phone}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="Домашний адрес"
            name="home_address"
            value={fatherData.home_address}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="Национальность"
            name="nationality"
            value={fatherData.nationality}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="Место рождения"
            name="place_of_birth"
            value={fatherData.place_of_birth}
            onChange={handleChangeFather}
            errors={errors}
        />
        <CharFieldWithError
            label="Наследственная отягощенность в семье"
            name="hereditary_burden_in_the_family"
            value={fatherData.hereditary_burden_in_the_family}
            onChange={handleChangeFather}
            errors={errors}
        />
          </div>
        )}
        </div>    
    );
};

export default FatherFilterForm;