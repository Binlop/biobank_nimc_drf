import React, { useState } from "react";
import "../individ.css"

// React-Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from 'axios'; // импортируйте axios, если этого еще не сделано
const CreateMyModel = () => {

    const [data, setData] = useState({
        title: "",
        description: "",
        image_url: "",
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image_url: "",
    });


    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...data };
        newData[input.name] = input.value;
        setData(newData);
    };

    const handleImageChange = (e) => {
        let newData = { ...data };
        newData["image_url"] = e.target.files[0];
        setData(newData);
    };

    const doSubmit = async (e) => {
        e.preventDefault();
        try {
            // Выполнение POST запроса напрямую с использованием axios
            const response = await postData();
            // Обработка ответа
        } catch (error) {
            console.error('Ошибка при выполнении POST запроса:', error);
            // Обработка ошибки
        }
    };
    
    const postData = async () => {
        try {
            // Генерируем разделитель
            const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
            // Формируем заголовок Content-Type с указанием разделителя
            const contentTypeHeader = `multipart/form-data; boundary=${boundary}`;
    
            // Создаем FormData и добавляем данные
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('image_url', data.image_url);
    
            // Выполняем POST запрос с использованием axios
            const response = await axios.post(`/api/individ/embryo/create/`, formData, {
                headers: {
                    "Content-Type": contentTypeHeader,
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    };
    
    

    return (
        <div className="features">

        <Form>
            <Row>
                <Form.Group className="mb-3" controlId="titleInput">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={data.title}
                        isInvalid={errors.title}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        maxLength={80}
                    />
                    {errors.title && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.title}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>My Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image_url"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => {
                            handleImageChange(e);
                        }}
                    />
                    {errors.image_url && (
                        <Form.Text className="alert-danger" tooltip>
                            {errors.image_url}
                        </Form.Text>
                    )}
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="descriptionInput">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    name="description"
                    value={data.description}
                    isInvalid={errors.description}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                {errors.description && (
                    <Form.Text className="alert-danger" tooltip>
                        {errors.description}
                    </Form.Text>
                )}
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                onClick={(e) => doSubmit(e)}
                >
                Submit
            </Button>
        </Form>
        </div>
    );
};

export default CreateMyModel;