import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {ITournament} from "../model/ITournament";
import {getTournamentById} from "../axios/tournamentService"; // Importiere die Service-Funktion

const TurnierDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // ID aus den URL-Parametern holen
    const [tournament, setTournament] = useState<ITournament | null>(null); // State für das Turnier
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                if (id) {
                    const data = await getTournamentById(id); // Turnier basierend auf der ID abrufen
                    setTournament(data); // Setze das Turnier in den State
                }
            } catch (error) {
                console.error('Fehler beim Abrufen des Turniers:', error);
            }
        };

        fetchTournament();
    }, [id]);

    if (!tournament) {
        return <h2>Turnier nicht gefunden</h2>; // Fehleranzeige, wenn kein Turnier gefunden wird
    }

    const handleEinschreiben = () => {
        alert(`Team für das Turnier ${tournament.name} eingeschrieben!`);
        navigate('/');
    };

    return (
        <div className="tournament-overview">
            <h2>{tournament.name}</h2>
            <p><strong>Datum:</strong> {new Date(tournament.date).toLocaleDateString()}</p>
            <p><strong>Veranstaltungsort:</strong> {tournament.location}</p>
            <p><strong>Dauer:</strong> {tournament.duration}</p>
            <p><strong>Beschreibung:</strong> {tournament.description}</p>
            <button type={"submit"} onClick={handleEinschreiben}>Für Turnier einschreiben</button>
        </div>
    );
};

export default TurnierDetail;
