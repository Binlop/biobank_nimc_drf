import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../storage.css"

export default function BoxDetail() {
    const { id } = useParams();
    const [storageDetail, setStorageDetail] = useState(null);

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        axios
            .get(`/api/storage/box/${id}`)
            .then((res) => {
                setStorageDetail(res.data);
                if (res.data) {
                    document.title = res.data.name;
                }
            })
            .catch((err) => {
                console.log(err)});
    };
    const ShowSampleMap = () => {
      const nestedList = storageDetail.samples

      const rows = nestedList.map((row, rowIndex) => (
        <tr key={rowIndex}>
        {row.map((sample_place, columnIndex) => (
          <td key={columnIndex} className="storage-cell">
            {sample_place.sample_type === "aliquot" ? (
              <div class="red-circle">
                {sample_place.name}
              </div>
            ) : sample_place.sample_type === "dna" || sample_place.sample_type === "blood" || sample_place.sample_type === "chorion" || sample_place.sample_type === "endometrium"
            || sample_place.sample_type === "fetal_sac_nitrogen" || sample_place.sample_type === "fetal_sac_freezer"? (
              <div class="red-circle">
                    <Link to={`/samples/${sample_place.sample_type}/${sample_place.sample.id}`} className="link-style">
                    {sample_place.sample.name}
                  </Link>
              </div>
            ) : (
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
