import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/From.css";
import {createTournament} from "../axios/tournamentService";

const Form: React.FC = () => {
    const navigate = useNavigate();

    // State für die Eingabefelder
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [venue, setVenue] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    // Funktion für das Absenden des Formulars
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newTournament = {
            name,
            date: new Date(date), // Konvertiere das Datum in ein Date-Objekt
            location: venue,
            duration,
            description,
        };

        try {
            const createdTournament = await createTournament(newTournament); // Turnier in die DB schreiben
            console.log('Turnier erstellt:', createdTournament);
            navigate('/overview', { state: createdTournament }); // Weiterleitung zur Übersicht
        } catch (error) {
            console.error('Fehler beim Erstellen des Turniers:', error);
        }
    };

    return (
        <div className="tournament-form-container">
            <h2>Turnier erstellen</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Datum:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="venue">Veranstaltungsort:</label>
                    <input
                        type="text"
                        id="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Dauer:</label>
                    <input
                        type="text"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Beschreibung:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" id={"submitButton"}>Turnier erstellen</button>
            </form>
        </div>
    );
};

export default Form;
