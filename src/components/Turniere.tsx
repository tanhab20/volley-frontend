import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { mockTournaments } from "../mock/MockdataTournament";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import {deleteTournament, getAllTournaments} from "../axios/tournamentService";
import {ITournament} from "../model/ITournament";

const Turniere: React.FC = () => {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState<ITournament[]>([]);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const data = await getAllTournaments(); // Daten aus dem Service holen
                setTournaments(data); // Daten in den State speichern
            } catch (error) {
                console.error("Fehler beim Laden der Turniere:", error);
            }
        };

        fetchTournaments();
    }, []);


    const handleDelete = async (id: string) => {
        try {
            await deleteTournament(id);
            const updatedTournaments = tournaments.filter((t) => t._id !== id); // Aktualisiere den State
            setTournaments(updatedTournaments);
            console.log("Turnier erfolgreich gelöscht:", id);
        } catch (error) {
            console.error("Fehler beim Löschen des Turniers:", error);
        }
    };

    return (
        <div className="tournament-list">
            {tournaments.map((turnier) => (
                <div key={turnier._id} className="tournament-list-item">
                    <h2>{turnier.name}</h2>
                    <button className={"edi"} name={"edi"} id={"edi"}  onClick={() => navigate(`/edit-tournament/${turnier._id}`)}><GrEdit/> Bearbeiten</button>
                    <button className={"del"} name={"del"} id={"del"} onClick={() => handleDelete(turnier._id)} ><MdDelete/> Delete</button>
                    <p><strong>Datum:</strong> {new Date(turnier.date).toLocaleDateString()}</p>
                    <p><strong>Veranstaltungsort:</strong> {turnier.location}</p>
                    <p><strong>Dauer:</strong> {turnier.duration}</p>
                    <button type={"submit"} onClick={() => navigate(`/tournament/${turnier._id}`)}>Mehr Details</button>
                </div>
            ))}
        </div>
    );
};

export default Turniere;
