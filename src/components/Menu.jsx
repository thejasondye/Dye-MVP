import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// TODO: "nav-menu-item" classname and style attribute makes this non-reusable

export default function Menu ({
  id, anchorEl, anchorOrigin, transformOrigin, isOpen, onClose, items
}) {
  const [menuOffset, setMenuOffset] = useState(null);

  const display = anchorEl ? 'block' : 'none';
  const divStyle = {
    display,
    ...anchorOrigin
  };

  return (
    <div
      id={id}
      style={divStyle}
    >
      {items.map((item) => (
        <div
          className="nav-menu-item" // not modular because of this
          key={item.name}
          onClick={onClose}
        >
          <Link to={item.link}>
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

Menu.propTypes = {
  id: PropTypes.string,
  anchorEl: PropTypes.object,
  anchorOrigin: PropTypes.object,
  tansformOrigin: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object)
}
