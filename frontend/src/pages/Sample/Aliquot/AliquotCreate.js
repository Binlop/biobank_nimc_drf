import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { handlePost, setCSRFToken } from "../../../components/API/CreateUpdate";
import { refreshObjectList } from "../../../components/API/GetListOrDelete";
import { makeSampleForm, GetParamFromURL } from "../../../components/API/Sample/CreateSample";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import "../sample.css"


export default function AliquotCreate(props) {
  const { page_title, apiPath } = props;
  const [formData, setFormData] = useState({});
  const individId = GetParamFromURL('individ_id')
  const [samplePlaces, setSamplePlaces] = useState([]); 
  const navigate = useNavigate();
  const [errors, setError] = useState({}); 

  useEffect(() => {
      document.title = page_title;
      setCSRFToken();
      refreshObjectList(setSamplePlaces, `/api/storage/sample_map/0`);
  }, []);

  const handleSubmit = (e) => {
      e.preventDefault();
      const formSample = makeSampleForm(formData, individId);
      handlePost(e, formSample, apiPath, `/samples/`, setError, navigate)
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="features">
      <div className="user_form">
      <h2>Добавить образец</h2>
        <form onSubmit={handleSubmit}>
          <CharFieldWithError
            label="Название:"
            name="name"
            value={formData.name}
            onChange={handleChange}
            errors={errors}
          />
          <CharFieldWithError
            label="Баркод:"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            errors={errors}
          />                              
          <CharFieldWithError
            label="Кол-во:"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            errors={errors}
          />       
          <div className="form-group">
          <label>Место хранения:</label>
          <select
            className="form-control"
            value={formData.sample_place}
            onChange={handleChange}
            name ="sample_place"
          >
            {samplePlaces.map((place) => (
              <option key={place.id} value={place.id}>{place.name}</option>
            ))}
          </select>
        </div>                         
          <button type="submit" className="btn btn-primary">
          Добавить
          </button>
        </form>
      </div>
    </div>
  );
  }