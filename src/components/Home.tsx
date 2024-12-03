import React from 'react';
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Volleymaster</h1>
            <Link to="/src/components/Form">
                <button>Turnier erstellen</button>
            </Link>
        </div>
    );
};

export default Home;
