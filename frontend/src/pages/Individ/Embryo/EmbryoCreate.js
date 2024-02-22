import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../individ.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";

export default function EmbryoCreate() {
  const [formData, setFormData] = useState({
      name: '',
      description: '',
      laboratory: [],
      create_family: false,
      diagnosis: null,
      conception: null,
  });
  const navigate = useNavigate();
  const [allLaboratories, setAllLaboratories] = useState([]);
  const [date_of_receipt, setDate_of_receipt] = useState(new Date());
  const [last_menstruation, setLast_menstruation] = useState(new Date()); // Стейт для хранения выбранной даты
  const [errors, setError] = useState(null); // Состояние для сообщения об ошибке
  const [file, setFile] = useState(null);


  useEffect(() => {
    document.title = 'Добавить семью';
    const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
    fetchLaboratories();
  }, []);

  const getCSRFToken = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  const fetchLaboratories = () => {
    axios
        .get(`/api/laboratory`)
        .then((res) => {
          setAllLaboratories(res.data);
            console.log(res.data)
        })
        .catch((err) => console.log(err));
    };   
  const handleChange = (e) => {
      const { name, value, checked } = e.target;
      if (name === 'laboratory') {
          const labId = parseInt(value);
          let updatedLaboratories;
          if (checked) {
              updatedLaboratories = [...formData.laboratory, labId];
          } else {
              updatedLaboratories = formData.laboratory.filter(id => id !== labId);
          }
          setFormData({ ...formData, [name]: updatedLaboratories });
      } else if (name === 'create_family') {
          setFormData(prevFormData => ({ ...prevFormData, [name]: checked }));
      } else {
          setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
        // Формируем заголовок Content-Type с указанием разделителя
        const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;

        const formEmbryo = makeEmbryoForm();

        // Выполняем POST запрос с использованием axios
        await axios.post(`/api/individ/embryo/create/`, formEmbryo, {
            headers: {
                "Content-Type": contentTypeHeader,
            },
        });
        navigate('/individs');
    } catch (error) {
        console.error('Ошибка с отправкой семьи:', error);
        setError(error.response.data);

    }
};


const makeEmbryoForm = () => {
  const formEmbryo = new FormData();
  formData.name && formEmbryo.append('name', formData.name);
  formData.description && formEmbryo.append('description', formData.description);
  formData.scan_directions && formEmbryo.append('scan_directions', formData.scan_directions);
  formData.family_number && formEmbryo.append('family_number', formData.family_number);
  formData.abortus_id && formEmbryo.append('abortus_id', formData.abortus_id);
  formData.abortus_id_in_family && formEmbryo.append('abortus_id_in_family', formData.abortus_id_in_family);
  formData.laboratory && formEmbryo.append('laboratory', formData.laboratory);
  formData.test_field && formEmbryo.append('test_field', formData.test_field);
  formData.date_of_receipt && formEmbryo.append('date_of_receipt', formData.date_of_receipt);

  return formEmbryo
}

  const handleChangeLaboratory = (e) => {
    const { name, value, checked } = e.target;
    const labId = parseInt(value);
          let updatedLaboratories;
          if (checked) {
              updatedLaboratories = [...formData.laboratory, labId];
          } else {
              updatedLaboratories = formData.laboratory.filter(id => id !== labId);
          }
    setFormData({ ...formData, [name]: updatedLaboratories });
  };

  const handleChangeDateOfReceipt = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFormData(prevFormData => ({ ...prevFormData, date_of_receipt: formattedDate }));    
    setDate_of_receipt(date)
  };

  const handleChangeDateLastMenstruation = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setFormData(prevFormData => ({ ...prevFormData, last_menstruation: formattedDate }));
      setLast_menstruation(date);
    } else {
      setFormData(prevFormData => ({ ...prevFormData, last_menstruation: null }));
      setLast_menstruation(null);
    }
  };
  
    const handleImageChange = (e) => {
      let updatedFormData = { ...formData };
      updatedFormData["scan_directions"] = e.target.files[0];
      setFormData(updatedFormData)
  
      setFile(e.target.files[0]);
  };

  
  const handleChangeСheckmark = (e) => {
    const { name, checked } = e.target;
    
    setFormData({ ...formData, [name]: checked });

  }
  return (
    <div className="features">
      <div className="user_form">
        <h2>Добавить эмбриона</h2>
          <form onSubmit={handleSubmit}>
          
          <CharFieldWithError
                label="Название:"
                name="name"
                value={formData.name}
                onChange={handleChange}
                errors={errors}
              />
            <div className="form-group">
            <label>Сканы направления:</label>
                <input 
                    type="file"
                    name="scan_directions"
                    className="form-control mr-sm-2"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => {
                        handleImageChange(e);
                    }}
                />
              {errors && errors.scan_directions && (
                  <div className="alert alert-danger mt-3 mb-0">
                      <ul>
                          {errors.scan_directions.map((error, index) => (
                              <li key={index}>{error}</li>
                          ))}
                      </ul>
                  </div>
              )}
              </div>
            <CharFieldWithError
                label="Описание:"
                name="description"
                value={formData.description}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Тестовое поле:"
                name="test_field"
                value={formData.test_field}
                onChange={handleChange}
                errors={errors}
              />                              
              <div className="form-group">
                <label>Лаборатории:</label>
                {allLaboratories.map(lab => (
                  <div key={lab.id} className="form-check">
                <input
                  type="checkbox"
                  id={`lab-${lab.id}`}
                  name="laboratory"
                  value={lab.id}
                  onChange={handleChangeLaboratory}
                  className="form-check-input"
                />
                  <label htmlFor={`lab-${lab.id}`} className="form-check-label">{lab.name}</label>
                  </div>
                ))}
                  {errors && errors.laboratory && (
                      <div className="alert alert-danger mt-3 mb-0">
                          <ul>
                              {errors.laboratory.map((error, index) => (
                                  <li key={index}>{error}</li>
                              ))}
                          </ul>
                      </div>
                  )}
              </div>
              <div className="form-group">
                <label>Создать семью:</label>
                <input
                  type="checkbox"
                  id="create_family"
                  name="create_family"
                  onChange={handleChange}
                  className="form-control mr-sm-2"
                />
                {errors && errors.create_family &&
                  <div className="alert alert-danger mt-3 mb-0">{errors.create_family}</div>
                }
              </div>  
              <div className="form-group">
              <label htmlFor="date_of_receipt">Дата получения:</label>
              <DatePicker selected={date_of_receipt} dateFormat="yyyy/MM/dd" onChange={handleChangeDateOfReceipt} />
                {errors && errors.date_of_receipt &&
                  <div className="alert alert-danger mt-3 mb-0">{errors.date_of_receipt}</div>
                }
            </div>
            <CharFieldWithError
                label="Номер семьи"
                name="family_number"
                value={formData.family_number}
                onChange={handleChange}
                errors={errors}
              />
              <CharFieldWithError
                label="ID абортуса"
                name="abortus_id"
                value={formData.abortus_id}
                onChange={handleChange}
                errors={errors}
              />

              <CharFieldWithError
                label="ID абортуса в семье"
                name="abortus_id_in_family"
                value={formData.abortus_id_in_family}
                onChange={handleChange}
                errors={errors}
              />
              <div className="form-group">
              <label htmlFor="diagnosis">Диагноз:</label>
              <select id="diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} className="form-control">
                <option value="noth">---------------------</option>
                <option value="none">Нет данных</option>
                <option value="spontaneous_abortion">Спонтанный аборт</option>
                <option value="blighted_ovum">Неразвивающаяся беременность</option>
                <option value="anembryonia">Анэмбриония</option>
                <option value="fetal_development_abnormalities">Пороки развития плода</option>
              </select>
              {errors && errors.diagnosis &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.diagnosis}</div>
                }
            </div>
            <div className="form-group">
              <label htmlFor="last_menstruation">Дата последней менструации:</label>
              <DatePicker
                id="last_menstruation"
                name="last_menstruation"
                selected={last_menstruation}
                onChange={handleChangeDateLastMenstruation}
                className="form-control mr-sm-2"
                dateFormat="yyyy/MM/dd"
                />
                {errors && errors.last_menstruation &&
                  <div className="alert alert-danger mt-3 mb-0">{errors.last_menstruation}</div>
                }
            </div>
            <div className="form-group">
                <label>Срок беременности по дате:</label>
                <input 
                  type="text" 
                  name="period_pregnancy_by_date" 
                  className="form-control mr-sm-2"
                  value={formData.period_pregnancy_by_date} 
                  onChange={handleChange} 
                />
                {errors && errors.period_pregnancy_by_date &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.period_pregnancy_by_date}</div>
                }
            </div>
            <CharFieldWithError
                label="Срок беременности по УЗИ"
                name="period_pregnancy_by_USI"
                value={formData.period_pregnancy_by_USI}
                onChange={handleChange}
                errors={errors}
              />
            <div className="form-group">
              <label htmlFor="diagnosis">Зачатие:</label>
              <select id="conception" name="conception" value={formData.conception} onChange={handleChange} className="form-control">
                <option value="noth">---------------------</option>
                <option value="none">Нет данных</option>
                <option value="natural">Естественное</option>
                <option value="ivf">ЭКО</option>
                <option value="icsi">ИКСИ</option>
                <option value="pgd">ПГД</option>
                <option value="donor_egg">Донорская яйцеклетка</option>
                <option value="donor_sperm">Донорские сперматозоиды</option>
                <option value="other">Другое</option>
              </select>
              {errors && errors.diagnosis &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.diagnosis}</div>
                }
            </div>
            <div className="form-group">
              <label htmlFor="twins">Двойня:</label>
              <input 
                type="checkbox" 
                id="twins" 
                name="twins" 
                onChange={handleChangeСheckmark} 
                className="form-control mr-sm-2"
                />
                {errors && errors.twins &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.twins}</div>
                }
            </div>
            <CharFieldWithError
                label="Размеры 1 плодного мешка по x"
                name="dimensions_fetal_sac_x_1"
                value={formData.dimensions_fetal_sac_x_1}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Размеры 1 плодного мешка по y:"
                name="dimensions_fetal_sac_y_1"
                value={formData.dimensions_fetal_sac_y_1}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Размеры 2 плодного мешка по x:"
                name="dimensions_fetal_sac_x_2"
                value={formData.dimensions_fetal_sac_x_2}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Размеры 2 плодного мешка по y:"
                name="dimensions_fetal_sac_y_2"
                value={formData.dimensions_fetal_sac_y_2}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="КТР:"
                name="ktr"
                value={formData.ktr}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Особенности эмбриона:"
                name="features_embryo"
                value={formData.features_embryo}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Особенности хориона:"
                name="features_chorion"
                value={formData.features_chorion}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Особенности желточного мешка:"
                name="features_yolk_sac"
                value={formData.features_yolk_sac}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Особенности амниотической оболочки:"
                name="features_amniotic_membrane"
                value={formData.features_amniotic_membrane}
                onChange={handleChange}
                errors={errors}
              />
            <CharFieldWithError
                label="Примечание:"
                name="note"
                value={formData.note}
                onChange={handleChange}
                errors={errors}
              />
            {/* <div className="form-group">
                <label>Кариотип:</label>
                <input 
                  type="text" 
                  name="karyotype" 
                  className="form-control mr-sm-2"
                  value={formData.karyotype} 
                  onChange={handleChange} 
                />
                {errors && errors.karyotype &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.karyotype}</div>
                }
            </div>
            <div className="form-group">
            <label htmlFor="karyotype_type">Выберите кариотип:</label>
            <select id="karyotype_type" name="karyotype_type" value={formData.karyotype_type} onChange={handleChange} className="form-control">
              <option value="">---------------------</option>
              <option value="46,XX">46,XX</option>
              <option value="46,XY">46,XY</option>
              <option value="45,X">45,X</option>
              <option value="sex chromosome trisomy">Трисомия по половым хромосомам</option>
              <option value="autosome trisomy">Трисомия аутосом</option>
              <option value="mosaic autosome trisomy">Трисомия аутосом MOS с нормальным клоном</option>
              <option value="double trisomy">Двойная трисомия</option>
              <option value="triploidy">Триплоидия</option>
            </select>
            {errors && errors.karyotype_type &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.karyotype_type}</div>
                }
          </div>
          <div className="form-group">
                <label>Сверхчисленная хромосома:</label>
                <input 
                  type="text" 
                  name="supernumerary_chromosome" 
                  className="form-control mr-sm-2"
                  value={formData.supernumerary_chromosome} 
                  onChange={handleChange} 
                />
                {errors && errors.supernumerary_chromosome &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.supernumerary_chromosome}</div>
                }
            </div>
          <div className="form-group">
              <label htmlFor="mosaicism">Мозаицизм:</label>
              <input 
                type="checkbox" 
                id="mosaicism" 
                name="mosaicism" 
                onChange={handleChangeСheckmark} 
                className="form-control mr-sm-2"
                />
                {errors && errors.mosaicism &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.mosaicism}</div>
                }
            </div>
            <div className="form-group">
                <label>Стандартный кариотип:</label>
                <input 
                  type="text" 
                  name="standard_karyotype" 
                  className="form-control mr-sm-2"
                  value={formData.standard_karyotype} 
                  onChange={handleChange} 
                />
                {errors && errors.standard_karyotype &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.standard_karyotype}</div>
                }
            </div>
            <div className="form-group">
                <label>aCGH кариотип:</label>
                <input 
                  type="text" 
                  name="aCGH_karyotype" 
                  className="form-control mr-sm-2"
                  value={formData.aCGH_karyotype} 
                  onChange={handleChange} 
                />
                {errors && errors.aCGH_karyotype &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.aCGH_karyotype}</div>
                }
            </div>
            <div className="form-group">
                <label>CNV:</label>
                <input 
                  type="text" 
                  name="CNV" 
                  className="form-control mr-sm-2"
                  value={formData.CNV} 
                  onChange={handleChange} 
                />
                {errors && errors.CNV &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.CNV}</div>
                }
            </div>
            <div className="form-group">
                <label>FISH:</label>
                <input 
                  type="text" 
                  name="FISH" 
                  className="form-control mr-sm-2"
                  value={formData.FISH} 
                  onChange={handleChange} 
                />
                {errors && errors.FISH &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.FISH}</div>
                }
            </div>
            <div className="form-group">
              <label htmlFor="FISH_mosaicism">FISH мозаицизм:</label>
              <input 
                type="checkbox" 
                id="FISH_mosaicism" 
                name="FISH_mosaicism" 
                onChange={handleChangeСheckmark} 
                className="form-control mr-sm-2"
                />
                {errors && errors.FISH_mosaicism &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.FISH_mosaicism}</div>
                }
            </div>
            <div className="form-group">
                <label>CGH:</label>
                <input 
                  type="text" 
                  name="CGH" 
                  className="form-control mr-sm-2"
                  value={formData.CGH} 
                  onChange={handleChange} 
                />
                {errors && errors.CGH &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.CGH}</div>
                }
            </div>
            <div className="form-group">
                <label>STR:</label>
                <input 
                  type="text" 
                  name="STR" 
                  className="form-control mr-sm-2"
                  value={formData.STR} 
                  onChange={handleChange} 
                />
                {errors && errors.STR &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.STR}</div>
                }
            </div>
            <div className="form-group">
                <label>SRY:</label>
                <input 
                  type="text" 
                  name="SRY" 
                  className="form-control mr-sm-2"
                  value={formData.SRY} 
                  onChange={handleChange} 
                />
                {errors && errors.SRY &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.SRY}</div>
                }
            </div>
            <div className="form-group">
                <label>RT PCR:</label>
                <input 
                  type="text" 
                  name="RT_PCR" 
                  className="form-control mr-sm-2"
                  value={formData.RT_PCR} 
                  onChange={handleChange} 
                />
                {errors && errors.RT_PCR &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.RT_PCR}</div>
                }
            </div>
            <div className="form-group">
                <label>Метилирование:</label>
                <input 
                  type="text" 
                  name="methylation" 
                  className="form-control mr-sm-2"
                  value={formData.methylation} 
                  onChange={handleChange} 
                />
                {errors && errors.methylation &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.methylation}</div>
                }
            </div>
            <div className="form-group">
                <label>LINE:</label>
                <input 
                  type="text" 
                  name="LINE" 
                  className="form-control mr-sm-2"
                  value={formData.LINE} 
                  onChange={handleChange} 
                />
                {errors && errors.LINE &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.LINE}</div>
                }
            </div>
            <div className="form-group">
              <label htmlFor="FISH_mosaicism">Конфликт между различными методами:</label>
              <input 
                type="checkbox" 
                id="сonflict_between_different_methods" 
                name="сonflict_between_different_methods" 
                onChange={handleChangeСheckmark} 
                className="form-control mr-sm-2"
                />
                {errors && errors.сonflict_between_different_methods &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.сonflict_between_different_methods}</div>
                }
            </div>
            <div className="form-group">
                <label>Суть конфликта:</label>
                <input 
                  type="text" 
                  name="essence_conflict" 
                  className="form-control mr-sm-2"
                  value={formData.essence_conflict} 
                  onChange={handleChange} 
                />
                {errors && errors.essence_conflict &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.essence_conflict}</div>
                }
            </div> */}
          <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </form>
      </div>
    </div>
  );
}