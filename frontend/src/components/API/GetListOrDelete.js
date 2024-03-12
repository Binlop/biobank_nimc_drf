import axios from 'axios';

export const handleDelete = (apiPathDelete, setIndividList, apiPathList) => {
    axios
        .delete(`${apiPathDelete}`)
        .then((res) => refreshList(setIndividList, apiPathList))
        .catch((err) => console.log(err));
};

export const refreshList = (setIndividList, apiPathList) => {
    axios
        .get(`${apiPathList}`)
        .then((res) => {
            setIndividList(res.data);
        })
        .catch((err) => console.log(err));
};