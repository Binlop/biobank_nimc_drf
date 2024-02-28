// NestedMenu.js
import React, { useState } from 'react';
import "./nested_menu.css"
import { Link } from 'react-router-dom';

const NestedMenu = ({individ_id}) => {
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
      <div className='add_object'>
        <span className="larger-text">Морозильники </span>
        
        <button className="btn btn-primary" onClick={handleMenuClick}>Добавить морозильник</button>
        {showMenu && (
        <div className='main_block'>
          <ul>
            <div onMouseEnter={() => handleMenuItemHover(1)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/storage/freezer/create/`} className="link-style">Стандартный</Link>
            </div>                    
            </ul>
          </div>
        )}
      </div>
      </p>
    </div>
  );
};

export default NestedMenu;
