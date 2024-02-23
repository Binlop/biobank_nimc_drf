// NestedMenu.js
import React, { useState } from 'react';
import "./nested_menu.css"
import { Link } from 'react-router-dom';

const NestedMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemHover = (index) => {
    setActiveMenuItem(index);
  };

  const handleMenuItemLeave = () => {
    setActiveMenuItem(null);
  };

  return (
    <div className="title_object">
      <p>
        <span className="larger-text">Индивиды </span>
        <button onClick={handleMenuClick}>Добавить</button>
        {showMenu && (
        <div className='main_block'>
          <ul>
            <div onMouseEnter={() => handleMenuItemHover(1)} onMouseLeave={handleMenuItemLeave}>
              Умственная отсталость
              {activeMenuItem === 1 && (
                <div className="sub_block" onMouseEnter={() => handleMenuItemHover(1)} onMouseLeave={handleMenuItemLeave}>
                  <ul>
                    <li><Link to={`/individs/embryo/create`} className="link-style">Пробант</Link></li>
                    <li><Link to={`/individs/father/create`} className="link-style">Отец</Link></li>
                    <li><Link to={`/individs/mother/create`} className="link-style">Мать</Link></li>
                    <li><Link to={`/individs/another_member/create`} className="link-style">Иной член семьи</Link></li>
                  </ul>
                </div>
              )}
            </div>          
            <div onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
              Беременность
              {activeMenuItem === 2 && (
                <div className="sub_block" onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
                  <ul>
                    <li><Link to={`/individs/embryo/create`} className="link-style">Пробант</Link></li>
                    <li><Link to={`/individs/father/create`} className="link-style">Отец</Link></li>
                    <li><Link to={`/individs/mother/create`} className="link-style">Мать</Link></li>
                    <li><Link to={`/individs/another_member/create`} className="link-style">Иной член семьи</Link></li>            
                </ul>
                </div>
              )}
            </div>                   
            </ul>
          </div>
        )}
      </p>
    </div>
  );
};

export default NestedMenu;