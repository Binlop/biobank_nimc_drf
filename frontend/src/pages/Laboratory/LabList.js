import Modal from "../Modal";
import axios from "axios";
import "./laboratory.css"
import { Routes,     BrowserRouter as Router,
  Route, Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function LabList() {
    const [viewCompleted, setViewCompleted] = useState(false);
    const [laboratoryList, setLaboratoryList] = useState([]);
    const [modal, setModal] = useState(false);
    const [activeItem, setActiveItem] = useState({
        name: '',
        description: '',
      });

    useEffect(() => {
        refreshList()
        document.title = 'Лаборатории';
      }, []);

    const handleDelete = (item) => {
        axios
          .delete(`/api/laboratory/${item.id}/`)
          .then((res) => refreshList());
      };

    const toggle = () => {
        setModal(!modal);      
    };

    const refreshList = () => {
        axios
          .get("/api/laboratory/")
          .then((res) => {
            setLaboratoryList(res.data)
        })
          .catch((err) => console.log(err));
      };    

    const handleSubmit = (item) => {
        toggle();
        if (item.id) {
          axios
            .put(`/api/laboratory/${item.id}/`, item)
            .then((res) => refreshList());
          return;
        }
        axios
          .post("/api/laboratory/", item)
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
                    <span className="larger-text">Лаборатории </span>
                    <Link to="/laboratories/create" className="btn btn-primary">
                        Добавить лабораторию
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
                        {laboratoryList && laboratoryList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/laboratories/${item.id}`}>{item.name}</Link></td>
                                {/* <td className="table_list_value">{item.name}</td> */}
                                <td className="table_list_value">{item.description}</td>
                                <td className="table_list_value">
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={() => editItem(item)}
                                    >
                                        Изменить
                                    </button>
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
                    onSave={handleSubmit} // Вызов handleSubmit здесь. Необходимо определить эту функцию.
                />
            ) : null}
        </main>
    )
}
export default LabList;