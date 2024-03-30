import React from 'react';
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import CheckMarkWithError from "../../../components/Fields/CheckMarkWithError";
import { FormGroup, Input, Label } from "reactstrap";


const AnotherMemberFilterForm = ({ anotherMemberData, handleChangeAnotherMember, errors, toggleAnotherMember, 
    handleChangeAnotherMemberCheckMark, isOpenAnotherMember }) => {
    return (
        <div className="collapsible" onClick={toggleAnotherMember}>
        {"Иной член семьи"}
        <br />
        {isOpenAnotherMember && (          
          <div onClick={(event) => event.stopPropagation()}>
            <CharFieldWithError
              label="Название"
              name="name"
              value={anotherMemberData.name}
              onChange={handleChangeAnotherMember}
              errors={errors}
            />
            <CheckMarkWithError
            label="Кровь:"
            name="count_blood"
            value={anotherMemberData.count_blood || false}            
            onChange={handleChangeAnotherMemberCheckMark}
            errors={errors}  
            />
            <CheckMarkWithError
            label="ДНК:"
            name="count_dna"
            value={anotherMemberData.count_dna || false}
            onChange={handleChangeAnotherMemberCheckMark}
            errors={errors}  
          />
            <CheckMarkWithError
            label="Хорион:"
            name="count_chorion"
            value={anotherMemberData.count_chorion || false}
            onChange={handleChangeAnotherMemberCheckMark}
            errors={errors}  
          />
        <CharFieldWithError
            label="№ Семьи"
            name="family_number"
            value={anotherMemberData.family_number}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="ID абортуса"
            name="abortion_id"
            value={anotherMemberData.abortion_id}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="ID иного члена семьи"
            name="another_member_id"
            value={anotherMemberData.another_member_id}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="Фамилия"
            name="last_name"
            value={anotherMemberData.last_name}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="Имя"
            name="first_name"
            value={anotherMemberData.first_name}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="Отчество"
            name="patronymic"
            value={anotherMemberData.patronymic}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <FormGroup>
        <Label>Дата рождения</Label>
        <Input
            name="date_of_birth"
            type="date"
            onChange = {handleChangeAnotherMember}
            value = {anotherMemberData.date_of_birth}
        />
        {errors && errors.date_of_birth &&
        <div className="alert alert-danger mt-3 mb-0">{errors.date_of_birth}</div>
        }
        </FormGroup>
        <CharFieldWithError
            label="Возраст на момент взятия(лет)"
            name="age_at_sampling"
            value={anotherMemberData.age_at_sampling}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="Телефон"
            name="phone"
            value={anotherMemberData.phone}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="Домашний адрес"
            name="home_address"
            value={anotherMemberData.home_address}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="Национальность"
            name="nationality"
            value={anotherMemberData.nationality}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="Место рождения"
            name="place_of_birth"
            value={anotherMemberData.place_of_birth}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
        <CharFieldWithError
            label="Наследственная отягощенность в семье"
            name="hereditary_burden_in_the_family"
            value={anotherMemberData.hereditary_burden_in_the_family}
            onChange={handleChangeAnotherMember}
            errors={errors}
        />
          </div>
        )}
        </div>    
    );
};

export default AnotherMemberFilterForm;