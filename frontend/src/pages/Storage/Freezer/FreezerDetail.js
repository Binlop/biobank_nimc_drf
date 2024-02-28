import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../storage.css"

export default function FreezerDetail() {
    const { id } = useParams();
    const [storageDetail, setStorageDetail] = useState(null);

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        axios
            .get(`/api/storage/freezer/${id}`)
            .then((res) => {
                setStorageDetail(res.data);
                if (res.data) {
                    document.title = res.data.name;
                }
            })
            .catch((err) => {
                console.log(err)});
    };   

    return (
        <main className="container">
        {storageDetail && (
        <div>
            <div className="title_object">
              <p>
                <>
                  <span className="larger-text">{storageDetail.name} </span>
                  <Link to={`/storage/freezer/${id}/update`} className="btn btn-primary">
                    Изменить морозильник
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
        </div>
        )}

        </main>
      );      
}
