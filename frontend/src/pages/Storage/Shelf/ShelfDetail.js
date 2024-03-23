import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import "../storage.css"

export default function ShelfDetail() {
  const { id } = useParams();
  const [storageDetail, setStorageDetail] = useState(null);
  
  useEffect(() => {
    refreshObjectDetail(setStorageDetail, `/api/storage/shelf/${id}`)  
  }, []);

  const ShowBoxesMap = () => {
    const nestedList = storageDetail.box
    const rows = nestedList.map((row, rowIndex) => (
      <tr key={rowIndex}>
      {row.map((box_place, columnIndex) => (
        <td key={columnIndex} className="storage-cell">
            <div class="green-circle">
            <Link to={`/storage/box/${box_place.id}`} className="link-style">
                    {box_place.name}
            </Link>
            </div>
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
                  <Link to={`/storage/shelf/${id}/update`} className="btn btn-primary mr-2">
                    Изменить полку
                  </Link>
                  <Link to={`/storage/box/create/?shelf_id=${id}`} className="btn btn-primary">
                    Добавить коробки
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
                  <td className="table_detail_property">Ящик</td>
                  <td className="table_list_value"><Link to={`/storage/drawer/${storageDetail.drawer.id}/`} className="link-style">
                    {storageDetail.drawer.name}</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="samples">
              <table className="table_samples">
                  <ShowBoxesMap />
              </table>
          </div>
        {/* <div class="table-container">
          <table class="my-table">
              <thead>
                  <tr>
                      <th>В глубь полки</th>
                  </tr>
              </thead>
              <tbody>
              {storageDetail.box.map(box => (
                  <tr key={box.id}>
                      <td className="green-bg">
                      <Link to={`/storage/box/${box.id}`}>{box.name}</Link>
                      </td>
                  </tr>
              ))}
              <tr>
                <th>К началу полки</th>
            </tr>
          </tbody>
          </table>
        </div> */}
        </div>
        )}
      </main>
      );      
}
