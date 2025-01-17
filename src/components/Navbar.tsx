import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { IUser } from "../model/IUser";
import { decodeToken } from "../util/util.jwt";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true)
            setUser(decodeToken(token).user);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setIsAdmin(user.role === 'admin');
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('roleToken');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Volleymasterrr</Link>
                <div className="navbar-links">
                    <Link to="/tournaments" className={`navbar-link ${!isAuthenticated ? 'disabled-link' : ''}`} aria-disabled={!isAuthenticated}>
                        Turniere
                    </Link>


                    {isAdmin && (
                        <Link to="/form" className="navbar-link">
                            Form
                        </Link>
                    )}

                    <Link to="/calendar" className={`navbar-link ${!isAuthenticated ? 'disabled-link' : ''}`} aria-disabled={!isAuthenticated}>
                        Turnierkalender
                    </Link>

                    <button className="logout-button" onClick={handleLogout} disabled={!isAuthenticated}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
