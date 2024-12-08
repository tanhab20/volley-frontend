import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockTournaments } from "../mock/MockdataTournament";
import "../EditTournament.css"

const EditTournament: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const tournament = mockTournaments.find(t => t.id === Number(id));

    const [formData, setFormData] = useState({
        name: tournament?.name || "",
        date: tournament ? new Date(tournament.date).toISOString().split("T")[0] : "",
        location: tournament?.location || "",
        duration: tournament?.duration || ""
    });

    if (!tournament) {
        return <p>Turnier nicht gefunden!</p>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        if (tournament) {
            tournament.name = formData.name;
            tournament.date = new Date(formData.date);
            tournament.location = formData.location;
            tournament.duration = formData.duration;
        }
        navigate("/");
    };

    return (
        <div className="tournament-form-container">
            <h1>Turnier bearbeiten</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Datum:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Veranstaltungsort:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Dauer:</label>
                    <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
                </div>
                <button type="submit">Speichern</button>
                <button type="button" onClick={() => navigate("/")}>Abbrechen</button>
            </form>
        </div>
    );
};

export default EditTournament;
