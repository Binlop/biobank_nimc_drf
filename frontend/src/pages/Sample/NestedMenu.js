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
        <span className="larger-text">Образцы </span>
        <button onClick={handleMenuClick}>Добавить</button>
        {showMenu && (
        <div className='main_block'>
          <ul>
            <div onMouseEnter={() => handleMenuItemHover(1)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/samples/dna/create`} className="link-style">ДНК</Link>
            </div>          
            <div onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/individs/father/create`} className="link-style">Кровь</Link>
            </div>          
            <div onMouseEnter={() => handleMenuItemHover(3)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/individs/mother/create`} className="link-style">Хорион</Link>
            </div>          
            </ul>
          </div>
        )}
      </p>
    </div>
  );
};

export default NestedMenu;
