import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { mockTournaments } from "../mock/MockdataTournament";
import "../Calender.css";

const TurnierKalender: React.FC = () => {
    // Turniere in ein Datum-basiertes Mapping umwandeln
    const tournamentMap = mockTournaments.reduce((acc: { [key: string]: typeof mockTournaments }, tournament) => {
        const date = new Date(tournament.date).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(tournament);
        return acc;
    }, {});

    // Inhalte für jeden Kalendertag abrufen
    const getTileContent = ({ date }: { date: Date }) => {
        const formattedDate = date.toLocaleDateString();
        const tournaments = tournamentMap[formattedDate];
        return tournaments ? (
            <div className="calendar-tile">
                {tournaments.map((tournament) => (
                    <div key={tournament.id} className="calendar-event">
                        {tournament.name}
                    </div>
                ))}
            </div>
        ) : null;
    };

    return (
        <div>
            <Calendar
                tileContent={getTileContent}
                locale="de-DE"
                className="custom-calendar"
            />
        </div>

    );
};

export default TurnierKalender;
