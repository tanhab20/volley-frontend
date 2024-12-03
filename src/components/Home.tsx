import React from 'react';
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Volleymaster</h1>
            <Link to="/form">Form</Link>
            <Link to="/tournaments">Turniere</Link>
            <Link to="/calendar">Turnierkalender</Link>

        </div>
    );
};

export default Home;
