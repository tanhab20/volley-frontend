import React, {FormEvent, useState} from 'react';
import '../common/styles/Form.css';
import { useNavigate } from 'react-router-dom';
import {ITournament} from "../common/model/ITournament";

const Form: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [venue, setVenue] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newTournament: ITournament = {
            name: name,
            date: new Date(date),
            location: venue,
            duration: duration,
            description: description
        };

        console.log('Turnier erstellt:', newTournament);
        navigate('/overview', { state: newTournament });
    };

    return (
        <div className="tournament-form-container">
            <h2>Turnier erstellen</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Namen:</label>
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
                    ></textarea>
                </div>
                <button type="submit">Turnier erstellen</button>
            </form>
        </div>
    );
};

export default Form;
