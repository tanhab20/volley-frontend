import React from "react";
import { useNavigate } from 'react-router-dom';
import { mockTournaments } from "../mock/MockdataTournament";
import EditIcon from '@mui/icons-material/Edit';

const Turniere: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="tournament-list">
            {mockTournaments.map((turnier) => (
                <div key={turnier.id} className="tournament-list-item">
                    <h2>{turnier.name} <EditIcon onClick={() => navigate(`/edit-tournament/${turnier.id}`)}></EditIcon></h2>
                    <p><strong>Datum:</strong> {new Date(turnier.date).toLocaleDateString()}</p>
                    <p><strong>Veranstaltungsort:</strong> {turnier.location}</p>
                    <p><strong>Dauer:</strong> {turnier.duration}</p>
                    <button type={"submit"} onClick={() => navigate(`/tournament/${turnier.id}`)}>Mehr Details</button>

                </div>
            ))}
        </div>
    );
};

export default Turniere;
