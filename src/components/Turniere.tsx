import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { mockTournaments } from "../mock/MockdataTournament";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { LuFilter } from "react-icons/lu";

import "../Tournament.css"


const getUniqueSortedValues = (array: string[]) => {
    return Array.from(new Set(array)).sort();
};

const Turniere: React.FC = () => {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState(mockTournaments);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [sortOption, setSortOption] = useState("dateAsc");


    const handleDelete = (id: number) => {
        const updatedTournaments = tournaments.filter(t => t.id !== id);
        setTournaments(updatedTournaments);
    };


    const locations = getUniqueSortedValues(tournaments.map(t => t.location));
    const durations = getUniqueSortedValues(tournaments.map(t => t.duration));


    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const location = event.target.value;
        setSelectedLocations((prev) =>
            prev.includes(location)
                ? prev.filter((item) => item !== location)
                : [...prev, location]
        );
    };


    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const duration = event.target.value;
        setSelectedDurations((prev) =>
            prev.includes(duration)
                ? prev.filter((item) => item !== duration)
                : [...prev, duration]
        );
    };


    const filteredTournaments = tournaments.filter((turnier) => {
        const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(turnier.location);
        const durationMatch = selectedDurations.length === 0 || selectedDurations.includes(turnier.duration);

        return locationMatch && durationMatch;
    });


    const sortedTournaments = filteredTournaments.sort((a, b) => {
        if (sortOption === "dateAsc") {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }

        if (sortOption === "dateDesc") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }

        if (sortOption === "nameAsc") {
            return a.name.localeCompare(b.name);
        }

        if (sortOption === "nameDesc") {
            return b.name.localeCompare(a.name);
        }

        return 0;
    });

    return (
        <div className="tournament-list">
            <div className="sort-filter-container">
                <div className="sort-section">
                    <label className={"sortname"} htmlFor="sort">Sortiere nach:</label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="dateAsc">Datum (älteres zuerst)</option>
                        <option value="dateDesc">Datum (jüngeres zuerst)</option>
                        <option value="nameAsc">Name (A-Z)</option>
                        <option value="nameDesc">Name (Z-A)</option>
                    </select>
                </div>

                <div className="filter-section">
                    <button
                        className="filter-toggle"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <LuFilter/>
                    </button>

                    {isFilterOpen && (
                        <div className="filter-options">
                            {/* Veranstaltungsort Filter */}
                            <div className="filter-category">
                                <h3>Veranstaltungsort</h3>
                                <div className="checkbox-group">
                                    {locations.map((location, index) => (
                                        <div key={index}>
                                            <input
                                                type="checkbox"
                                                id={location}
                                                value={location}
                                                checked={selectedLocations.includes(location)}
                                                onChange={handleLocationChange}
                                            />
                                            <label htmlFor={location}>{location}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dauer Filter */}
                            <div className="filter-category">
                                <h3>Dauer</h3>
                                <div className="checkbox-group">
                                    {durations.map((duration, index) => (
                                        <div key={index}>
                                            <input
                                                type="checkbox"
                                                id={duration}
                                                value={duration}
                                                checked={selectedDurations.includes(duration)}
                                                onChange={handleDurationChange}
                                            />
                                            <label htmlFor={duration}>{duration}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {sortedTournaments.map((turnier) => (
                <div key={turnier.id} className="tournament-list-item">
                    <h2>{turnier.name}</h2>
                    <button
                        className={"edi"}
                        onClick={() => navigate(`/edit-tournament/${turnier.id}`)}
                    >
                        <GrEdit/> Bearbeiten
                    </button>
                    <button
                        className={"del"}
                        onClick={() => handleDelete(turnier.id)}
                    >
                        <MdDelete/> Löschen
                    </button>
                    <p><strong>Datum:</strong> {new Date(turnier.date).toLocaleDateString()}</p>
                    <p><strong>Veranstaltungsort:</strong> {turnier.location}</p>
                    <p><strong>Dauer:</strong> {turnier.duration}</p>
                    <button
                        type="submit"
                        onClick={() => navigate(`/tournament/${turnier.id}`)}
                    >
                        Mehr Details
                    </button>
                </div>
            ))}
        </div>

    );
};

export default Turniere;
