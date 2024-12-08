import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { mockTournaments } from "../mock/MockdataTournament";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const Turniere: React.FC = () => {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState(mockTournaments);

    const handleDelete = (id: number) => {
        const updatedTournaments = tournaments.filter(t => t.id !== id);
        setTournaments(updatedTournaments);
        console.log('Updated tournaments after deletion:', updatedTournaments);
    };

    return (
        <div className="tournament-list">
            {tournaments.map((turnier) => (
                <div key={turnier.id} className="tournament-list-item">
                    <h2>{turnier.name}</h2>
                    <GrEdit onClick={() => navigate(`/edit-tournament/${turnier.id}`)} style={{padding:5}}/>
                    <MdDelete  onClick={() => handleDelete(turnier.id)} style={{padding:5}}/>
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
