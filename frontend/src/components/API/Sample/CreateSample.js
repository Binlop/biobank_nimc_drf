import axios from "axios";
import CharFieldWithError from "../../Fields/CharFieldWithError";
import { useNavigate, useLocation } from 'react-router-dom';


export function GetParamFromURL(param_name){
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const individId = searchParams.get(param_name);
  return individId
}

 export const makeSampleForm = (formData, individId, originalSampleId) => {
    const formSample = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value) {
          formSample.append(key, value);
        }
      }
    }
    formSample.append('individ_id', individId)
    formSample.append('original_sample_id', originalSampleId)
    return formSample;
  };

export const fetchSamplePlaces = (setSamplePlaces) => {
    axios
      .get(`/api/storage/sample_map/0`)
      .then((res) => {
        setSamplePlaces(res.data);
    })
      .catch((err) => console.log(err));
  };   

  export const FormToCreateSample = ({ handleSubmit, handleChange, samplePlaces, formData, errors }) => {    
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
            <CharFieldWithError
            label="Концентрация(для ДНК), нг/нл:"
            name="concentration"
            value={formData.concentration}
            onChange={handleChange}
            errors={errors}
            />       
            <div className="form-group">
            <label>Место хранения:</label>
            <select
            className="form-control"
            onChange={handleChange}
            name ="sample_place"
            value={formData.sample_place}
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
  )
}