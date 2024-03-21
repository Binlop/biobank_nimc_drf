import axios from 'axios';
import { refreshObjectList } from './GetListOrDelete';

export function setCSRFToken() {
    const cookieValue = document.cookie.match('(^|;)\\s*' + "csrftoken" + '\\s*=\\s*([^;]+)');
    const csrftoken = cookieValue ? cookieValue.pop() : '';
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
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