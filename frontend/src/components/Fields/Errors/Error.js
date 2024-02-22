import React from "react";

const MultipleErrorField = ({ name, errors }) => {
  return (
    <div className="form-group">
      {errors && errors[name] && (
        <div className="alert alert-danger mt-3 mb-0">
          <ul>
            {errors[name].map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultipleErrorField;
