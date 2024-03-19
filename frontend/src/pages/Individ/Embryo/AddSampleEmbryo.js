// NestedMenu.js
import React, { useState } from 'react';
import "../add_sample.css"
import { Link } from 'react-router-dom';

const AddSampleToEmbryo = ({individ_id}) => {
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
        <span className="larger-text"> </span>
        <button className="btn btn-primary" onClick={handleMenuClick}>Добавить образец</button>
        {showMenu && (
        <div className='main_block'>
          <ul>
            <div onMouseEnter={() => handleMenuItemHover(1)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/samples/dna/create?individ_id=${individ_id}`} className="link-style">ДНК</Link>
            </div>          
            <div onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/samples/chorion/create?individ_id=${individ_id}`} className="link-style">Хорион</Link>
            </div>                   
            <div onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/samples/endometrium/create?individ_id=${individ_id}`} className="link-style">Эндометрий</Link>
            </div>                   
            <div onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/samples/fetal_sac_nitrogen/create?individ_id=${individ_id}`} className="link-style">Плодный мешок (азот)</Link>
            </div>                   
            <div onMouseEnter={() => handleMenuItemHover(2)} onMouseLeave={handleMenuItemLeave}>
            <Link to={`/samples/fetal_sac_freezer/create?individ_id=${individ_id}`} className="link-style">Плодный мешок -80</Link>
            </div>                   
            </ul>
          </div>
        )}
      </p>
    </div>
  );
};

export default AddSampleToEmbryo;
