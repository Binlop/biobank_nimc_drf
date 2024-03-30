// NestedMenu.js
import React, { useState } from 'react';
import "./nested_menu.css"
import { Link } from 'react-router-dom';

const AddIndividToFamily = ({id}) => {
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
    <div>
        <button onClick={handleMenuClick} className='btn btn-primary mr-2'>Добавить индивида</button>
        {showMenu && (
        <div className='main_block'>
          <ul>
            <div onMouseEnter={() => handleMenuItemHover(1)} onMouseLeave={handleMenuItemLeave}>
              Умственная отсталость
              {activeMenuItem === 1 && (
                <div className="sub_block" onMouseEnter={() => handleMenuItemHover(1)} onMouseLeave={handleMenuItemLeave}>
                  <ul>
                    <li><Link to={`/individs/embryo/create/?family_id=${id}`} className="link-style">Пробанд</Link></li>
                    <li><Link to={`/individs/father/create/?family_id=${id}`} className="link-style">Отец</Link></li>
                    <li><Link to={`/individs/mother/create/?family_id=${id}`} className="link-style">Мать</Link></li>
                    <li><Link to={`/individs/another_member/create/?family_id=${id}`} className="link-style">Иной член семьи</Link></li>
                  </ul>
                </div>
              )}
            </div>          
            <div onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
              Беременность
              {activeMenuItem === 2 && (
                <div className="sub_block" onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
                  <ul>
                  <li><Link to={`/individs/embryo/create/?family_id=${id}`} className="link-style">Пробанд</Link></li>
                    <li><Link to={`/individs/father/create/?family_id=${id}`} className="link-style">Отец</Link></li>
                    <li><Link to={`/individs/mother/create/?family_id=${id}`} className="link-style">Мать</Link></li>
                    <li><Link to={`/individs/another_member/create/?family_id=${id}`} className="link-style">Иной член семьи</Link></li>        
                </ul>
                </div>
              )}
            </div>                   
            </ul>
          </div>
        )}
    </div>
  );
};

export default AddIndividToFamily;