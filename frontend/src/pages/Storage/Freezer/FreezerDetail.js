import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from '../../../context/AuthContext'
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import "../storage.css"

export default function FreezerDetail() {
    const { id } = useParams();
    const [storageDetail, setStorageDetail] = useState(null);
    const { authTokens, logoutUser } = useContext(AuthContext);
    
    useEffect(() => {
      refreshObjectDetail(setStorageDetail, `/api/storage/freezer/${id}`, authTokens)  
  }, []);

    return (
        <main className="container">
        {storageDetail && (
        <div>
            <div className="title_object">
              <p>
                <div className="add_change">
                  <span className="larger-text">{storageDetail.name} </span>
                  <Link to={`/storage/freezer/${id}/update`} className="btn btn-primary mr-2">
                    Изменить морозильник
                  </Link>
                  <Link to={`/storage/drawer/create/?freezer_id=${id}`} className="btn btn-primary">
                    Добавить ящик
                  </Link>
                </div>
              </p>
            </div>
      
          <div className="features">
            <table>
              <tbody>
                <tr>
                  <td className="table_detail_property">Название</td>
                  <td className="table_detail_value">{storageDetail.name}</td>
                </tr>
                <tr>
                  <td className="table_detail_property">Этаж</td>
                  <td className="table_list_value">{storageDetail.floor}</td>
                </tr>
                <tr>
                  <td className="table_detail_property">Номер</td>
                  <td className="table_list_value">{storageDetail.id_freezer}</td>
                </tr>
              </tbody>
            </table>
          </div>
        <div class="table-container">
          <table class="my-table">
              <thead>
                  <tr>
                      <th>Верхушка морозилки</th>
                  </tr>
              </thead>
              <tbody>
              {storageDetail.drawers.map(drawer => (
                  <tr key={drawer.id}>
                      <td className="green-bg">
                      <Link to={`/storage/drawer/${drawer.id}`}>{drawer.name}</Link>
                      </td>
                  </tr>
              ))}
              <tr>
                <th>Низ морозилки</th>
            </tr>
          </tbody>
          </table>
        </div>
        </div>
        )}
      </main>
      );      
}
