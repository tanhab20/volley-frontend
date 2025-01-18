import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditTournament.css";
import { getTournamentById, updateTournament } from "../axios/tournamentService"; // Importiere PATCH-Service

const EditTournament: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // ID aus der URL extrahieren
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        location: "",
        duration: ""
    });

    const [isLoading, setIsLoading] = useState(true); // Ladezustand

    // Fetch tournament data by ID
    useEffect(() => {
        const fetchTournament = async () => {
            try {
                if (id) {
                    const tournament = await getTournamentById(id);
                    console.log(tournament)
                    setFormData({
                        name: tournament.name,
                        date: new Date(tournament.date).toISOString().split("T")[0],
                        location: tournament.location,
                        duration: tournament.duration
                    });
                }
            } catch (error) {
                console.error("Fehler beim Abrufen des Turniers:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTournament();
    }, [id]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit changes to the database
    const handleSubmit = async () => {
        try {
            if (id) {
                await updateTournament(id, {
                    name: formData.name,
                    date: new Date(formData.date),
                    location: formData.location,
                    duration: formData.duration
                });
                alert("Änderungen gespeichert!");
                navigate('/');
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Turniers:", error);
        }
    };

    if (isLoading) {
        return <p>Loading tournament data...</p>;
    }

    return (
        <div className="tournament-form-container">
            <h1>Turnier bearbeiten</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" id={"name"} value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Datum:</label>
                    <input type="date" name="date"  id={"date"} value={formData.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Veranstaltungsort:</label>
                    <input type="text" name="location" id={"location"} value={formData.location} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Dauer:</label>
                    <input type="text" name="duration"  id={"duration"} value={formData.duration} onChange={handleChange} />
                </div>
                <button type="submit">Speichern</button>
                <button type="button" onClick={() => navigate("/")}>Abbrechen</button>
            </form>
        </div>
    );
};

export default EditTournament;
