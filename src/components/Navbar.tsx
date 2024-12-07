import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Volleymaster</Link>
                <div className="navbar-links">
                    <Link to="/form" className="navbar-link">Form</Link>
                    <Link to="/tournaments" className="navbar-link">Turniere</Link>
                    <Link to="/calendar" className="navbar-link">Turnierkalender</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
