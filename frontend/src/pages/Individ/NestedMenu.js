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
              Эмбриона
              {activeMenuItem === 1 && (
                <div className="sub_block" onMouseEnter={() => handleMenuItemHover(1)} onMouseLeave={handleMenuItemLeave}>
                  <ul>
                <Link to={`/individs/embryo/create`} className="link-style">Эмбрион</Link>
                  </ul>
                </div>
              )}
            </div>          
            <div onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
              Отца
              {activeMenuItem === 2 && (
                <div className="sub_block" onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
                  <ul>
                  <Link to={`/individs/father/create`} className="link-style">Отец</Link>
                  </ul>
                </div>
              )}
            </div>          
            <div onMouseEnter={() => handleMenuItemHover(3)} onMouseLeave={handleMenuItemLeave}>
              Мать
              {activeMenuItem === 3 && (
                <div className="sub_block" onMouseEnter={() => handleMenuItemHover(3)} onMouseLeave={handleMenuItemLeave}>
                  <ul>
                  <Link to={`/individs/mother/create`} className="link-style">Мать</Link>
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
