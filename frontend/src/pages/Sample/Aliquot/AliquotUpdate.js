import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import "../sample.css"
import "react-datepicker/dist/react-datepicker.css";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";

export default function AliquotUpdate() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [errors, setError] = useState(null); 
  const { id } = useParams();
  const [samplePlaces, setSamplePlaces] = useState([]); 

  useEffect(() => {
    refreshSampleData();
    document.title = 'Изменить ДНК';
    const csrftoken = getCSRFToken('csrftoken'); 
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    }, []);

  const getCSRFToken = (name) => {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const refreshSampleData = () => {
    axios
        .get(`/api/sample/${id}/`)
        .then((res) => {
          setFormData(res.data);     
          fetchSamplePlaces();      
        })
        .catch((err) => console.log(err));
  };

  const fetchSamplePlaces = () => {
    axios
      .get(`/api/storage/sample_map/${id}`)
      .then((res) => {
        setSamplePlaces(res.data);
      console.log(res.data)
    })
      .catch((err) => console.log(err));
  };   

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
      const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;

      const formSample = makeSampleForm();
      console.log(formSample)
      await axios.put(`/api/sample/dna/${id}/update/`, formSample, {
      headers: {
      "Content-Type": contentTypeHeader,
      },
      });
      navigate('/samples');
    } 
    catch (error) {
        console.error('Ошибка с отправкой образца:', error);
        setError(error.response.data);
      }
  };
  const makeSampleForm = () => {
    const formSample = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value) {
          formSample.append(key, value);
        }
      }
    }
    return formSample;
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
        <label>Лаборатории:</label>
        <select
          className="form-control"
          // value={selectedValue} // Предположим, что selectedValue - это состояние, хранящее выбранное значение
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