import axios from 'axios';
import { refreshObjectList } from './GetListOrDelete';

export function setCSRFToken() {
    const cookieValue = document.cookie.match('(^|;)\\s*' + "csrftoken" + '\\s*=\\s*([^;]+)');
    const csrftoken = cookieValue ? cookieValue.pop() : '';
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
}

export function makeNewForm(formData) {
    const newForm = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value) {
            newForm.append(key, value);
        }
      }
    }
    return newForm;
}

export const ChangeLabObjectsToLabIds = (formData, setFormData) => {
    const laboratoryIds = formData.laboratory.map(lab => lab.id);
    setFormData(prevState => ({
        ...prevState,
        laboratory: laboratoryIds
      }));   
  };

export function handleChangeLaboratoryIds(e, formData, setFormData) {
    const { name, value, checked } = e.target;
    const labId = parseInt(value);
    let updatedLaboratories;
    if (checked) {
        updatedLaboratories = [...formData.laboratory, labId];
    } else {
        updatedLaboratories = formData.laboratory.filter(id => id !== labId);
    }
    setFormData({ ...formData, [name]: updatedLaboratories });
}

export function handlePost(event, formData, apiPathCreate, PathToNavigate, setError, navigate) {
    const token = JSON.parse(localStorage.authTokens)

    event.preventDefault();
    const headers = {
        'Content-Type': 'multipart/form-data;',
        'Authorization': 'Bearer ' + String(token.access)
    };
    axios.post(apiPathCreate, formData, { headers })
        .then(() => {
            navigate(PathToNavigate);
        })
        .catch(error => {
            console.error('Ошибка с отправкой объекта:', error);
            setError(error.response.data);
        });
}

export function handleUpdate(event, formData, apiPathCreate, PathToNavigate, setError, navigate) {
    const token = JSON.parse(localStorage.authTokens)

    event.preventDefault();

    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;
    const headers = {
        'Content-Type': contentTypeHeader,
        'Authorization': 'Bearer ' + String(token.access)
    };
    axios.put(apiPathCreate, formData, { headers })
        .then(() => {
            navigate(PathToNavigate);
        })
        .catch(error => {
            console.error('Ошибка с отправкой объекта:', error);
            setError(error.response.data);
        });
}

export function handleDelete(apiPathDelete, setIndividList, apiPathList, authTokens) {
    axios
        .delete(`${apiPathDelete}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        .then((res) => refreshObjectList(setIndividList, apiPathList, authTokens))
        .catch((err) => console.log(err));
}