import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"
import { FaHouseChimney, FaChildren, FaPerson} from "react-icons/fa6";

class AsideBar extends Component {
  render() {

    return (
        <aside>
        <div className="instruments">
          <p><span className="name_instruments">Разделы биобанка</span></p>
          <ul>
          <li><Link to="/laboratories" className="instruments-link"><FaHouseChimney /> Лаборатории</Link></li>
          <li><Link to="/families" className="instruments-link"><FaChildren /> Семьи</Link></li>
          <li><Link to="/individs" className="instruments-link"><FaPerson />Индивиды</Link></li>

            {/* <li><Link to="/list_individs"><i className="fa-regular fa-house"></i>Индивиды</Link></li>
            <li><Link to="/get_list_samples"><i className="fa-regular fa-house"></i>Образцы</Link></li>
            <li><Link to="/list_freezers"><i className="fa-regular fa-house"></i>Хранилище</Link></li>*/}
          </ul>
        </div>
      </aside>
    );
  }
}

export default AsideBar;