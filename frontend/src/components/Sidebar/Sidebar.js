import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"
import { FaHouseChimney } from "react-icons/fa6";

class AsideBar extends Component {
  render() {

    return (
        <aside>
        <div className="instruments">
          <p><span className="name_instruments">Разделы биобанка</span></p>
          <ul>
          <li><Link to="/laboratories" className="instruments-link"><i className="bi bi-search"></i><FaHouseChimney /> Лаборатории</Link></li>
            {/* <li><Link to="/list_individs"><i className="fa-regular fa-house"></i>Индивиды</Link></li>
            <li><Link to="/get_list_samples"><i className="fa-regular fa-house"></i>Образцы</Link></li>
            <li><Link to="/list_freezers"><i className="fa-regular fa-house"></i>Хранилище</Link></li>
            <li><Link to="/list_families"><i className="fa-solid fa-phone"></i>Семьи</Link></li> */}
          </ul>
        </div>
      </aside>
    );
  }
}

export default AsideBar;