import React from "react";
import MultipleErrorField from "./Errors/Error";

const CharFieldWithError = ({ label, name, value, onChange, errors }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type="text"
        name={name}
        className="form-control mr-sm-2"
        value={value}
        onChange={onChange}
      />
        <MultipleErrorField
            name={name}
            errors={errors}
        >
        </MultipleErrorField>
    </div>
  );
};

export default CharFieldWithError;
