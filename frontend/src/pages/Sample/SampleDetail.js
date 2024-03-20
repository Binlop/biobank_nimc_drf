import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from '../../context/AuthContext'
import { handleDelete, refreshObjectList, refreshObjectDetail } from "../../components/API/GetListOrDelete";
import "./sample.css"

export default function SampleDetail() {
    const { id } = useParams();
    const [sampleDetail, setSampleDetail] = useState(null);
    const { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
      refreshObjectDetail(setSampleDetail, `/api/sample/${id}`, authTokens)  
    }, []);

    return (
        <main className="container">
        {sampleDetail && (
        <div>
            <div className="title_object">
              <p>
                <>
                  <span className="larger-text">{sampleDetail.name}</span>
                  <Link to={`/samples/${sampleDetail.sampletype}/${id}/update`} className="btn btn-primary">
                    Изменить образец
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
              </tbody>
            </table>
          </div>
        </div>
        )}

        </main>
      );      
}
