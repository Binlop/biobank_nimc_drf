import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from '../../../context/AuthContext'
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import "../storage.css"

export default function BoxDetail() {
  const { id } = useParams();
  const [storageDetail, setStorageDetail] = useState(null);
  const { authTokens, logoutUser } = useContext(AuthContext);
  
  useEffect(() => {
    refreshObjectDetail(setStorageDetail, `/api/storage/box/${id}`, authTokens)  
  }, []);
  
  const ShowSampleMap = () => {
    const nestedList = storageDetail.samples;
  
    const rows = nestedList.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((sample_place, columnIndex) => (
          <td key={columnIndex} className="storage-cell">
            {sample_place.state_location === "occupied" ? (
              <div class="red-circle">
                <Link to={`/samples/${sample_place.sample_type}/${sample_place.sample.id}`} className="link-style">
                  {sample_place.sample.name}
                </Link>
              </div>
            ) : ( // Здесь добавлен оператор else
              <div class="green-circle"></div>
            )}
          </td>
        ))}
      </tr>
    ));
  
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
  
    return (
        <main className="container">
        {storageDetail && (
        <div>
            <div className="title_object">
              <p>
                <>
                  <span className="larger-text mr-2">{storageDetail.name}</span>
                  <Link to={`/storage/box/${id}/update`} className="btn btn-primary mr-2">
                    Изменить коробку
                  </Link>
                  <Link to={`/storage/sample_map/create/?box_id=${id}`} className="btn btn-primary">
                    Добавить карту образцов
                  </Link>
                </>
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
                  <td className="table_detail_property">Полка</td>
                  <td className="table_list_value"><Link to={`/storage/shelf/${storageDetail.shelf.id}/`} className="link-style">
                    {storageDetail.shelf.name}</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="samples">
              <table className="table_samples">
                  <ShowSampleMap />
              </table>
          </div>
          </div>
          )}
      </main>
      );}    
