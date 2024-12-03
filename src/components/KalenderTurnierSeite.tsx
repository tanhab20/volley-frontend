import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockTournaments } from "../mock/MockdataTournament";
import { ITournament } from "../model/ITournament";
import "../TourniereCalender.css";

const KalenderTurnierSeite: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [filteredTournaments, setFilteredTournaments] = useState<ITournament[]>([]);

    // Extrahiere den `date`-Parameter aus der URL
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get('date');

    useEffect(() => {
        if (dateParam) {
            // Umwandlung des `dateParam`-Strings in ein Date-Objekt
            const [day, month, year] = dateParam.split('.').map(Number);
            const date = new Date(year, month - 1, day); // Monat ist 0-indexiert

            if (!isNaN(date.getTime())) {
                // Filtere die Turniere basierend auf dem Datum
                const filteredTournaments = mockTournaments.filter(tournament => {
                    const tournamentDate = new Date(tournament.date).toLocaleDateString();
                    return tournamentDate === date.toLocaleDateString();
                });
                setFilteredTournaments(filteredTournaments);
            }
        }
    }, [dateParam]);

    if (!dateParam || filteredTournaments.length === 0) {
        return (
            <div>
                <h2>Keine Turniere verfügbar</h2>
                <button onClick={() => navigate("/calandar")}>Zurück zum Kalender</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Turniere am {new Date(dateParam).toLocaleDateString()}</h2>
            {filteredTournaments.map((tournament) => (
                <div key={tournament.id} className="tournament-details">
                    <p><strong>Name:</strong> {tournament.name}</p>
                    <p><strong>Datum:</strong> {new Date(tournament.date).toLocaleDateString()}</p>
                    <p><strong>Ort:</strong> {tournament.location}</p>
                    <p><strong>Dauer:</strong> {tournament.duration}</p>
                    <p><strong>Beschreibung:</strong> {tournament.description}</p>
                </div>
            ))}
            <button onClick={() => navigate("/calendar")}>Zurück zum Kalender</button>
        </div>
    );
};

export default KalenderTurnierSeite;
