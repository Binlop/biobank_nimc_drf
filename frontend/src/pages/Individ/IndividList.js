import axios from "axios";
import "./individ.css"
import AuthContext from '../../context/AuthContext'
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import NestedMenu from './NestedMenu'; // Импортируем компонент NestedMenu
import EmbryoFilterForm from "./FilterComponents/EmbryoFilter";
import FatherFilterForm from "./FilterComponents/FatherFilter";
import MotherFilterForm from "./FilterComponents/MotherFilter";
import AnotherMemberFilterForm from "./FilterComponents/AnotherMemberFilter";

function FilterBlock({ setIndividList }) { 
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [isOpenEmbryo, setIsOpenEmbryo] = useState(false);
  const [isOpenFather, setIsOpenFather] = useState(false);
  const [isOpenMother, setisOpenMother] = useState(false);
  const [isOpenAnotherMember, setisOpenAnotherMember] = useState(false);
  const [embryoData, setEmbryoData] = useState({});
  const [fatherData, setFatherData] = useState({});    
  const [motherData, setMotherData] = useState({});  
  const [anotherMemberData, setAnotherMemberData] = useState({});  
  const [errors, setError] = useState({});
  let formData = {}

  const toggleEmbryo = () => {
    setIsOpenEmbryo(!isOpenEmbryo);
  };

  const toggleFather = () => {
    setIsOpenFather(!isOpenFather);
  };

  const toggleMother = () => {
    setisOpenMother(!isOpenMother);
  };
  const toggleAnotherMember = () => {
    setisOpenAnotherMember(!isOpenAnotherMember);
  };

  const handleChangeEmbryo = (event) => {
    const { name, value } = event.target;
    const updatedEmbryoData = { ...embryoData, [name]: value };
    if (value.trim() === '') {
      delete updatedEmbryoData[name];
    }
      setEmbryoData(updatedEmbryoData);
  };

  const handleChangeEmbryoCheckMark = (event) => {
    const { name, checked } = event.target;
    const value = checked ? 'on' : ''; // Если чекбокс отмечен, установить значение 'on', иначе пустую строку
    setEmbryoData({ ...embryoData, [name]: value });
  };


  const handleChangeDateOfReceipt = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setEmbryoData({ ...embryoData, ["date_of_receipt"]: formattedDate });   
  };

  const handleChangeDateLastMenstruation = (date) => {
      const formattedDate = date.toISOString().split('T')[0];
      setEmbryoData({ ...embryoData, ["last_menstruation"]: formattedDate });
  }

  const handleChangeDateOfBirth = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFatherData({ ...fatherData, ["date_of_birth"]: formattedDate });   
  };

  const handleChangeDateOfBirthMother = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setMotherData({ ...motherData, ["date_of_birth"]: formattedDate });   
  };


  const handleChangeFather = (event) => {
    const { name, value } = event.target;
    const updatedParentData = { ...fatherData, [name]: value };
    if (value.trim() === '') {
      delete updatedParentData[name];
    }
    console.log(updatedParentData)
    setFatherData(updatedParentData);
  };

  const handleChangeFatherCheckMark = (event) => {
    const { name, checked } = event.target;
    const value = checked ? 'on' : ''; // Если чекбокс отмечен, установить значение 'on', иначе пустую строку
    setFatherData({ ...fatherData, [name]: value });
  };

  const handleChangeMotherCheckMark = (event) => {
    const { name, checked } = event.target;
    const value = checked ? 'on' : ''; // Если чекбокс отмечен, установить значение 'on', иначе пустую строку
    setMotherData({ ...motherData, [name]: value });
  };
  const handleChangeAnotherMemberCheckMark = (event) => {
    const { name, checked } = event.target;
    const value = checked ? 'on' : ''; // Если чекбокс отмечен, установить значение 'on', иначе пустую строку
    setAnotherMemberData({ ...anotherMemberData, [name]: value });
  };

  const handleChangeMother = (event) => {
    const { name, value } = event.target;
    const updatedParentData = { ...motherData, [name]: value };
    if (value.trim() === '') {
      delete updatedParentData[name];
    }
    setMotherData(updatedParentData);
  };

  const handleChangeAnotherMember = (event) => {
    const { name, value } = event.target;
    const updatedParentData = { ...anotherMemberData, [name]: value };
    if (value.trim() === '') {
      delete updatedParentData[name];
    }
    setAnotherMemberData(updatedParentData);
  };

  const uniteAllFormData = () => {
    formData["embryo"] = embryoData
    formData["father"] = fatherData
    formData["mother"] = motherData
    formData["another_member"] = anotherMemberData
    return formData
  };
  


  const handleSearch = (event) => {
    event.preventDefault();
    
    const formData = uniteAllFormData();
    console.log(authTokens)
    try {
      axios
        .get(`/api/individ/search/`, { params: formData, headers:{
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
      }})
        .then((res) => {
          setIndividList(res.data);
        }) 
        .catch(error => {
          console.error('Ошибка с отправкой индивида:', error);
          setError(error.response.data);
        });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  return (
  <div className="filter" style={{ maxHeight: '800px', overflowY: 'auto' }}>
    <form onSubmit={handleSearch}>
      <EmbryoFilterForm
                embryoData={embryoData}
                handleChangeEmbryo={handleChangeEmbryo}
                handleChangeDateOfReceipt={handleChangeDateOfReceipt}
                handleChangeDateLastMenstruation={handleChangeDateLastMenstruation}
                errors={errors}
                toggleEmbryo = {toggleEmbryo}
                handleChangeEmbryoCheckMark = {handleChangeEmbryoCheckMark}
                isOpenEmbryo = {isOpenEmbryo}

        />
      <FatherFilterForm
                fatherData={fatherData}
                handleChangeFather={handleChangeFather}
                handleChangeDateOfBirth={handleChangeDateOfBirth}
                errors={errors}
                toggleFather = {toggleFather}
                handleChangeFatherCheckMark = {handleChangeFatherCheckMark}
                isOpenFather = {isOpenFather}

        />
      <MotherFilterForm
                motherData={motherData}
                handleChangeMother={handleChangeMother}
                handleChangeDateOfBirth={handleChangeDateOfBirthMother}
                errors={errors}
                toggleMother = {toggleMother}
                handleChangeMotherCheckMark = {handleChangeMotherCheckMark}
                isOpenMother = {isOpenMother}

        />
      <AnotherMemberFilterForm
                anotherMemberData={anotherMemberData}
                handleChangeAnotherMember={handleChangeAnotherMember}
                errors={errors}
                handleChangeAnotherMemberCheckMark = {handleChangeFatherCheckMark}
                toggleAnotherMember = {toggleAnotherMember}
                isOpenAnotherMember = {isOpenAnotherMember}

        />
      <button type="submit">Применить</button>
    </form>
  </div>


  );
}

export default function IndividList() {
    const [IndividList, setIndividList] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        const csrftoken = getCSRFToken('csrftoken'); // Получаем CSRF токен из кук
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken; // Устанавливаем CSRF токен в заголовок запроса
        refreshList() 

        document.title = 'Индивиды';
      }, []);
    
    const getCSRFToken = (name) => {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
      }
    
    const handleDelete = (item) => {
        axios
          .delete(`/api/individ/${item.individ.id}/delete`)
          .then((res) => refreshList());
      };
    const refreshList = () => {
        axios
          .get(`/api/individ/`, {headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }})
          .then((res) => {
            setIndividList(res.data)
        })
          .catch((err) => console.log(err));
      };   
    
    const handleSetIndividList = (list) => {
        setIndividList(list);
    };

    return (
        <main className="container">
        <div>
             <NestedMenu />
            <div className="features">
            <FilterBlock setIndividList={handleSetIndividList} />
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table_list_property">Название</th>
                            <th className="table_list_property">Направление</th>
                            <th className="table_list_property">Семья</th>
                            <th className="table_list_property">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {IndividList && IndividList.map(item => (
                            <tr key={item.id}>
                                <td className="table_list_value"><Link to={`/individs/${item.individ_type}/${item.individ.id}/`} className="link-style">{item.name}</Link></td>
                                <td className="table_detail_value">
                                    {item.laboratory && item.laboratory.map(item => (
                                        <Link to={`/laboratories/${item.id}`} className="link-style">{item.name}<br></br></Link>
                                    ))}
                                </td>                               
                                <td className="table_detail_value">{item.family ? 
                                <Link to={`/families/${item.family.id}`} className="link-style">{item.family.name}</Link> 
                                : 'Нет данных'}</td>                                
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
            </div>
        </main>
    )
}