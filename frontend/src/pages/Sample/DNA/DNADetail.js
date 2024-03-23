import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../../components/API/GetListOrDelete";
import "../sample.css"

export default function DNADetail() {
  const { id } = useParams();
  const [sampleDetail, setSampleDetail] = useState(null);

  useEffect(() => {
    refreshObjectDetail(setSampleDetail, `/api/sample/${id}`)  
  }, []);

    return (
        <main className="container">
        {sampleDetail && (
        <div>
            <div className="title_object">
              <p>
                <>
                  <span className="larger-text">{sampleDetail.name}</span>
                  <Link to={`/samples/${sampleDetail.sampletype}/${id}/update`} className="btn btn-primary mr-2">
                    Изменить образец
                  </Link>
                  <Link to={`/samples/aliquot/create/`} className="btn btn-primary">
                    Добавить аликвоту
                  </Link>
                </>
              </p>
            </div>
      
          <div className="features">
            <table>
              <tbody>
                <tr>
                  <td className="table_detail_property">Название</td>
                  <td className="table_detail_value">{sampleDetail.name}</td>
                </tr>
                <tr>
                  <td className="table_detail_property">Индивид</td>
                  <td className="table_list_value">
                    <Link to={`/individs/${sampleDetail.individ.individ_type}/${sampleDetail.individ.individ.id}`} className="link-style">{sampleDetail.individ.name}</Link>
                  </td>
                </tr>
                <tr>
                  <td className="table_detail_property">Место хранения</td>
                  <td className="table_list_value">
                  <Link to={`/storage/box/${sampleDetail.location.box}/`} className="link-style">{sampleDetail.location.name}</Link>
                  </td>
                </tr>
                <tr>
                  <td className="table_detail_property">Количество</td>
                  <td className="table_list_value">{sampleDetail.volume}</td>
                </tr>
                <tr>
                  <td className="table_detail_property">Концентрация</td>
                  <td className="table_list_value">{sampleDetail.volume}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        )}

        </main>
      );      
}
