import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { mockTournaments } from "../mock/MockdataTournament";
import "../styles/Calender.css";
import { useNavigate } from "react-router-dom";

const TurnierKalender: React.FC = () => {
    const navigate = useNavigate();

    const tournamentMap = mockTournaments.reduce((acc: { [key: string]: any[] }, tournament) => {
        const date = new Date(tournament.date).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(tournament);
        return acc;
    }, {});

    const getTileContent = ({ date }: { date: Date }) => {
        const formattedDate = date.toLocaleDateString();
        const tournaments = tournamentMap[formattedDate];
        return tournaments ? (
            <div className="calendar-tile">
                {tournaments.map((tournament) => (
                    <div
                        key={tournament.id}
                        className="calendar-event"
                        onClick={() => handleDateClick(date, tournaments)}
                    >
                        {tournament.name}
                    </div>
                ))}
            </div>
        ) : null;
    };

    const handleDateClick = (date: Date, tournaments: any) => {
        const formattedDate = date.toLocaleDateString();
        navigate(`/calendartournament?date=${encodeURIComponent(formattedDate)}`, { state: { date, tournaments } });
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
