import axios from 'axios';

export function handleDelete(apiPathDelete, setIndividList, apiPathList, authTokens) {
    axios
        .delete(`${apiPathDelete}`)
        .then((res) => refreshObjectList(setIndividList, apiPathList, authTokens))
        .catch((err) => console.log(err));
}

export function refreshObjectList(setObjectList, apiPathList, authTokens) {
    console.log(authTokens)
    axios
        .get(`${apiPathList}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        .then((res) => {
            setObjectList(res.data);
        })
        .catch((err) => console.log(err));
}

export function refreshObjectDetail(setObjectDetail, apiPathList, authTokens) {
    axios
        .get(`${apiPathList}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        .then((res) => {
            setObjectDetail(res.data);
            document.title = res.data.name;
        })
        .catch((err) => console.log(err));
}

