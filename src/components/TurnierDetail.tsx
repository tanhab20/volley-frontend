import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTournaments } from "../mock/MockdataTournament";

const TurnierDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const turnier = mockTournaments.find((t) => t.id === parseInt(id!));
    const navigate = useNavigate();

    if (!turnier) {
        return <h2>Turnier nicht gefunden</h2>;
    }

    const handleEinschreiben = () => {
        alert(`Team für das Turnier ${turnier.name} eingeschrieben!`);
        navigate('/');
    };

    return (
        <div className="tournament-overview">
            <h2>{turnier.name}</h2>
            <p><strong>Datum:</strong> {new Date(turnier.date).toLocaleDateString()}</p>
            <p><strong>Veranstaltungsort:</strong> {turnier.location}</p>
            <p><strong>Dauer:</strong> {turnier.duration}</p>
            <button  type={"submit"} onClick={handleEinschreiben}>Für Turnier einschreiben</button>
        </div>
    );
};

export default TurnierDetail;
