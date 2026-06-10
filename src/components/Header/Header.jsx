import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { InvestigationContext } from '../../context/InvestigationContext';
import ProgressBar from '../ProgressBar/ProgressBar';
import './Header.css';

const Header = () => {
  const { investigationProgress } = useContext(InvestigationContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container" onClick={closeMenu}>
          <FaSearch className="logo-icon" />
          <span className="logo-text">The Last Clue</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Caso
          </NavLink>
          <NavLink to="/suspects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Suspeitos
          </NavLink>
          <NavLink to="/clues" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Pistas
          </NavLink>
          <NavLink to="/witnesses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Testemunhas
          </NavLink>
          <NavLink to="/accusation" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Acusar
          </NavLink>
        </nav>

        {/* Mobile menu icon */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={26} />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className="nav-link" onClick={closeMenu}>
          Caso
        </NavLink>
        <NavLink to="/suspects" className="nav-link" onClick={closeMenu}>
          Suspeitos
        </NavLink>
        <NavLink to="/clues" className="nav-link" onClick={closeMenu}>
          Pistas
        </NavLink>
        <NavLink to="/witnesses" className="nav-link" onClick={closeMenu}>
          Testemunhas
        </NavLink>
        <NavLink to="/accusation" className="nav-link" onClick={closeMenu}>
          Acusar
        </NavLink>
      </nav>

      {/* Investigation Progress Bar */}
      <ProgressBar percent={investigationProgress} />
    </header>
  );
};

export default Header;
