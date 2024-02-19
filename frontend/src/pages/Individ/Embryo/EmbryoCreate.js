import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Multiselect from 'react-select'
import "../individ.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from 'react-dropzone';
import { UploadDropzone } from "@bytescale/upload-widget-react";

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
        await axios.post('/api/individ/embryo/create/', formData);
        navigate('/individs');
    } catch (error) {
        console.error('Ошибка с отправкой семьи:', error);
        setError(error.response.data);

    }
};


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
    setFormData(prevFormData => ({ ...prevFormData, scan_directions: e.target.files[0] }));
  };
  const handleUploadFile = ({ uploadedFiles }) => {
    console.log(uploadedFiles); // Вывод информации о загруженных файлах в консоль

    // Обновление данных формы после загрузки файла
    if (uploadedFiles.length > 0) {
      // const fileUrl = uploadedFiles[0].fileUrl; // Получение URL загруженного файла
      // setUploadedFile(fileUrl); // Сохранение URL в состоянии
      setFormData(prevFormData => ({
        ...prevFormData,
        scan_directions: uploadedFiles[0].fileUrl // Обновление данных формы
      }));
    }
  };
  



  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: 'image/*, .pdf, .doc, .docx',
  //   multiple: true,
  // });

  const handleChangeСheckmark = (e) => {
    const { name, checked } = e.target;
    
    setFormData({ ...formData, [name]: checked });

  }
  const options = {
    apiKey: "free", // Get API key: https://www.bytescale.com/get-started
    maxFileCount: 1,
    showFinishButton: true,
    styles: {
      colors: {
        primary: "#377dff"
      }
    }
  };

  return (
    <div className="features">
      <div className="user_form">
        <h2>Добавить эмбриона</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Название:</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-control mr-sm-2"
                  value={formData.name} 
                  onChange={handleChange} 
                />
                {errors && errors.name &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.name}</div>
                }
              </div>
              <div className="form-group">
              <UploadDropzone
                options={options}
                onUpdate={handleUploadFile}
                // onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}
                onComplete={handleUploadFile}
                width="600px"
                height="375px"
              />
                {errors && errors.scan_directions &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.scan_directions}</div>
                }
            </div>
            <div className="form-group">
                <label>Описание:</label>
                <input 
                  type="text" 
                  name="description" 
                  className="form-control mr-sm-2"
                  value={formData.description} 
                  onChange={handleChange} 
                />
                {errors && errors.description &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.description}</div>
                }
              </div>
            <div className="form-group">
                <label>Тестовое поле:</label>
                <input 
                  type="text" 
                  name="test_field" 
                  className="form-control mr-sm-2"
                  value={formData.test_field} 
                  onChange={handleChange} 
                />
                {errors && errors.test_field &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.test_field}</div>
                }
              </div>
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
                {errors && errors.laboratory &&
                  <div className="alert alert-danger mt-3 mb-0">{errors.laboratory}</div>
                }
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
            <div className="form-group">
                <label>Номер семьи:</label>
                <input 
                  type="text" 
                  name="family_number" 
                  className="form-control mr-sm-2"
                  value={formData.family_number} 
                  onChange={handleChange} 
                />
                {errors && errors.family_number &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.family_number}</div>
                }
              </div>
            <div className="form-group">
                <label>ID семьи:</label>
                <input 
                  type="text" 
                  name="abortus_id" 
                  className="form-control mr-sm-2"
                  value={formData.abortus_id} 
                  onChange={handleChange} 
                />
                {errors && errors.abortus_id &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.abortus_id}</div>
                }
              </div>
            <div className="form-group">
                <label>ID абортуса в семье:</label>
                <input 
                  type="text" 
                  name="abortus_id_in_family" 
                  className="form-control mr-sm-2"
                  value={formData.abortus_id_in_family} 
                  onChange={handleChange} 
                />
                {errors && errors.abortus_id &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.abortus_id_in_family}</div>
                }
            </div>
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
            <div className="form-group">
                <label>Срок беременности по УЗИ:</label>
                <input 
                  type="text" 
                  name="period_pregnancy_by_USI" 
                  className="form-control mr-sm-2"
                  value={formData.period_pregnancy_by_USI} 
                  onChange={handleChange} 
                />
                {errors && errors.period_pregnancy_by_USI &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.period_pregnancy_by_USI}</div>
                }
            </div>
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
            <div className="form-group">
                <label>Размеры 1 плодного мешка по x:</label>
                <input 
                  type="text" 
                  name="dimensions_fetal_sac_x_1" 
                  className="form-control mr-sm-2"
                  value={formData.dimensions_fetal_sac_x_1} 
                  onChange={handleChange} 
                />
                {errors && errors.dimensions_fetal_sac_x_1 &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.dimensions_fetal_sac_x_1}</div>
                }
            </div>
            <div className="form-group">
                <label>Размеры 1 плодного мешка по y:</label>
                <input 
                  type="text" 
                  name="dimensions_fetal_sac_y_1" 
                  className="form-control mr-sm-2"
                  value={formData.dimensions_fetal_sac_y_1} 
                  onChange={handleChange} 
                />
                {errors && errors.dimensions_fetal_sac_y_1 &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.dimensions_fetal_sac_y_1}</div>
                }
            </div>
            <div className="form-group">
                <label>Размеры 2 плодного мешка по x:</label>
                <input 
                  type="text" 
                  name="dimensions_fetal_sac_x_2" 
                  className="form-control mr-sm-2"
                  value={formData.dimensions_fetal_sac_x_2} 
                  onChange={handleChange} 
                />
                {errors && errors.dimensions_fetal_sac_x_2 &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.dimensions_fetal_sac_x_2}</div>
                }
            </div>
            <div className="form-group">
                <label>Размеры 2 плодного мешка по y:</label>
                <input 
                  type="text" 
                  name="dimensions_fetal_sac_y_2" 
                  className="form-control mr-sm-2"
                  value={formData.dimensions_fetal_sac_y_2} 
                  onChange={handleChange} 
                />
                {errors && errors.dimensions_fetal_sac_y_2 &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.dimensions_fetal_sac_y_2}</div>
                }
            </div>
            <div className="form-group">
                <label>КТР:</label>
                <input 
                  type="text" 
                  name="ktr" 
                  className="form-control mr-sm-2"
                  value={formData.ktr} 
                  onChange={handleChange} 
                />
                {errors && errors.ktr &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.ktr}</div>
                }
            </div>
            <div className="form-group">
                <label>Особенности эмбриона:</label>
                <input 
                  type="text" 
                  name="features_embryo" 
                  className="form-control mr-sm-2"
                  value={formData.features_embryo} 
                  onChange={handleChange} 
                />
                {errors && errors.features_embryo &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.features_embryo}</div>
                }
            </div>
            <div className="form-group">
                <label>Особенности хориона:</label>
                <input 
                  type="text" 
                  name="features_chorion" 
                  className="form-control mr-sm-2"
                  value={formData.features_chorion} 
                  onChange={handleChange} 
                />
                {errors && errors.features_chorion &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.features_chorion}</div>
                }
            </div>
            <div className="form-group">
                <label>Особенности желточного мешка:</label>
                <input 
                  type="text" 
                  name="features_yolk_sac" 
                  className="form-control mr-sm-2"
                  value={formData.features_yolk_sac} 
                  onChange={handleChange} 
                />
                {errors && errors.features_yolk_sac &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.features_yolk_sac}</div>
                }
            </div>
            <div className="form-group">
                <label>Особенности амниотической оболочки:</label>
                <input 
                  type="text" 
                  name="features_amniotic_membrane" 
                  className="form-control mr-sm-2"
                  value={formData.features_amniotic_membrane} 
                  onChange={handleChange} 
                />
                {errors && errors.features_amniotic_membrane &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.features_amniotic_membrane}</div>
                }
            </div>
            {/* <div className="form-group">
                <label>Сканы направления:</label>
                <input type="file" 
                  name="scan_directions"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => {handleImageChange(e)}}
                /> */}
                {/* <input 
                  type="text" 
                  name="features_amniotic_membrane" 
                  className="form-control mr-sm-2"
                  value={formData.scan_directions} 
                  onChange={handleChange} 
                /> */}
                {/* {errors && errors.scan_directions &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.scan_directions}</div>
                }
            </div> */}
            {/* <div className="form-group">
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ?
          <p>Перетащите файлы сюда...</p> :
          <p>Перетащите файлы сюда или нажмите, чтобы выбрать файлы</p>
        }
      </div>
      {uploadedFile && (
        <div>
          <p>Загружен файл: {uploadedFile.name}</p>
        </div>
      )}
    </div> */}
            <div className="form-group">
                <label>Примечание:</label>
                <input 
                  type="text" 
                  name="note" 
                  className="form-control mr-sm-2"
                  value={formData.note} 
                  onChange={handleChange} 
                />
                {errors && errors.note &&
                    <div className="alert alert-danger mt-3 mb-0">{errors.note}</div>
                }
            </div>
            <div className="form-group">
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
            </div>
          <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </form>
      </div>
    </div>
  );
}