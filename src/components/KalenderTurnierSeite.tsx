import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ITournament } from "../model/ITournament";
import "../styles/TourniereCalender.css";
import {getAllTournaments} from "../axios/tournamentService";

const KalenderTurnierSeite: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState<ITournament[]>([]); // Alle Turniere
    const [filteredTournaments, setFilteredTournaments] = useState<ITournament[]>([]); // Gefilterte Turniere

    // Extrahiere den `date`-Parameter aus der URL
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get("date");

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const data = await getAllTournaments(); // Lade alle Turniere aus der DB
                setTournaments(data); // Speichere die Turniere in den State
            } catch (error) {
                console.error("Fehler beim Abrufen der Turniere:", error);
            }
        };

        fetchTournaments();
    }, []);

    useEffect(() => {
        if (dateParam) {
            // Umwandlung des `dateParam`-Strings in ein Date-Objekt
            const [day, month, year] = dateParam.split(".").map(Number);
            const date = new Date(year, month - 1, day); // Monat ist 0-indexiert

            if (!isNaN(date.getTime())) {
                // Filtere die Turniere basierend auf dem Datum
                const filtered = tournaments.filter((tournament) => {
                    const tournamentDate = new Date(tournament.date).toLocaleDateString();
                    return tournamentDate === date.toLocaleDateString();
                });
                setFilteredTournaments(filtered); // Setze die gefilterten Turniere
            }
        }
    }, [dateParam, tournaments]); // Abhängigkeit: Datum und Turniere

    if (!dateParam || filteredTournaments.length === 0) {
        return (
            <div>
                <h2>Keine Turniere verfügbar</h2>
                <button onClick={() => navigate("/calendar")}>Zurück zum Kalender</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Turniere am {dateParam}</h2>
            {filteredTournaments.map((tournament) => (
                <div key={tournament._id} className="tournament-details"> {/* Nutze _id von MongoDB */}
                    <p>
                        <strong>Name:</strong> {tournament.name}
                    </p>
                    <p>
                        <strong>Datum:</strong> {new Date(tournament.date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Ort:</strong> {tournament.location}
                    </p>
                    <p>
                        <strong>Dauer:</strong> {tournament.duration}
                    </p>
                    <p>
                        <strong>Beschreibung:</strong> {tournament.description}
                    </p>
                </div>
            ))}
            <button onClick={() => navigate("/calendar")}>Zurück zum Kalender</button>
        </div>
    );
};

export default KalenderTurnierSeite;
