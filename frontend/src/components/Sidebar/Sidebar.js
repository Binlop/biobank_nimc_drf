import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"
import { FaHouseChimney, FaChildren, FaPerson, FaFlask, FaGift} from "react-icons/fa6";

class AsideBar extends Component {
  render() {

    return (
        <aside>
        <div className="instruments">
          <p><span className="name_instruments">Разделы биобанка</span></p>
          <ul>
          <li><Link to="/laboratories/" className="instruments-link"><FaHouseChimney /> Лаборатории</Link></li>
          <li><Link to="/families/" className="instruments-link"><FaChildren /> Семьи</Link></li>
          <li><Link to="/individs/" className="instruments-link"><FaPerson />Индивиды</Link></li>
          <li><Link to="/samples/" className="instruments-link"><FaFlask />Образцы</Link></li>
          <li><Link to="/storage/" className="instruments-link"><FaGift />Хранилище</Link></li>
          </ul>
        </div>
      </aside>
    );
  }
}

export default AsideBar;