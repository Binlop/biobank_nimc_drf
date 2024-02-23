import React from "react";
import MultipleErrorField from "./Errors/Error";

const CheckMarkWithError = ({ label, name, value, onChange, errors }) => {
  return (
    <div className="form-group">
        <input 
          type="checkbox" 
          name={name}
          onChange={onChange}
          className="form-check-input"
        />
      <label className="form-check-label">{label}:</label>
        <MultipleErrorField
            name={name}
            errors={errors}
        >
        </MultipleErrorField>
    </div>
  );
};

export default CheckMarkWithError;