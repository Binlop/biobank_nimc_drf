import Modal from "../Modal";
import axios from "axios";
import "./family.css"
import { Routes,     BrowserRouter as Router,
  Route, Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

export default function FamilyList() {
    const [viewCompleted, setViewCompleted] = useState(false);
    const [familyList, setLaboratoryList] = useState([]);
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState({
        name: '',
        description: '',
      });

    useEffect(() => {
        const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
        refreshList()
        document.title = 'Семьи';
      }, []);
    
    const getCSRFToken = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
      }
    
    const handleDelete = (item) => {
        axios
          .delete(`/api/family/${item.id}/`)
          .then((res) => refreshList());
      };

    const toggle = () => {
        setModal(!modal);      
    };

    const refreshList = () => {
        axios
          .get("/api/family/")
          .then((res) => {
            setLaboratoryList(res.data)
        })
          .catch((err) => console.log(err));
      };    

    const handleSubmit = (item) => {
        toggle();
        if (item.id) {
          axios
            .put(`/api/family/${item.id}/`, item)
            .then((res) => refreshList());
          return;
        }
        axios
          .post("/api/family/", item)
          .then((res) => refreshList());
      };
    
    const createItem = () => {
        const item = { name: "", description: ""};
        setActiveItem(item);
        setModal(!modal);      
    };
    
    const editItem = (item) => {
        setActiveItem(item);
        setModal(!modal);  
      };
    
    const displayCompleted = (status) => {
        setViewCompleted(status);
      };
    
    return (
        <main className="container">
            <div className="title_object">
                <p>
                    <span className="larger-text">Семьи </span>
                    <Link to="/families/create" className="btn btn-primary">
                        Добавить семью
                    </Link> 
                </p>
            </div>
            <div className="features">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table_list_property">Название</th>
                            <th className="table_list_property">Описание</th>
                            <th className="table_list_property">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {familyList && familyList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/families/${item.id}`} className="link-style">{item.name}</Link></td>
                                <td className="table_list_value">{item.description}</td>
                                <td className="table_list_value">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modal ? (
                <Modal
                    activeItem={activeItem}
                    toggle={toggle}
                    onSave={handleSubmit}
                />
            ) : null}
        </main>
    )
}