import React from 'react';
import '../common/styles/Overview.css';
import { ITournament } from '../common/model/ITournament';
import {useLocation, useNavigate} from 'react-router-dom';

const TournamentOverview: React.FC = () => {
    const location = useLocation();
    const tournament: ITournament = location.state as ITournament;
    const navigate = useNavigate();
    return (
        <div className="tournament-overview">
            <h2>Turnierübersicht</h2>
            <h3>Name: {tournament.name}</h3>
            <p>Datum: {tournament.date.toLocaleDateString()}</p>
            <p>Veranstaltungsort: {tournament.location}</p>
            <p>Dauer: {tournament.duration}</p>
            <p>Beschreibung: {tournament.description}</p>
            <button onClick={() =>navigate("/")}>Zurück</button>
        </div>
    );
};

export default TournamentOverview;
