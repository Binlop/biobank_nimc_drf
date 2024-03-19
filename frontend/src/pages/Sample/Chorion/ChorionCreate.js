import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import "../sample.css"
import "react-datepicker/dist/react-datepicker.css";
import { makeSampleForm, fetchSamplePlaces, FormToCreateSample } from "../../../components/API/CreateSample";


export default function ChorionCreate() {
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const individId = searchParams.get('individ_id');
  const [samplePlaces, setSamplePlaces] = useState([]); 
  const navigate = useNavigate();
  const [errors, setError] = useState({}); 

  useEffect(() => {
    document.title = 'Добавить кровь';
    fetchSamplePlaces(setSamplePlaces);
    const csrftoken = getCSRFToken('csrftoken'); 
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    }, []);
  
  const handleSubmitSample = async (e) => {
    e.preventDefault();

    try {
      const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
      const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;

      const formSample = makeSampleForm(formData);
      formSample.append('individ_id', individId)

      await axios.post(`/api/sample/chorion/create/`, formSample, {
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

  const getCSRFToken = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };
 

  return (
  <FormToCreateSample
    handleSubmit={handleSubmitSample}
    handleChange={handleChange}
    samplePlaces={samplePlaces}
    formData={formData}
    errors={errors}
  />
  );
  }