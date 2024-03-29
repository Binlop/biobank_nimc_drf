import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import "../storage.css"

export default function DrawerDetail() {
  const { id } = useParams();
  const [storageDetail, setStorageDetail] = useState(null);
  
  useEffect(() => {
    refreshObjectDetail(setStorageDetail, `/api/storage/drawer/${id}`)  
  }, []);

    return (
        <main className="container">
        {storageDetail && (
        <div>
            <div className="title_object">
              <p>
                <>
                  <span className="larger-text mr-2">{storageDetail.name}</span>
                  <Link to={`/storage/drawer/${id}/update`} className="btn btn-primary mr-2">
                    Изменить ящик
                  </Link>
                  <Link to={`/storage/shelf/create/?drawer_id=${id}`} className="btn btn-primary">
                    Добавить полку
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
                  <td className="table_detail_property">Морозильник</td>
                  <td className="table_list_value"><Link to={`/storage/freezer/${storageDetail.freezer.id}/`} className="link-style">
                    {storageDetail.freezer.name}</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        <div class="table-container">
          <table class="my-table">
              <thead>
                  <tr>
                      <th>Верхушка ящика</th>
                  </tr>
              </thead>
              <tbody>
              {storageDetail.shelf.map(shelf => (
                  <tr key={shelf.id}>
                      <td className="green-bg">
                      <Link to={`/storage/shelf/${shelf.id}`}>{shelf.name}</Link>
                      </td>
                  </tr>
              ))}
              <tr>
                <th>Низ ящика</th>
            </tr>
          </tbody>
          </table>
        </div>
        </div>
        )}
      </main>
      );      
}
