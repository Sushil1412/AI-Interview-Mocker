import React from 'react';
import logo from '../assets/Images/logo2.png';
import './Header.css';
import { UserButton } from '@clerk/clerk-react';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Get the current path

  // Menu items and their paths
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    // { name: 'Upgrade', path: '/upgrade' },
    { name: 'Contact', path: '/contact' },
    { name: 'How it Work\'s ?', path: '/how-it-works' },
  ];

  return (
    <>
      <div className="hcontainer">
        <img src={logo} alt="Logo" style={{ width: '160px', height: '70px' }} />

        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <div className="proIcon">
          <UserButton />
        </div>
      </div>
    </>
  );
};

export default Header;
