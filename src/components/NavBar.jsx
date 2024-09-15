import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import useAnchor from '../hooks/useAnchor';

import MenuButton from './MenuButton';
import Menu from './Menu';


export default function NavBar () {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 600px)").matches
  );
  const userAvatarPhoto = null;

  console.log('innerWidth: ', window.innerWidth);
  const [userMenuRef, userMenuOffset] = useAnchor('bottom', 'right', 'top', 'right');
  console.log('userMenuOffset :', userMenuOffset);

  const [navMenuRef, navMenuOffset] = useAnchor('bottom', 'left', 'top', 'left');
  console.log('navMenuOffset :', navMenuOffset);

  const matches = e => setIsDesktop(e.matches);

  useEffect(() => {
    window.matchMedia("(min-width: 600px)")
    .addEventListener('change', matches);
  }, []);

  useLayoutEffect(() => {
    console.log('layout effect nav bar');
    window.matchMedia("(min-width: 600px)")
      .addEventListener('change', matches);
    return window.matchMedia("(min-width: 600px)").removeEventListener('change', matches);
  }, []);

  // DRY up this code -- extract menu element
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    {name: 'Home', link: '/'},
    {name: 'Music', link: 'music'},
    {name: 'Blog', link: 'blog'}
  ];
  const settings = [
    {name: 'Profile', link: '/'},
    {name: 'Account', link: '/'},
    {name: 'Dashboard', link: '/'},
    {name: 'Logout', link: '/'}
  ];
  const icons = ['fa-solid fa-bars fa-lg', 'fa-solid fa-xmark fa-lg'];


  return (

    <div id="navbar">
      <div id="navbar-title">
        Schlagzeug
      </div>

      <div id="navigation" ref={navMenuRef}>

        {/* Mobile Nav Links */}
        { !isDesktop &&
          <div id="mobile-nav">
            <MenuButton
              icons={['fa-solid fa-bars fa-lg', 'fa-solid fa-xmark fa-lg']}
              handleOpenMenu={handleOpenNavMenu}
              handleCloseMenu={handleCloseNavMenu}
              id={"mobile-nav-menu-btn"}
              className={null}
              isOpen={Boolean(anchorElNav)}
            />
            <Menu
              id="mobile-nav-menu"
              anchorEl={anchorElNav}
              anchorOrigin={navMenuOffset}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              isOpen={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              items={pages}
            />
          </div>
        }

        {/* Desktop Nav Links */}
        { isDesktop &&
          <div id="desktop-nav">
            {pages.map((page) => (
            <div
              className="desktop-nav-link"
              key={page.name}
            >
              <Link to={page.link}>
                {page.name}
              </Link>
            </div>
            ))}
          </div>
        }
      </div>

      {/* User Settings menu */}

      {/* Make img conditional (pass down) and add placeholder div for initials */}
      <div id="user-settings" ref={userMenuRef}>

          <div
            id="user-avatar"
            className="user-menu-icon"
            onClick={anchorElUser ? handleCloseUserMenu : handleOpenUserMenu}
            onBlur={handleCloseUserMenu}
            alt="Remy Sharp"

          >
            { userAvatarPhoto &&
              <img src={userAvatarPhoto} alt="User Name" /> ||
              <div id="placeholder-photo">JD</div>
            }

          </div>
        <Menu
          id="user-menu"
          anchorEl={anchorElUser}
          anchorOrigin={userMenuOffset}
          onClick={handleCloseUserMenu}
          onBlur={handleCloseUserMenu}
          keepMounted
          transformOrigin={null}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          items={settings}
        />
      </div>

    </div>
  );
};
