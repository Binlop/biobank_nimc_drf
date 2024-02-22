import axios from 'axios';

export const handleDelete = (apiPath, refreshList) => {
    axios
        .delete(`${apiPath}`)
        .then((res) => refreshList())
        .catch((err) => console.log(err));
};

export const refreshList = (setIndividList, apiPath) => {
    axios
        .get(`${apiPath}`)
        .then((res) => {
            setIndividList(res.data);
        })
        .catch((err) => console.log(err));
};