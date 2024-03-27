import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { handleUpdate, setCSRFToken } from "../../components/API/CreateUpdate";
import { refreshObjectList, refreshObjectDetail } from "../../components/API/GetListOrDelete";
import "./sample.css"
import { makeSampleForm, FormToCreateSample, GetParamFromURL } from "../../components/API/Sample/CreateSample";


export default function SampleUpdate(props) {
    const { page_title } = props;
    const [formData, setFormData] = useState({});
    const [samplePlaces, setSamplePlaces] = useState([]); 
    const navigate = useNavigate();
    const [errors, setError] = useState({}); 
    const { id } = useParams();

    useEffect(() => {
        document.title = page_title;
        setCSRFToken();
        refreshObjectDetail(setFormData, `/api/sample/${id}/`)
        refreshObjectList(setSamplePlaces, `/api/storage/sample_map/0`);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const sampleId = formData.sampletype !== 'aliquot' ? formData.sample.id : formData.original_sample.sample.id;
        const formSample = makeSampleForm(formData, formData.individ.individ.id, formData.sample.id);
        handleUpdate(e, formSample, `/api/sample/${formData.sampletype}/${id}/update/`, `/samples/`, setError, navigate)
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