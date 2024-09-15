import React, { useState } from 'react';
import PropTypes from 'prop-types';

// two icons are currently supported (menu closed/menu open)
export default function MenuButton ({
  icons, handleOpenMenu, handleCloseMenu, id, className, isOpen
}) {
  let icon = icons[0];
  let clickHandler = handleOpenMenu;

  if (isOpen) {
    icon = icons[1];
    clickHandler = handleCloseMenu;
  }

  return (
    <button
      onClick={clickHandler}
      id={id}
      className={className}
    >
      <i className={icon} />
    </button>
  );
};

MenuButton.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string),
  clickHandler: PropTypes.func,
  id: PropTypes.string,
  className: PropTypes.string
};
