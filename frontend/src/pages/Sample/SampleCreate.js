import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { handlePost, setCSRFToken } from "../../components/API/CreateUpdate";
import { refreshObjectList } from "../../components/API/GetListOrDelete";
import "./sample.css"
import { makeSampleForm, FormToCreateSample, GetParamFromURL } from "../../components/API/Sample/CreateSample";


export default function SampleCreate(props) {
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
  <FormToCreateSample
    handleSubmit={handleSubmit}
    handleChange={handleChange}
    samplePlaces={samplePlaces}
    formData={formData}
    errors={errors}
  />
  );
  }