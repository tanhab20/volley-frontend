import React from 'react';
import { ITournament } from '../model/ITournament';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/Overview.css"

const TournamentOverview: React.FC = () => {
    const location = useLocation();
    const tournament = location.state as ITournament;
    const navigate = useNavigate();

    return (
        <div className="tournament-overview">
            <h2>Turnierübersicht</h2>
            <h3>Name: {tournament.name}</h3>
            <p>Datum: {new Date(tournament.date).toLocaleDateString()}</p>
            <p>Veranstaltungsort: {tournament.location}</p>
            <p>Dauer: {tournament.duration}</p>
            <p>Beschreibung: {tournament.description}</p>
            <button type={"submit"} onClick={() => navigate("/")}>Home</button>

        </div>
    );
};

export default TournamentOverview;
