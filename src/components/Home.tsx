import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Willkommen bei Volleymaster</h1>
            <div className="home-links">
                <Link to="/form" className="home-button">Turnier erstellen</Link>
                <Link to="/tournaments" className="home-button">Turniere ansehen</Link>
                <Link to="/calendar" className="home-button">Turnierkalender</Link>
            </div>
        </div>
    );
};

export default Home;
