import axios from 'axios';

export function handleDelete(apiPathDelete, setIndividList, apiPathList) {
    const token = JSON.parse(localStorage.authTokens)
    axios
        .delete(`${apiPathDelete}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(token.access)
            }
        })
        .then((res) => refreshObjectList(setIndividList, apiPathList, token))
        .catch((err) => console.log(err));
}

export function refreshObjectList(setObjectList, apiPathList) {
    const token = JSON.parse(localStorage.authTokens)
    axios
        .get(`${apiPathList}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(token.access)
            }
        })
        .then((res) => {
            setObjectList(res.data);
        })
        .catch((err) => console.log(err));
}

export function refreshObjectDetail(setObjectDetail, apiPathDetail) {
    const token = JSON.parse(localStorage.authTokens)
    axios
        .get(`${apiPathDetail}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(token.access)
            }
        })
        .then((res) => {
            setObjectDetail(res.data);
            document.title = res.data.name;
        })
        .catch((err) => console.log(err));
}